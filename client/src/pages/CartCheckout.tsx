
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, X, ArrowLeft, Truck, Shield, CheckCircle, CreditCard, Smartphone } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

const CartCheckout = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Fresh Eucalyptus Leaves',
      variant: '250g',
      price: 79,
      originalPrice: 99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1621605817699-1dbcf8d79f79?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Fresh Curry Leaves',
      variant: '100g',
      price: 49,
      originalPrice: 69,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1630411290234-33c9aa2ba4b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    city: '',
    state: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    toast({
      title: "Cart Updated",
      description: "Item quantity has been updated.",
    });
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!shippingDetails.fullName || !shippingDetails.phone || !shippingDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order Placed Successfully!",
      description: "You will receive a confirmation shortly.",
    });
    setLocation('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eucalyptus-50 to-green-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/shop" className="flex items-center gap-2 text-eucalyptus-600 hover:text-eucalyptus-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Continue Shopping</span>
              </Link>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-playfair">
                {step === 1 ? 'Your Cart' : 'Checkout'}
              </h1>
            </div>
            <Badge className="bg-eucalyptus-600 text-white px-4 py-2">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step >= 1 ? 'bg-eucalyptus-600 text-white' : 'bg-gray-200'} transition-colors`}>
                1
              </div>
              <span className="text-sm font-medium mt-2">Cart Review</span>
            </div>
            <div className={`w-24 h-1 rounded ${step >= 2 ? 'bg-eucalyptus-600' : 'bg-gray-200'} transition-colors`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step >= 2 ? 'bg-eucalyptus-600 text-white' : 'bg-gray-200'} transition-colors`}>
                2
              </div>
              <span className="text-sm font-medium mt-2">Checkout</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Cart Items */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-eucalyptus-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Cart ({cartItems.length} items)</span>
                    {savings > 0 && (
                      <Badge className="bg-green-600 text-white">
                        You're saving ₹{savings}!
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className={`flex items-center gap-6 p-6 ${index < cartItems.length - 1 ? 'border-b' : ''} hover:bg-gray-50 transition-colors`}>
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                        {item.originalPrice > item.price && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1">
                            SAVE ₹{item.originalPrice - item.price}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                        <p className="text-eucalyptus-600 font-medium">{item.variant}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-eucalyptus-600">₹{item.price}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Order Summary */}
            <div>
              <Card className="shadow-xl border-0 sticky top-6">
                <CardHeader className="bg-eucalyptus-50">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Total Savings</span>
                        <span>-₹{savings}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                        {shipping === 0 ? 'Free' : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        💡 Add ₹{499 - subtotal} more for free shipping!
                      </p>
                    )}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span className="text-eucalyptus-600">₹{total}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 bg-eucalyptus-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-eucalyptus-600" />
                        <span>Estimated Delivery: 2–3 working days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-eucalyptus-600" />
                        <span>100% secure packaging</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-eucalyptus-600" />
                        <span>WhatsApp order confirmation</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setStep(2)} 
                      className="w-full h-14 text-lg font-semibold bg-eucalyptus-600 hover:bg-eucalyptus-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      Proceed to Checkout
                      <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-eucalyptus-50">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-base font-medium">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                        placeholder="Enter your full name"
                        className="mt-2 h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-2 h-12"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                      placeholder="your@email.com"
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-base font-medium">Complete Address *</Label>
                    <Textarea
                      id="address"
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                      placeholder="House no., Street, Area, Landmark"
                      className="mt-2"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="pincode" className="text-base font-medium">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={shippingDetails.pincode}
                        onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value})}
                        placeholder="500001"
                        className="mt-2 h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-base font-medium">City *</Label>
                      <Input
                        id="city"
                        value={shippingDetails.city}
                        onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                        placeholder="City"
                        className="mt-2 h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-base font-medium">State *</Label>
                      <Input
                        id="state"
                        value={shippingDetails.state}
                        onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                        placeholder="State"
                        className="mt-2 h-12"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardHeader className="bg-eucalyptus-50">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <label className="flex items-center space-x-4 p-4 border-2 border-eucalyptus-200 rounded-lg cursor-pointer hover:bg-eucalyptus-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-eucalyptus-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Cash on Delivery</span>
                          <Badge className="bg-green-600 text-white">Recommended</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Pay when your order arrives at your doorstep</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-eucalyptus-600"
                        disabled
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          <span className="font-medium">UPI Payment</span>
                          <Badge variant="outline">Coming Soon</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Pay using UPI apps like GPay, PhonePe, Paytm</p>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Order Summary */}
            <div>
              <Card className="shadow-xl border-0 sticky top-6">
                <CardHeader className="bg-eucalyptus-50">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1">{item.name} ({item.variant}) × {item.quantity}</span>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings</span>
                        <span>-₹{savings}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t pt-3">
                      <span>Total</span>
                      <span className="text-eucalyptus-600">₹{total}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-eucalyptus-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-eucalyptus-600" />
                      <span>Delivery: 2–3 working days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-eucalyptus-600" />
                      <span>Secure & fresh packaging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-eucalyptus-600" />
                      <span>WhatsApp order updates</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      onClick={handlePlaceOrder}
                      className="w-full h-14 text-lg font-semibold bg-eucalyptus-600 hover:bg-eucalyptus-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      Place Order
                      <CheckCircle className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="w-full border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-50"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCheckout;
