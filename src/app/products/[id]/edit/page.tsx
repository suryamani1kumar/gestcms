"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/product/ProductForm";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<any>({});

  // Fetch gemstone
  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/products/${id}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setFormData(data.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load gemstone.");
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
  }, [id]);

  // Update gemstone
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Gemstone updated successfully.");

      router.push("/products");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading Products...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </main>
  );
}
