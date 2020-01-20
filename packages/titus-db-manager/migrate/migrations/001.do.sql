CREATE TABLE some_table (
    id SERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name VARCHAR(64),
    short_desc VARCHAR(128),
    detailed_desc VARCHAR(1024)
);
