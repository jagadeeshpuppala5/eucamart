
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Truck, Shield, Users, Leaf, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BulkOrders = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    business: '',
    country: '',
    phone: '',
    email: '',
    leaves: [] as string[],
    quantity: '',
    frequency: '',
    packaging: '',
    notes: ''
  });

  const handleLeafSelection = (leaf: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        leaves: [...prev.leaves, leaf]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        leaves: prev.leaves.filter(l => l !== leaf)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted!",
      description: "We'll contact you within 24 hours with a personalized quote.",
    });
    // Reset form
    setFormData({
      fullName: '',
      business: '',
      country: '',
      phone: '',
      email: '',
      leaves: [],
      quantity: '',
      frequency: '',
      packaging: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative pt-20 pb-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1592365553274-5816b94c16b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-eucalyptus-600">
            <Globe className="w-4 h-4 mr-2" />
            Global Shipping Available
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Bulk Eucalyptus or Curry Leaves?
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Ayurvedic centers, spas, exporters, retailers — order fresh, farm-picked leaves in bulk from India to the world.
          </p>
          <Button 
            size="lg"
            className="bg-eucalyptus-600 hover:bg-eucalyptus-700"
            onClick={() => document.getElementById('bulk-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request a Quote
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why Choose EucaMart */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EucaMart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-eucalyptus-50 rounded-lg hover:shadow-lg transition-shadow">
              <Leaf className="w-12 h-12 text-eucalyptus-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Farm to Dispatch in 1 Day</h3>
              <p className="text-muted-foreground text-sm">
                Fresh leaves harvested and shipped within 24 hours
              </p>
            </div>
            <div className="text-center p-6 bg-eucalyptus-50 rounded-lg hover:shadow-lg transition-shadow">
              <CheckCircle className="w-12 h-12 text-eucalyptus-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Verified Natural Farms</h3>
              <p className="text-muted-foreground text-sm">
                100% organic, chemical-free from certified farms
              </p>
            </div>
            <div className="text-center p-6 bg-eucalyptus-50 rounded-lg hover:shadow-lg transition-shadow">
              <Globe className="w-12 h-12 text-eucalyptus-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Global Export Ready</h3>
              <p className="text-muted-foreground text-sm">
                Worldwide shipping with proper documentation
              </p>
            </div>
            <div className="text-center p-6 bg-eucalyptus-50 rounded-lg hover:shadow-lg transition-shadow">
              <Shield className="w-12 h-12 text-eucalyptus-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Eco-Friendly Packaging</h3>
              <p className="text-muted-foreground text-sm">
                Sustainable packaging that keeps leaves fresh
              </p>
            </div>
          </div>
        </section>

        {/* Bulk Inquiry Form */}
        <section id="bulk-form" className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Your Bulk Quote</h2>
              <p className="text-muted-foreground mb-8">
                Fill out this form and we'll send you a personalized quote within 24 hours.
              </p>
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                src="/images/Bulk_Quotes.png"
                // src='/images/Bulk_Quote.png'
                  // src="https://images.unsplash.com/photo-1606813955467-f19b034b6d56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fresh leaves ready for packing"
                  className="w-full h-1024 object-cover"
                />
              </div>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Bulk Order Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="business">Business/Company *</Label>
                      <Input
                        id="business"
                        required
                        value={formData.business}
                        onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="Your country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone with Country Code *</Label>
                      <Input
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label>Select Leaves *</Label>
                    <div className="space-y-2 mt-2">
                      {['Eucalyptus Leaves', 'Curry Leaves', 'Both'].map(leaf => (
                        <div key={leaf} className="flex items-center space-x-2">
                          <Checkbox
                            id={leaf}
                            checked={formData.leaves.includes(leaf)}
                            onCheckedChange={(checked) => handleLeafSelection(leaf, checked as boolean)}
                          />
                          <Label htmlFor={leaf}>{leaf}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity in KG *</Label>
                      <Input
                        id="quantity"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="e.g., 50 KG"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Delivery Frequency</Label>
                      <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="packaging">Packaging Needs (Optional)</Label>
                    <Input
                      id="packaging"
                      value={formData.packaging}
                      onChange={(e) => setFormData(prev => ({ ...prev, packaging: e.target.value }))}
                      placeholder="Special packaging requirements"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any special requirements or questions"
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700"
                    size="lg"
                  >
                    Request Bulk Quote Now
                    <CheckCircle className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Worldwide Delivery */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Where We Deliver</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                We currently ship bulk orders to UAE, UK, USA, Australia, Malaysia, and more. 
                Want to become a regional distributor? Contact us.
              </p>
              <Button variant="outline" size="lg">
                Become a Distributor
              </Button>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="World map showing global delivery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-eucalyptus-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Join over 100+ Ayurvedic centers and spas that trust EucaMart
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's grow green together 🌿
          </p>
          <Button 
            size="lg"
            className="bg-eucalyptus-600 hover:bg-eucalyptus-700"
            onClick={() => document.getElementById('bulk-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started with Bulk Orders
          </Button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BulkOrders;
