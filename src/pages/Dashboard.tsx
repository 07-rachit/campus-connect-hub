import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { ItemCard } from '@/components/items/ItemCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Package, Book, Laptop, FlaskConical, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Item {
  id: string;
  title: string;
  category: string;
  description: string | null;
  condition: string;
  type: string;
  created_at: string;
  user_id: string;
}

interface Profile {
  name: string;
  email: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('user_id', user?.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch user's items
      const { data: itemsData, error } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    } finally {
      setDeleting(null);
    }
  };

  const stats = [
    { label: 'Total Items', value: items.length, icon: Package, color: 'bg-primary/10 text-primary' },
    { label: 'Books', value: items.filter(i => i.category === 'Books').length, icon: Book, color: 'bg-amber-100 text-amber-700' },
    { label: 'Electronics', value: items.filter(i => i.category === 'Electronics').length, icon: Laptop, color: 'bg-blue-100 text-blue-700' },
    { label: 'Lab Kits', value: items.filter(i => i.category === 'Lab Kits').length, icon: FlaskConical, color: 'bg-purple-100 text-purple-700' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.name || 'Student'}!
          </h1>
          <p className="font-serif text-muted-foreground">
            Manage your listings and contribute to campus sustainability.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="paper-texture border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="font-serif text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <Button asChild variant="secondary" className="btn-glow">
            <Link to="/add-item">
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/browse">
              Browse All Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* My Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            My Listings
          </h2>

          {items.length === 0 ? (
            <Card className="paper-texture border-border/50 p-8 text-center">
              <Package className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">No items yet</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Start by adding your first item to share with fellow students.
              </p>
              <Button asChild variant="secondary" className="btn-glow">
                <Link to="/add-item">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Item
                </Link>
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  showDelete
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
