export default `
create table users (
    id SERIAL PRIMARY KEY,
    first_name varchar(100),
    last_name varchar(100)
);

create table weathers (
  id Serial PRIMARY KEY,
  user_id int8 REFERENCES users,
  ip_address varchar(20) not null,
  lat_position real,
  lon_position real,
  solar_rad int,
  clouds int,
  wind varchar(20),
  temp int,
  sunrise varchar(40),
  sunset varchar(40),

  processing boolean default false,
  processed boolean default false,
  error text,
  env varchar(20) default 'dev',
  create_date timestamp default now(),
  updated_date timestamp default now()
);
`;