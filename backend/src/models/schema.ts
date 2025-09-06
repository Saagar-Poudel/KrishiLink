import { pgTable, serial, text, integer, boolean, numeric, timestamp, varchar, real } from "drizzle-orm/pg-core";
import { is, relations } from "drizzle-orm";

//Create user credentials model for login and registration

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role:text("role").default("buyers"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  // Basic details
  name: text("name").notNull(),
  nameNepali: text("name_nepali"),
  category: text("category"),

  // Pricing & stock
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit"), // e.g., kg, liter, dozen
  quantity: integer("quantity").default(0), // available quantity

  // Location & seller
  location: text("location"),
  sellerName: text("seller_name"),

  // Media
  image: text("image"),

  // Status flags
  isVerified: boolean("is_verified").default(false),
  isAvailable: boolean("is_available").default(true),
  hasDelivery: boolean("has_delivery").default(false),
  rating: real("rating").default(0), // FLOAT (to store 4.8 etc.)
  reviewCount: integer("review_count").default(0),
  isOrganic: boolean("is_organic").default(false),
  isBulkAvailable: boolean("is_bulk_available").default(false),
  estimatedDelivery: text("estimated_delivery"),

  // Metadata
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).default("pending"), // pending, paid, shipped, delivered, cancelled
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), // snapshot of product price at order time
});

// Relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));