"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RudrakshaForm from "@/components/rudraksha/RudrakshaForm";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<any>({});

  // Fetch gemstone
  useEffect(() => {
    if (!id) return;

    const fetchRudraksha = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/rudraksha/${id}`, {
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

    fetchRudraksha();
  }, [id]);

  // Update gemstone
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/rudraksha/${id}`, {
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

      alert("Rudraksha updated successfully.");

      router.push("/rudraksha");
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
        Loading gemstone...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Rudraksha</h1>

      <RudrakshaForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
