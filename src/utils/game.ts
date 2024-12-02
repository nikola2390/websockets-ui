import {
  CustomWebSocket,
  Database,
  Game,
  MessageType,
  Ship,
} from "./constants";
import { addToRoom } from "./room";

export const createGame = (
  indexRoom: string | number,
  base: Database,
  ws: CustomWebSocket
) => {
  addToRoom(indexRoom, base, ws);

  const idGame = crypto.randomUUID();
  const players = base.rooms.find(
    (room) => room.roomId === indexRoom
  )!.roomUsers;
  const newGame: Game = {
    gameId: idGame,
    gamers: [],
  };

  for (const player of players) {
    const message = {
      type: MessageType.Create_Game,
      data: {
        idGame: idGame,
        idPlayer: player.index,
      },
      id: 0,
    };
    const { wsConnection } = base.connections.find(
      (connection) => connection.playerIndex === player.index
    )!;
    wsConnection.send(
      JSON.stringify({
        type: message.type,
        data: JSON.stringify(message.data),
        id: message.id,
      })
    );

    newGame.gamers.push({
      indexPlayer: player.index,
      ships: [],
      isAddedShips: false,
    });

    console.log(message.type, message);
  }

  base.games.push(newGame);
  base.rooms = base.rooms.filter((room) => room.roomId !== indexRoom);
};

export const addShips = (
  indexPlayer: string | number,
  ships: Ship[],
  base: Database
) => {
  const gamer = base.games
    .map((game) => game.gamers)
    .flat()
    .find((gamer) => gamer.indexPlayer === indexPlayer);

  gamer!.ships = ships;
  gamer!.isAddedShips = true;
};

export const checkIsGameReady = (game: Game): boolean => {
  return game.gamers[0].isAddedShips && game.gamers[1].isAddedShips;
};

export const sendStartGameToGamers = (game: Game, base: Database) => {
  for (const gamer of game.gamers) {
    const message = {
      type: MessageType.Start_Game,
      data: {
        ships: gamer.ships,
        currentPlayerIndex: gamer.indexPlayer,
      },
      id: 0,
    };
    const { wsConnection } = base.connections.find(
      (connection) => connection.playerIndex === gamer.indexPlayer
    )!;
    wsConnection.send(
      JSON.stringify({
        type: message.type,
        data: JSON.stringify(message.data),
        id: message.id,
      })
    );

    console.log(message.type, message);
  }
};
