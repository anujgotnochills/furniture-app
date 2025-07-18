import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Product = Database['public']['Tables']['products']['Row'];

const { width: screenWidth } = Dimensions.get('window');

const categories = [
  { id: 'all', name: 'All' },
  { id: 'men', name: 'Men' },
  { id: 'women', name: 'Women' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'accessories', name: 'Accessories' },
];

export default function CategoriesScreen() {
  const { filter } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(filter?.toString() || 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('in_stock', true);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#F5E6D3', '#E8D5C4']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#2D1B16" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#2D1B16" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <BlurView
                intensity={selectedCategory === category.id ? 60 : 30}
                style={styles.categoryButtonInner}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Products Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <BlurView intensity={40} style={styles.productCardInner}>
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image_url }} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productDescription} numberOfLines={1}>
                    {product.description}
                  </Text>
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>⭐ {product.rating.toFixed(1)}</Text>
                    </View>
                  </View>
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D1B16',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  categoryButton: {
    marginRight: 12,
  },
  categoryButtonActive: {},
  categoryButtonInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#8B7355',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#2D1B16',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  productCard: {
    width: (screenWidth - 50) / 2,
    marginBottom: 20,
  },
  productCardInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  productImageContainer: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D1B16',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#8B7355',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D1B16',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#8B7355',
  },
});