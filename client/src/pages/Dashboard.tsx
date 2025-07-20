
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Package, 
  MapPin, 
  MessageCircle, 
  Edit, 
  Trash2, 
  Plus,
  ArrowLeft,
  ShoppingCart
} from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    fullName: 'Anil Kumar',
    phone: '+91 90143 58988',
    email: 'anil@example.com',
    birthdate: '',
    gender: ''
  });

  const [orders] = useState([
    {
      id: 'EUCA123456',
      date: '2025-01-15',
      items: 'Eucalyptus Leaves – 250g × 2',
      total: 158,
      status: 'Delivered'
    },
    {
      id: 'EUCA123455',
      date: '2025-01-10',
      items: 'Curry Leaves – 100g × 1',
      total: 49,
      status: 'Processing'
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      fullAddress: 'Flat 201, Green Apartments, Jubilee Hills, Hyderabad',
      pincode: '500033',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    {
      id: 2,
      name: 'Office',
      fullAddress: 'Plot 15, Hitech City, Madhapur, Hyderabad',
      pincode: '500081',
      city: 'Hyderabad',
      state: 'Telangana'
    }
  ]);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    fullAddress: '',
    pincode: '',
    city: '',
    state: ''
  });

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated! 🌿",
      description: "Your profile information has been saved successfully",
    });
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.fullAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setNewAddress({ name: '', fullAddress: '', pincode: '', city: '', state: '' });
    setShowAddAddress(false);
    
    toast({
      title: "Address Added",
      description: "New address has been saved to your account",
    });
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Address Deleted",
      description: "Address has been removed from your account",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Welcome back, {profile.fullName}! 🌿</p>
                <p className="text-sm text-gray-500">Manage your EucaMart experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-mono font-medium">#{order.id}</p>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-gray-700">{order.items}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">₹{order.total}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`https://wa.me/919014358988?text=Track+order+%23${order.id}`, '_blank')}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Track
                            </Button>
                            <Button size="sm" variant="outline">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthdate">Birth Date (Optional)</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={profile.birthdate}
                      onChange={(e) => setProfile({...profile, birthdate: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button onClick={handleUpdateProfile} className="w-full md:w-auto">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Addresses</CardTitle>
                <Button onClick={() => setShowAddAddress(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{address.name}</span>
                          </div>
                          <p className="text-gray-700 mb-1">{address.fullAddress}</p>
                          <p className="text-sm text-gray-500">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Address Form */}
                {showAddAddress && (
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-medium mb-4">Add New Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="addressName">Address Name</Label>
                        <Input
                          id="addressName"
                          placeholder="e.g., Home, Office"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fullAddress">Full Address</Label>
                        <Textarea
                          id="fullAddress"
                          placeholder="Enter complete address"
                          value={newAddress.fullAddress}
                          onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            placeholder="500001"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleAddAddress}>Save Address</Button>
                        <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
