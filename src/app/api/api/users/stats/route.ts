import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const startOfMonth = new Date();

    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [totalUsers, activeUsers, inactiveUsers, administrators, newUsers] =
      await Promise.all([
        User.countDocuments(),

        User.countDocuments({
          isActive: true,
        }),

        User.countDocuments({
          isActive: false,
        }),

        User.countDocuments({
          role: {
            $in: ["superadmin", "admin"],
          },
        }),

        User.countDocuments({
          createdAt: {
            $gte: startOfMonth,
          },
        }),
      ]);

    return NextResponse.json({
      success: true,

      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        administrators,
        newUsers,
      },
    });
  } catch (error) {
    console.error("GET /api/users/stats:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user statistics",
      },
      {
        status: 500,
      },
    );
  }
}
