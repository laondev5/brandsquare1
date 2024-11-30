export type Product = {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  galleryImages: string[] ; // This property is required
  colors: string[];
  rating?: number;
  discount?: number;
  displayImage:string;

};
export type CartItem = Product & { quantity: number; image: string };

// export const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   name: `Product ${i + 1}`,
//   price: Math.floor(Math.random() * 1000) + 1,
//   category: ["Electronics", "Clothing", "Books", "Home & Garden"][
//     Math.floor(Math.random() * 4)
//   ],
//   description: `This is a detailed description for Product ${
//     i + 1
//   }. It's a high-quality item in the ${
//     ["Electronics", "Clothing", "Books", "Home & Garden"][
//       Math.floor(Math.random() * 4)
//     ]
//   } category.`,
//   images: [`/placeholder.svg?height=400&width=400&text=Product+${i + 1}`], // Ensure images is an array
//   colors: ["Black", "White", "Blue", "Red", "Green"]
//     .sort(() => 0.5 - Math.random())
//     .slice(0, 3),
//   rating: Number((Math.random() * 2 + 3).toFixed(1)), // Random rating between 3.0 and 5.0
//   displayImage: `/placeholder.svg?height=400&width=400&text=Product+${i + 1}`
// }));

export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
];

export const popularBrands = [
  { name: "Apple", image: "/placeholder.svg?height=50&width=50" },
  { name: "Samsung", image: "/placeholder.svg?height=50&width=50" },
  { name: "Sony", image: "/placeholder.svg?height=50&width=50" },
  { name: "LG", image: "/placeholder.svg?height=50&width=50" },
  { name: "Nike", image: "/placeholder.svg?height=50&width=50" },
  { name: "Adidas", image: "/placeholder.svg?height=50&width=50" },
];
