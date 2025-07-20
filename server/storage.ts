import { 
  users, 
  products, 
  cartItems, 
  orders, 
  orderItems, 
  deliveryTracking, 
  paymentTransactions, 
  reviews,
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type DeliveryTracking,
  type InsertDeliveryTracking,
  type PaymentTransaction,
  type InsertPaymentTransaction,
  type Review,
  type InsertReview
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Product operations
  getProducts(category?: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  updateProductStock(id: string, quantity: number): Promise<void>;
  
  // Cart operations
  getCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  addCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
  
  // Order operations
  getOrders(userId?: string): Promise<(Order & { orderItems: (OrderItem & { product: Product })[] })[]>;
  getOrder(id: string): Promise<(Order & { orderItems: (OrderItem & { product: Product })[], deliveryTracking: DeliveryTracking[] }) | undefined>;
  createOrder(order: InsertOrder, orderItems: InsertOrderItem[]): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  updateOrderPaymentStatus(id: string, paymentStatus: string): Promise<Order | undefined>;
  addTrackingNumber(id: string, trackingNumber: string): Promise<Order | undefined>;
  
  // Delivery tracking operations
  addDeliveryTracking(tracking: InsertDeliveryTracking): Promise<DeliveryTracking>;
  getDeliveryTracking(orderId: string): Promise<DeliveryTracking[]>;
  
  // Payment operations
  createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction>;
  updatePaymentTransaction(id: string, status: string): Promise<PaymentTransaction | undefined>;
  getPaymentTransactions(userId?: string): Promise<PaymentTransaction[]>;
  
  // Review operations
  getProductReviews(productId: string): Promise<(Review & { user: Pick<User, 'firstName' | 'lastName'> })[]>;
  createReview(review: InsertReview): Promise<Review>;
  getUserReviews(userId: string): Promise<(Review & { product: Pick<Product, 'name'> })[]>;
  
  // Analytics operations
  getOrderStats(): Promise<{ totalOrders: number; totalRevenue: number; pendingOrders: number }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Product operations
  async getProducts(category?: string): Promise<Product[]> {
    if (category) {
      return await db.select().from(products).where(and(eq(products.isActive, true), eq(products.category, category)));
    }
    
    return await db.select().from(products).where(eq(products.isActive, true));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async updateProductStock(id: string, quantity: number): Promise<void> {
    await db
      .update(products)
      .set({ stockQuantity: sql`${products.stockQuantity} - ${quantity}`, updatedAt: new Date() })
      .where(eq(products.id, id));
  }

  // Cart operations
  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    return await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        isBulkOrder: cartItems.isBulkOrder,
        createdAt: cartItems.createdAt,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));
  }

  async addCartItem(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(
        eq(cartItems.userId, cartItem.userId),
        eq(cartItems.productId, cartItem.productId),
        eq(cartItems.isBulkOrder, cartItem.isBulkOrder || false)
      ));

    if (existingItem) {
      // Update quantity instead of creating new item
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: sql`${cartItems.quantity} + ${cartItem.quantity}` })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    }

    const [newItem] = await db
      .insert(cartItems)
      .values(cartItem)
      .returning();
    return newItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [item] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return item || undefined;
  }

  async removeCartItem(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Order operations
  async getOrders(userId?: string): Promise<(Order & { orderItems: (OrderItem & { product: Product })[] })[]> {
    const ordersQuery = db.select().from(orders);
    
    if (userId) {
      ordersQuery.where(eq(orders.userId, userId));
    }
    
    const orderList = await ordersQuery.orderBy(desc(orders.createdAt));
    
    const ordersWithItems = await Promise.all(
      orderList.map(async (order) => {
        const items = await db
          .select({
            id: orderItems.id,
            orderId: orderItems.orderId,
            productId: orderItems.productId,
            quantity: orderItems.quantity,
            unitPrice: orderItems.unitPrice,
            totalPrice: orderItems.totalPrice,
            isBulkOrder: orderItems.isBulkOrder,
            product: products
          })
          .from(orderItems)
          .innerJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, order.id));
        
        return { ...order, orderItems: items };
      })
    );
    
    return ordersWithItems;
  }

  async getOrder(id: string): Promise<(Order & { orderItems: (OrderItem & { product: Product })[], deliveryTracking: DeliveryTracking[] }) | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    
    if (!order) return undefined;

    const items = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
        totalPrice: orderItems.totalPrice,
        isBulkOrder: orderItems.isBulkOrder,
        product: products
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id));

    const tracking = await db
      .select()
      .from(deliveryTracking)
      .where(eq(deliveryTracking.orderId, order.id))
      .orderBy(desc(deliveryTracking.timestamp));

    return { ...order, orderItems: items, deliveryTracking: tracking };
  }

  async createOrder(order: InsertOrder, orderItemsList: InsertOrderItem[]): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();

    await db.insert(orderItems).values(
      orderItemsList.map(item => ({ ...item, orderId: newOrder.id }))
    );

    return newOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  async updateOrderPaymentStatus(id: string, paymentStatus: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ paymentStatus, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  async addTrackingNumber(id: string, trackingNumber: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ trackingNumber, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  // Delivery tracking operations
  async addDeliveryTracking(tracking: InsertDeliveryTracking): Promise<DeliveryTracking> {
    const [newTracking] = await db
      .insert(deliveryTracking)
      .values(tracking)
      .returning();
    return newTracking;
  }

  async getDeliveryTracking(orderId: string): Promise<DeliveryTracking[]> {
    return await db
      .select()
      .from(deliveryTracking)
      .where(eq(deliveryTracking.orderId, orderId))
      .orderBy(desc(deliveryTracking.timestamp));
  }

  // Payment operations
  async createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction> {
    const [newTransaction] = await db
      .insert(paymentTransactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async updatePaymentTransaction(id: string, status: string): Promise<PaymentTransaction | undefined> {
    const [transaction] = await db
      .update(paymentTransactions)
      .set({ status })
      .where(eq(paymentTransactions.id, id))
      .returning();
    return transaction || undefined;
  }

  async getPaymentTransactions(userId?: string): Promise<PaymentTransaction[]> {
    const query = db.select().from(paymentTransactions);
    
    if (userId) {
      query.where(eq(paymentTransactions.userId, userId));
    }
    
    return await query.orderBy(desc(paymentTransactions.createdAt));
  }

  // Review operations
  async getProductReviews(productId: string): Promise<(Review & { user: Pick<User, 'firstName' | 'lastName'> })[]> {
    return await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        productId: reviews.productId,
        orderId: reviews.orderId,
        rating: reviews.rating,
        title: reviews.title,
        comment: reviews.comment,
        isVerifiedPurchase: reviews.isVerifiedPurchase,
        createdAt: reviews.createdAt,
        user: {
          firstName: users.firstName,
          lastName: users.lastName
        }
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values(review)
      .returning();
    return newReview;
  }

  async getUserReviews(userId: string): Promise<(Review & { product: Pick<Product, 'name'> })[]> {
    return await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        productId: reviews.productId,
        orderId: reviews.orderId,
        rating: reviews.rating,
        title: reviews.title,
        comment: reviews.comment,
        isVerifiedPurchase: reviews.isVerifiedPurchase,
        createdAt: reviews.createdAt,
        product: {
          name: products.name
        }
      })
      .from(reviews)
      .innerJoin(products, eq(reviews.productId, products.id))
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  // Analytics operations
  async getOrderStats(): Promise<{ totalOrders: number; totalRevenue: number; pendingOrders: number }> {
    const [stats] = await db
      .select({
        totalOrders: sql<number>`count(*)`,
        totalRevenue: sql<number>`sum(${orders.totalAmount})`,
        pendingOrders: sql<number>`count(*) filter (where ${orders.status} = 'pending')`
      })
      .from(orders);

    return {
      totalOrders: stats.totalOrders || 0,
      totalRevenue: Number(stats.totalRevenue) || 0,
      pendingOrders: stats.pendingOrders || 0
    };
  }
}

export const storage = new DatabaseStorage();
