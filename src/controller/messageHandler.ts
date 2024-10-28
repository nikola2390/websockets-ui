import { login } from "../utils/login";
import { MessageType, Database, CustomWebSocket } from "../utils/constants";
import { sendUpdateRoomToAll } from "../utils/responses";
import { createRoom } from "../utils/room";
import {
  addShips,
  checkIsGameReady,
  createGame,
  sendStartGameToGamers,
} from "../utils/game";

export const messageHandler = (
  message: string,
  ws: CustomWebSocket,
  base: Database
) => {
  const { type, data } = JSON.parse(message);
  switch (type) {
    case MessageType.Registration:
      const playerData = JSON.parse(data);

      console.log(type, playerData);
      login(ws, playerData, base);
      break;
    case MessageType.Create_Room:
      createRoom(ws, base);

      sendUpdateRoomToAll(base.connections, base.rooms);
      break;
    case MessageType.Add_User_To_Room:
      const { indexRoom } = JSON.parse(data);

      createGame(indexRoom, base, ws);
      sendUpdateRoomToAll(base.connections, base.rooms);
      break;
    case MessageType.Add_Ships:
      const { indexPlayer, ships } = JSON.parse(data);
      addShips(indexPlayer, ships, base);

      const game = base.games.find((game) => {
        return game.gamers.find((gamer) => gamer.indexPlayer === indexPlayer);
      })!;

      const isGameReady = checkIsGameReady(game);

      if (isGameReady) {
        sendStartGameToGamers(game, base);
      }

    default:
      break;
  }
};
