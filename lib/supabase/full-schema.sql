CREATE TABLE public.votes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id text,
    ip_address text,
    created_at timestamp with time zone default now()
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
