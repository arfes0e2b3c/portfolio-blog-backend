CREATE TABLE IF NOT EXISTS "articles" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text,
	"draft_content" text,
	"eyecatch" varchar(255),
	"category" varchar(26),
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"published_at" timestamp DEFAULT NULL,
	"deleted_at" timestamp DEFAULT NULL,
	CONSTRAINT "articles_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"published_at" timestamp DEFAULT NULL,
	"deleted_at" timestamp DEFAULT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_category_categories_id_fk" FOREIGN KEY ("category") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
