import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { Database } from '@/types/database';

type Product = Database['public']['Tables']['products']['Row'];
type WishlistItem = Database['public']['Tables']['wishlist_items']['Row'] & {
  products: Product;
};

interface WishlistContextType {
  items: WishlistItem[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  const fetchWishlistItems = async () => {
    if (!user) {
      if (isMountedRef.current) {
        setItems([]);
      }
      return;
    }

    if (isMountedRef.current) {
      setLoading(true);
    }
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          products (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      if (isMountedRef.current) {
        setItems(data || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchWishlistItems();
    
    return () => {
      isMountedRef.current = false;
    };
  }, [user]);

  const addToWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: productId,
        });

      if (error) throw error;
      await fetchWishlistItems();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
      await fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.product_id === productId);
  };

  const refreshWishlist = async () => {
    await fetchWishlistItems();
  };

  return (
    <WishlistContext.Provider value={{
      items,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      refreshWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};