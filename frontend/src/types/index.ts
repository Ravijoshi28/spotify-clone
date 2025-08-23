export interface Song{
_id:string;
title:string;
albumId:string|null;
artist:string;
imageUrl:string;
audioUrl:string;
duration:number;
createdAt:Date;
updatedAt:Date;
}

export interface Album{
    _id:string;
title:string;
songs:Song[];
artist:string;
releaseYear:Date;
imageUrl:any;
audioUrl:string;
createdAt:Date;
updatedAt:Date;
}

export interface Stats{
    TotalSongs:number;
    TotalAlbums:number;
    TotalUser:number;
    TotalArtist:number;
}

export interface Message{
    senderId:string,
    receiverId:string,
    content:string,
    createdAt:string,
    updatedAt:string
}

export interface User{
   _id :string,
   clerkId :string,
   fullName :string,
   imageUrl :string,
}