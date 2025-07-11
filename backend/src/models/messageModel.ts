import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    message: text("message").notNull(),
    messages: Array,
});