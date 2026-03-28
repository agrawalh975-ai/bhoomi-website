import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5]">
      <Header />
      <main className="py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-md mx-auto">
          <div className="bg-white p-8 md:p-12 border border-[rgba(58,51,155,0.2)]">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#3A339B] mb-8 text-center" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              Admin Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#3A339B] font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bhoomigroups.com"
                  required
                  className="border-[#3A339B] focus:ring-[#E67E22]"
                  data-testid="admin-login-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#3A339B] font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-[#3A339B] focus:ring-[#E67E22]"
                  data-testid="admin-login-password"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-medium py-3"
                data-testid="admin-login-submit"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
