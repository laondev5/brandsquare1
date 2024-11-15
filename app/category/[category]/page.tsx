import CategoryItem from "@/components/categoryItems";
import React from "react";

interface ParamsProps {
    category: string ; 
}

interface PageProps {
  params: ParamsProps;
}
const page = ({ params }: PageProps) => {
  return (
    <div>
      <CategoryItem category={params.category} />
    </div>
  );
};

export default page;