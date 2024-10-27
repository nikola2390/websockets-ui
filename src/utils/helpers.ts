import { Player, PlayerData } from "./constants";

export const checkIsNewPlayer = (
  player: PlayerData,
  base: Player[]
): boolean => {
  return !base.find((item: Player) => item.name === player.name);
};
