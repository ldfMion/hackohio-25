revoke delete on table "public"."restaurant" from "anon";

revoke insert on table "public"."restaurant" from "anon";

revoke references on table "public"."restaurant" from "anon";

revoke select on table "public"."restaurant" from "anon";

revoke trigger on table "public"."restaurant" from "anon";

revoke truncate on table "public"."restaurant" from "anon";

revoke update on table "public"."restaurant" from "anon";

revoke delete on table "public"."restaurant" from "authenticated";

revoke insert on table "public"."restaurant" from "authenticated";

revoke references on table "public"."restaurant" from "authenticated";

revoke select on table "public"."restaurant" from "authenticated";

revoke trigger on table "public"."restaurant" from "authenticated";

revoke truncate on table "public"."restaurant" from "authenticated";

revoke update on table "public"."restaurant" from "authenticated";

revoke delete on table "public"."restaurant" from "service_role";

revoke insert on table "public"."restaurant" from "service_role";

revoke references on table "public"."restaurant" from "service_role";

revoke select on table "public"."restaurant" from "service_role";

revoke trigger on table "public"."restaurant" from "service_role";

revoke truncate on table "public"."restaurant" from "service_role";

revoke update on table "public"."restaurant" from "service_role";

revoke delete on table "public"."roster" from "anon";

revoke insert on table "public"."roster" from "anon";

revoke references on table "public"."roster" from "anon";

revoke select on table "public"."roster" from "anon";

revoke trigger on table "public"."roster" from "anon";

revoke truncate on table "public"."roster" from "anon";

revoke update on table "public"."roster" from "anon";

revoke delete on table "public"."roster" from "authenticated";

revoke insert on table "public"."roster" from "authenticated";

revoke references on table "public"."roster" from "authenticated";

revoke select on table "public"."roster" from "authenticated";

revoke trigger on table "public"."roster" from "authenticated";

revoke truncate on table "public"."roster" from "authenticated";

revoke update on table "public"."roster" from "authenticated";

revoke delete on table "public"."roster" from "service_role";

revoke insert on table "public"."roster" from "service_role";

revoke references on table "public"."roster" from "service_role";

revoke select on table "public"."roster" from "service_role";

revoke trigger on table "public"."roster" from "service_role";

revoke truncate on table "public"."roster" from "service_role";

revoke update on table "public"."roster" from "service_role";

revoke delete on table "public"."squad" from "anon";

revoke insert on table "public"."squad" from "anon";

revoke references on table "public"."squad" from "anon";

revoke select on table "public"."squad" from "anon";

revoke trigger on table "public"."squad" from "anon";

revoke truncate on table "public"."squad" from "anon";

revoke update on table "public"."squad" from "anon";

revoke delete on table "public"."squad" from "authenticated";

revoke insert on table "public"."squad" from "authenticated";

revoke references on table "public"."squad" from "authenticated";

revoke select on table "public"."squad" from "authenticated";

revoke trigger on table "public"."squad" from "authenticated";

revoke truncate on table "public"."squad" from "authenticated";

revoke update on table "public"."squad" from "authenticated";

revoke delete on table "public"."squad" from "service_role";

revoke insert on table "public"."squad" from "service_role";

revoke references on table "public"."squad" from "service_role";

revoke select on table "public"."squad" from "service_role";

revoke trigger on table "public"."squad" from "service_role";

revoke truncate on table "public"."squad" from "service_role";

revoke update on table "public"."squad" from "service_role";

revoke delete on table "public"."swipe" from "anon";

revoke insert on table "public"."swipe" from "anon";

revoke references on table "public"."swipe" from "anon";

revoke select on table "public"."swipe" from "anon";

revoke trigger on table "public"."swipe" from "anon";

revoke truncate on table "public"."swipe" from "anon";

revoke update on table "public"."swipe" from "anon";

revoke delete on table "public"."swipe" from "authenticated";

revoke insert on table "public"."swipe" from "authenticated";

revoke references on table "public"."swipe" from "authenticated";

revoke select on table "public"."swipe" from "authenticated";

revoke trigger on table "public"."swipe" from "authenticated";

revoke truncate on table "public"."swipe" from "authenticated";

revoke update on table "public"."swipe" from "authenticated";

revoke delete on table "public"."swipe" from "service_role";

revoke insert on table "public"."swipe" from "service_role";

revoke references on table "public"."swipe" from "service_role";

revoke select on table "public"."swipe" from "service_role";

revoke trigger on table "public"."swipe" from "service_role";

revoke truncate on table "public"."swipe" from "service_role";

revoke update on table "public"."swipe" from "service_role";

alter table "public"."restaurant" enable row level security;

alter table "public"."roster" enable row level security;

alter table "public"."squad" enable row level security;

alter table "public"."swipe" enable row level security;

create policy "Enable insert for authenticated users only"
on "public"."restaurant"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."restaurant"
as permissive
for select
to public
using (true);


create policy "Enable insert for users based on user_id"
on "public"."roster"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."roster"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."squad"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."squad"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."swipe"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."swipe"
as permissive
for select
to public
using (true);




