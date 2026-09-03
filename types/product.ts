export type Category = 'All' | 'Electronics' | 'Clothing' | 'Home';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Electronics' | 'Clothing' | 'Home';
  image: string;
  altImage?: string;
  description: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
}