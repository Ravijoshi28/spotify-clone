import { axiosInstance } from "@/lib/axios"
import type { Message, User } from "@/types";
import { create } from "zustand"
import { io } from "socket.io-client"

interface UserStore {
  users: User[],
  isloading: boolean,
  error: string | null,
  socket: any;
  isConnected: boolean,
  onlineUser: Set<string>
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null,

  fetchUsers: () => Promise<void>,
  fetchSelectedUser: (user: User | null) => void,
  fetchMessage: (userId: string) => Promise<void>,
  initSocket: (userId: string) => void,
  disconnectSocket: () => void,
  sendMessage: (receiverId: string, senderId: string, content: string) => void
}

const baseUrl = import.meta.env.MODE==="development"?"http://localhost:3000":"/";

const socket = io(baseUrl, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatUser = create<UserStore>((set, get) => ({

  isloading: false,
  users: [],
  error: null,
  socket: socket,
  isConnected: false,
  onlineUser: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  fetchUsers: async () => {
    set({ isloading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch users" })
    } finally {
      set({ isloading: false });
    }
  },

  initSocket: async (userId: string) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.emit("user_connected", userId);

      // ✅ new: handle initial snapshot
      socket.on("initial_data", ({ users, activities }) => {
        set({
          onlineUser: new Set(users),
          userActivities: new Map(Object.entries(activities))
        });
      });

      // ✅ simplified: update activities as a whole
      socket.on("activities", (activities) => {
        set({ userActivities: new Map(Object.entries(activities)) });
      });

      // update one user's activity
      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      // online/offline
      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUser: new Set([...state.onlineUser, userId])
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUser);
          newOnlineUsers.delete(userId);

          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, "Offline");

          return { onlineUser: newOnlineUsers, userActivities: newActivities };
        })
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message]
        }))
      });

      set({ isConnected: true })
    }
  },

  disconnectSocket: async () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("send_message", { receiverId, senderId, content });
  },

  fetchMessage: async (userId: string) => {
    set({ isloading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch messages" })
    } finally {
      set({ isloading: false });
    }
  },

  fetchSelectedUser: (user) => set({ selectedUser: user }),
}))
