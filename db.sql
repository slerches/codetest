-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) unique NOT NULL,
    email VARCHAR(255) unique NOT NULL,
    password VARCHAR(255) NOT NULL,
    s_token VARCHAR(255),
    salt  VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet table
CREATE TABLE wallet (
    wallet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(5),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Transactions table
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id VARCHAR(255),
    wallet_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_desc VARCHAR(255),
    sender VARCHAR(255),
    recipient VARCHAR(255),
    FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id)
);

-- Idempotency table
CREATE TABLE idempotency (
    id VARCHAR(255) unique NOT NULL,
    trans_id VARCHAR(255) unique NOT NULL
);