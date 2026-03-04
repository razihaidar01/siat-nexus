ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS father_name text,
ADD COLUMN IF NOT EXISTS mother_name text,
ADD COLUMN IF NOT EXISTS training_from date,
ADD COLUMN IF NOT EXISTS training_to date;