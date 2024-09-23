CREATE TABLE `articles` (
	`id` varchar(26) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`draft_content` text,
	`eyecatch` varchar(100),
	`category` varchar(26),
	`is_published` boolean DEFAULT false,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`published_at` timestamp DEFAULT NULL,
	`deleted_at` timestamp DEFAULT NULL,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` varchar(26) NOT NULL,
	`name` varchar(16) NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`published_at` timestamp DEFAULT NULL,
	`deleted_at` timestamp DEFAULT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_category_categories_id_fk` FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE no action;