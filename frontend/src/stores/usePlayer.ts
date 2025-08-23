import { create } from "zustand";
import type { Song } from "@/types";
import { useChatUser } from "./useChatUser";

interface Player {
  currentSong: Song | null;
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const UsePlayer = create<Player>((set, get) => ({
  currentIndex: -1,
  queue: [],
  currentSong: null,
  isPlaying: false,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];
    const socket = useChatUser.getState().socket;

    if (socket.auth) {
      socket.emit("update_activities", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    const socket = useChatUser.getState().socket;

    if (socket.auth) {
      socket.emit("update_activities", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    const currentSong = get().currentSong;
    const socket = useChatUser.getState().socket;

    if (socket.auth) {
      socket.emit("update_activities", {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong.title} by ${currentSong.artist}`
            : "Idle",
      });
    }

    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const { queue, currentIndex } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      const socket = useChatUser.getState().socket;

      if (socket.auth) {
        socket.emit("update_activities", {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
        });
      }

      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
      const socket = useChatUser.getState().socket;

      if (socket.auth) {
        socket.emit("update_activities", {
          userId: socket.auth.userId,
          activity: "Idle",
        });
      }
    }
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      const socket = useChatUser.getState().socket;

      if (socket.auth) {
        socket.emit("update_activities", {
          userId: socket.auth.userId,
          activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
        });
      }

      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
      const socket = useChatUser.getState().socket;

      if (socket.auth) {
        socket.emit("update_activities", {
          userId: socket.auth.userId,
          activity: "Idle",
        });
      }
    }
  },
}));
