-- Custom SQL migration file, to create postgresql enum type --
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
    CREATE TYPE role AS ENUM (
      'admin',
      'user'
    );
  END IF;
END $$;