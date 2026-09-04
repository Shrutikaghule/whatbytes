import { PRODUCTS } from "@/data/product";
import ProductDetailPage from "@/components/ProductDetailPage";

type ProductRouteProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export default async function ProductRoute({ params }: ProductRouteProps) {
  const { id } = await params;
  return <ProductDetailPage productId={id} />;
}
