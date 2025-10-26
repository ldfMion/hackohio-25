-- =============================================
-- Migration: Make restaurant primary key composite and update swipe references
-- =============================================

-- 1. Drop existing foreign key in swipe that references restaurant(id)
ALTER TABLE swipe
DROP CONSTRAINT IF EXISTS swipe_restaurant_id_fkey;

-- 2. Drop the old primary key on restaurant.id
ALTER TABLE restaurant
DROP CONSTRAINT restaurant_pkey;

-- 3. Add the new composite primary key (id, squad_id)
ALTER TABLE restaurant
ADD CONSTRAINT restaurant_pkey PRIMARY KEY (id, squad_id);

-- 4. Recreate the foreign key in swipe to reference the composite key
ALTER TABLE swipe
ADD CONSTRAINT fk_restaurant
FOREIGN KEY (restaurant_id, squad_id)
REFERENCES restaurant(id, squad_id)
ON DELETE CASCADE;
