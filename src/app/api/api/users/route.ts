import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/**
 * GET /api/users
 *
 * Supported query params:
 *
 * ?page=1
 * ?limit=10
 * ?search=neha
 * ?status=Active
 * ?status=Inactive
 * ?role=superadmin
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = Math.min(Number(searchParams.get("limit")) || 10, 100);

    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status");
    const role = searchParams.get("role");

    const filter: Record<string, unknown> = {};

    // Search
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          userName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Active / Inactive
    if (status === "Active") {
      filter.isActive = true;
    }

    if (status === "Inactive") {
      filter.isActive = false;
    }

    // Role
    if (role === "superadmin" || role === "admin" || role === "agent") {
      filter.role = role;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments(filter),
    ]);

    const formattedUsers = users.map((user) => {
      const lastLogin =
        user.loginHistory
          ?.filter((login: any) => login.success)
          ?.sort(
            (a: any, b: any) =>
              new Date(b.loginAt).getTime() - new Date(a.loginAt).getTime(),
          )[0] || null;

      return {
        id: user._id.toString(),

        name: user.name,

        username: `@${user.userName}`,

        email: user.email,

        role: user.role,

        isActive: user.isActive ? "Active" : "Inactive",

        lastLogin: lastLogin?.loginAt || null,

        lastLoginTime: lastLogin?.loginAt || null,

        joinedDate: user.createdAt,
      };
    });

    return NextResponse.json({
      success: true,

      data: formattedUsers,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      userName,
      email,
      password,
      role = "agent",
      isActive = true,
    } = body;

    if (!name || !userName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, username, email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const existingUser = await User.findOne({
      $or: [
        {
          email: email.toLowerCase(),
        },
        {
          userName: userName.toLowerCase(),
        },
      ],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username or email already exists",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      isActive,
      loginHistory: [],
    });

    const responseUser = user.toObject();

    delete responseUser.password;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: responseUser,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST /api/users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
      },
      {
        status: 500,
      },
    );
  }
}
