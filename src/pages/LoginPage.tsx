
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Mail, Lock, User, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loginRole, setLoginRole] = useState<'user' | 'admin'>('user');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: loginRole === 'admin' ? 'admin@example.com' : 'user@example.com',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link to="/" className="flex justify-center mb-4">
            <span className="text-teal-700 dark:text-teal-400 font-heading font-bold text-2xl">
              DwellDynamo
            </span>
          </Link>
          <CardTitle className="text-2xl font-heading text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="user" onValueChange={(value) => setLoginRole(value as 'user' | 'admin')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                User
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                Sign in as a regular user to browse properties, save favorites, and send messages.
              </div>
            </TabsContent>
            <TabsContent value="admin">
              <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                Sign in as an administrator to manage properties, users, and system settings.
              </div>
            </TabsContent>
          </Tabs>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                placeholder={loginRole === 'admin' ? 'admin@example.com' : 'user@example.com'}
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Button variant="link" className="px-0 h-auto" asChild>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full flex items-center gap-2" disabled={isLoading}>
              <LogIn className="h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <div className="text-xs text-center text-muted-foreground">
              <p>Test admin account: admin@example.com / password123</p>
              <p>Test user account: user@example.com / password123</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{' '}
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
          <div className="text-center">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
