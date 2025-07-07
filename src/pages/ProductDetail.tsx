
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock product data (in real app, this would come from API)
const productData = {
  1: {
    id: 1,
    name: "Fresh Eucalyptus Leaves",
    category: "Eucalyptus Leaves",
    price: 59,
    originalPrice: 79,
    images: [
      "https://thepamperedglider.com/wp-content/uploads/2020/12/fresh-leaves.jpg",
"https://img.freepik.com/premium-photo/isolated-desert-willow-leaf-with-long-leaf-shape-green-color-obje-clean-background-clipart_655090-2174502.jpg",    
"https://img.freepik.com/fotos-premium/foto-fondo-blanco-realista-hoja-artemisa-generada-inteligencia-artificial_893986-929.jpg?w=2000"    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 50,
    weights: [
      { weight: "100g", price: 59 },
      { weight: "250g", price: 129 },
      { weight: "500g", price: 239 }
    ],
    description: "Fresh eucalyptus leaves, naturally harvested from certified organic farms. Perfect for steam inhalation, aromatherapy, and traditional wellness practices.",
    benefits: [
      "100% Natural & Chemical-Free",
      "Rich in Essential Oils",
      "Perfect for Steam Therapy",
      "Ayurvedic Grade Quality",
      "Sustainably Harvested"
    ],
    usage: [
      "Add 5-10 leaves to hot water for steam inhalation",
      "Use in aromatherapy diffusers",
      "Create herbal tea blends",
      "Natural room freshener"
    ]
  },
  2: {
    id: 2,
    name: "Eucalyptus Powder",
    category: "Eucalyptus Powder",
    price: 89,
    originalPrice: 109,
    images: [
    "https://5.imimg.com/data5/SELLER/Default/2024/12/469795711/KI/GC/ZP/24380279/nilgiri-leaves-eucalyptus-powder-500x500.jpg",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 30,
    weights: [
      { weight: "200g", price: 89 },
      { weight: "500g", price: 199 },
      { weight: "1kg", price: 379 }
    ],
    description: "Premium eucalyptus powder for Ayurvedic use and traditional wellness practices.",
    benefits: [
      "Finely Ground Quality",
      "Perfect for Ayurvedic Preparations",
      "Long Shelf Life",
      "Natural Aromatherapy Use"
    ],
    usage: [
      "Mix with water for face masks",
      "Use in herbal preparations",
      "Add to bath water for aromatherapy"
    ]
  },
  3: {
    id: 3,
    name: "Fresh Curry Leaves",
    category: "Curry Leaves",
    price: 49,
    originalPrice: 69,
    images: [
      "https://cdn.shopify.com/s/files/1/0631/1084/0571/files/fresh-curry-leaves_480x480.jpg?v=1658723466",
    ],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    stockCount: 75,
    weights: [
      { weight: "100g", price: 49 },
      { weight: "250g", price: 99 },
      { weight: "500g", price: 179 }
    ],
    description: "Aromatic curry leaves for authentic Indian cooking, freshly picked and delivered.",
    benefits: [
      "Fresh & Aromatic",
      "Rich in Antioxidants",
      "Perfect for Indian Cuisine",
      "Natural Hair Care Benefits"
    ],
    usage: [
      "Tempering for dal and curries",
      "Grinding for chutneys",
      "Natural hair oil preparation"
    ]
  }
};

const relatedProducts = [
  {
    id: 2,
    name: "Eucalyptus Powder",
    price: 89,
    image:"https://5.imimg.com/data5/SELLER/Default/2024/12/469795711/KI/GC/ZP/24380279/nilgiri-leaves-eucalyptus-powder-500x500.jpg",
    rating: 4.6
  },
  {
    id: 3,
    name: "Fresh Curry Leaves",
    price: 49,
    image:"https://cdn.shopify.com/s/files/1/0631/1084/0571/files/fresh-curry-leaves_480x480.jpg?v=1658723466",
    rating: 4.9
  },
  {
    id: 5,
    name: "Organic Eucalyptus Bundle",
    price: 129,
    image:"https://www.stevensandson.com/wp-content/uploads/2018/10/Eucalyptus-Willow-Side-Photo-Credit-Allison-Linder-1024x683.jpg",
    // image: "https://images.unsplash.com/photo-1616486430532-eaad679f5d62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8
  }
];

const reviews = [
  {
    id: 1,
    user: "Priya S.",
    rating: 5,
    date: "2 days ago",
    text: "Excellent quality eucalyptus leaves! Very fresh and aromatic. Perfect for my daily steam therapy routine."
  },
  {
    id: 2,
    user: "Rajesh M.",
    rating: 4,
    date: "1 week ago",
    text: "Good product, fast delivery. The leaves stayed fresh for a week. Will order again."
  },
  {
    id: 3,
    user: "Anita K.",
    rating: 5,
    date: "2 weeks ago",
    text: "Amazing quality! Used for my spa business and customers love the natural aroma."
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const product = productData[Number(id) as keyof typeof productData];
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPrice = selectedWeight 
    ? product.weights.find(w => w.weight === selectedWeight)?.price || product.price
    : product.price;

  const handleAddToCart = () => {
    if (!selectedWeight) {
      toast({
        title: "Please select a weight",
        description: "Choose a weight option before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to Cart!",
      description: `${product.name} (${selectedWeight}) × ${quantity} added to your cart.`,
    });

    // Navigate to cart page
    navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!selectedWeight) {
      toast({
        title: "Please select a weight",
        description: "Choose a weight option before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to checkout
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6 text-eucalyptus-600 hover:text-eucalyptus-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-eucalyptus-600' 
                      : 'border-gray-200 hover:border-eucalyptus-300'
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-eucalyptus-600">₹{currentPrice}</span>
              {product.originalPrice > currentPrice && (
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice > currentPrice && (
                <Badge className="bg-red-500">
                  {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-lg">{product.description}</p>

            {/* Weight Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Weight:</label>
              <Select value={selectedWeight} onValueChange={setSelectedWeight}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose weight" />
                </SelectTrigger>
                <SelectContent>
                  {product.weights.map(option => (
                    <SelectItem key={option.weight} value={option.weight}>
                      {option.weight} - ₹{option.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.stockCount} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-eucalyptus-600 hover:bg-eucalyptus-700"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="flex-1 border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-eucalyptus-50 dark:bg-eucalyptus-900/20 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-eucalyptus-600" />
                <span>Free delivery within 2-3 business days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-eucalyptus-600" />
                <span>100% Fresh & Natural guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="benefits" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="benefits">Benefits & Usage</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="benefits" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-eucalyptus-600 rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>How to Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {product.usage.map((use, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-eucalyptus-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          {use}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="space-y-4">
                  {reviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Delivery Timeline</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Metro cities: 1-2 business days</li>
                        <li>• Other cities: 2-3 business days</li>
                        <li>• Remote areas: 3-5 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Policy</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Free shipping on orders above ₹500</li>
                        <li>• Eco-friendly packaging</li>
                        <li>• Real-time tracking available</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Card
                key={relatedProduct.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-eucalyptus-600">₹{relatedProduct.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
