
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MessageCircle, Package, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const orderId = 'EUCA123456';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your order has been placed successfully! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for trusting EucaMart. Your freshness is on its way 🌿
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Order Info */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-medium">#{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span>Eucalyptus Leaves (250g) × 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold text-primary">₹158</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">2–3 working days</span>
                  </div>
                </div>
              </div>

              {/* Delivery Status */}
              <div>
                <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-600">We've received your order</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="text-gray-600">Fresh Picking</p>
                      <p className="text-sm text-gray-500">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="text-gray-600">Shipped</p>
                      <p className="text-sm text-gray-500">You'll receive tracking info</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="text-gray-600">Delivered</p>
                      <p className="text-sm text-gray-500">Fresh at your doorstep</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Tracking */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Your Order on WhatsApp</h3>
              <p className="text-gray-600 mb-4">
                Get real-time updates and track your order directly through WhatsApp
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base"
                onClick={() => window.open(`https://wa.me/919014358988?text=Track+my+order+%23${orderId}`, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Track Order on WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Confirmation */}
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              📧 A confirmation has been sent to your registered email. For any help, 
              reply to the email or message us on WhatsApp.
            </p>
          </CardContent>
        </Card>

        {/* While You Wait */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">While You Wait</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <img 
                  src="https://images.unsplash.com/photo-1630411290234-33c9aa2ba4b3" 
                  alt="Curry Leaves"
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                />
                <h4 className="font-medium">Fresh Curry Leaves</h4>
                <p className="text-sm text-gray-600">₹49 for 100g</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="w-20 h-20 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-medium">Combo Packs</h4>
                <p className="text-sm text-gray-600">Save more with bundles</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link to="/">
                <Button variant="outline">See What's Fresh Today</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="outline" className="px-8 py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
