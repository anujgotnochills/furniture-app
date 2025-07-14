/*
  # Insert sample fashion products

  1. Sample Data
    - Add sample clothing products for men, women, shoes, and accessories
    - Include realistic fashion items with proper pricing and descriptions
    - Use high-quality fashion images from Unsplash
*/

INSERT INTO products (name, description, price, image_url, category, rating, in_stock, size, color, brand) VALUES
-- Men's Clothing
('Classic White T-Shirt', 'Premium 100% organic cotton t-shirt with a comfortable fit. Perfect for everyday wear and layering.', 29.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'men', 4.5, true, 'L', 'White', 'StyleHub'),
('Slim Fit Denim Jeans', 'Modern slim-fit jeans crafted from premium denim with stretch for comfort and mobility.', 79.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 'men', 4.3, true, '32', 'Blue', 'DenimCo'),
('Casual Button Shirt', 'Versatile cotton shirt perfect for both casual and semi-formal occasions.', 49.99, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', 'men', 4.2, true, 'M', 'Navy', 'ClassicWear'),
('Leather Jacket', 'Genuine leather jacket with a timeless design. Perfect for adding edge to any outfit.', 199.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 'men', 4.7, true, 'L', 'Black', 'LeatherCraft'),

-- Women's Clothing
('Floral Summer Dress', 'Lightweight floral dress perfect for warm weather and casual occasions.', 89.99, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 'women', 4.6, true, 'M', 'Floral', 'SummerStyle'),
('Elegant Blouse', 'Sophisticated silk blouse suitable for office wear and evening events.', 69.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', 'women', 4.4, true, 'S', 'Cream', 'ElegantWear'),
('High-Waisted Jeans', 'Trendy high-waisted jeans that flatter your silhouette with a comfortable fit.', 85.99, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', 'women', 4.5, true, '28', 'Dark Blue', 'TrendyDenim'),
('Cozy Knit Sweater', 'Soft and warm knit sweater perfect for cooler weather and layering.', 65.99, 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400', 'women', 4.3, true, 'M', 'Beige', 'CozyKnits'),

-- Shoes
('White Sneakers', 'Classic white sneakers with premium leather upper and comfortable cushioning.', 129.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', 'shoes', 4.4, true, '9', 'White', 'SneakerPro'),
('Ankle Boots', 'Stylish ankle boots with a low heel, perfect for both casual and dressy outfits.', 149.99, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', 'shoes', 4.6, true, '8', 'Brown', 'BootCraft'),
('Running Shoes', 'High-performance running shoes with advanced cushioning and breathable mesh.', 159.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'shoes', 4.5, true, '10', 'Black', 'RunFast'),
('Elegant Heels', 'Sophisticated high heels perfect for formal events and special occasions.', 119.99, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 'shoes', 4.2, true, '7', 'Black', 'ElegantSteps'),

-- Accessories
('Leather Handbag', 'Premium leather handbag with multiple compartments and adjustable strap.', 179.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 'accessories', 4.7, true, null, 'Brown', 'LuxeBags'),
('Classic Watch', 'Timeless analog watch with stainless steel case and leather strap.', 249.99, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', 'accessories', 4.8, true, null, 'Silver', 'TimeClassic'),
('Silk Scarf', 'Luxurious silk scarf with elegant pattern, perfect for adding sophistication to any outfit.', 45.99, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400', 'accessories', 4.3, true, null, 'Multi', 'SilkLux'),
('Sunglasses', 'Stylish sunglasses with UV protection and durable frame construction.', 89.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 'accessories', 4.4, true, null, 'Black', 'SunStyle');