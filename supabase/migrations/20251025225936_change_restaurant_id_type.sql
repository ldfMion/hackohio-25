ALTER TABLE swipe DROP CONSTRAINT swipe_restaurant_id_fkey;

ALTER TABLE restaurant
ALTER COLUMN id TYPE text USING id::text;

ALTER TABLE swipe
ALTER COLUMN restaurant_id TYPE text USING restaurant_id::text;

ALTER TABLE swipe
ADD CONSTRAINT swipe_restaurant_id_fkey
FOREIGN KEY (restaurant_id) REFERENCES restaurant(id);
