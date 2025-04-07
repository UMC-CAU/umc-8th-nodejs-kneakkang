create database missionApp;

-- user
CREATE TABLE user (
    id BIGINT PRIMARY KEY,
    name VARCHAR(8),
    gender VARCHAR(8),
    age INT,
    address VARCHAR(50),
    email VARCHAR(40),
    telephone VARCHAR(15),
    point INT,
    status BOOLEAN,
    social_type VARCHAR(20)
);

-- region
CREATE TABLE region (
    id BIGINT PRIMARY KEY,
    name VARCHAR(20),
    created_at DATETIME,
    updated_at DATETIME
);

-- owner
CREATE TABLE owner (
    id BIGINT PRIMARY KEY,
    number BIGINT,
    created_at DATETIME,
    updated_at DATETIME
);

-- store
CREATE TABLE store (
    id BIGINT PRIMARY KEY,
    name VARCHAR(60),
    address VARCHAR(150),
    type VARCHAR(15),
    status BOOLEAN,
    region_id BIGINT,
    owner_id BIGINT,
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (region_id) REFERENCES region(id),
    FOREIGN KEY (owner_id) REFERENCES owner(id)
);

-- mission
CREATE TABLE mission (
    id BIGINT PRIMARY KEY,
    store_id BIGINT,
    point INT,
    deadline VARCHAR(6),
    mission_detail TEXT,
    FOREIGN KEY (store_id) REFERENCES store(id),
    created_at DATETIME,
    updated_at DATETIME
);

-- user_mission
CREATE TABLE user_mission (
    id BIGINT PRIMARY KEY,
    mission_id BIGINT,
    status BOOLEAN,
    owner_num BIGINT,
    user_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (mission_id) REFERENCES mission(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- food_category
CREATE TABLE food_category (
    id BIGINT PRIMARY KEY,
    name VARCHAR(15),
    create_at DATETIME,
    update_at DATETIME
);

-- user_pref
CREATE TABLE user_pref (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    category_id BIGINT,
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (category_id) REFERENCES food_category(id)
);

-- review
CREATE TABLE review (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    store_id BIGINT,
    star INT,
    content TEXT,
    image TEXT,
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- review_answer
CREATE TABLE review_answer (
    id BIGINT PRIMARY KEY,
    owner_id BIGINT,
    store_id BIGINT,
    content TEXT,
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (owner_id) REFERENCES user(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- agree
CREATE TABLE agree (
    id BIGINT PRIMARY KEY,
    content TEXT,
    agree_location BOOLEAN,
    agree_marketing BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME
);

-- user_agree
CREATE TABLE user_agree (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    agree_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (agree_id) REFERENCES agree(id)
);

-- inquiry
CREATE TABLE inquiry (
    id BIGINT PRIMARY KEY,
    title VARCHAR(60),
    content TEXT,
    image TEXT,
    inquiry_type VARCHAR(20),
    create_at DATETIME,
    update_at DATETIME
);

-- user_inquiry
CREATE TABLE user_inquiry (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    inquiry_id BIGINT,
    create_at DATETIME,
    update_at DATETIME,
    status BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (inquiry_id) REFERENCES inquiry(id)
);

INSERT INTO region (id, name, created_at, updated_at) VALUES (1, 'Seoul', '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO owner (id, number, created_at, updated_at) VALUES (1, 1234567890, '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO user (id, name, gender, age, address, email, telephone, point, status, social_type)
VALUES (1, 'Alice', 'Female', 28, 'Seoul, Korea', 'alice@example.com', '010-1234-5678', 1000, TRUE, 'KAKAO');

INSERT INTO store (id, name, address, type, status, region_id, owner_id, create_at, update_at)
VALUES (1, 'Kimbap Heaven', '123 Seoul Street', 'Korean', TRUE, 1, 1, '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO mission (id, store_id, point, deadline, mission_detail, created_at, updated_at)
VALUES (1, 1, 500, '0425', 'Spend over 12,000 KRW', '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO user_mission (id, mission_id, status, owner_num, user_id, created_at, updated_at)
VALUES (1, 1, TRUE, 1234567890, 1, '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO food_category (id, name, create_at, update_at) VALUES (1, 'Korean', '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO user_pref (id, user_id, category_id, create_at, update_at) VALUES (1, 1, 1, '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO review (id, user_id, store_id, star, content, image, create_at, update_at)
VALUES (1, 1, 1, 5, 'Great food!', 'image1.jpg', '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO review_answer (id, owner_id, store_id, content, create_at, update_at)
VALUES (1, 1, 1, 'Thank you for your review!', '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO agree (id, content, agree_location, agree_marketing, created_at, updated_at)
VALUES (1, 'Terms of Service', TRUE, True, '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO user_agree (id, user_id, agree_id, created_at, updated_at)
VALUES (1, 1, 1, '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO inquiry (id, title, content, image, inquiry_type, create_at, update_at)
VALUES (1, 'Login Issue', 'I can’t log in', 'screenshot.png', 'Technical', '2025-04-07 07:11:11', '2025-04-07 07:11:11');

INSERT INTO user_inquiry (id, user_id, inquiry_id, create_at, update_at, status)
VALUES (1, 1, 1, '2025-04-07 07:11:11', '2025-04-07 07:11:11', TRUE);

ALTER TABLE owner
ADD COLUMN store_id BIGINT;

ALTER TABLE owner
ADD CONSTRAINT fk_owner_store
FOREIGN KEY (store_id) REFERENCES store(id);

UPDATE owner SET store_id = 1 WHERE id = 1;