-- Create storage buckets for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('staff-photos', 'staff-photos', true),
  ('event-media', 'event-media', true),
  ('gallery-media', 'gallery-media', true),
  ('school-assets', 'school-assets', true);

-- Create staff table
CREATE TABLE public.staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  qualifications TEXT,
  experience TEXT,
  photo_url TEXT,
  bio TEXT,
  is_director BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery categories table
CREATE TABLE public.gallery_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery items table
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  category_id UUID REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news/announcements table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  class_level TEXT CHECK (class_level IN ('10', '12', 'both')),
  year INTEGER NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public can view staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public can view gallery categories" ON public.gallery_categories FOR SELECT USING (true);
CREATE POLICY "Public can view gallery items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can view published news" ON public.news FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view achievements" ON public.achievements FOR SELECT USING (true);

-- Admin policies for content management
CREATE POLICY "Admins can manage staff" ON public.staff FOR ALL TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can manage gallery categories" ON public.gallery_categories FOR ALL TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can manage gallery items" ON public.gallery_items FOR ALL TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can view inquiries" ON public.contact_inquiries FOR SELECT TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can manage achievements" ON public.achievements FOR ALL TO authenticated USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));

-- Public can insert contact inquiries and newsletter subscriptions
CREATE POLICY "Anyone can submit inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- Profile policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Storage policies
CREATE POLICY "Public can view staff photos" ON storage.objects FOR SELECT USING (bucket_id = 'staff-photos');
CREATE POLICY "Admins can upload staff photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'staff-photos' AND auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

CREATE POLICY "Public can view event media" ON storage.objects FOR SELECT USING (bucket_id = 'event-media');
CREATE POLICY "Admins can upload event media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'event-media' AND auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

CREATE POLICY "Public can view gallery media" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-media');
CREATE POLICY "Admins can upload gallery media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'gallery-media' AND auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

CREATE POLICY "Public can view school assets" ON storage.objects FOR SELECT USING (bucket_id = 'school-assets');
CREATE POLICY "Admins can upload school assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'school-assets' AND auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for gallery categories
INSERT INTO public.gallery_categories (name, description) VALUES
  ('School Events', 'Photos and videos from school events and celebrations'),
  ('Academic Activities', 'Classroom activities, labs, and academic events'),
  ('Sports & Recreation', 'Sports events, competitions, and recreational activities'),
  ('Cultural Programs', 'Cultural events, performances, and competitions'),
  ('Infrastructure', 'School buildings, facilities, and campus views');

-- Insert sample achievements
INSERT INTO public.achievements (title, description, class_level, year, is_featured) VALUES
  ('100% Pass Rate in Class 12', 'All students successfully passed the board examinations', '12', 2024, true),
  ('State Level Science Fair Winners', 'Our students won first place in the state science fair', '10', 2024, true),
  ('Excellence in Mathematics', 'Average score of 95% in Class 10 Mathematics', '10', 2024, false),
  ('Outstanding English Results', 'Highest average in district for Class 12 English', '12', 2023, false);