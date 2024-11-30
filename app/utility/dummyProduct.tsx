
export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
     colors: string[];
     images: string[];
    rating?: number;
    discount?: number;
    displayImage:string;
  
  };
export const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 1,
  category: ["Electronics", "Clothing", "Books", "Home & Garden"][
    Math.floor(Math.random() * 4)
  ],
  description: `This is a detailed description for Product ${
    i + 1
  }. It's a high-quality item in the ${
    ["Electronics", "Clothing", "Books", "Home & Garden"][
      Math.floor(Math.random() * 4)
    ]
  } category.`,
  images: [`/placeholder.svg?height=400&width=400&text=Product+${i + 1}`], // Ensure images is an array
  colors: ["Black", "White", "Blue", "Red", "Green"]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3),
  rating: Number((Math.random() * 2 + 3).toFixed(1)), // Random rating between 3.0 and 5.0
  displayImage: `/placeholder.svg?height=400&width=400&text=Product+${i + 1}`
}));