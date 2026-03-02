import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      const msg = error.message?.toLowerCase() || '';
      if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
        toast.error('Invalid email or password');
      } else if (msg.includes('email not confirmed')) {
        toast.error('Please verify your email before signing in');
      } else if (msg.includes('fetch') || msg.includes('network')) {
        toast.error('Network error', { description: 'Please check your internet connection or disable browser extensions that may block requests.' });
      } else {
        toast.error('Login failed', { description: error.message });
      }
      setLoading(false);
    } else {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative"
        >
          <Card className="paper-texture border-border/50 shadow-card">
            <CardHeader className="text-center pb-2">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"
              >
                <Recycle className="h-8 w-8" />
              </motion.div>
              <CardTitle className="font-display text-2xl">Welcome Back</CardTitle>
              <CardDescription className="font-serif">
                Sign in to continue sharing and reusing
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-display text-sm">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@campus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 font-serif"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-display text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 font-serif"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
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
                  Sign In
                </Button>

                <p className="text-center font-serif text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-secondary hover:underline">
                    Create one
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
