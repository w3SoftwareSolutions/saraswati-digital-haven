import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, ArrowLeft, GraduationCap } from 'lucide-react';

const Auth = () => {
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  // Redirect if already authenticated
  if (user && !authLoading) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(signInForm.email, signInForm.password);
    
    if (!error) {
      // Navigation will happen automatically via auth state change
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      return;
    }
    
    setLoading(true);
    
    const { error } = await signUp(
      signUpForm.email, 
      signUpForm.password, 
      signUpForm.fullName
    );
    
    if (!error) {
      // Reset form on success
      setSignUpForm({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
      });
    }
    
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-subtle-gradient">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-subtle-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to School</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">School Portal</h1>
                <p className="text-xs text-muted-foreground">Admin Access</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-padding">
        <div className="container-custom max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-hero text-gradient mb-4">Welcome</h2>
            <p className="text-subtitle">Sign in to access the admin dashboard</p>
          </div>

          <Card className="card-elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={signInForm.email}
                        onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={signInForm.password}
                        onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-hero"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signUpForm.fullName}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signUpForm.email}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Create a password"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>

                    {signUpForm.password !== signUpForm.confirmPassword && signUpForm.confirmPassword && (
                      <p className="text-sm text-destructive">Passwords do not match</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full btn-hero"
                      disabled={loading || signUpForm.password !== signUpForm.confirmPassword}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Need help? Contact your system administrator.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;