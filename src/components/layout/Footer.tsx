import { Recycle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Recycle className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold">
                Recy<span className="text-secondary">Connect</span>
              </span>
            </Link>
            <p className="font-serif text-sm text-primary-foreground/80">
              Connecting students to share, reuse, and reduce waste on campus.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-serif text-sm text-primary-foreground/80">
              <li><Link to="/browse" className="hover:text-secondary transition-colors">Browse Items</Link></li>
              <li><Link to="/dashboard" className="hover:text-secondary transition-colors">My Dashboard</Link></li>
              <li><Link to="/add-item" className="hover:text-secondary transition-colors">Add Item</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 font-serif text-sm text-primary-foreground/80">
              <li>Books & Textbooks</li>
              <li>Electronics</li>
              <li>Lab Kits & Equipment</li>
              <li>Other Supplies</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-sm text-primary-foreground/60">
            © 2024 RecyConnect. All rights reserved.
          </p>
          <p className="flex items-center gap-1 font-serif text-sm text-primary-foreground/60">
            Made with <Heart className="h-4 w-4 text-secondary" /> for sustainability
          </p>
        </div>
      </div>
    </footer>
  );
};
