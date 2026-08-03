import GemstoneForm from "@/components/gemstone/GemstoneForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* <GemstoneForm gemstoneId={id} /> */}
    </div>
  );
}
