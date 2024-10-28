import { WebSocket } from "ws";

export enum MessageType {
  Registration = "reg",
  Update_Room = "update_room",
  Update_Winners = "update_winners",
  Create_Room = "create_room",
  Add_User_To_Room = "add_user_to_room",
  Create_Game = "create_game",
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
  connections: Connection[];
}

export interface Connection {
  playerIndex: number | string;
  connectionId: string;
  wsConnection: any;
}

export interface CustomWebSocket extends WebSocket {
  connectionId: string;
}
