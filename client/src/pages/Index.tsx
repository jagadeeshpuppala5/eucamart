
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Leaf, Users, Globe, Truck, Heart, CheckCircle, ArrowRight, Play, ChevronDown, Mail, MapPin } from 'lucide-react';
import { useLocation } from 'wouter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from 'recharts';

const Index = () => {
  const [location, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };
    const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Announcement Bar */}
      <div className="bg-eucalyptus-600 text-white text-center py-2 px-4 text-sm">
        🎁 Free Shipping on ₹999+ | Use code FIRST10 to save 10% | 
        <button onClick={() => setLocation('/shop')} className="ml-2 underline hover:no-underline">
          Shop Now
        </button>
      </div>
      
      {/* Enhanced Hero Section */}
      <section 
        className="relative pt-20 pb-16 min-h-screen flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
          //  backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.pexels.com/photos/832521/pexels-photo-832521.jpeg')"

        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-eucalyptus-900/60 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    
    {/* Text Section */}
    <div className="max-w-3xl">
      <Badge className="mb-6 bg-eucalyptus-600/90 text-white text-lg py-2 px-4">
        <Leaf className="w-5 h-5 mr-2" />
        100% Natural & Organic
      </Badge>
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in font-playfair">
        Nature's Freshest Leaves
        <span className="text-eucalyptus-300 block">Delivered Daily</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in">
        Fresh curry and eucalyptus leaves harvested from organic farms across India, 
        delivered straight to your kitchen and wellness space.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
        <Button 
          size="lg"
          onClick={() => setLocation('/shop')}
          className="bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Shop Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button 
          size="lg"
          variant="outline"
          onClick={() => setLocation('/bulk-orders')}
          className="border-2 border-white text-black hover:bg-white hover:text-eucalyptus-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
        >
          Bulk Orders
          <Globe className="ml-2 w-5 h-5" />
        </Button>
      </div>
      <div className="flex items-center gap-6 mt-8 text-white/90">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-eucalyptus-400 border-2 border-white"></div>
            ))}
          </div>
          <span className="text-sm">500+ Happy Customers</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">4.9/5</span>
          <span className="text-sm">(150+ Reviews)</span>
        </div>
      </div>
    </div>

    {/* Image Section */}
    <div className="relative lg:h-[600px] h-[400px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {/* Main Eucalyptus Image */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
        <img
          src="/images/Euca_Leaves_full.png"
          alt="Fresh eucalyptus leaves"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-eucalyptus-900/20 to-transparent"></div>
      </div>

      {/* Curry Leaves Image */}
      <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-gray-800">
        <img
          src="/images/Curry_Leaves_full.png"
          alt="Fresh curry leaves"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-eucalyptus-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 left-1/6 w-2 h-2 bg-eucalyptus-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>

  </div>
