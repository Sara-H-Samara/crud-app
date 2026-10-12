export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

/** A product in the cart with how many of it the user picked. */
export interface CartItem {
  product: Product;
  qty: number;
}
