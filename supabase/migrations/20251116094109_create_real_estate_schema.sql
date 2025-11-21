/*
  # Real Estate Developer Database Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text, property title)
      - `description` (text, detailed description)
      - `price` (numeric, property price)
      - `location` (text, property location)
      - `bedrooms` (integer, number of bedrooms)
      - `bathrooms` (integer, number of bathrooms)
      - `area` (numeric, area in sq ft)
      - `property_type` (text, type: apartment, villa, etc.)
      - `status` (text, available/sold/under_construction)
      - `image_url` (text, property image URL)
      - `featured` (boolean, is featured property)
      - `created_at` (timestamp)
    
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text, inquirer name)
      - `email` (text, inquirer email)
      - `phone` (text, phone number)
      - `property_id` (uuid, related property - nullable)
      - `message` (text, inquiry message)
      - `status` (text, pending/contacted/closed)
      - `created_at` (timestamp)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `client_name` (text, client name)
      - `client_role` (text, client role/designation)
      - `testimonial` (text, testimonial content)
      - `rating` (integer, rating out of 5)
      - `avatar_url` (text, client avatar URL - nullable)
      - `approved` (boolean, is approved for display)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  area numeric NOT NULL,
  property_type text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  image_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  property_id uuid REFERENCES properties(id),
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text NOT NULL,
  testimonial text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  avatar_url text,
  approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (approved = true);

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage properties"
  ON properties FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);