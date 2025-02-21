create table users (
	id serial primary key,
	name varchar(50),
	role varchar(10),
	email varchar(50),
	password varchar(255),
	created_at TIMESTAMP with TIME ZONE DEFAULT CURRENT_TIMESTAMP
)


create table tokeninvalid (
	id serial primary key,
	name varchar(50),
	token varchar(255),
	exp varchar(50)
)