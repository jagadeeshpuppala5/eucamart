import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Gift } from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');

  // Mock cart items - will be replaced with real data from API
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Fresh Eucalyptus Leaves',
      price: 59.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1616486430532-eaad679f5d62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'Eucalyptus',
      unit: 'bunch'
    },
    {
      id: '2',
      name: 'Fresh Curry Leaves',
      price: 49.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1553909212-4c9d5a6e6f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'Curry Leaves',
      unit: 'bunch'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Proceeding to Checkout",
      description: "Taking you to secure payment...",
    });
    setLocation('/checkout');
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      toast({
        title: "Promo Code Applied!",
        description: "You saved ₹50 with code WELCOME10",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
    setPromoCode('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation('/shop')} 
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-eucalyptus-100 dark:bg-eucalyptus-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-eucalyptus-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Your cart is empty</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Add some fresh eucalyptus and curry leaves to get started!
            </p>
            <Button
              onClick={() => setLocation('/shop')}
              className="bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white px-8 py-3"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1587049352841-f4463b6d06b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg truncate">
                              {item.name}
                            </h3>
                            <Badge variant="secondary" className="mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 h-8"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="px-3 py-1 min-w-[40px] text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 h-8"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-eucalyptus-600">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ₹{item.price.toFixed(2)} per {item.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      variant="outline"
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Try "WELCOME10" for new customers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingFee === 0 ? "text-green-600" : ""}>
                      {shippingFee === 0 ? 'Free' : `₹${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {subtotal < 500 && (
                    <div className="text-xs text-muted-foreground bg-eucalyptus-50 dark:bg-eucalyptus-900/20 p-3 rounded-lg">
                      Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-eucalyptus-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white h-12 text-lg"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-center text-xs text-muted-foreground">
                    <p>Secure checkout powered by Stripe</p>
                    <p className="mt-1">Free returns within 7 days</p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Signals */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Why shop with us?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-eucalyptus-600 rounded-full"></div>
                      <span>100% organic and chemical-free</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-eucalyptus-600 rounded-full"></div>
                      <span>Fresh delivery within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-eucalyptus-600 rounded-full"></div>
                      <span>Secure payment & data protection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Eucalyptus Powder',
                  price: 89,
                  image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                },
                {
                  name: 'Curry Leaves Powder',
                  price: 79,
                  image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              ].map((product, index) => (
                <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-eucalyptus-600">
                        ₹{product.price}
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-eucalyptus-600 hover:bg-eucalyptus-700"
                        onClick={() => {
                          toast({
                            title: "Added to Cart!",
                            description: `${product.name} added to your cart.`,
                          });
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;