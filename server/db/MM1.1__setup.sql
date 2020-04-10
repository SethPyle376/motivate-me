create schema if not exists identity;
create schema if not exists content;

create table if not exists identity.users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    created_on TIMESTAMP NOT NULL DEFAULT transaction_timestamp()
);

create table if not exists content.links (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES identity.users(id),
    link VARCHAR,
    description VARCHAR
);