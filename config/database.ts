import mongoose from 'mongoose'
import { io } from '../server'

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.once('open', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
  const gameCollection = db.collection("games")
  //@ts-ignore
  const gameChangeStream = gameCollection.watch({ fullDocument: 'updateLookup' })

  gameChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "update":
        const game = {
          id: change.fullDocument?._id.toString(),
          players: change.fullDocument?.players,
          playerCount: change.fullDocument?.playerCount,
          rounds: change.fullDocument?.rounds,
          currentRound: change.fullDocument?.currentRound,
          creator: change.fullDocument?.creator,
          name: change.fullDocument?.name,
          dateCreated: change.fullDocument?.dateCreated,
          trumpSuit: change.fullDocument?.trumpSuit,
          deck: change.fullDocument?.deck,
          leader: change.fullDocument?.leader,
          pile: change.fullDocument?.pile,
          winner: change.fullDocument?.winner,
          enabled: change.fullDocument?.enabled,
          leadSuit: change.fullDocument?.leadSuit,
          cardsPerHand: change.fullDocument.cardsPerHand
        }
        if (game.id) {
        io.to(game.id).emit("game updated", game)
        }
        break
    }
  })
});