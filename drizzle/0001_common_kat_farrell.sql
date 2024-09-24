ALTER TABLE `articles` MODIFY COLUMN `is_published` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `articles` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `articles` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;