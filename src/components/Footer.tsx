
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Linkedin, Youtube, Leaf, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (email) {
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-eucalyptus-50 to-green-50 dark:from-eucalyptus-900/20 dark:to-green-900/20 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About EucaMart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-eucalyptus-600" />
              <h3 className="text-2xl font-bold text-eucalyptus-800 dark:text-eucalyptus-200 font-playfair">
                EucaMart
              </h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              EucaMart is India's freshest herbal delivery brand offering curry leaves, eucalyptus, and more.
              We support organic farming and doorstep wellness, connecting you to nature's healing power
              through authentic, chemical-free products sourced directly from certified farms.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">100% Organic</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Lab Tested</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Youtube className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-eucalyptus-800 dark:text-eucalyptus-200">
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link
                to="/"
                className="block text-muted-foreground hover:text-eucalyptus-600 transition-colors text-base hover:translate-x-1 duration-200"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block text-muted-foreground hover:text-eucalyptus-600 transition-colors text-base hover:translate-x-1 duration-200"
              >
                Shop Products
              </Link>
              <Link
                to="/bulk-orders"
                className="block text-muted-foreground hover:text-eucalyptus-600 transition-colors text-base hover:translate-x-1 duration-200"
              >
                Bulk Orders
              </Link>
              <Link
                to="/#about"
                className="block text-muted-foreground hover:text-eucalyptus-600 transition-colors text-base hover:translate-x-1 duration-200"
              >
                About Us
              </Link>
              <Link
                to="/#contact"
                className="block text-muted-foreground hover:text-eucalyptus-600 transition-colors text-base hover:translate-x-1 duration-200"
              >
                Contact
              </Link>
              <Link
                to="/#faq"
                className="block text-muted-foreground hover:text-eucalyptus-600 transition-colors text-base hover:translate-x-1 duration-200"
              >
                FAQ
              </Link>
            </div>

            <div className="pt-4 border-t border-eucalyptus-200">
              <h4 className="font-semibold text-eucalyptus-800 mb-3">Support</h4>
              <div className="space-y-2">
                <Link
                  to="/privacy"
                  className="block text-sm text-muted-foreground hover:text-eucalyptus-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="block text-sm text-muted-foreground hover:text-eucalyptus-600 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/shipping"
                  className="block text-sm text-muted-foreground hover:text-eucalyptus-600 transition-colors"
                >
                  Shipping Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-eucalyptus-800 dark:text-eucalyptus-200">
              Stay Fresh with Us
            </h3>
            <p className="text-muted-foreground">
              Get fresh leaves, wellness tips, and exclusive offers delivered to your inbox weekly.
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border-eucalyptus-200 focus:border-eucalyptus-600"
                />
                <Button
                  onClick={handleSubscribe}
                  className="bg-eucalyptus-600 hover:bg-eucalyptus-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Join 5,000+ subscribers who trust our weekly wellness newsletter.
              </p>

              {/* Contact Info */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">📱</span>
                  {/* <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8"
                  /> */}
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">+91 9014358988</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">hello@eucamart.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Hyderabad, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-eucalyptus-200 dark:border-eucalyptus-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-muted-foreground text-center">
                © 2025 EucaMart. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in India</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-eucalyptus-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-eucalyptus-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-muted-foreground hover:text-eucalyptus-600 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600">✓</span>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600">✓</span>
              <span>Organic Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600">✓</span>
              <span>Lab Tested</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600">✓</span>
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
