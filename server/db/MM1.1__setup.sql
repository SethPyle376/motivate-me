create schema if not exists identity;
create schema if not exists content;

create table if not exists identity.user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    picture VARCHAR,
    created_on TIMESTAMP NOT NULL DEFAULT transaction_timestamp(),

    unique(email)
);

create table if not exists content.board (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES identity.user(id),
    name VARCHAR NOT NULL,
    private BOOLEAN NOT NULL
);

create table if not exists content.link (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES identity.user(id),
    board_id BIGINT NOT NULL REFERENCES content.board(id),
    link VARCHAR,
    description VARCHAR
);