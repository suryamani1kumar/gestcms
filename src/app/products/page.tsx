// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FiEdit, FiTrash2, FiCopy, FiEye, FiFilter } from "react-icons/fi";
// import { IoMdAdd } from "react-icons/io";
// import { MdToggleOn, MdToggleOff } from "react-icons/md";

// function ActionMenu({
//   item,
//   onEdit,
//   onDelete,
//   onToggleStatus,
//   onDuplicate,
// }: any) {
//   const baseClass =
//     "group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-200 shadow-sm";

//   return (
//     <>
//       {/* Edit */}
//       <button
//         onClick={() => onEdit(item)}
//         className={`${baseClass} bg-blue-100 text-blue-600 hover:bg-blue-200`}
//       >
//         <FiEdit className="text-sm" />

//         <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-blue-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
//           Edit
//         </span>
//       </button>

//       {/* Duplicate */}
//       <button
//         onClick={() => onDuplicate(item)}
//         className={`${baseClass} bg-purple-100 text-purple-600 hover:bg-purple-200`}
//       >
//         <FiCopy className="text-sm" />

//         <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-purple-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
//           Replicate
//         </span>
//       </button>

//       {/* Active / Inactive */}
//       <button
//         onClick={() => onToggleStatus(item)}
//         className={`${baseClass} bg-amber-100 text-amber-600 hover:bg-amber-200`}
//       >
//         {item.status === "Active" ? (
//           <MdToggleOff className="text-lg" />
//         ) : (
//           <MdToggleOn className="text-lg" />
//         )}

//         <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-amber-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
//           {item.status === "Active" ? "Make Inactive" : "Make Active"}
//         </span>
//       </button>

//       {/* Delete */}
//       <button
//         onClick={() => onDelete(item)}
//         className={`${baseClass} bg-red-100 text-red-600 hover:bg-red-200`}
//       >
//         <FiTrash2 className="text-sm" />

//         <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
//           Delete
//         </span>
//       </button>
//     </>
//   );
// }
// export default function Products() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);
//   const router = useRouter();

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products", {
//         cache: "no-store",
//       });

//       const data = await res.json();

//       if (data.success) {
//         setProducts(data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleEdit = (item: any) => {
//     router.push(`/products/${item._id}/edit`);
//   };

//   const handleToggleStatus = async (item: any) => {
//     try {
//       const res = await fetch(`/api/products/${item._id}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           status: item.status === "Active" ? "Inactive" : "Active",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to update status");
//       }

//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update status.");
//     }
//   };

//   const handleDuplicate = async (item: any) => {
//     try {
//       const res = await fetch(`/api/products/${item._id}/duplicate`, {
//         method: "POST",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to duplicate gemstone");
//       }

//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to duplicate gemstone.");
//     }
//   };

//   const handleDelete = async (item: any) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${item.name}"?`,
//     );

//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/products/${item._id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to delete gemstone");
//       }

//       fetchProducts();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete gemstone.");
//     }
//   };

//   return (
//     <div className="bg-neutral-50 min-h-screen flex flex-col">
//       <div className="flex-1 p-2 md:p-3 font-sans">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
//           <div>
//             <h1 className="text-xl font-bold text-neutral-900">All Products</h1>
//             <p className="text-xs text-neutral-400 mt-0.5">
//               {products.length} products
//               {products.length !== 1 ? "s" : ""} found
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => router.push("/products/create")}
//               className={`flex items-center cursor-pointer gap-2 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors
//               bg-indigo-50 border-indigo-200 text-indigo-700`}
//             >
//               <IoMdAdd className={"text-indigo-600"} />
//               Add
//             </button>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center cursor-pointer gap-2 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors
//               ${showFilters ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
//             >
//               <FiFilter
//                 className={showFilters ? "text-teal-600" : "text-neutral-400"}
//               />
//               Filters
//             </button>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
//           <div className="hidden md:grid grid-cols-12 gap-3 px-3 py-2 bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
//             <div className="col-span-1">Image</div>
//             <div className="col-span-2">SKU</div>
//             <div className="col-span-1">Stock</div>
//             <div className="col-span-2">Name</div>
//             <div className="col-span-1">Category</div>
//             <div className="col-span-2">Price</div>
//             <div className="col-span-1 text-center">Status</div>
//             <div className="col-span-2 text-center">Actions</div>
//           </div>
//           {loading ? (
//             <div className="py-10 text-center text-neutral-400 text-xs">
//               Loading products...
//             </div>
//           ) : products.length === 0 ? (
//             <div className="py-10 text-center text-neutral-400 text-xs">
//               No products found.
//             </div>
//           ) : (
//             products.map((item) => (
//               <div
//                 key={item._id}
//                 className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50"
//               >
//                 <div
//                   className={`grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3 px-3 py-2.5 transition-colors items-center
//                       `}
//                 >
//                   <div className="col-span-1 md:col-span-1">
//                     <img
//                       src={item?.gallery[0]?.url ?? "/banner.png"}
//                       className="h-8 w-18 rounded object-cover"
//                     />
//                   </div>
//                   <div className="col-span-1 md:col-span-2">
//                     <p className="text-xs font-bold text-neutral-500 font-mono">
//                       {item.sku}
//                     </p>
//                   </div>
//                   <div className="col-span-1 md:col-span-1">
//                     <p className="text-xs font-bold text-neutral-500 font-mono">
//                       {item.inventory?.stock}
//                     </p>
//                   </div>
//                   <div className="col-span-1 md:col-span-2">
//                     <p className="text-xs font-bold text-neutral-500 font-mono">
//                       {item.name}
//                     </p>
//                   </div>

