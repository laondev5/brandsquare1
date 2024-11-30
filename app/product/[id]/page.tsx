import ProductDetail from "@/components/ProductDetaile";
import React from "react";

interface ParamsProps {
  id: string ; // or number, depending on your use case
}

interface PageProps {
  params: ParamsProps;
}
const page = ({ params }: PageProps) => {
  return (
    <div>
      <ProductDetail id={params.id} />
    </div>
  );
};

export default page;
