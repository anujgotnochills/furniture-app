import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMountedRef.current) {
        setUser(session?.user ?? null);
        setSession(session);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMountedRef.current) {
        setUser(session?.user ?? null);
        setSession(session);
        setLoading(false);
      }
    });

    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (isMountedRef.current) {
      setLoading(true);
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (isMountedRef.current) {
      setLoading(false);
    }
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (isMountedRef.current) {
      setLoading(true);
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (isMountedRef.current) {
      setLoading(false);
    }
    return { error };
  };

  const signOut = async () => {
    if (isMountedRef.current) {
      setLoading(true);
    }
    await supabase.auth.signOut();
    if (isMountedRef.current) {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};