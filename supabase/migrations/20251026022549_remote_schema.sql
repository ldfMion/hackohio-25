alter table "public"."roster" alter column "squad_id" set not null;

alter table "public"."roster" alter column "user_id" set not null;

CREATE UNIQUE INDEX roster_pkey ON public.roster USING btree (squad_id, user_id);

alter table "public"."roster" add constraint "roster_pkey" PRIMARY KEY using index "roster_pkey";



