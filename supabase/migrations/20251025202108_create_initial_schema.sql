create type "public"."swipe_type" as enum ('left', 'right', 'skip');

create sequence "public"."restaurant_id_seq";

create sequence "public"."swipe_id_seq";

create table "public"."restaurant" (
    "id" integer not null default nextval('restaurant_id_seq'::regclass),
    "squad_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."roster" (
    "squad_id" uuid,
    "user_id" uuid
);


create table "public"."squad" (
    "id" uuid not null default gen_random_uuid(),
    "latitude" double precision not null,
    "longitude" double precision not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."swipe" (
    "id" integer not null default nextval('swipe_id_seq'::regclass),
    "user_id" uuid not null,
    "squad_id" uuid not null,
    "restaurant_id" integer not null,
    "swipe" swipe_type not null,
    "created_at" timestamp with time zone default now()
);


alter sequence "public"."restaurant_id_seq" owned by "public"."restaurant"."id";

alter sequence "public"."swipe_id_seq" owned by "public"."swipe"."id";

CREATE UNIQUE INDEX restaurant_pkey ON public.restaurant USING btree (id);

CREATE UNIQUE INDEX squad_pkey ON public.squad USING btree (id);

CREATE UNIQUE INDEX swipe_pkey ON public.swipe USING btree (id);

alter table "public"."restaurant" add constraint "restaurant_pkey" PRIMARY KEY using index "restaurant_pkey";

alter table "public"."squad" add constraint "squad_pkey" PRIMARY KEY using index "squad_pkey";

alter table "public"."swipe" add constraint "swipe_pkey" PRIMARY KEY using index "swipe_pkey";

alter table "public"."restaurant" add constraint "restaurant_squad_id_fkey" FOREIGN KEY (squad_id) REFERENCES squad(id) not valid;

alter table "public"."restaurant" validate constraint "restaurant_squad_id_fkey";

alter table "public"."roster" add constraint "roster_squad_id_fkey" FOREIGN KEY (squad_id) REFERENCES squad(id) not valid;

alter table "public"."roster" validate constraint "roster_squad_id_fkey";

alter table "public"."roster" add constraint "roster_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."roster" validate constraint "roster_user_id_fkey";

alter table "public"."swipe" add constraint "swipe_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) not valid;

alter table "public"."swipe" validate constraint "swipe_restaurant_id_fkey";

alter table "public"."swipe" add constraint "swipe_squad_id_fkey" FOREIGN KEY (squad_id) REFERENCES squad(id) not valid;

alter table "public"."swipe" validate constraint "swipe_squad_id_fkey";

alter table "public"."swipe" add constraint "swipe_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."swipe" validate constraint "swipe_user_id_fkey";

grant delete on table "public"."restaurant" to "anon";

grant insert on table "public"."restaurant" to "anon";

grant references on table "public"."restaurant" to "anon";

grant select on table "public"."restaurant" to "anon";

grant trigger on table "public"."restaurant" to "anon";

grant truncate on table "public"."restaurant" to "anon";

grant update on table "public"."restaurant" to "anon";

grant delete on table "public"."restaurant" to "authenticated";

grant insert on table "public"."restaurant" to "authenticated";

grant references on table "public"."restaurant" to "authenticated";

grant select on table "public"."restaurant" to "authenticated";

grant trigger on table "public"."restaurant" to "authenticated";

grant truncate on table "public"."restaurant" to "authenticated";

grant update on table "public"."restaurant" to "authenticated";

grant delete on table "public"."restaurant" to "service_role";

grant insert on table "public"."restaurant" to "service_role";

grant references on table "public"."restaurant" to "service_role";

grant select on table "public"."restaurant" to "service_role";

grant trigger on table "public"."restaurant" to "service_role";

grant truncate on table "public"."restaurant" to "service_role";

grant update on table "public"."restaurant" to "service_role";

grant delete on table "public"."roster" to "anon";

grant insert on table "public"."roster" to "anon";

grant references on table "public"."roster" to "anon";

grant select on table "public"."roster" to "anon";

grant trigger on table "public"."roster" to "anon";

grant truncate on table "public"."roster" to "anon";

grant update on table "public"."roster" to "anon";

grant delete on table "public"."roster" to "authenticated";

grant insert on table "public"."roster" to "authenticated";

grant references on table "public"."roster" to "authenticated";

grant select on table "public"."roster" to "authenticated";

grant trigger on table "public"."roster" to "authenticated";

grant truncate on table "public"."roster" to "authenticated";

grant update on table "public"."roster" to "authenticated";

grant delete on table "public"."roster" to "service_role";

grant insert on table "public"."roster" to "service_role";

grant references on table "public"."roster" to "service_role";

grant select on table "public"."roster" to "service_role";

grant trigger on table "public"."roster" to "service_role";

grant truncate on table "public"."roster" to "service_role";

grant update on table "public"."roster" to "service_role";

grant delete on table "public"."squad" to "anon";

grant insert on table "public"."squad" to "anon";

grant references on table "public"."squad" to "anon";

grant select on table "public"."squad" to "anon";

grant trigger on table "public"."squad" to "anon";

grant truncate on table "public"."squad" to "anon";

grant update on table "public"."squad" to "anon";

grant delete on table "public"."squad" to "authenticated";

grant insert on table "public"."squad" to "authenticated";

grant references on table "public"."squad" to "authenticated";

grant select on table "public"."squad" to "authenticated";

grant trigger on table "public"."squad" to "authenticated";

grant truncate on table "public"."squad" to "authenticated";

grant update on table "public"."squad" to "authenticated";

grant delete on table "public"."squad" to "service_role";

grant insert on table "public"."squad" to "service_role";

grant references on table "public"."squad" to "service_role";

grant select on table "public"."squad" to "service_role";

grant trigger on table "public"."squad" to "service_role";

grant truncate on table "public"."squad" to "service_role";

grant update on table "public"."squad" to "service_role";

grant delete on table "public"."swipe" to "anon";

grant insert on table "public"."swipe" to "anon";

grant references on table "public"."swipe" to "anon";

grant select on table "public"."swipe" to "anon";

grant trigger on table "public"."swipe" to "anon";

grant truncate on table "public"."swipe" to "anon";

grant update on table "public"."swipe" to "anon";

grant delete on table "public"."swipe" to "authenticated";

grant insert on table "public"."swipe" to "authenticated";

grant references on table "public"."swipe" to "authenticated";

grant select on table "public"."swipe" to "authenticated";

grant trigger on table "public"."swipe" to "authenticated";

grant truncate on table "public"."swipe" to "authenticated";

grant update on table "public"."swipe" to "authenticated";

grant delete on table "public"."swipe" to "service_role";

grant insert on table "public"."swipe" to "service_role";

grant references on table "public"."swipe" to "service_role";

grant select on table "public"."swipe" to "service_role";

grant trigger on table "public"."swipe" to "service_role";

grant truncate on table "public"."swipe" to "service_role";

grant update on table "public"."swipe" to "service_role";


