import { checkIsNewPlayer } from "./helpers";
import {
  sendReg,
  sendWrongPassword,
  sendUpdateRoom,
  sendUpdateWinners,
} from "./responses";
import {
  PlayerData,
  Player,
  Database,
  Connection,
  CustomWebSocket,
} from "./constants";

export const login = (
  ws: CustomWebSocket,
  playerData: PlayerData,
  base: Database
) => {
  const isNewPlayer: boolean = checkIsNewPlayer(playerData, base.players);
  if (isNewPlayer) {
    const newPlayerIndex = crypto.randomUUID();
    const newPlayer: Player = {
      index: newPlayerIndex,
      ...playerData,
    };
    const newConnection: Connection = {
      playerIndex: newPlayerIndex,
      connectionId: ws.connectionId,
      wsConnection: ws,
    };

    base.players.push(newPlayer);
    base.connections.push(newConnection);

    sendReg(ws, newPlayer);
    sendUpdateWinners(ws, base.winners);
    sendUpdateRoom(ws, base.rooms);
  } else {
    const player = base.players.find(
      (item: Player) => item.name === playerData.name
    );

    if (playerData.password === player!.password) {
      const newConnection: Connection = {
        playerIndex: player!.index,
        connectionId: ws.connectionId,
        wsConnection: ws,
      };
      base.connections.push(newConnection);

      sendReg(ws, player!);
      sendUpdateWinners(ws, base.winners);
      sendUpdateRoom(ws, base.rooms);
    } else {
      sendWrongPassword(ws, playerData);
    }
  }
};
