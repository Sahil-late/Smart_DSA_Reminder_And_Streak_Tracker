import dbConnect from "@/app/lib/mongoDb"
import dailyCompletedQuestion from "@/app/models/dailyCompletedQuestion"
import Streaks from "@/app/models/Streaks"
export const POST = async (request) => {
  try {
    await dbConnect()
    let { Email, Provider } = await request.json()
    let today = new Date(new Date().toISOString().split('T')[0])
    let initialize = await Streaks.findOne({ $and: [{ Email }, { Provider }] })
    if (!initialize) {
      let streak = new Streaks({
        Email, Provider, CurrentStreak: today
      })
      await streak.save()
    }
    let StreakCheck = await Streaks.find({ $and: [{ Email }, { Provider }] }, { CurrentStreak: 1, _id: 0 })
    
    if (StreakCheck[0]?.CurrentStreak?.getTime() === today?.getTime()) {
      let streak = await Streaks.find({ $and: [{ Email }, { Provider }] }, { Streak: 1, _id: 0 })
      return Response.json({ streak: streak[0].Streak })
    }
    let prevStreak = new Date(new Date(StreakCheck[0]?.CurrentStreak)?.toISOString()?.split('T')[0])
    let diffTime = today - prevStreak
    let diffDate = Math.floor(diffTime / (1000 * 60 * 60 * 24))    
    if (diffDate == 1) {
      await Streaks.updateOne({ $and: [{ Email }, { Provider }] }, { $inc: { Streak: 1 }, $set: { CurrentStreak: today } })
      let streak = await Streaks.find({ $and: [{ Email }, { Provider }] }, { Streak: 1, _id: 0 })      
      return Response.json({ streak: streak[0].Streak })
    }
    let c = await Streaks.updateOne({ $and: [{ Email }, { Provider }] }, {$set: {Streak: 1, CurrentStreak: today } })
    console.log(c);
    
    return Response.json({ streak: 1 })
  } catch (er) {
    console.log(er);
    
    return Response.json({ msg: 'internal server error' }, { status: 500 })
  }
}
