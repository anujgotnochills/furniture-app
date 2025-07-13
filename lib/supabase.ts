import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Get environment variables with fallbacks
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url === 'your_supabase_project_url_here') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidKey = (key: string | undefined): boolean => {
  return !!(key && key !== 'your_supabase_anon_key_here' && key.length > 10);
};

// Create a mock client for development when credentials are not set
const createMockClient = () => {
  console.warn('⚠️ Supabase credentials not configured. Using mock client for development.');
  console.warn('Please update your .env file with valid Supabase credentials.');
  
  return {
    auth: {
      signUp: () => Promise.resolve({ 
        data: { user: { id: 'mock-user', email: 'test@example.com' }, session: null }, 
        error: null 
      }),
      signInWithPassword: () => Promise.resolve({ 
        data: { user: { id: 'mock-user', email: 'test@example.com' }, session: { user: { id: 'mock-user', email: 'test@example.com' } } }, 
        error: null 
      }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ 
        data: { session: { user: { id: 'mock-user', email: 'test@example.com' } } }, 
        error: null 
      }),
      onAuthStateChange: (callback: any) => {
        // Simulate auth state change for development
        setTimeout(() => {
          callback('SIGNED_IN', { user: { id: 'mock-user', email: 'test@example.com' } });
        }, 100);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      resetPasswordForEmail: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => Promise.resolve({ 
            data: [
              {
                id: '1',
                name: 'Classic T-Shirt',
                description: 'Comfortable cotton t-shirt',
                price: 29.99,
                image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                category: 'men',
                rating: 4.5,
                in_stock: true,
                created_at: new Date().toISOString()
              }
            ], 
            error: null 
          })
        })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
  } as any;
};

// Export the Supabase client
export const supabase = 
  isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)
    ? createClient<Database>(supabaseUrl!, supabaseAnonKey!)
    : createMockClient();