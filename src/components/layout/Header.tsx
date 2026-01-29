import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Recycle, LogOut, User, Package, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Recycle className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Recy<span className="text-secondary">Connect</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link to="/browse">
                  <Package className="mr-2 h-4 w-4" />
                  Browse
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link to="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="secondary" size="sm" asChild className="btn-glow">
                <Link to="/add-item">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Link>
              </Button>
              <Button variant="outline" size="icon" onClick={handleSignOut} title="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild className="btn-glow">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