</div>

      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Truck className="w-10 h-10 text-eucalyptus-600 mx-auto" />
              <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Within 24-48 hours</p>
            </div>
            <div className="space-y-2">
              <Leaf className="w-10 h-10 text-eucalyptus-600 mx-auto" />
              <h3 className="font-semibold text-gray-900">100% Organic</h3>
              <p className="text-sm text-muted-foreground">Chemical-free farming</p>
            </div>
            <div className="space-y-2">
              <CheckCircle className="w-10 h-10 text-eucalyptus-600 mx-auto" />
              <h3 className="font-semibold text-gray-900">FSSAI Certified</h3>
              <p className="text-sm text-muted-foreground">Lab tested & certified</p>
            </div>
            <div className="space-y-2">
              <Globe className="w-10 h-10 text-eucalyptus-600 mx-auto" />
              <h3 className="font-semibold text-gray-900">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Visa, UPI, Mastercard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-eucalyptus-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-eucalyptus-600">Featured Products</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4 font-playfair">
              Fresh from Farm to Your Door
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our premium collection of fresh leaves and powders, 
              harvested with care and delivered with love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                name: "Fresh Eucalyptus Leaves",
                price: "₹59",
                originalPrice: "₹79",
               image:"https://thepamperedglider.com/wp-content/uploads/2020/12/fresh-leaves.jpg",
                // image: "https://images.unsplash.com/photo-1621605817699-1dbcf8d79f79?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                badge: "Bestseller",
                id: 1
              },
              {
                name: "Eucalyptus Powder",
                price: "₹89",
                originalPrice: "₹109",
                image:"https://5.imimg.com/data5/SELLER/Default/2024/12/469795711/KI/GC/ZP/24380279/nilgiri-leaves-eucalyptus-powder-500x500.jpg",
                // image: "https://images.unsplash.com/photo-1609501676725-7186f933f6ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                badge: "Premium",
                id: 2
              },
              {
                name: "Fresh Curry Leaves",
                price: "₹49",
                originalPrice: "₹69",
               image:"https://cdn.shopify.com/s/files/1/0631/1084/0571/files/fresh-curry-leaves_480x480.jpg?v=1658723466",
                // image: "https://images.unsplash.com/photo-1630411290234-33c9aa2ba4b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                badge: "Popular",
                id: 3
              },
              {
                name: "Curry Leaves Powder",
                price: "₹79",
                originalPrice: "₹99",
                image:"https://tiimg.tistatic.com/fp/1/008/219/fresh-blended-extremely-aromatic-curry-leaves-powder-158.jpg",
                // image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                badge: "New",
                id: 4
              }
            ].map((product, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-eucalyptus-600">
                    {product.badge}
                  </Badge>
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      SAVE ₹{parseInt(product.originalPrice.slice(1)) - parseInt(product.price.slice(1))}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-eucalyptus-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <Button className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/shop')}
              className="bg-eucalyptus-600 hover:bg-eucalyptus-700 px-8 py-4 text-lg"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-playfair">
              Why Choose EucaMart?
            </h2>
            <p className="text-xl text-muted-foreground">
              More than just leaves – we're your wellness partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Farm to Doorstep",
                description: "Direct sourcing from certified organic farms ensures maximum freshness and potency in every leaf."
              },
              {
                icon: Heart,
                title: "Wellness Focused",
                description: "Every product is selected for its therapeutic benefits and traditional healing properties."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Supporting local farmers and sustainable practices while serving your wellness needs."
              }
            ].map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-shadow border-0 bg-eucalyptus-50/50">
                <service.icon className="w-16 h-16 text-eucalyptus-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
          {/* Who Uses Our Leaves Section */}
      <section id="who-uses" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Who Uses Our Leaves? 🌿</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From healing rituals to global wellness — our eucalyptus and curry leaves serve every purpose with purity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Ayurvedic Practitioners */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
              <div className="relative overflow-hidden">
                <img
                src="/images/Ayurveda-Wallpapers.png"
                //  src="/images/Ayurvedic.png"
                  alt="Ayurvedic Practitioners"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">🧘‍♂️ Ayurvedic Practitioners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Used in traditional medicine for:
                </CardDescription>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Respiratory relief (steam inhalation)</li>
                  <li>• Immunity boosters & detoxification</li>
                  <li>• Oil infusions and herbal decoctions</li>
                </ul>
                <blockquote className="bg-eucalyptus-50 dark:bg-eucalyptus-900/20 p-3 rounded-lg border-l-4 border-eucalyptus-600">
                  <p className="italic text-sm text-muted-foreground">
                    "Freshness ensures the potency of every ayurvedic preparation."
                  </p>
                  <footer className="text-xs font-medium text-eucalyptus-700 dark:text-eucalyptus-300 mt-1">
                    – Dr. Savita Joshi, Herbalist
                  </footer>
                </blockquote>
              </CardContent>
            </Card>

            {/* Wedding & Event Planners */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="relative overflow-hidden">
                <img
                 src="\images\Wedding_Event _Planners.png"
                  alt="Wedding & Event Planners"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">💒 Wedding & Event Planners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  For authentic celebrations:
                </CardDescription>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Mandap and pooja decoration</li>
                  <li>• Banana leaf rituals</li>
                  <li>• Entryways, thalis, and stage dressing</li>
                </ul>
                <blockquote className="bg-eucalyptus-50 dark:bg-eucalyptus-900/20 p-3 rounded-lg border-l-4 border-eucalyptus-600">
                  <p className="italic text-sm text-muted-foreground">
                    "No wedding feels divine without the smell of fresh leaves."
                  </p>
                  <footer className="text-xs font-medium text-eucalyptus-700 dark:text-eucalyptus-300 mt-1">
                    – Prashanth Events, Hyderabad
                  </footer>
                </blockquote>
              </CardContent>
            </Card>

            {/* Spa & Wellness Centers */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden">
                <img
                 src="\images\Spa_Wellness_Centers.png"
                  alt="Spa & Wellness Centers"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">🧖‍♀️ Spa & Wellness Centers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Ideal for:
                </CardDescription>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Steam therapy & detox rooms</li>
                  <li>• Massage & oil infusions</li>
                  <li>• Leaf wraps and herbal facials</li>
                </ul>
                <blockquote className="bg-eucalyptus-50 dark:bg-eucalyptus-900/20 p-3 rounded-lg border-l-4 border-eucalyptus-600">
                  <p className="italic text-sm text-muted-foreground">
                    "Fresh leaves add both aroma and authenticity to luxury."
                  </p>
                  <footer className="text-xs font-medium text-eucalyptus-700 dark:text-eucalyptus-300 mt-1">
                    – Nirvana Spa Group
                  </footer>
                </blockquote>
              </CardContent>
            </Card>

            {/* Global Bulk Buyers */}
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative overflow-hidden">
                <img
                 src="\images\Global_Bulk_Buyers.png"
                  alt="Global Bulk Buyers"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">🌎 Global Bulk Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  We ship worldwide for:
                </CardDescription>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Ayurvedic centers</li>
                  <li>• Retail packaging</li>
                  <li>• Bulk dried or fresh exports</li>
                </ul>
                <a
                  href="https://wa.me/919014358988?text=I'm+interested+in+bulk+leaf+order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Get a Bulk Quote on WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Section Footer CTA */}
          <div className="text-center mt-16">
            <a
              href="https://wa.me/919014358988?text=I'm+interested+in+bulk+leaf+order"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-eucalyptus-600 to-eucalyptus-700 hover:from-eucalyptus-700 hover:to-eucalyptus-800 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                🌍 Start a Bulk Order Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-eucalyptus-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-playfair">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who trust EucaMart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Ayurveda Practitioner",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                text: "The quality of eucalyptus leaves is exceptional. My patients love the natural aroma and therapeutic benefits.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Chef & Restaurant Owner",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                text: "Fresh curry leaves delivered on time, every time. The flavor is incredible and my dishes taste authentic.",
                rating: 5
              },
              {
                name: "Anita Desai",
                role: "Wellness Coach",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                text: "EucaMart has become my go-to source for all herbal needs. Quality, freshness, and service are unmatched.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-0 bg-white">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-eucalyptus-600">Our Story</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-playfair">
                Bringing Nature's Healing Power to Your Home
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                EucaMart brings you farm-fresh curry and eucalyptus leaves directly from Indian farms. 
                With a focus on organic living and wellness, we ensure quality, sustainability, and purity in every product.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-eucalyptus-600" />
                  <span>Direct partnerships with 50+ organic farms</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-eucalyptus-600" />
                  <span>Chemical-free, traditional farming methods</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-eucalyptus-600" />
                  <span>Lab-tested quality assurance</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
              src="/images/nature.png"
                alt="Organic farming"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="text-2xl font-bold text-eucalyptus-600">5000+</div>
                <div className="text-sm text-muted-foreground">Orders Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-eucalyptus-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate experts dedicated to quality
            </p>
          </div>

          {/* Founder Card */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-eucalyptus-50 to-green-50 dark:from-eucalyptus-900 dark:to-eucalyptus-800 animate-fade-in">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/22.jpg"
                      alt="Anilkumar Mutineni"
                      className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-eucalyptus-600 shadow-lg"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Anilkumar Mutineni</h3>
                      <p className="text-eucalyptus-600 font-semibold">Founder & Chief Visionary Officer</p>
                    </div>
                    <blockquote className="text-lg italic text-muted-foreground">
                      "I started EucaMart to bring nature's healing and purity into every Indian household. This brand is rooted in sustainability, simplicity, and trust."
                    </blockquote>
                    <Button className="bg-eucalyptus-600 hover:bg-eucalyptus-700">
                      Connect with Anilkumar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
              <CardContent className="p-6 text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/55.jpg"
                  alt="Anurada"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-eucalyptus-600"
                />
                <h3 className="text-xl font-bold mb-2">Anurada</h3>
                <p className="text-eucalyptus-600 font-semibold mb-2">Director of Operations</p>
                <p className="text-muted-foreground italic">"Packaging & logistics with purpose."</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/35.jpg"
                  alt="Anil .V"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-eucalyptus-600"
                />
                <h3 className="text-xl font-bold mb-2">Anil .V</h3>
                <p className="text-eucalyptus-600 font-semibold mb-2">Head of Farm Relations</p>
                <p className="text-muted-foreground italic">"Farmers are our soul."</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/25.jpg"
                  alt="Meena S"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-eucalyptus-600"
                />
                <h3 className="text-xl font-bold mb-2">Meena S</h3>
                <p className="text-eucalyptus-600 font-semibold mb-2">Customer Experience Lead</p>
                <p className="text-muted-foreground italic">"Designing joy in every order."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-playfair">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about EucaMart
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-eucalyptus-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                How fresh are your leaves when delivered?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                Our leaves are harvested fresh and dispatched within 24 hours. We work directly with certified organic farms to ensure maximum freshness and potency in every delivery.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-eucalyptus-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Do you deliver nationwide?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                Yes, we deliver across India within 24-48 hours. We also offer international shipping to select countries. Check our shipping policy for more details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-eucalyptus-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Are your products 100% organic?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                Absolutely! All our products are sourced from certified organic farms using traditional, chemical-free farming methods. Each batch is lab-tested for quality assurance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-eucalyptus-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What's your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                We offer a 100% satisfaction guarantee. If you're not completely satisfied with your order, contact us within 48 hours of delivery for a full refund or replacement.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border border-eucalyptus-200 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I place bulk orders for my business?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                Yes! We offer special pricing for bulk orders. Visit our Bulk Orders page or contact us directly for customized quotes and wholesale pricing for restaurants, spas, and wellness centers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-eucalyptus-50">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Let's Grow Together 🍃</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a customer, partner, or nature enthusiast — we're just a message away.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <a
                  href="https://wa.me/919014358988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    {/* <div className="text-3xl">📱</div> */}
 <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    className="w-8 h-8"
  />

                    <div>
                      <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                      <p className="opacity-90">Instant support and quick responses</p>
                    </div>
                  </div>
                </a>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-8 h-8 text-eucalyptus-600" />
                    <div>
                      <h3 className="text-xl font-bold">Email Support</h3>
                      <p className="text-muted-foreground">support@eucamart.in</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="w-8 h-8 text-eucalyptus-600" />
                    <div>
                      <h3 className="text-xl font-bold">Location</h3>
                      <p className="text-muted-foreground">Savalyapuram, Andhra Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl">Send Message</CardTitle>
                <CardDescription>We'll get back to you within 2 hours during working days</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <Label>Full Name</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div>
                    <Label>Your Message</Label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700 py-3 text-lg">
                    🌿 Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-eucalyptus-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 font-playfair">
            Ready to Experience Nature's Freshness?
          </h2>
          <p className="text-xl mb-8 text-eucalyptus-100">
            Join thousands of customers who trust EucaMart for their wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/shop')}
              className="bg-white text-eucalyptus-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/bulk-orders')}
              className="border-2 border-white text-black hover:bg-white hover:text-eucalyptus-600 px-8 py-4 text-lg font-semibold"
            >
              Bulk Orders
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
