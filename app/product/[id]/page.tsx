import ProductDetail from "@/components/ProductDetaile";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <ProductDetail id={params.id} />
    </div>
  );
};

export default page;
