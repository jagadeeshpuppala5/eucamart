
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Users, 
  Package, 
  MessageSquare, 
  BarChart3, 
  ExternalLink,
  Edit,
  Phone,
  Mail
} from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('orders');

  // Mock data - replace with real API calls
  const orders = [
    {
      id: '#EUCA123456',
      customerName: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh@example.com',
      products: 'Eucalyptus Leaves 250g x 2',
      amount: '₹158',
      status: 'Processing'
    },
    {
      id: '#EUCA123457',
      customerName: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya@example.com',
      products: 'Curry Leaves 100g x 3',
      amount: '₹237',
      status: 'Shipped'
    },
    {
      id: '#EUCA123458',
      customerName: 'Dr. Mehta',
      phone: '+91 9876543212',
      email: 'mehta@clinic.com',
      products: 'Eucalyptus Leaves 500g x 1',
      amount: '₹149',
      status: 'Delivered'
    }
  ];

  const customers = [
    {
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh@example.com',
      ordersCount: 3,
      lastOrder: '2024-01-15'
    },
    {
      name: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya@example.com',
      ordersCount: 1,
      lastOrder: '2024-01-10'
    },
    {
      name: 'Dr. Mehta',
      phone: '+91 9876543212',
      email: 'mehta@clinic.com',
      ordersCount: 5,
      lastOrder: '2024-01-12'
    }
  ];

  const inventory = [
    {
      product: 'Eucalyptus Leaves',
      stock: 45,
      unit: 'KG',
      price: '₹79/100g',
      lowStock: false
    },
    {
      product: 'Curry Leaves',
      stock: 12,
      unit: 'KG',
      price: '₹65/100g',
      lowStock: true
    }
  ];

  const bulkRequests = [
    {
      name: 'Ayurved Clinic Ltd',
      business: 'Healthcare',
      quantity: '50 KG',
      country: 'India',
      status: 'New',
      phone: '+91 9876543213'
    },
    {
      name: 'Global Spa Chain',
      business: 'Wellness',
      quantity: '100 KG',
      country: 'USA',
      status: 'Quoted',
      phone: '+1 555-0123'
    }
  ];

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Order ${orderId} marked as ${newStatus}`,
    });
  };

  const handleWhatsAppContact = (phone: string, orderId?: string) => {
    const message = orderId 
      ? `Hello! Regarding your order ${orderId}`
      : 'Hello! Thank you for your interest in EucaMart bulk orders.';
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Shipped': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800',
      'New': 'bg-purple-100 text-purple-800',
      'Quoted': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-eucalyptus-700">EucaMart Admin Panel</h1>
          <p className="text-gray-600">Manage orders, customers, and inventory</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="bulk-requests" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Bulk Requests
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{order.phone}</div>
                            <div className="text-gray-500">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{order.products}</TableCell>
                        <TableCell className="font-semibold">{order.amount}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWhatsAppContact(order.phone, order.id)}
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                            <select
                              className="px-2 py-1 text-xs border rounded"
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                              defaultValue={order.status}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{customer.phone}</div>
                            <div className="text-gray-500">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{customer.ordersCount} orders</Badge>
                        </TableCell>
                        <TableCell>{customer.lastOrder}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleWhatsAppContact(customer.phone)}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventory Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.stock} {item.unit}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {item.lowStock ? (
                            <Badge className="bg-red-100 text-red-800">Low Stock</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Requests Tab */}
          <TabsContent value="bulk-requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Bulk Order Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bulkRequests.map((request, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.business}</TableCell>
                        <TableCell>{request.quantity}</TableCell>
                        <TableCell>{request.country}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWhatsAppContact(request.phone)}
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                            <select
                              className="px-2 py-1 text-xs border rounded"
                              defaultValue={request.status}
                              onChange={(e) => toast({
                                title: "Status Updated",
                                description: `Request marked as ${e.target.value}`,
                              })}
                            >
                              <option value="New">New</option>
                              <option value="Quoted">Quoted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
