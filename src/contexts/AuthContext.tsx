import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getAuthConfigError = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      return new Error(
        'Backend auth config is missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env and restart the dev server.'
      );
    }

    return null;
  };

  const normalizeAuthNetworkError = (error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    const lower = message.toLowerCase();

    if (lower.includes('failed to fetch') || lower.includes('network') || lower.includes('cors')) {
      const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

      if (isLocalhost) {
        return new Error(
          'Cannot reach the auth service from localhost. Check your .env keys, allow localhost in backend auth URL settings, and disable browser shields/extensions that block cross-site requests.'
        );
      }

      return new Error(
        'Cannot reach the auth service. Check your internet connection and disable extensions that block requests.'
      );
    }

    return error instanceof Error ? error : new Error('Unexpected authentication error');
  };

  const signUp = async (email: string, password: string, name: string) => {
    const configError = getAuthConfigError();
    if (configError) return { error: configError };

    try {
      const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
      const options: { data: { name: string }; emailRedirectTo?: string } = { data: { name } };

      if (!isLocalhost) {
        options.emailRedirectTo = window.location.origin;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      return { error };
    } catch (error) {
      return { error: normalizeAuthNetworkError(error) };
    }
  };

  const signIn = async (email: string, password: string) => {
    const configError = getAuthConfigError();
    if (configError) return { error: configError };

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: normalizeAuthNetworkError(error) };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
