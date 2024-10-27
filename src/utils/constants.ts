export enum MessageType {
  Registration = "reg",
  Update_Room = "update_room",
  Update_Winners = "update_winners",
}

export interface PlayerData {
  name: string;
  password: string;
}

export interface Player extends PlayerData {
  index: number | string;
}

export interface RoomUser {
  name: string;
  index: number | string;
}

export interface Room {
  roomId: number | string;
  roomUsers: RoomUser[];
}

export interface Winner {
  name: string;
  wins: number;
}

export interface Database {
  players: Player[];
  rooms: Room[];
  winners: Winner[];
}
