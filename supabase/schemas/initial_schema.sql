create table "squad" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

create table "roster" (
    "squad_id" uuid references squad(id),
    "user_id" uuid references auth.users (id)
);

create table "restaurant" (
    "id" serial primary key,
    "squad_id" uuid not null references squad(id),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TYPE swipe_type AS ENUM ('left', 'right', 'skip');

create table "swipe" (
    "id" serial primary key,
    "user_id" uuid not null references auth.users (id),
    "squad_id" uuid not null references squad(id),
    "restaurant_id" integer not null references restaurant(id),
    "swipe" swipe_type not null,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);