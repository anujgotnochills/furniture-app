/*
  # Create products table for fashion items

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `description` (text, product description)
      - `price` (numeric, product price)
      - `image_url` (text, product image URL)
      - `category` (text, product category like 'men', 'women', 'shoes', 'accessories')
      - `rating` (numeric, average rating)
      - `in_stock` (boolean, availability status)
      - `size` (text, clothing size)
      - `color` (text, product color)
      - `brand` (text, brand name)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  category text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  in_stock boolean DEFAULT true,
  size text,
  color text,
  brand text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products can be inserted by authenticated users"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Products can be updated by authenticated users"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);