
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Search, Filter, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Enhanced product data with high-quality images and complete information
const products = [
  {
    id: 1,
    name: "Fresh Eucalyptus Leaves",
    category: "eucalyptus-leaves",
    price: 59,
    originalPrice: 79,
    image:"https://thepamperedglider.com/wp-content/uploads/2020/12/fresh-leaves.jpg",
    hoverImage: "https://images.unsplash.com/photo-1616486430532-eaad679f5d62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    weights: ["100g", "250g", "500g"],
    description: "Premium eucalyptus leaves, naturally harvested and chemical-free. Perfect for aromatherapy, steam therapy, and wellness rituals."
  },
  {
    id: 2,
    name: "Eucalyptus Powder",
    category: "eucalyptus-powder",
    price: 89,
    originalPrice: 109,
    image:"https://5.imimg.com/data5/SELLER/Default/2024/12/469795711/KI/GC/ZP/24380279/nilgiri-leaves-eucalyptus-powder-500x500.jpg",
    hoverImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    weights: ["200g", "500g", "1kg"],
    description: "Finely ground eucalyptus powder for Ayurvedic preparations and natural wellness applications."
  },
  {
    id: 3,
    name: "Fresh Curry Leaves",
    category: "curry-leaves",
    price: 49,
    originalPrice: 69,
    image:"https://cdn.shopify.com/s/files/1/0631/1084/0571/files/fresh-curry-leaves_480x480.jpg?v=1658723466",
    hoverImage: "https://images.unsplash.com/photo-1553909212-4c9d5a6e6f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    weights: ["100g", "250g", "500g"],
    description: "Fresh, aromatic curry leaves picked from organic farms. Essential for authentic Indian cooking and traditional remedies."
  },
  {
    id: 4,
    name: "Curry Leaves Powder",
    category: "curry-powder",
    price: 79,
    originalPrice: 99,
    image:"https://tiimg.tistatic.com/fp/1/008/219/fresh-blended-extremely-aromatic-curry-leaves-powder-158.jpg",
    hoverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    weights: ["200g", "500g", "1kg"],
    description: "Premium curry leaves powder with concentrated flavor and nutrients. Perfect for seasoning and health benefits."
  }
];

const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "eucalyptus-leaves", name: "Eucalyptus Leaves", count: products.filter(p => p.category === "eucalyptus-leaves").length },
  { id: "eucalyptus-powder", name: "Eucalyptus Powder", count: products.filter(p => p.category === "eucalyptus-powder").length },
  { id: "curry-leaves", name: "Curry Leaves", count: products.filter(p => p.category === "curry-leaves").length },
  { id: "curry-powder", name: "Curry Powder", count: products.filter(p => p.category === "curry-powder").length }
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.reviews - a.reviews; // popularity
      }
    });

  const handleQuickAdd = (product: any, weight: string) => {
    toast({
      title: "Added to Cart!",
      description: `${product.name} (${weight}) added to your cart.`,
    });
    // Navigate to cart page
    navigate('/cart');
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-eucalyptus-50 via-green-50 to-eucalyptus-100 dark:from-eucalyptus-900/20 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-eucalyptus-600 text-white px-4 py-2 text-lg">
              Premium Collection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-playfair">
              Shop Our Leaves & Powders
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover our premium collection of fresh eucalyptus and curry leaves, 
              naturally harvested and delivered to your door with love and care.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-eucalyptus-600 rounded-full"></div>
                <span>Free shipping on orders above ₹500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-eucalyptus-600 rounded-full"></div>
                <span>100% organic & chemical-free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Filters and Search */}
        <div className="mb-12 space-y-8">
          {/* Category Tabs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white shadow-lg" 
                      : "border-eucalyptus-200 text-eucalyptus-600 hover:bg-eucalyptus-50 hover:border-eucalyptus-300"
                  } transition-all duration-200`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-white/20">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-xl shadow-sm border">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for eucalyptus, curry leaves, powders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-gray-200 focus:border-eucalyptus-600"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Sort by:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 border-gray-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={hoveredProduct === product.id && product.hoverImage ? product.hoverImage : product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1587049352841-f4463b6d06b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                  }}
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
                  </div>
                )}
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-eucalyptus-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-eucalyptus-600">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={() => handleViewDetails(product.id)}
                    variant="outline"
                    className="w-full border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white transition-all duration-200"
                  >
                    View Details
                  </Button>
                  
                  {product.inStock && (
                    <div className="flex gap-2">
                      <Select onValueChange={(weight) => handleQuickAdd(product, weight)}>
                        <SelectTrigger className="flex-1 border-eucalyptus-200">
                          <SelectValue placeholder="Quick Add" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.weights.map(weight => (
                            <SelectItem key={weight} value={weight}>
                              Add {weight} to Cart
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="icon"
                        className="bg-eucalyptus-600 hover:bg-eucalyptus-700 shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => handleQuickAdd(product, product.weights[0])}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-eucalyptus-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-eucalyptus-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No Products Found</h3>
            <p className="text-xl text-muted-foreground mb-8">
              We couldn't find any products matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white px-8 py-3"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Trust Section */}
        <section className="mt-20 bg-eucalyptus-50 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Why Shop with EucaMart?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-eucalyptus-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-semibold">100% Organic</h4>
              <p className="text-muted-foreground">Chemical-free, naturally grown</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-eucalyptus-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="font-semibold">Fast Delivery</h4>
              <p className="text-muted-foreground">Fresh leaves within 24-48 hours</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-eucalyptus-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💚</span>
              </div>
              <h4 className="font-semibold">Quality Assured</h4>
              <p className="text-muted-foreground">Lab tested for purity</p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
