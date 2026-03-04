
-- Add RLS policies for admin document management
CREATE POLICY "Admins can insert documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update documents" ON public.documents FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete documents" ON public.documents FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to SELECT all documents (including non-public)
CREATE POLICY "Admins can view all documents" ON public.documents FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to read contact submissions
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
