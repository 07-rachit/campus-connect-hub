import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Recycle, 
  ArrowRight, 
  Book, 
  Laptop, 
  FlaskConical, 
  Package,
  Users,
  Leaf,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Book,
      title: 'Books & Textbooks',
      description: 'Exchange course materials, textbooks, and study guides with fellow students.',
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
      icon: Laptop,
      title: 'Electronics',
      description: 'Share calculators, chargers, and other electronic devices.',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    {
      icon: FlaskConical,
      title: 'Lab Kits',
      description: 'Pass on lab equipment and science kits to the next generation.',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    },
    {
      icon: Package,
      title: 'And More',
      description: 'From art supplies to sports equipment — anything reusable welcome.',
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300',
    },
  ];

  const benefits = [
    'Reduce campus waste and environmental impact',
    'Save money on expensive course materials',
    'Build connections with fellow students',
    'Contribute to a sustainable campus culture',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-display text-primary mb-8"
            >
              <Leaf className="h-4 w-4" />
              Campus Sustainability Initiative
            </motion.div>

            {/* Main heading */}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Share. Reuse.{' '}
              <span className="text-secondary relative">
                Connect
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary/30 origin-left"
                />
              </span>
              .
            </h1>

            <p className="font-serif text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join your campus community in reducing waste and sharing resources. 
              Donate or exchange books, electronics, lab kits, and more with fellow students.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {user ? (
                <>
                  <Button asChild size="lg" variant="secondary" className="btn-glow text-lg px-8">
                    <Link to="/add-item">
                      Add Your Item
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/browse">Browse Items</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" variant="secondary" className="btn-glow text-lg px-8">
                    <Link to="/register">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Floating icons decoration */}
          <div className="hidden lg:block absolute top-1/4 left-10">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-lg"
            >
              <Book className="h-8 w-8" />
            </motion.div>
          </div>
          <div className="hidden lg:block absolute top-1/3 right-16">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-lg"
            >
              <Laptop className="h-7 w-7" />
            </motion.div>
          </div>
          <div className="hidden lg:block absolute bottom-1/4 right-20">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 shadow-lg"
            >
              <FlaskConical className="h-6 w-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Can You Share?
            </h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              From textbooks to tech, find everything students need on one platform.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full paper-texture border-border/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${feature.color} mb-4 transition-transform group-hover:scale-110`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-serif text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-display text-secondary mb-6">
                <Sparkles className="h-4 w-4" />
                Why Join?
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Make a Difference on Campus
              </h2>
              <p className="font-serif text-lg text-muted-foreground mb-8">
                RecyConnect isn't just about sharing items — it's about building a more 
                sustainable and connected campus community.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0 mt-0.5" />
                    <span className="font-serif text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                {/* Main card */}
                <Card className="paper-texture border-border/50 shadow-elevated p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <Users className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="font-display text-3xl font-bold text-foreground">500+</p>
                      <p className="font-serif text-muted-foreground">Students Connected</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted/50 p-4">
                      <p className="font-display text-2xl font-bold text-foreground">1,200+</p>
                      <p className="font-serif text-sm text-muted-foreground">Items Shared</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-4">
                      <p className="font-display text-2xl font-bold text-foreground">85%</p>
                      <p className="font-serif text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </Card>

                {/* Floating accent */}
                <div className="absolute -top-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-terracotta">
                  <Recycle className="h-10 w-10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="hero-gradient text-primary-foreground overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 400 400%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27 opacity=%270.05%27/%3E%3C/svg%3E')]" />
              <CardContent className="relative p-12 md:p-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-terracotta"
                >
                  <Leaf className="h-10 w-10" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="font-serif text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Join hundreds of students already sharing and reusing on campus. 
                  It's free, easy, and good for the planet.
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 btn-glow text-lg px-10"
                >
                  <Link to={user ? '/add-item' : '/register'}>
                    {user ? 'Add Your First Item' : 'Join RecyConnect'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
