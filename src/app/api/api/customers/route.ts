import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/lib/db";
import Customer from "@/models/customers";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

/* =========================================================
   GET CUSTOMERS
   =========================================================

   GET /api/customers

   Query params:

   ?page=1
   ?limit=10
   ?search=rahul
   ?filter=VIP
   ?filter=Regular
   ?filter=New
   ?filter=active
   ?filter=inactive
   ?filter=blocked
   ?filter=pending

========================================================= */

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    /* =====================================================
       PAGINATION
    ===================================================== */

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      100,
    );

    const skip = (page - 1) * limit;

    /* =====================================================
       SEARCH
    ===================================================== */

    const search = searchParams.get("search")?.trim() || "";

    /* =====================================================
       FILTER
    ===================================================== */

    const filter = searchParams.get("filter")?.trim() || "All";

    /* =====================================================
       CUSTOMER MATCH
    ===================================================== */

    const customerMatch: Record<string, any> = {};

    /*
     * Status filter
     */

    if (["pending", "active", "inactive", "blocked"].includes(filter)) {
      customerMatch.status = filter;
    }

    /*
     * Search
     */

    if (search) {
      const searchRegex = {
        $regex: search,
        $options: "i",
      };

      customerMatch.$or = [
        {
          firstName: searchRegex,
        },
        {
          lastName: searchRegex,
        },
        {
          email: searchRegex,
        },
        {
          phone: searchRegex,
        },
      ];
    }

    /* =====================================================
       GET CUSTOMERS
    ===================================================== */

    const customers = await Customer.find(customerMatch)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    /* =====================================================
       CUSTOMER IDS
    ===================================================== */

    const customerIds = customers.map((customer) => customer._id);

    /* =====================================================
       ORDER AGGREGATION
    =====================================================

       Change `customerId` below if your Order model uses
       another field such as `userId`.

    ===================================================== */

    const orderStats = await Order.aggregate([
      {
        $match: {
          customerId: {
            $in: customerIds,
          },
        },
      },

      {
        $group: {
          _id: "$customerId",

          count: {
            $sum: 1,
          },

          totalAmount: {
            $sum: {
              $ifNull: ["$totalAmount", 0],
            },
          },

          completed: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["completed", "delivered", "paid"]],
                },
                1,
                0,
              ],
            },
          },

          pending: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["pending", "processing", "confirmed"]],
                },
                1,
                0,
              ],
            },
          },

          cancelled: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["cancelled", "canceled"]],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    /* =====================================================
       CREATE LOOKUP MAPS
    ===================================================== */

    const orderMap = new Map<string, any>();

    for (const order of orderStats) {
      orderMap.set(String(order._id), order);
    }

    /* =====================================================
       COMBINE CUSTOMER + ORDER + PAYMENT
    ===================================================== */

    let result = customers.map((customer) => {
      const customerKey = String(customer._id);

      const orders = orderMap.get(customerKey) || {
        count: 0,
        totalAmount: 0,
        completed: 0,
        pending: 0,
        cancelled: 0,
      };

      /* ================================================
           CUSTOMER TYPE
        ================================================ */

      let customerType: "VIP" | "Regular" | "New" = "Regular";

      /*
       * New customer:
       * No orders OR account created recently.
       */

      const createdAt = new Date(customer.createdAt);

      const daysSinceCreated = Math.floor(
        (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (orders.count === 0 && daysSinceCreated <= 30) {
        customerType = "New";
      } else if (orders.totalAmount >= 500000 || orders.count >= 15) {

      /*
       * VIP customer
       *
       * You can change this business rule later.
       */
        customerType = "VIP";
      } else {
        customerType = "Regular";
      }

      return {
        _id: customer._id,

        customerId: String(customer._id),

        firstName: customer.firstName || "",

        lastName: customer.lastName || "",

        name: [customer.firstName, customer.lastName].filter(Boolean).join(" "),

        email: customer.email,

        phone: customer.phone || "",

        profileImage: customer.profileImage || "",

        status: customer.status,

        emailVerified: customer.emailVerified,

        provider: customer.provider,

        createdAt: customer.createdAt,

        updatedAt: customer.updatedAt,

        lastLogin: customer.lastLogin,

        /* ==========================================
             ORDERS
          ========================================== */

        orders: {
          count: orders.count,

          totalAmount: orders.totalAmount,

          completed: orders.completed,

          pending: orders.pending,

          cancelled: orders.cancelled,
        },

        /* ==========================================
             CUSTOMER TYPE
          ========================================== */

        customerType,
      };
    });

    /* =====================================================
       TYPE FILTER
    ===================================================== */

    if (["VIP", "Regular", "New"].includes(filter)) {
      result = result.filter((customer) => customer.customerType === filter);
    }

    /* =====================================================
       TOTAL CUSTOMERS
    ===================================================== */

    const totalCustomers = await Customer.countDocuments(customerMatch);

    /* =====================================================
       GLOBAL STATS
    ===================================================== */

    const [totalCount, activeCount, newCount, vipCount] = await Promise.all([
      /*
       * Total users/customers
       */

      Customer.countDocuments(),

      /*
       * Active
       */

      Customer.countDocuments({
        status: "active",
      }),

      /*
       * New customers
       *
       * Registered during last 30 days.
       */

      Customer.countDocuments({
        createdAt: {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      }),

      /*
       * VIP
       *
       * Calculate from orders.
       */

      getVipCustomerCount(),
    ]);

    /* =====================================================
       TOTAL PAGES
    ===================================================== */

    const totalPages = Math.ceil(totalCustomers / limit);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        data: result,

        stats: {
          totalCustomers: totalCount,

          newCustomers: newCount,

          vipCustomers: vipCount,

          activeCustomers: activeCount,
        },

        pagination: {
          page,

          limit,

          total: totalCustomers,

          totalPages,

          hasNextPage: page < totalPages,

          hasPreviousPage: page > 1,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to fetch customers",

        error:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      {
        status: 500,
      },
    );
  }
}

/* =========================================================
   VIP CUSTOMER COUNT
========================================================= */

async function getVipCustomerCount() {
  const result = await Order.aggregate([
    {
      $group: {
        _id: "$customerId",

        totalAmount: {
          $sum: {
            $ifNull: ["$totalAmount", 0],
          },
        },

        orderCount: {
          $sum: 1,
        },
      },
    },

    {
      $match: {
        $or: [
          {
            totalAmount: {
              $gte: 500000,
            },
          },

          {
            orderCount: {
              $gte: 15,
            },
          },
        ],
      },
    },

    {
      $count: "count",
    },
  ]);

  return result[0]?.count || 0;
}
