
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocation } from 'wouter';

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [location, setLocation] = useLocation();

  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      setIsOtpSent(true);
      // Simulate OTP sending
      console.log('OTP sent to:', phoneNumber);
    }
  };

  const handleOtpLogin = () => {
    if (otp.length >= 4) {
      console.log('OTP verified, logging in');
      setLocation('/dashboard');
    }
  };

  const handleEmailLogin = () => {
    if (email && password) {
      console.log('Email login:', email);
      setLocation('/dashboard');
    }
  };

  const handleSignup = () => {
    if (fullName && phoneNumber && agreeToTerms) {
      console.log('Signing up:', fullName);
      setLocation('/dashboard');
    }
  };

  const handleGuestCheckout = () => {
    console.log('Continuing as guest');
    setLocation('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eucalyptus-50 to-green-50 dark:from-eucalyptus-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to EucaMart</h1>
          <p className="text-muted-foreground">Freshness Starts Here 🌿</p>
        </div>

        <Card className="shadow-xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Choose your preferred login method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mobile + OTP Login */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  {!isOtpSent ? (
                    <Button 
                      onClick={handleSendOtp} 
                      className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700"
                      disabled={phoneNumber.length < 10}
                    >
                      📱 Send OTP
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                        />
                      </div>
                      <Button 
                        onClick={handleOtpLogin} 
                        className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700"
                        disabled={otp.length < 4}
                      >
                        ✅ Verify & Login
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setIsOtpSent(false)}
                        className="w-full"
                      >
                        Change Number
                      </Button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Email + Password Login */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-right">
                    <a href="#" className="text-sm text-eucalyptus-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Button 
                    onClick={handleEmailLogin} 
                    variant="outline" 
                    className="w-full"
                    disabled={!email || !password}
                  >
                    Login with Email
                  </Button>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join EucaMart family today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="signupPhone">Phone Number</Label>
                  <Input
                    id="signupPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="signupEmail">Email Address (Optional)</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to Terms & Privacy Policy
                  </Label>
                </div>
                <Button 
                  onClick={handleSignup} 
                  className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700"
                  disabled={!fullName || !phoneNumber || !agreeToTerms}
                >
                  🌿 Create Account
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>

          <div className="p-6 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button 
              onClick={handleGuestCheckout} 
              variant="ghost" 
              className="w-full mt-4"
            >
              Continue as Guest
            </Button>
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            🔒 SSL Secure • No Spam • Trusted by 10,000+ customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
