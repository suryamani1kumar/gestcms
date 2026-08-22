import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createJWT } from "@/lib/jwt";

const SEED_USERS = [
  {
    name: "Suryamani Kumar",
    userName: "superadmin",
    email: "admin@gestcms.com",
    password: "admin123",
    role: "superadmin" as const,
    isActive: true,
  },
  {
    name: "Agent User",
    userName: "agent",
    email: "agent@gestcms.com",
    password: "agent123",
    role: "agent" as const,
    isActive: true,
  },
];

async function seedUsers() {
  const count = await User.countDocuments();

  if (count === 0) {
    for (const userData of SEED_USERS) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      await User.create({
        ...userData,
        password: hashedPassword,
        loginHistory: [],
      });
    }

    console.log("✅ Default users seeded successfully");
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Seed default users if database is empty
    await seedUsers();

    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      );
    }

    // Find user
    // +password is required because password has select: false
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Check account status
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is deactivated. Contact admin.",
        },
        { status: 403 },
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Optional: record failed login
      await User.findByIdAndUpdate(user._id, {
        $push: {
          loginHistory: {
            loginAt: new Date(),
            success: false,
            failureReason: "Invalid password",
          },
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    /*
     * Successful login
     */
    const loginTime = new Date();

    // Get IP address
    const forwardedFor = request.headers.get("x-forwarded-for");

    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    // Get browser/device information
    const userAgent = request.headers.get("user-agent") || "Unknown";

    // Update last login + login history
    await User.findByIdAndUpdate(user._id, {
      $push: {
        loginHistory: {
          $each: [
            {
              loginAt: loginTime,
              ipAddress,
              userAgent,
              success: true,
            },
          ],

          // Keep only latest 20 login records
          $slice: -20,
        },
      },
    });

    // JWT payload
    const tokenPayload = {
      id: user._id.toString(),
      name: user.name,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    // Create JWT
    const token = await createJWT(tokenPayload);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: tokenPayload,
    });

    // Set authentication cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
