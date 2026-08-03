import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createJWT } from "@/lib/jwt";

const SEED_USERS = [
  {
    name: "Super Admin",
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
      await User.create({ ...userData, password: hashedPassword });
    }
    console.log("✅ Default users seeded successfully");
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await seedUsers();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: "Your account is deactivated. Contact admin." },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const tokenPayload = {
      id: user._id.toString(),
      name: user.name,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    const token = await createJWT(tokenPayload);

    // Build response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: tokenPayload,
    });

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: false,      // readable by client for JWT decode in AuthContext
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
