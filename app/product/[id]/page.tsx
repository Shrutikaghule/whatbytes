import ProductDetailPage from "@/components/ProductDetailPage";

type ProductRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductRoute({ params }: ProductRouteProps) {
  const { id } = await params;
  return <ProductDetailPage productId={id} />;
}
