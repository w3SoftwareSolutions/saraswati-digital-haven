-- Fix newsletter_subscriptions table RLS policies
-- Currently anyone can insert but no one can read/update/delete
-- This is a security risk as email addresses are exposed

-- Add admin-only SELECT policy for newsletter subscriptions
CREATE POLICY "Only authenticated admins can view newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Add admin-only UPDATE policy for newsletter subscriptions (to manage active status)
CREATE POLICY "Only authenticated admins can update newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Add admin-only DELETE policy for newsletter subscriptions
CREATE POLICY "Only authenticated admins can delete newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Fix the handle_new_user function to assign 'user' role by default instead of 'admin'
-- This prevents security risk of all new users being admins
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$;