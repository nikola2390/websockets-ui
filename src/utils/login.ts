import { checkIsNewPlayer } from "./helpers";
import {
  sendReg,
  sendWrongPassword,
  sendUpdateRoom,
  sendUpdateWinners,
} from "./responses";
import { PlayerData, Player, Database } from "./constants";
import { WebSocketServer } from "ws";

export const login = (
  ws: WebSocketServer,
  playerData: PlayerData,
  base: Database
) => {
  const isNewPlayer: boolean = checkIsNewPlayer(playerData, base.players);
  if (isNewPlayer) {
    const newPlayer: Player = {
      index: crypto.randomUUID(),
      ...playerData,
    };

    base.players.push(newPlayer);

    sendReg(ws, newPlayer);
    sendUpdateWinners(ws, base.winners);
    sendUpdateRoom(ws, base.rooms);
  } else {
    const player = base.players.find(
      (item: Player) => item.name === playerData.name
    );

    if (playerData.password === player!.password) {
      sendReg(ws, player!);
      sendUpdateWinners(ws, base.winners);
      sendUpdateRoom(ws, base.rooms);
    } else {
      sendWrongPassword(ws, playerData);
    }
  }
};
