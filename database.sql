-- create the database
CREATE DATABASE dorm_defender;

-- select database being used
USE dorm_defender;

CREATE TABLE residents (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- creates a unique identifier for each resident automatically
    dorm_number VARCHAR(10) NOT NULL,       -- stores the dorm number with a maximum length of 10 characters
    student_name VARCHAR(100) NOT NULL,     -- student name 
    lsuid VARCHAR(10) NOT NULL UNIQUE,      -- ensures no two residents can have the same LSUID, preventing duplicate entries
    passcode VARCHAR(255) NOT NULL          -- password or passcode
    failed_attempts INT DEFAULT 0,          -- stores the number of failed login attempts
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- stores the timestamp of the last login attempt
);

-- mysql -u root -p