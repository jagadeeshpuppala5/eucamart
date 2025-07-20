import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { 
  insertUserSchema, 
  insertProductSchema, 
  insertCartItemSchema, 
  insertOrderSchema,
  insertReviewSchema 
} from "@shared/schema";
import { z } from "zod";

// Initialize Stripe only if secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string;
      const products = await storage.getProducts(category);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Cart routes
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.params.userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addCartItem(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeCartItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart/user/:userId", async (req, res) => {
    try {
      await storage.clearCart(req.params.userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Order routes
  app.get("/api/orders", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { order, orderItems } = req.body;
      const orderData = insertOrderSchema.parse(order);
      
      // Generate unique order number
      const orderNumber = `EUCA${Date.now().toString().slice(-8)}`;
      orderData.orderNumber = orderNumber;
      
      const newOrder = await storage.createOrder(orderData, orderItems);
      
      // Update product stock
      for (const item of orderItems) {
        await storage.updateProductStock(item.productId, item.quantity);
      }
      
      res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  app.put("/api/orders/:id/tracking", async (req, res) => {
    try {
      const { trackingNumber } = req.body;
      const order = await storage.addTrackingNumber(req.params.id, trackingNumber);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error adding tracking number:", error);
      res.status(500).json({ message: "Failed to add tracking number" });
    }
  });

  // Payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe not configured. Please add STRIPE_SECRET_KEY." });
    }

    try {
      const { amount, currency = "usd", orderId, userId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata: { orderId, userId },
        automatic_payment_methods: { enabled: true },
      });

      // Store payment transaction
      await storage.createPaymentTransaction({
        orderId,
        userId,
        stripePaymentIntentId: paymentIntent.id,
        amount: amount.toString(),
        currency,
        status: "pending",
        paymentMethod: "stripe"
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id 
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });

  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const { paymentIntentId, orderId } = req.body;
      
      // Update payment status
      await storage.updateOrderPaymentStatus(orderId, "paid");
      await storage.updateOrderStatus(orderId, "confirmed");
      
      // Add initial delivery tracking
      await storage.addDeliveryTracking({
        orderId,
        status: "Order Confirmed",
        message: "Your order has been confirmed and is being prepared for shipment.",
        location: "Warehouse"
      });

      res.json({ message: "Payment confirmed successfully" });
    } catch (error) {
      console.error("Error confirming payment:", error);
      res.status(500).json({ message: "Failed to confirm payment" });
    }
  });

  // Delivery tracking routes
  app.get("/api/orders/:orderId/tracking", async (req, res) => {
    try {
      const tracking = await storage.getDeliveryTracking(req.params.orderId);
      res.json(tracking);
    } catch (error) {
      console.error("Error fetching delivery tracking:", error);
      res.status(500).json({ message: "Failed to fetch delivery tracking" });
    }
  });

  app.post("/api/orders/:orderId/tracking", async (req, res) => {
    try {
      const trackingData = {
        orderId: req.params.orderId,
        ...req.body
      };
      const tracking = await storage.addDeliveryTracking(trackingData);
      res.status(201).json(tracking);
    } catch (error) {
      console.error("Error adding delivery tracking:", error);
      res.status(500).json({ message: "Failed to add delivery tracking" });
    }
  });

  // Review routes
  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.get("/api/users/:userId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getUserReviews(req.params.userId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      res.status(500).json({ message: "Failed to fetch user reviews" });
    }
  });

  // Analytics routes for admin
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getOrderStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Seed data route (for development)
  app.post("/api/seed-data", async (req, res) => {
    try {
      // Add some sample products
      const sampleProducts = [
        {
          name: "Fresh Eucalyptus Leaves",
          description: "Premium eucalyptus leaves, naturally harvested and chemical-free. Perfect for aromatherapy, steam therapy, and wellness rituals.",
          category: "eucalyptus",
          price: "59.00",
          bulkPrice: "45.00",
          minBulkQuantity: 50,
          stockQuantity: 100,
          unit: "bunch",
          images: ["https://images.unsplash.com/photo-1616486430532-eaad679f5d62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"],
          isActive: true
        },
        {
          name: "Eucalyptus Powder",
          description: "Finely ground eucalyptus powder for Ayurvedic preparations and natural wellness applications.",
          category: "eucalyptus",
          price: "89.00",
          bulkPrice: "70.00",
          minBulkQuantity: 25,
          stockQuantity: 50,
          unit: "kg",
          images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"],
          isActive: true
        },
        {
          name: "Fresh Curry Leaves",
          description: "Fresh, aromatic curry leaves picked from organic farms. Essential for authentic Indian cooking and traditional remedies.",
          category: "curry_leaves",
          price: "49.00",
          bulkPrice: "35.00",
          minBulkQuantity: 75,
          stockQuantity: 200,
          unit: "bunch",
          images: ["https://images.unsplash.com/photo-1553909212-4c9d5a6e6f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"],
          isActive: true
        },
        {
          name: "Curry Leaves Powder",
          description: "Premium curry leaves powder with concentrated flavor and nutrients. Perfect for seasoning and health benefits.",
          category: "curry_leaves",
          price: "79.00",
          bulkPrice: "60.00",
          minBulkQuantity: 30,
          stockQuantity: 75,
          unit: "kg",
          images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"],
          isActive: true
        }
      ];

      for (const productData of sampleProducts) {
        await storage.createProduct(productData);
      }

      res.json({ message: "Sample data seeded successfully!" });
    } catch (error) {
      console.error("Error seeding data:", error);
      res.status(500).json({ message: "Failed to seed data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}