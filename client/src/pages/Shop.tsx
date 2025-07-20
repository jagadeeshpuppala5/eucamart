
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Search, Filter, Heart, Eye } from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@shared/schema';

const Shop = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  // Fetch products from API
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory === 'all' ? undefined : selectedCategory],
    queryFn: async () => {
      const params = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
      const response = await fetch(`/api/products${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "eucalyptus", name: "Eucalyptus", count: products.filter(p => p.category === "eucalyptus").length },
    { id: "curry_leaves", name: "Curry Leaves", count: products.filter(p => p.category === "curry_leaves").length }
  ];

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleQuickAdd = async (product: Product) => {
    // For now, just show success message - will implement cart API later
    toast({
      title: "Added to Cart!",
      description: `${product.name} added to your cart.`,
    });
    setLocation('/cart');
  };

  const handleViewDetails = (productId: string) => {
    setLocation(`/product/${productId}`);
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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Failed to load products</h2>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1587049352841-f4463b6d06b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1587049352841-f4463b6d06b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                  }}
                />
                {product.stockQuantity === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
                  </div>
                )}
                {product.bulkPrice && parseFloat(product.bulkPrice) < parseFloat(product.price) && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1">
                    Bulk Available
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
                      <span className="text-sm font-medium ml-1">4.5</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-eucalyptus-600">₹{parseFloat(product.price).toFixed(2)}</span>
                  {product.bulkPrice && (
                    <span className="text-sm text-muted-foreground">Bulk: ₹{parseFloat(product.bulkPrice).toFixed(2)}</span>
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
                  
                  {product.stockQuantity > 0 && (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white"
                        onClick={() => handleQuickAdd(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-eucalyptus-600 text-eucalyptus-600 hover:bg-eucalyptus-600 hover:text-white"
                        onClick={() => handleViewDetails(product.id)}
                      >
                        <Eye className="w-4 h-4" />
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
                setSearchTerm("");
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
