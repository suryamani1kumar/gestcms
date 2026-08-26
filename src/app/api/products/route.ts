import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { generateSKU, generateSlug } from "@/lib/product";
import Category from "@/models/Category";

/**
 * GET /api/products
 *
 * Query params:
 * ?page=1
 * ?limit=10
 * ?search=emerald
 * ?productType=gemstone
 * ?status=Published
 * ?category=Rings
 * ?stockStatus=In Stock
 */

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      100,
    );

    const search = searchParams.get("search")?.trim() || "";
    const productType = searchParams.get("productType")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const stockStatus = searchParams.get("stockStatus")?.trim() || "";

    const filter: Record<string, any> = {};

    /*
     * SEARCH
     */
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          sku: {
            $regex: search,
            $options: "i",
          },
        },
        {
          indianName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /*
     * PRODUCT TYPE
     *
     * gemstone
     * rudraksha
     * jewellery
     */
    if (productType) {
      filter.productType = productType;
    }

    /*
     * PRODUCT STATUS
     *
     * Draft
     * Published
     * Archived
     */
    if (status) {
      filter.status = status;
    }

    /*
     * CATEGORY
     */
    if (category) {
      filter.category = category;
    }

    /*
     * STOCK STATUS
     *
     * In Stock
     * Low Stock
     * Out of Stock
     */
    if (stockStatus) {
      filter["inventory.stockStatus"] = stockStatus;
    }

    const skip = (page - 1) * limit;

    /*
     * PRODUCTS + TOTAL
     */
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate({
          path: "category",
          select: "name",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);

    /*
     * FORMAT PRODUCTS FOR FRONTEND
     */
    const formattedProducts = products.map((product: any) => {
      const quantity = Number(product.inventory?.quantity || 0);

      /*
       * PRICE
       */
      const price =
        Number(product.pricing?.sellingPrice) ||
        Number(product.pricing?.price) ||
        Number(product.price) ||
        0;

      /*
       * IMAGE
       */
      const image =
        product.gallery?.[0]?.url || product.images?.[0]?.url || "/banner.png";

      /*
       * MATERIAL
       */
      const material =
        product.jewelleryData?.metal ||
        product.gemstoneData?.stoneType ||
        product.rudrakshaData?.type ||
        "";

      /*
       * PRODUCT TYPE
       */
      let type: "Jewellery" | "Gemstone" | "Rudraksha" = "Jewellery";

      if (product.productType === "gemstone") {
        type = "Gemstone";
      }

      if (product.productType === "rudraksha") {
        type = "Rudraksha";
      }

      /*
       * STOCK STATUS
       */
      let calculatedStockStatus: "In Stock" | "Low Stock" | "Out of Stock" =
        "Out of Stock";

      if (quantity > 0 && quantity <= 5) {
        calculatedStockStatus = "Low Stock";
      } else if (quantity > 5) {
        calculatedStockStatus = "In Stock";
      }

      return {
        id: product._id.toString(),

        sku: product.sku || "",

        name: product.name || "",

        category: product.category || "",

        type,

        productType: product.productType || "",

        material,

        price,

        stock: quantity,

        stockStatus: product.inventory?.stockStatus || calculatedStockStatus,

        /*
         * Keep actual database status.
         */
        status: product.status || "Draft",

        createdAt: product.createdAt
          ? new Date(product.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",

        image,
      };
    });

    /*
     * STATS
     */
    const [
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
    ] = await Promise.all([
      Product.countDocuments(),

      Product.countDocuments({
        status: "Published",
      }),

      Product.countDocuments({
        "inventory.stockStatus": "Low Stock",
      }),

      Product.countDocuments({
        "inventory.stockStatus": "Out of Stock",
      }),
    ]);

    /*
     * TOTAL INVENTORY VALUE
     */
    const inventoryProducts = await Product.find({})
      .select("pricing inventory price")
      .lean();

    const totalValue = inventoryProducts.reduce(
      (total: number, product: any) => {
        const price =
          Number(product.pricing?.sellingPrice) ||
          Number(product.pricing?.price) ||
          Number(product.price) ||
          0;

        const quantity = Number(product.inventory?.quantity) || 0;

        return total + price * quantity;
      },
      0,
    );

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,

        message: "Products fetched successfully",

        data: formattedProducts,

        stats: {
          totalProducts,
          activeProducts,
          lowStock: lowStockProducts,
          outOfStock: outOfStockProducts,
          totalValue,
        },

        pagination: {
          page,
          limit,
          total,
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
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      },
    );
  }
}

/**
 * POST /api/products
 *
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      productType,
      name,
      slug,
      description,
      category,
      gallery,
      gemstone,
      rudraksha,
      jewellery,
      astrology,
      certification,
      pricing,
      inventory,
      benefits,
      seo,
      careInstructions,
      status,
      createdBy,
      updatedBy,
    } = body;

    // Required fields
    if (!productType) {
      return NextResponse.json(
        {
          success: false,
          message: "Product type is required",
        },
        { status: 400 },
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name is required",
        },
        { status: 400 },
      );
    }

    // Validate product type
    const allowedProductTypes = ["gemstone", "rudraksha", "jewellery"];

    if (!allowedProductTypes.includes(productType)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid product type. Allowed values: gemstone, rudraksha, jewellery",
        },
        { status: 400 },
      );
    }

    const categoryData = await Category.findById(category).lean();

    if (!categoryData) {
      throw new Error("Category not found");
    }

    const sku = generateSKU(productType, categoryData.name);

    // SKU duplicate check
    const existingSku = await Product.findOne({
      sku: sku,
    }).lean();

    if (existingSku) {
      return NextResponse.json(
        {
          success: false,
          message: "SKU already exists",
        },
        { status: 409 },
      );
    }

    // Generate slug if not provided
    let finalSlug = slug ? generateSlug(slug) : generateSlug(name);

    // Check slug
    const existingSlug = await Product.findOne({
      slug: finalSlug,
    }).lean();

    if (existingSlug) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    const product = await Product.create({
      productType,

      sku: sku,

      name,

      slug: finalSlug,

      description,

      category,

      gallery: gallery || [],

      gemstone: productType === "gemstone" ? gemstone : undefined,

      rudraksha: productType === "rudraksha" ? rudraksha : undefined,

      jewellery: productType === "jewellery" ? jewellery : undefined,

      astrology,

      certification,

      pricing,

      inventory,

      benefits: benefits || [],

      seo,

      careInstructions,

      status: status || "Draft",

      createdBy,

      updatedBy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "SKU or slug already exists",
        },
        { status: 409 },
      );
    }

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Product validation failed",
          errors: Object.values(error.errors).map((err: any) => err.message),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 },
    );
  }
}
