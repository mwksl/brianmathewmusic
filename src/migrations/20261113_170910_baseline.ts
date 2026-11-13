import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_discography_roles_role" AS ENUM('mixer', 'master', 'producer', 'engineer');
  CREATE TYPE "public"."enum_forms_status" AS ENUM('new', 'read', 'replied');
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_with_prefix" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'bmm',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "discography_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" "enum_discography_roles_role"
  );
  
  CREATE TABLE "discography" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"album_title" varchar NOT NULL,
  	"artist" varchar NOT NULL,
  	"spotify_url" varchar NOT NULL,
  	"cover_art_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "studio_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "studio_genres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "studio_recording_elements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "studio_audio_samples" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"audio_file_id" integer NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "studio_gear_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "studio_gear" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL
  );
  
  CREATE TABLE "studio_additional_gear_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar DEFAULT 'Studio Gear'
  );
  
  CREATE TABLE "studio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"about" varchar NOT NULL,
  	"studio_image_id" integer NOT NULL,
  	"services_image_id" integer,
  	"genres_image_id" integer,
  	"elements_image_id" integer,
  	"gear_image_id" integer,
  	"other_genres_text" varchar DEFAULT 'For any other genres, contact me to discuss details.' NOT NULL,
  	"other_elements_text" varchar DEFAULT 'For drums or anything else, contact me to discuss details.' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "music_spotify_embeds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_url" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "music" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about" varchar NOT NULL,
  	"featured_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_forms_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"media_with_prefix_id" integer,
  	"pages_id" integer,
  	"discography_id" integer,
  	"navigation_id" integer,
  	"studio_id" integer,
  	"music_id" integer,
  	"forms_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "discography_roles" ADD CONSTRAINT "discography_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."discography"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "discography" ADD CONSTRAINT "discography_cover_art_id_media_id_fk" FOREIGN KEY ("cover_art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation" ADD CONSTRAINT "navigation_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio_services" ADD CONSTRAINT "studio_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_genres" ADD CONSTRAINT "studio_genres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_recording_elements" ADD CONSTRAINT "studio_recording_elements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_audio_samples" ADD CONSTRAINT "studio_audio_samples_audio_file_id_media_with_prefix_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media_with_prefix"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio_audio_samples" ADD CONSTRAINT "studio_audio_samples_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_gear_items" ADD CONSTRAINT "studio_gear_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_gear"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_gear" ADD CONSTRAINT "studio_gear_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_additional_gear_images" ADD CONSTRAINT "studio_additional_gear_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio_additional_gear_images" ADD CONSTRAINT "studio_additional_gear_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio" ADD CONSTRAINT "studio_studio_image_id_media_id_fk" FOREIGN KEY ("studio_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio" ADD CONSTRAINT "studio_services_image_id_media_id_fk" FOREIGN KEY ("services_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio" ADD CONSTRAINT "studio_genres_image_id_media_id_fk" FOREIGN KEY ("genres_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio" ADD CONSTRAINT "studio_elements_image_id_media_id_fk" FOREIGN KEY ("elements_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio" ADD CONSTRAINT "studio_gear_image_id_media_id_fk" FOREIGN KEY ("gear_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "music_spotify_embeds" ADD CONSTRAINT "music_spotify_embeds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."music"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "music" ADD CONSTRAINT "music_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_with_prefix_fk" FOREIGN KEY ("media_with_prefix_id") REFERENCES "public"."media_with_prefix"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_discography_fk" FOREIGN KEY ("discography_id") REFERENCES "public"."discography"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_fk" FOREIGN KEY ("navigation_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_studio_fk" FOREIGN KEY ("studio_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_music_fk" FOREIGN KEY ("music_id") REFERENCES "public"."music"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_with_prefix_updated_at_idx" ON "media_with_prefix" USING btree ("updated_at");
  CREATE INDEX "media_with_prefix_created_at_idx" ON "media_with_prefix" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_with_prefix_filename_idx" ON "media_with_prefix" USING btree ("filename");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "discography_roles_order_idx" ON "discography_roles" USING btree ("_order");
  CREATE INDEX "discography_roles_parent_id_idx" ON "discography_roles" USING btree ("_parent_id");
  CREATE INDEX "discography_cover_art_idx" ON "discography" USING btree ("cover_art_id");
  CREATE INDEX "discography_updated_at_idx" ON "discography" USING btree ("updated_at");
  CREATE INDEX "discography_created_at_idx" ON "discography" USING btree ("created_at");
  CREATE INDEX "navigation_image_idx" ON "navigation" USING btree ("image_id");
  CREATE INDEX "navigation_updated_at_idx" ON "navigation" USING btree ("updated_at");
  CREATE INDEX "navigation_created_at_idx" ON "navigation" USING btree ("created_at");
  CREATE INDEX "studio_services_order_idx" ON "studio_services" USING btree ("_order");
  CREATE INDEX "studio_services_parent_id_idx" ON "studio_services" USING btree ("_parent_id");
  CREATE INDEX "studio_genres_order_idx" ON "studio_genres" USING btree ("_order");
  CREATE INDEX "studio_genres_parent_id_idx" ON "studio_genres" USING btree ("_parent_id");
  CREATE INDEX "studio_recording_elements_order_idx" ON "studio_recording_elements" USING btree ("_order");
  CREATE INDEX "studio_recording_elements_parent_id_idx" ON "studio_recording_elements" USING btree ("_parent_id");
  CREATE INDEX "studio_audio_samples_order_idx" ON "studio_audio_samples" USING btree ("_order");
  CREATE INDEX "studio_audio_samples_parent_id_idx" ON "studio_audio_samples" USING btree ("_parent_id");
  CREATE INDEX "studio_audio_samples_audio_file_idx" ON "studio_audio_samples" USING btree ("audio_file_id");
  CREATE INDEX "studio_gear_items_order_idx" ON "studio_gear_items" USING btree ("_order");
  CREATE INDEX "studio_gear_items_parent_id_idx" ON "studio_gear_items" USING btree ("_parent_id");
  CREATE INDEX "studio_gear_order_idx" ON "studio_gear" USING btree ("_order");
  CREATE INDEX "studio_gear_parent_id_idx" ON "studio_gear" USING btree ("_parent_id");
  CREATE INDEX "studio_additional_gear_images_order_idx" ON "studio_additional_gear_images" USING btree ("_order");
  CREATE INDEX "studio_additional_gear_images_parent_id_idx" ON "studio_additional_gear_images" USING btree ("_parent_id");
  CREATE INDEX "studio_additional_gear_images_image_idx" ON "studio_additional_gear_images" USING btree ("image_id");
  CREATE INDEX "studio_studio_image_idx" ON "studio" USING btree ("studio_image_id");
  CREATE INDEX "studio_services_image_idx" ON "studio" USING btree ("services_image_id");
  CREATE INDEX "studio_genres_image_idx" ON "studio" USING btree ("genres_image_id");
  CREATE INDEX "studio_elements_image_idx" ON "studio" USING btree ("elements_image_id");
  CREATE INDEX "studio_gear_image_idx" ON "studio" USING btree ("gear_image_id");
  CREATE INDEX "studio_updated_at_idx" ON "studio" USING btree ("updated_at");
  CREATE INDEX "studio_created_at_idx" ON "studio" USING btree ("created_at");
  CREATE INDEX "music_spotify_embeds_order_idx" ON "music_spotify_embeds" USING btree ("_order");
  CREATE INDEX "music_spotify_embeds_parent_id_idx" ON "music_spotify_embeds" USING btree ("_parent_id");
  CREATE INDEX "music_featured_image_idx" ON "music" USING btree ("featured_image_id");
  CREATE INDEX "music_updated_at_idx" ON "music" USING btree ("updated_at");
  CREATE INDEX "music_created_at_idx" ON "music" USING btree ("created_at");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_media_with_prefix_id_idx" ON "payload_locked_documents_rels" USING btree ("media_with_prefix_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_discography_id_idx" ON "payload_locked_documents_rels" USING btree ("discography_id");
  CREATE INDEX "payload_locked_documents_rels_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("navigation_id");
  CREATE INDEX "payload_locked_documents_rels_studio_id_idx" ON "payload_locked_documents_rels" USING btree ("studio_id");
  CREATE INDEX "payload_locked_documents_rels_music_id_idx" ON "payload_locked_documents_rels" USING btree ("music_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_with_prefix" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "discography_roles" CASCADE;
  DROP TABLE "discography" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "studio_services" CASCADE;
  DROP TABLE "studio_genres" CASCADE;
  DROP TABLE "studio_recording_elements" CASCADE;
  DROP TABLE "studio_audio_samples" CASCADE;
  DROP TABLE "studio_gear_items" CASCADE;
  DROP TABLE "studio_gear" CASCADE;
  DROP TABLE "studio_additional_gear_images" CASCADE;
  DROP TABLE "studio" CASCADE;
  DROP TABLE "music_spotify_embeds" CASCADE;
  DROP TABLE "music" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_discography_roles_role";
  DROP TYPE "public"."enum_forms_status";`)
}
