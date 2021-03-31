-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-03-26 08:59:14.013

-- tables
-- Table: categories
CREATE TABLE categories (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    thumbnail varchar(255) NOT NULL,
    CONSTRAINT categories_pk PRIMARY KEY (id)
);

-- Table: course_chapters
CREATE TABLE course_chapters (
    id int NOT NULL AUTO_INCREMENT,
    courses_id int NOT NULL,
    name varchar(255) NOT NULL,
    required_duration int NOT NULL,
    CONSTRAINT course_chapters_pk PRIMARY KEY (id)
);

-- Table: courses
CREATE TABLE courses (
    id int NOT NULL AUTO_INCREMENT,
    instructor_id int NOT NULL,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    objectives text NULL,
    category_id int NOT NULL,
    requirements text NULL,
    level varchar(255) NULL,
    price int NOT NULL DEFAULT 0,
    banner varchar(255) NOT NULL,
    schedule date NOT NULL,
    start_time time NOT NULL,
    end_time time NOT NULL,
    CONSTRAINT courses_pk PRIMARY KEY (id)
);

-- Table: student_chapter_progress
CREATE TABLE student_chapter_progress (
    id int NOT NULL AUTO_INCREMENT,
    student_course_id int NOT NULL,
    course_chapter_id int NOT NULL,
    start_timestamp timestamp NOT NULL,
    end_timestamp timestamp NOT NULL,
    score int NOT NULL,
    CONSTRAINT student_chapter_progress_pk PRIMARY KEY (id)
);

-- Table: student_course
CREATE TABLE student_course (
    id int NOT NULL AUTO_INCREMENT,
    student_id int NOT NULL,
    course_id int NOT NULL,
    is_paid bool NOT NULL,
    CONSTRAINT student_course_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    full_name varchar(255) NULL,
    username varchar(255) NOT NULL,
    role int NOT NULL DEFAULT 1,
    email varchar(255) NOT NULL,
    avatar varchar(255) NULL,
    password varchar(255) NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: course_chapters_courses (table: course_chapters)
ALTER TABLE course_chapters ADD CONSTRAINT course_chapters_courses FOREIGN KEY course_chapters_courses (courses_id)
    REFERENCES courses (id);

-- Reference: courses_categories (table: courses)
ALTER TABLE courses ADD CONSTRAINT courses_categories FOREIGN KEY courses_categories (category_id)
    REFERENCES categories (id);

-- Reference: enrollment_courses (table: student_course)
ALTER TABLE student_course ADD CONSTRAINT enrollment_courses FOREIGN KEY enrollment_courses (course_id)
    REFERENCES courses (id);

-- Reference: enrollment_users (table: student_course)
ALTER TABLE student_course ADD CONSTRAINT enrollment_users FOREIGN KEY enrollment_users (student_id)
    REFERENCES users (id);

-- Reference: learning_progress_course_chapters (table: student_chapter_progress)
ALTER TABLE student_chapter_progress ADD CONSTRAINT learning_progress_course_chapters FOREIGN KEY learning_progress_course_chapters (course_chapter_id)
    REFERENCES course_chapters (id);

-- Reference: learning_progress_enrollment (table: student_chapter_progress)
ALTER TABLE student_chapter_progress ADD CONSTRAINT learning_progress_enrollment FOREIGN KEY learning_progress_enrollment (student_course_id)
    REFERENCES student_course (id);

-- Reference: users_courses (table: courses)
ALTER TABLE courses ADD CONSTRAINT users_courses FOREIGN KEY users_courses (instructor_id)
    REFERENCES users (id);

-- End of file.