//                   <div className="col-span-1 md:col-span-1">
//                     <p className="text-xs font-bold text-neutral-500 font-mono">
//                       {item.category}
//                     </p>
//                   </div>

//                   <div className="col-span-1 md:col-span-2">
//                     <p className="text-xs font-bold text-neutral-500 font-mono">
//                       ₹{item.pricing?.sellingPrice}
//                     </p>
//                   </div>

//                   <div className="col-span-1 md:col-span-1 text-center">
//                     <span className="text-sm text-green-500 font-bold">
//                       {item.status}
//                     </span>
//                   </div>
//                   <div className="col-span-1 md:col-span-2 flex justify-end items-center gap-2">
//                     <ActionMenu
//                       item={item}
//                       onEdit={handleEdit}
//                       onDelete={handleDelete}
//                       onToggleStatus={handleToggleStatus}
//                       onDuplicate={handleDuplicate}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import StatCard from "@/components/statcard/StatCard";
import { generateSKU } from "@/lib/product";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaSlidersH,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPencilAlt,
  FaTrash,
  FaGem,
  FaExclamationTriangle,
  FaTimesCircle,
  FaEllipsisV,
  FaRupeeSign,
} from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";

interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  type: "Jewellery" | "Gemstone";
  material: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive" | "Out of Stock";
  createdAt: string;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    sku: "JWN1001",
    name: "Gold Diamond Necklace",
    category: "Necklaces",
    type: "Jewellery",
    material: "18K Gold",
    price: 125000,
    stock: 12,
    status: "Active",
    createdAt: "18 May 2025",
    image: "/banner.png",
  },
  {
    id: 2,
    sku: "RNG2003",
    name: "Emerald Gold Ring",
    category: "Rings",
    type: "Jewellery",
    material: "18K Gold",
    price: 87500,
    stock: 8,
    status: "Active",
    createdAt: "18 May 2025",
    image: "/banner.png",
  },
  {
    id: 3,
    sku: "ERN3002",
    name: "Diamond Earrings",
    category: "Earrings",
    type: "Jewellery",
    material: "14K Gold",
    price: 63500,
    stock: 15,
    status: "Active",
    createdAt: "17 May 2025",
    image: "/banner.png",
  },
  {
    id: 4,
    sku: "PEN4001",
    name: "Ruby Pendant",
    category: "Pendants",
    type: "Jewellery",
    material: "18K Gold",
    price: 48500,
    stock: 6,
    status: "Active",
    createdAt: "17 May 2025",
    image: "/banner.png",
  },
  {
    id: 5,
    sku: "BRC5002",
    name: "Gold Bracelet",
    category: "Bracelets",
    type: "Jewellery",
    material: "22K Gold",
    price: 34500,
    stock: 10,
    status: "Active",
    createdAt: "16 May 2025",
    image: "/banner.png",
  },
  {
    id: 6,
    sku: "DIA6001",
    name: "Round Cut Diamond",
    category: "Diamond",
    type: "Gemstone",
    material: "Natural Diamond",
    price: 245000,
    stock: 4,
    status: "Active",
    createdAt: "16 May 2025",
    image: "/banner.png",
  },
  {
    id: 7,
    sku: "RUB7001",
    name: "Premium Ruby",
    category: "Ruby",
    type: "Gemstone",
    material: "Natural Ruby",
    price: 95000,
    stock: 3,
    status: "Active",
    createdAt: "15 May 2025",
    image: "/banner.png",
  },
  {
    id: 8,
    sku: "SAP8001",
    name: "Blue Sapphire",
    category: "Sapphire",
    type: "Gemstone",
    material: "Natural Sapphire",
    price: 78000,
    stock: 0,
    status: "Out of Stock",
    createdAt: "15 May 2025",
    image: "/banner.png",
  },
  {
    id: 9,
    sku: "PER9001",
    name: "Natural Pearl Necklace",
    category: "Necklaces",
    type: "Jewellery",
    material: "Pearl",
    price: 42500,
    stock: 18,
    status: "Active",
    createdAt: "14 May 2025",
    image: "/banner.png",
  },
  {
    id: 10,
    sku: "BAN1002",
    name: "Traditional Gold Bangle",
    category: "Bangles",
    type: "Jewellery",
    material: "22K Gold",
    price: 68500,
    stock: 5,
    status: "Inactive",
    createdAt: "14 May 2025",
    image: "/banner.png",
  },
  {
    id: 11,
    sku: "CHN1101",
    name: "Classic Gold Chain",
    category: "Chains",
    type: "Jewellery",
    material: "22K Gold",
    price: 55000,
    stock: 9,
    status: "Active",
    createdAt: "13 May 2025",
    image: "/banner.png",
  },
  {
    id: 12,
    sku: "DIA1201",
    name: "Diamond Solitaire Ring",
    category: "Rings",
    type: "Jewellery",
    material: "18K Gold",
    price: 185000,
    stock: 2,
    status: "Active",
    createdAt: "12 May 2025",
    image: "/banner.png",
  },
];

