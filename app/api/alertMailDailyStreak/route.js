import { NextResponse } from "next/server";
import transporter from "@/app/transporter/emailTransporter";
import Streaks from "@/app/models/Streaks";
import dbConnect from "@/app/lib/mongoDb";

export async function GET() {
    try {
        await dbConnect()
        let Allusers = await Streaks.find({}, { Email: 1, Provider: 1, Streak: 1, CurrentStreak: 1, _id: 0 })
        let today = new Date(new Date().toISOString().split('T')[0])

        let users = Allusers.filter((u)=>{
            let diffTime = today - new Date(u.CurrentStreak)
            let diffDate = Math.floor(diffTime / (1000 * 60 * 60 * 24))  
           console.log(diffDate);
           if(diffDate == 1) return u
        })
        if(users.length===0) return NextResponse.json({
            success: true,
            message: `✅ Emails Not sends All Users Allredy Completed there Streaks Or Not Login since 1 day`,
        })

        for (const user of users) {
            try {
                await transporter.sendMail({
                    from: `"Daily Streak" <${process.env.EMAIL_USER}>`,
                    to: user.Email,
                    subject: "🔥 Don't Break Your Daily Streak!",
                    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>🔥 Daily Streak Reminder</h2>

        <p>Hello,</p>

        <p>Your <strong>${user.Provider}</strong> account has an active learning streak.</p>

        <table style="border-collapse: collapse;">
          <tr>
            <td><strong>Account:</strong></td>
            <td>${user.Email}</td>
          </tr>
          <tr>
            <td><strong>Login:</strong></td>
            <td>${user.Provider}</td>
          </tr>
          <tr>
            <td><strong>Current Streak:</strong></td>
            <td>🔥 ${user.Streak} day${user.Streak > 1 ? "s" : ""}</td>
          </tr>
          <tr>
            <td><strong>Last Activity:</strong></td>
            <td>${new Date(user.CurrentStreak).toLocaleDateString()}</td>
          </tr>
        </table>

        <p>
          Complete today's questions to keep your streak alive.
        </p>

        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}"
             style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
            Continue Learning 🚀
          </a>
        </p>

        <hr>

        <small>
          This reminder was sent for your <strong>${user.Provider}</strong> account
          (<strong>${user.Email}</strong>).
        </small>
      </div>
    `,
                });
                console.log(`✅ Sent to ${user.Email}`);
            } catch (error) {
                console.error(`❌ Failed to send to ${user.Email}`, error.message);
            }
        }
        return NextResponse.json({
            success: true,
            message: `✅ Emails sends successfully`,
        });

    } catch (er) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}