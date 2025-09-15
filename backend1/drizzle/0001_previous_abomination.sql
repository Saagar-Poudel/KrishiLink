ALTER TABLE "orders" ADD COLUMN "contact_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "phone" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "notes" text;