export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  altImage: string;
  description: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured: boolean;
};

export type CartItem = Product & {
  quantity: number;
};

export type Review = {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
};
