-- Fix contact_inquiries RLS policy to be more secure and explicit
-- Drop the existing policy first
DROP POLICY IF EXISTS "Admins can view inquiries" ON public.contact_inquiries;

-- Create a more secure and explicit policy for admin access
CREATE POLICY "Only authenticated admins can view inquiries" 
ON public.contact_inquiries 
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

-- Ensure the policy for inserting inquiries is also properly scoped
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.contact_inquiries;

-- Create a more explicit insert policy that doesn't rely on authentication
CREATE POLICY "Public can submit contact inquiries" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (true);