import { Dimensions } from 'react-native';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  colors?: Array<{ name: string; value: string }>;
  inStock: boolean;
  sku: string;
  brand?: string;
};

// Temporary placeholder images (transparent background furniture PNGs recommended)
const placeholder = 'https://images.unsplash.com/photo-1555041463-a27bce3118fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description:
      'A comfortable classic white t-shirt made from 100% organic cotton. Perfect for everyday wear and layering.',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviewCount: 98,
    category: 'Men',
    images: [placeholder],
    colors: [
      { name: 'White', value: '#ffffff' },
      { name: 'Black', value: '#000000' },
    ],
    inStock: true,
    sku: 'TSHIRT-0001',
    brand: 'StyleHub',
  },
  {
    id: '2',
    name: 'Denim Jeans',
    description: 'Premium denim jeans with a comfortable fit and classic styling.',
    price: 79.99,
    rating: 4.4,
    reviewCount: 45,
    category: 'Men',
    images: [placeholder],
    inStock: true,
    sku: 'JEANS-0002',
    brand: 'DenimCo',
  },
  {
    id: '3',
    name: 'Summer Dress',
    description: 'Lightweight summer dress perfect for warm weather and casual occasions.',
    price: 89.99,
    rating: 4.8,
    reviewCount: 64,
    category: 'Women',
    images: [placeholder],
    inStock: false,
    sku: 'DRESS-0003',
    brand: 'SummerStyle',
  },
  // Add more products as needed
];

export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
