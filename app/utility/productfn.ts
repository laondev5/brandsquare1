import { CartItem, Product } from "@/app/utility/products";

export const addProductToCart = (
  product: Product,
  quantity: number,
  setCartCallback?: (cart: CartItem[]) => void
) => {
  const storedCart = localStorage.getItem("cart");
  const currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

  // Check if the product already exists in the cart
  const existingItemIndex = currentCart.findIndex(
    (item) => item._id === product._id
  );

  let updatedCart: CartItem[];
  if (existingItemIndex > -1) {
    // If product already exists, update the quantity
    updatedCart = currentCart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    // If product doesn't exist, add it as a new item
    const newItem: CartItem = {
      ...product,
      _id: product._id,
      quantity: quantity,
      image: product.displayImage,
     };
    updatedCart = [...currentCart, newItem];
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Update cart state in the UI if callback is provided
  if (setCartCallback) {
    setCartCallback(updatedCart);
  }

  return updatedCart;
};