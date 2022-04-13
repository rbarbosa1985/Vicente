INSERT INTO tb_role (authority) VALUES ('ROLE_GUEST');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Tania', 'Correa', 'tania@gmail.com', '$2a$10$48T5p86uueiaX6Uc698haue8bN97/Jg3YGxd3gqr/yq5oLu0KJUAy');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Felippe', 'Correa', 'felippe@gmail.com', '$2a$10$48T5p86uueiaX6Uc698haue8bN97/Jg3YGxd3gqr/yq5oLu0KJUAy');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Roberto', 'Barbosa', 'betoanselmo@gmail.com', '$2a$10$48T5p86uueiaX6Uc698haue8bN97/Jg3YGxd3gqr/yq5oLu0KJUAy');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_guest (name, email, telephone, status, invitation, user_id) VALUES ('Roberto', 'betoanselmo@gmail.com', '21984467508', false, 4,3);

INSERT INTO tb_dependent (name, guest_id) VALUES ('Beatriz', 1 );
INSERT INTO tb_dependent (name, guest_id) VALUES ('Roberto', 1 );
