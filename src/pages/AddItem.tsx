import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Package, Loader2, ArrowRight, Gift, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const categories = ['Books', 'Electronics', 'Lab Kits', 'Others'] as const;
const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'] as const;

const AddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '' as typeof categories[number] | '',
    description: '',
    condition: '' as typeof conditions[number] | '',
    type: 'Donation' as 'Donation' | 'Exchange',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.condition) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('items').insert({
        title: formData.title,
        category: formData.category,
        description: formData.description || null,
        condition: formData.condition,
        type: formData.type,
        user_id: user?.id,
      });

      if (error) throw error;

      toast.success('Item added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="paper-texture border-border/50 shadow-card">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"
              >
                <Package className="h-8 w-8" />
              </motion.div>
              <CardTitle className="font-display text-2xl">Add New Item</CardTitle>
              <CardDescription className="font-serif">
                Share something with your fellow students
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-display text-sm">
                    Item Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Calculus Textbook 5th Edition"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="font-serif"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="font-display text-sm">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as typeof categories[number] })}
                  >
                    <SelectTrigger className="font-serif">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="font-serif">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-display text-sm">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add any details about your item..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="font-serif resize-none"
                  />
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <Label className="font-display text-sm">
                    Condition <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value as typeof conditions[number] })}
                  >
                    <SelectTrigger className="font-serif">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((cond) => (
                        <SelectItem key={cond} value={cond} className="font-serif">
                          {cond}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="space-y-3">
                  <Label className="font-display text-sm">
                    Listing Type <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as 'Donation' | 'Exchange' })}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="donation"
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        formData.type === 'Donation'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="Donation" id="donation" />
                      <div className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-display font-semibold">Donation</p>
                          <p className="font-serif text-xs text-muted-foreground">Give it away free</p>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="exchange"
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        formData.type === 'Exchange'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="Exchange" id="exchange" />
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-display font-semibold">Exchange</p>
                          <p className="font-serif text-xs text-muted-foreground">Trade for something</p>
                        </div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full btn-glow"
                  variant="secondary"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Add Item
                </Button>
              </CardContent>
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddItem;
