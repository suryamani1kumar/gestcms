import mongoose, { Schema, model, models, Document } from "mongoose";

interface ILoginHistory {
  loginAt: Date;
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  success: boolean;
  failureReason?: string;
}

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  password: string;

  role: "superadmin" | "admin" | "agent";

  isActive: boolean;

  loginHistory: ILoginHistory[];

  createdAt: Date;
  updatedAt: Date;
}

const LoginHistorySchema = new Schema<ILoginHistory>(
  {
    loginAt: {
      type: Date,
      default: Date.now,
    },

    ipAddress: {
      type: String,
      trim: true,
    },

    userAgent: {
      type: String,
      trim: true,
    },

    device: {
      type: String,
      trim: true,
    },

    browser: {
      type: String,
      trim: true,
    },

    success: {
      type: Boolean,
      default: true,
    },

    failureReason: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["superadmin", "admin", "agent"],
      default: "agent",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Complete login history
    loginHistory: {
      type: [LoginHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
