import Product from "@/components/ProductList/ui/Product/Product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = +(await params).slug;
  console.log(slug);
  return <Product id={slug} />;
}
