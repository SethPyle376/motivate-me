insert into identity.user(first_name, last_name, email, picture)
values ('Seth', 'Pyle', 'seth.pyle86@gmail.com', 'https://lh3.googleusercontent.com/a-/AOh14GgvwKiCMvLOWOqdRAMQ_ApTEedg3w_cSWA7JYV3Kg=s96-c');

insert into content.board(user_id, name, private)
values (1, 'Goals', FALSE);

insert into content.link(user_id, board_id, link, description)
values (1, 1, 'https://www.well-played.com.au/wp-content/uploads/2019/06/Bethesda-logo-1080.png', 'Bethesda Softworks');

insert into content.link(user_id, board_id, link, description)
values (1, 1, 'https://photos.zillowstatic.com/cc_ft_768/ISrheom2krf4lj1000000000.webp', 'Springfield House');