const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString("en-IN")}`;
};

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  console.log(generateSKU("gemstone", "ruby"));
  const [loading, setLoading] = useState(false);
  console.log("products", products);
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchProducts();
  }, []);

  const categories = [
    "All Categories",
    "Necklaces",
    "Rings",
    "Earrings",
    "Pendants",
    "Bracelets",
    "Bangles",
    "Chains",
    "Diamond",
    "Ruby",
    "Sapphire",
  ];

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.sku.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" || product.category === category;

      const matchesType = type === "All Types" || product.type === type;

      const matchesStatus =
        status === "All Status" || product.status === status;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [products, search, category, type, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  const outOfStock = products.filter((product) => product.stock === 0).length;

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 5,
  ).length;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setType("All Types");
    setStatus("All Status");
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) return;

    setProducts((prev) => prev.filter((item) => item.id !== id));

    setOpenMenu(null);
  };

  const getStatusStyle = (productStatus: Product["status"]) => {
    if (productStatus === "Active") {
      return "bg-[#eaf8ef] text-[#159447]";
    }

    if (productStatus === "Inactive") {
      return "bg-[#f3f3f3] text-[#777]";
    }

    return "bg-[#fff0f0] text-[#d64747]";
  };

  const getStockStyle = (stock: number) => {
    if (stock === 0) {
      return "text-[#d64747]";
    }

    if (stock <= 5) {
      return "text-[#c88a20]";
    }

    return "text-[#333]";
  };
  const stats = [
    {
      title: "Total Products",
      value: "3,842",
      change: "8.7%",
      positive: true,
      icon: <MdShoppingBag />,
      iconBg: "bg-[#f0eaff]",
      iconColor: "text-[#8c6dd7]",
    },
    {
      title: "Active Products",
      value: "1,284",
      change: "12.4%",
      positive: true,
      icon: <FaGem />,
      iconBg: "bg-[#e9f8ef]",
      iconColor: "text-[#25a25a]",
    },
    {
      title: "Low Stock",
      value: "28",
      change: "5",
      positive: false,
      icon: <FaExclamationTriangle />,
      iconBg: "bg-[#fff3d5]",
      iconColor: "text-[#d5a332]",
    },
    {
      title: "Out of Stock",
      value: "46",
      change: "8",
      positive: false,
      icon: <FaTimesCircle />,
      iconBg: "bg-[#fff0f0]",
      iconColor: "text-[#d64747]",
    },
    {
      title: "Total Value",
      value: "₹24,85,600",
      change: "18.6%",
      positive: true,
      icon: <FaRupeeSign />,
      iconBg: "bg-[#ffe8e2]",
      iconColor: "text-[#ee806b]",
    },
  ];
  return (
    <div className=" min-h-screen bg-[#fafafa] p-3 md:p-6">
      <PageHeader
        title="Products"
        description="Manage your jewellery and gemstone products."
        buttonText="Add Product"
        onButtonClick={() => router.push("/products/create")}
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* =====================================================
          PRODUCT TABLE CARD
      ====================================================== */}

      <div
        className="mt-3
          overflow-hidden
          rounded-lg
          border
          border-[#e7e7e7]
          bg-white
        "
      >
        {/* ===================================================
            FILTER BAR
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-[#eeeeee]
            p-4
            xl:flex-row
            xl:items-center
          "
        >
          {/* SEARCH */}

          <div className="relative flex-1">
            <FaSearch
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-[12px]
                text-[#959ba3]
              "
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search product, SKU or category..."
              className="
                h-9
                w-full
                rounded-md
                border
                border-[#dedede]
                bg-white
                pl-9
                pr-3
                text-xs
                text-[#333]
                outline-none
                placeholder:text-[#9da1a7]
                focus:border-[#c99438]
                focus:ring-2
                focus:ring-[#c99438]/10
              "
            />
          </div>

          {/* CATEGORY */}

          <div className="relative">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="
                h-9
                min-w-[155px]
                appearance-none
                rounded-md
                border
                border-[#dedede]
                bg-white
                px-3
                pr-8
                text-xs
                text-[#555]
                outline-none
                focus:border-[#c99438]
              "
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <FaChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[9px]
                text-[#777]
              "
            />
          </div>

          {/* TYPE */}

          <div className="relative">
            <select
              value={type}
              onChange={handleTypeChange}
              className="
                h-9
                min-w-[125px]
                appearance-none
                rounded-md
                border
                border-[#dedede]
                bg-white
                px-3
                pr-8
                text-xs
                text-[#555]
                outline-none
                focus:border-[#c99438]
              "
            >
              <option>All Types</option>
              <option>Jewellery</option>
              <option>Gemstone</option>
              <option>Rudraksha</option>
            </select>

            <FaChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[9px]
                text-[#777]
              "
            />
          </div>

          {/* STATUS */}

          <div className="relative">
            <select
              value={status}
              onChange={handleStatusChange}
              className="
                h-9
                min-w-[130px]
                appearance-none
                rounded-md
                border
                border-[#dedede]
                bg-white
                px-3
                pr-8
                text-xs
                text-[#555]
                outline-none
                focus:border-[#c99438]
              "
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>

            <FaChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[9px]
                text-[#777]
              "
            />
          </div>

          {/* FILTER */}

          <button
            type="button"
            className="
              flex
              h-9
              items-center
              justify-center
              gap-2
              rounded-md
              border
              border-[#e5d9c6]
              bg-[#fffaf2]
              px-4
              text-xs
              font-medium
              text-[#a8731d]
              transition
              hover:bg-[#fff3df]
            "
          >
            <FaSlidersH className="text-[11px]" />
            Filters
          </button>

          {/* RESET */}

          <button
            type="button"
            onClick={resetFilters}
            className="
              h-10
              px-2
              text-xs
              font-medium
              text-[#a8731d]
              hover:underline
            "
          >
            Reset
          </button>
        </div>

        {/* ===================================================
            TABLE
        ==================================================== */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-[#eeeeee] bg-[#fcfcfc]">
                <th className="w-10 px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  #
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Product
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  SKU
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Type
                </th>

                <th className="px-4 py-3 text-right text-[12px] font-semibold text-[#666]">
                  Price
                </th>

                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                  Stock
                </th>

                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Add On
                </th>

                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                  Action
                </th>
              </tr>
            </thead>
            {!loading ? (
              <tbody>
                {visibleProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="
                    border-b
                    border-[#eeeeee]
                    transition
                    hover:bg-[#fffdf9]
                  "
                  >
                    {/* NUMBER */}

                    <td className="px-4 py-3 text-[12px] text-[#777]">
                      {startIndex + index + 1}
                    </td>

                    {/* PRODUCT */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          h-9
                          w-11
                          shrink-0
                          overflow-hidden
                          rounded-md
                          border
                          border-[#e5e0d8]
                          bg-[#f8f8f8]
                        "
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-[#252525]">
                            {product.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#92969d]">
                            {product.material}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}

                    <td className="px-4 py-3">
                      <span className="text-[11px] font-medium text-[#555]">
                        {product.sku}
                      </span>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-4 py-3">
                      <span
                        className="
                        rounded
                        bg-[#f5f3ef]
                        px-2
                        py-1
                        text-[11px]
                        text-[#666]
                      "
                      >
                        {product.category}
                      </span>
                    </td>

                    {/* TYPE */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          ${
                            product.type === "Gemstone"
                              ? "bg-[#f1edff] text-[#8065d8]"
                              : "bg-[#fff5dc] text-[#c99438]"
                          }
                        `}
                        >
                          <FaGem className="text-[11px]" />
                        </div>

                        <span className="text-[11px] text-[#555]">
                          {product.type}
                        </span>
                      </div>
                    </td>

                    {/* PRICE */}

                    <td className="px-4 py-3 text-right">
                      <span className="text-[12px] font-bold text-[#333]">
                        {formatCurrency(12000)}
                      </span>
                    </td>

                    {/* STOCK */}

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`
                        text-[12px]
                        font-semibold
                        ${getStockStyle(product.stock)}
                      `}
                      >
                        {product.stock}
                      </span>

                      {product.stock > 0 && product.stock <= 5 && (
                        <p className="mt-0.5 text-[10px] text-[#c88a20]">
                          Low stock
                        </p>
                      )}

                      {product.stock === 0 && (
                        <p className="mt-0.5 text-[10px] text-[#d64747]">
                          Out of stock
                        </p>
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`
                        inline-flex
                        rounded
                        px-2.5
                        py-1
                        text-[11px]
                        font-medium
                        ${getStatusStyle(product.status)}
                      `}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* CREATED */}

                    <td className="px-4 py-3 text-[12px] text-[#777]">
                      {product.createdAt}
                    </td>

                    {/* ACTION */}

                    <td className="relative px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          title="View"
                          className="cursor-pointer flex h-8 w-8 items-center justify-center rounded border border-[#e0e0e0] text-[#666] transition hover:border-[#c99438] hover:bg-[#fffaf2] hover:text-[#b67d20]"
                          onClick={() => router.push("/products/1")}
                        >
                          <FaEye className="text-[13px]" />
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded
                          border
                          border-[#e0e0e0]
                          text-[#666]
                          transition
                          hover:border-[#c99438]
                          hover:bg-[#fffaf2]
                          hover:text-[#b67d20]
                        "
                        >
                          <FaPencilAlt className="text-[12px]" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === product.id ? null : product.id,
                            )
                          }
                          title="More"
                          className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded
                          text-[#777]
                          transition
                          hover:bg-[#f5f5f5]
                        "
                        >
                          <FaEllipsisV className="text-[12px]" />
                        </button>
                      </div>

                      {openMenu === product.id && (
                        <div
                          className="
                          absolute
                          right-4
                          top-12
                          z-30
                          w-32
                          rounded-md
                          border
                          border-[#e4e4e4]
                          bg-white
                          py-1
                          shadow-lg
                        "
                        >
                          <button
                            type="button"
                            className="
                            flex
                            w-full
                            items-center
                            gap-2
                            px-3
                            py-2
                            text-left
                            text-[10px]
                            text-[#555]
                            hover:bg-[#faf8f4]
                          "
                            onClick={() => setOpenMenu(null)}
                          >
                            <FaEye className="text-[10px]" />
                            View Product
                          </button>

                          <button
                            type="button"
                            className="
                            flex
                            w-full
                            items-center
                            gap-2
                            px-3
                            py-2
                            text-left
                            text-[10px]
                            text-[#555]
                            hover:bg-[#faf8f4]
                          "
                            onClick={() => setOpenMenu(null)}
                          >
                            <FaPencilAlt className="text-[10px]" />
                            Edit Product
                          </button>

                          <button
                            type="button"
                            className="
                            flex
                            w-full
                            items-center
                            gap-2
                            px-3
                            py-2
                            text-left
                            text-[10px]
                            text-red-500
                            hover:bg-red-50
                          "
                            onClick={() => handleDelete(product.id)}
                          >
                            <FaTrash className="text-[10px]" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center">
                      <div className="text-sm font-medium text-[#555]">
                        No products found
                      </div>

                      <p className="mt-1 text-xs text-[#999]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={10} className="h-64">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      {/* Spinner */}
                      <div className="relative h-10 w-10">
                        <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#080e17]" />
                      </div>

                      {/* Loading text */}
                      <p className="mt-3 text-xs font-semibold text-gray-500">
                        Loading Product
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        {/* ===================================================
            PAGINATION
        ==================================================== */}

        <div className="flex flex-col gap-3 border-t border-[#eeeeee] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[#777]">
            Showing {filteredProducts.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-[#dedede] text-[#777] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft className="text-[9px]" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium
                    ${
                      currentPage === page
                        ? "bg-[#c99438] text-white"
                        : "border border-[#dedede] text-[#555] hover:bg-[#fafafa]"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-[#dedede] text-[#777] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight className="text-[9px]" />
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
            className="h-7 rounded border border-[#dedede] bg-white px-1 text-[12px] text-[#555] outline-none"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={30}>30 / page</option>
            <option value={40}>40 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
