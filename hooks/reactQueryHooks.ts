import { useProductStore } from "@/store/productStore";
import { useQuery } from "react-query";

export const useProductQuery = (type: "all" | "admin" | "vendor" | "single", id?: string) => {
  const store = useProductStore(); // Always call hooks unconditionally

  return useQuery(
    type === "single" ? ["product", id] : [type],
    async () => {
      switch (type) {
        case "all":
          return await store.fetchProducts();
        case "admin":
          return await store.fetchProductsByAdmin();
        case "vendor":
          return await store.fetchProductsByUsers();
        case "single":
          if (!id) throw new Error("ID is required for fetching a single product.");
          return await store.fetchProductById(id);
        default:
          throw new Error("Invalid type provided to useProductQuery");
      }
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};
