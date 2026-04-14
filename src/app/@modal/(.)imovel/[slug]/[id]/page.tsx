import { notFound } from "next/navigation";
import { getPropertyBySlugAndId } from "@/lib/properties";
import { PropertyModal } from "@/components/PropertyModal";

export default async function InterceptedPropertyModal({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const property = getPropertyBySlugAndId(slug, id);
  if (!property) notFound();
  return <PropertyModal property={property} />;
}
