import { motion } from 'framer-motion';
import { Book, Laptop, FlaskConical, Package, Trash2, ArrowRightLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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

interface ItemCardProps {
  item: Item;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
  index?: number;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Books: Book,
  Electronics: Laptop,
  'Lab Kits': FlaskConical,
  Others: Package,
};

const categoryStyles: Record<string, string> = {
  Books: 'badge-books',
  Electronics: 'badge-electronics',
  'Lab Kits': 'badge-labkits',
  Others: 'badge-others',
};

export const ItemCard: React.FC<ItemCardProps> = ({ item, showDelete, onDelete, index = 0 }) => {
  const Icon = categoryIcons[item.category] || Package;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="group h-full paper-texture overflow-hidden border-border/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={categoryStyles[item.category]}>
                {item.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={item.type === 'Donation' ? 'badge-donation' : 'badge-exchange'}
              >
                {item.type === 'Donation' ? (
                  <><Gift className="mr-1 h-3 w-3" /> Donation</>
                ) : (
                  <><ArrowRightLeft className="mr-1 h-3 w-3" /> Exchange</>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {item.title}
          </h3>
          {item.description && (
            <p className="font-serif text-sm text-muted-foreground line-clamp-3 mb-3">
              {item.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">Condition:</span>
            <Badge variant="outline" className="text-xs">
              {item.condition}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="font-serif text-xs text-muted-foreground">
            {formatDate(item.created_at)}
          </span>
          {showDelete && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
