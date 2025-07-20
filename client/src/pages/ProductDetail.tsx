import React, { useState } from 'react';
import { useParams } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Star, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@shared/schema';

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error('Product not found');
      return response.json();
    },
    enabled: !!productId
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    setLocation('/cart');
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    toast({
      title: "Redirecting to Checkout",
      description: "Taking you to secure checkout...",
    });
    setLocation('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-spin w-8 h-8 border-4 border-eucalyptus-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => setLocation('/shop')} className="bg-eucalyptus-600 hover:bg-eucalyptus-700">
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1587049352841-f4463b6d06b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" onClick={() => setLocation('/shop')} className="p-0 h-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1587049352841-f4463b6d06b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-eucalyptus-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-eucalyptus-600 text-white">
                {product.category.replace('_', ' ').toUpperCase()}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-medium">4.8</span>
                </div>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
                <span className="text-sm text-eucalyptus-600 font-medium">
                  {product.stockQuantity} in stock
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-eucalyptus-600">
                  ₹{parseFloat(product.price).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">per {product.unit}</span>
              </div>
              
              {product.bulkPrice && product.minBulkQuantity && (
                <div className="p-4 bg-eucalyptus-50 dark:bg-eucalyptus-900/20 rounded-lg">
                  <p className="text-sm font-medium text-eucalyptus-700 dark:text-eucalyptus-300">
                    Bulk Price: ₹{parseFloat(product.bulkPrice).toFixed(2)} per {product.unit}
                  </p>
                  <p className="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">
                    Minimum order: {product.minBulkQuantity} {product.unit}s
                  </p>
                </div>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockQuantity} available
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white h-12"
                  disabled={product.stockQuantity === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="flex-1 border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white h-12"
                  disabled={product.stockQuantity === 0}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-eucalyptus-600" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-eucalyptus-600" />
                <div>
                  <p className="font-medium text-sm">Quality Guarantee</p>
                  <p className="text-xs text-muted-foreground">100% organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Product Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <p className="leading-relaxed">
                      Our {product.name.toLowerCase()} is carefully sourced from certified organic farms, 
                      ensuring the highest quality and purity. Each batch is tested for quality and 
                      freshness before packaging.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Health Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-eucalyptus-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold">Natural Wellness</h4>
                          <p className="text-sm text-muted-foreground">
                            Rich in natural compounds that support overall health and wellness.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-eucalyptus-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold">Aromatherapy</h4>
                          <p className="text-sm text-muted-foreground">
                            Perfect for steam therapy and aromatherapy applications.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-eucalyptus-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold">Culinary Uses</h4>
                          <p className="text-sm text-muted-foreground">
                            Adds authentic flavor and nutritional value to your cooking.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-eucalyptus-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold">Chemical-Free</h4>
                          <p className="text-sm text-muted-foreground">
                            100% organic and free from harmful chemicals and pesticides.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                  <div className="space-y-6">
                    {/* Sample reviews - will be replaced with real reviews from API later */}
                    <div className="border-b pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-eucalyptus-600 rounded-full flex items-center justify-center text-white font-semibold">
                          R
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">Rajesh Kumar</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            Excellent quality! The leaves are fresh and aromatic. Perfect for my daily wellness routine.
                          </p>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-eucalyptus-600 rounded-full flex items-center justify-center text-white font-semibold">
                          P
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">Priya Sharma</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            Great for cooking! The authentic flavor really enhances my dishes. Fast delivery too.
                          </p>
                          <span className="text-xs text-muted-foreground">1 month ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;