import { Connection, Player, PlayerData } from "./constants";

export const checkIsNewPlayer = (
  player: PlayerData,
  base: Player[]
): boolean => {
  return !base.find((item: Player) => item.name === player.name);
};

export const checkIsPlayerOnline = (
  player: Player,
  base: Connection[]
): boolean => {
  return base.some((connection) => (connection.playerIndex = player.index));
};
