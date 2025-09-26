CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
name TEXT,
role TEXT NOT NULL DEFAULT 'dealer',
created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE oem_specs (
id INTEGER PRIMARY KEY AUTOINCREMENT,
manufacturer TEXT NOT NULL,
model TEXT NOT NULL,
year INTEGER NOT NULL,
list_price REAL,
colors TEXT,
mileage REAL,
power_bhp REAL,
max_speed_kmph REAL,
created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE marketplace_inventory (
id INTEGER PRIMARY KEY AUTOINCREMENT,
dealer_id INTEGER NOT NULL,
oem_id INTEGER, 
title TEXT NOT NULL,
description TEXT,
price REAL NOT NULL,
kms_on_odometer INTEGER,
major_scratches BOOLEAN DEFAULT 0,
original_paint BOOLEAN DEFAULT 1,
accidents_reported INTEGER DEFAULT 0,
previous_buyers INTEGER DEFAULT 1,
registration_place TEXT,
created_at TEXT DEFAULT (datetime('now')),
FOREIGN KEY(dealer_id) REFERENCES users(id),
FOREIGN KEY(oem_id) REFERENCES oem_specs(id)
);

CREATE TABLE images (
id INTEGER PRIMARY KEY AUTOINCREMENT,
inventory_id INTEGER NOT NULL,
url TEXT NOT NULL,
alt TEXT,
created_at TEXT DEFAULT (datetime('now')),
FOREIGN KEY(inventory_id) REFERENCES marketplace_inventory(id)
);

CREATE TABLE sessions (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
token TEXT NOT NULL UNIQUE,
expires_at TEXT,
created_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO users (email, password_hash, name, role) VALUES
('d1@buycars.com', 'hashed_pw_1', 'DealOne', 'dealer'),
('d2@buycars.com', 'hashed_pw_2', 'DealTwo', 'dealer');

INSERT INTO oem_specs (manufacturer, model, year, list_price, colors, mileage, power_bhp, max_speed_kmph) VALUES
('Honda', 'City', 2015, 900000, 'Red', 18.0, 119, 180),
('Maruti', 'Swift', 2016, 600000, 'White,Silver', 22.0, 84, 170),
('BMW', 'New', 2017, 3500000, 'Black,White,Blue', 12.0, 180, 240);

INSERT INTO marketplace_inventory (dealer_id, oem_id, title, description, price, kms_on_odometer, major_scratches, original_paint, accidents_reported, previous_buyers, registration_place) VALUES
(1, 1, '2015 Honda City - Well maintained', 'Image:r"E:\Folder\7Internshipsss\attryb\honda.jpg"; 5-point: Good tyres; New brakes; Single owner; Service done', 450000, 55000, 0, 1, 0, 1, 'Delhi'),
(1, 2, '2016 Maruti Swift - Excellent', 'Image:r"E:\Folder\7Internshipsss\attryb\maruti_swift.jpg"; 5-point: Low kms; Great condition; Recently serviced', 350000, 42000, 0, 1, 0, 1, 'Mumbai');


INSERT INTO images (inventory_id, url, alt) VALUES
(1, "E:\Folder\7Internshipsss\attryb\honda.jpg", 'front view'),
(1, "E:\Folder\7Internshipsss\attryb\honda.jpg"'/images/honda_city_2015_2.jpg', 'side view'),
(2, "E:\Folder\7Internshipsss\attryb\maruti_front.jpg", 'front');