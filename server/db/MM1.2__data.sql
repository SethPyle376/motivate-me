insert into identity.user(first_name, last_name, email)
values ('Seth', 'Pyle', 'seth.pyle86@gmail.com');

insert into content.board(user_id, name, private)
values (1, 'Goals', FALSE);

insert into content.link(user_id, board_id, link, description)
values (1, 1, 'https://www.well-played.com.au/wp-content/uploads/2019/06/Bethesda-logo-1080.png', 'Bethesda Softworks');