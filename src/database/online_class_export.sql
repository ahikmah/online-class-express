-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2021 at 08:00 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_class`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `thumbnail`) VALUES
(1, 'Software', NULL),
(2, 'History', NULL),
(3, 'Psychology', NULL),
(4, 'Finance', NULL),
(5, 'Math', NULL),
(6, 'Science', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `objectives` text DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `banner` varchar(255) DEFAULT NULL,
  `schedule` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `instructor_id`, `name`, `category_id`, `description`, `objectives`, `requirements`, `level`, `price`, `banner`, `schedule`, `start_time`, `end_time`) VALUES
(1, 1, 'Know More Javascript', 1, 'Javascript from the basic for beginner. JavaScript is a programming language that adds interactivity to your website. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms; with dynamic styling; with animation, etc. This className helps you get started with JavaScript and furthers your understanding of what is possible.', '#Build 5 beautiful real-world projects for your portfolio! In these projects, you will learn how to plan and architect your applications using flowcharts and common JavaScript patterns. #Master the JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, and more #Learn modern JavaScript (ES6+) from the beginning: arrow functions, destructuring, spread operator, default arguments, optional chaining (ES2020), and more #How JavaScript works behind the scenes: engines, the call stack, hoisting, scoping, the \"this\" keyword, reference values, and more. #Deep dive into functions: arrow functions, first-class and higher-order functions, bind, and closures. #Deep dive into object-oriented programming: prototypal inheritance, constructor functions (ES5), classes (ES6), encapsulation, abstraction, inheritance, and polymorphism.', '#No coding experience is necessary to take this course! I take you from beginner to expert! #Any computer and OS will work — Windows, macOS or Linux. We will set up your text editor the course. #A basic understanding of HTML and CSS is a plus, but not a must! The course includes an HTML and CSS crash course.', 1, 0, NULL, '2021-03-22', '08:00:00', '08:50:00'),
(2, 1, 'Front-end Fundamental', 1, 'Learn the fundamentals of front end development. If you would like to get started as a front-end web developer, you are going to LOVE this course! Work on projects ranging from a simple HTML page to a complete JavaScript based Google Chrome extension.', '#Front-End development basics #Responsive web design with Bootstrap 4 #How to give interactive view to the pages with jquery #Style web pages using CSS  #How to create web pages working with HTML and CSS #How to code in JavaScript for absolutely beginners', '#No previous development experience required #You need a computer with an internet.', 1, 0, NULL, '2021-01-22', '08:00:00', '09:40:00'),
(3, 1, 'HTML for Beginners', 1, 'HTML from scratch. All that you need to learn about HTML, explained with examples, pure HTML without overwhelming with other technologies!', '#Learn what is HTML and how it works #Learn about HTML tags and HTML elements #Learn about text formatting in HTML #Learn how to link different HTML pages #Learn how to import content from another website in your web page, #Learn about various form elements (input fields, dropdown lists, radio buttons, checkboxes, buttons etc.) #Learn how to optimize your website to be better ranked in searching engines (Google, Yahoo) #We will prepare you for HTML job interview with more than 100 the most common interview questions #Learn how to create HTML documents (web pages) #Learn how to customize HTML elements with HTML attributes #Learn how to organize data in HTML page with tables and list #Learn how to import images in your web pages #Learn how to create HTML forms (login, sign up etc.) #Learn how to validate your form data #Learn how to create website from scratch step-by-step', '#The only prerequisite for attending this course is basic knowledge of any text editor (Notepad, Notepad++ etc.) #You do not need to have any previous knowledge about HTML or website development', 1, 0, NULL, '2021-04-06', '11:00:00', '11:50:00'),
(4, 2, 'History of Europe', 2, 'It’s the encounters that occurred beyond European borders that shaped Europe itself. In this course, you will explore the history of the first encounters modern Europe has had with the rest of the world. You will become familiar with the origins and nature of European interactions with the lands and people beyond its borders across the 15th and early 16th centuries. This includes investigating the discovery of a westward route to the Americas and the building of European empires in the New World.', '#Develop introductory understanding of key events in modern European history.#Analyse modern European imperialism through a variety of themes #Gain experience in analysing a variety of primary sources recorded by Europeans and First Peoples.', '#Have a high interest in history', 2, 10, NULL, '2021-04-06', '11:00:00', '12:40:00'),
(5, 9, 'Molecular Biology', 6, 'Nucleotides have a variety of roles in cellular metabolism. They are the energy currency in metabolic transactions. They are the constituents of nucleic acids: deoxyribonucleic acid (DNA) and ribonucleic acid (RNA), the molecular repositories of genetic information. The structure of every protein is a product of information programmed into the nucleotide sequence of a cell\'s nucleic acids. The ability to store and transmit genetic information from one generation to the next is a fundamental condition for life', '#What is nucleotide? #Structure of nucleotide. #Which nucleotides are unique in DNA and RNA. #Structure of DNA. #Importance of nucleotide. #Organization of nucleotides into nucleic acids. #Timeline of discovery of DNA. #Differences between DNA and RNA.', '#The course is designed for students and researchers of biology, biotechnology, genetics, molecular biology disciplines. #Anyone looking to study molecular biology or biology at college or university and wants quick, to the point knowledge about nucleic acid. #Anyone who wants to persude his carrer in molecular biology, medical and genetics.', 3, 50, NULL, '2021-04-07', '13:00:00', '13:50:00'),
(6, 3, 'Trigonometry', 5, 'Learn everything from Trigonometry and Precalculus, then test your knowledge with 470+ practice questions', '#Angles and their measure, including degrees, DMS and radians #Six circular functions, including sine, cosine, tangent, cosecant, secant, and cotangent #The unit circle, including finding sine and cosine, and how to complete a triangle #Angles in circles, including oriented arcs, circular sectors, and linear and angular velocity #Graphing the trig functions, including sine and cosine graphs, and transformations #Inverse trig functions, including their graphs #Trig identities, including even-odd, sum-difference, half-angle, double-angle, product-to-sum, and sum-to-product identities #The law of sines and the law of cosines, including Heron\'s formula #Polar coordinates, including converting coordinates and equations #Graphing polar curves, including circles, roses, cardioids, limacons, and lemniscates #Parametric curves, including converting and sketching parametric curves #Analytic geometry, including conic sections like circles, ellipses, parabolas, and hyperbolas #Complex numbers, including polar forms and De Moivre\'s theorem Matrices, including solving systems, Gauss-Jordan elimination, and transformations and inverses', '#You should be comfortable with the Fundamentals of Math. #You should be comfortable with basic Algebra, like equation solving. #A little Geometry is helpful, but not absolutely necessary. #We\'ll start the course by talking about angles, so if you know some algebra and geometry basics, you\'ll be well-prepared for the course.', 2, 10, NULL, '2021-04-07', '08:00:00', '09:40:00'),
(7, 10, 'Banking Finance', 4, 'Do you work in the Global Banking & Finance industry? If you do, this is the perfect course for you! Learn the grammar, vocabulary, and skills you need to be more successful. This course is designed for Pre-Intermediate students and is part 1 of a 2 part series on English For Banking & Finance.', '#Learn the grammar and vocabulary used in Banking & Finance. #Learn about the different jobs and careers available in the banking industry. #Learn the skills you need to deal with bank customers.', '#Be able to read and understand English at the Pre Intermediate level. #Have access to a printer.', 3, 50, NULL, '2021-04-08', '08:00:00', '09:40:00'),
(8, 11, 'Buddhism and Modern Psychology', 3, 'This course will examine how Buddhism is faring under this scrutiny. Are neuroscientists starting to understand how meditation “works”? Would such an understanding validate meditation—or might physical explanations of meditation undermine the spiritual significance attributed to it? And how are some of the basic Buddhist claims about the human mind holding up? We’ll pay special attention to some highly counterintuitive doctrines: that the self doesn’t exist, and that much of perceived reality is in some sense illusory. Do these claims, radical as they sound, make a certain kind of sense in light of modern psychology? And what are the implications of all this for how we should live our lives? Can meditation make us not just happier, but better people?', '#The Buddhist Diagnosis #The Buddhist Prescription #Does Your Self Exist?#A New Model of the Mind #Mental Modules and Meditation #What is Enlightenment?', '#No prior knowledge of psychology is necessary for this course.#Openness to confronting prejudice and discrimination in yourself and others.', 1, 0, NULL, '2021-04-08', '08:00:00', '08:50:00'),
(9, 1, 'HTML and CSS to code', 1, 'The easiest way to learn modern web design, HTML5 and CSS3 step-by-step from scratch. Design AND code a huge project.', '#Real-world skills to build real-world websites: professional, beautiful and truly responsive websites #A huge project that will teach you everything you need to know to get started with HTML5 and CSS3 #The proven 7 real-world steps from complete scratch to a fully functional and optimized website #Simple-to-use web design guidelines and tips to make your website stand out from the crowd #Learn super cool jQuery effects like animations, scroll effects and \'sticky\' navigation #Downloadable lectures, code and design assets for the entire project #Get helpful support in the course Q&A #Get my e-book \'Best Resources for Web Design and Development with HTML5 & CSS3\' for free', '#No coding or design experience necessary #Any computer will do — Windows, OSX or Linux #You don’t need to buy any software — we will use the best free web development editor in the world', 2, 10, NULL, '2021-04-08', '13:00:00', '14:40:00'),
(10, 1, 'Java Programming', 1, 'Java is one of the most popular programming languages. Java offers both object oriented and functional programming features. We take a hands-on approach using a combination of JShell and Eclipse as an IDE to illustrate more than 200 Java Coding Exercises, Puzzles, and Code Examples. This course assumes no previous ( beginner ) programming or Java experience. If you’ve never programmed a computer before, or if you already have experience with another programming language and want to quickly learn Java, this is a perfect course for you.', '#Basics of Java Programming - Expressions, Variables, and Printing Output #Java Operators - Java Assignment Operator, Relational and Logical Operators, Short Circuit Operators #ava Conditionals and If Statement #Methods - Parameters, Arguments, and Return Values #Object-Oriented Programming - Class, Object, State, and Behavior #Object-Oriented Programming - Class, Object, State, and Behavior #Basics about Java Data Types - Casting, Operators and More', '#You have an attitude to learn while having fun :) #You have ZERO Programming Experience and Want to Learn Java', 1, 0, NULL, '2021-03-27', '13:00:00', '14:40:00'),
(11, 1, 'Java Programming For Beginner', 1, 'Java is one of the most popular programming languages. Java offers both object oriented and functional programming features. We take a hands-on approach using a combination of JShell and Eclipse as an IDE to illustrate more than 200 Java Coding Exercises, Puzzles, and Code Examples. This course assumes no previous ( beginner ) programming or Java experience. If you’ve never programmed a computer before, or if you already have experience with another programming language and want to quickly learn Java, this is a perfect course for you.', '#Basics of Java Programming - Expressions, Variables, and Printing Output #Java Operators - Java Assignment Operator, Relational and Logical Operators, Short Circuit Operators #ava Conditionals and If Statement #Methods - Parameters, Arguments, and Return Values #Object-Oriented Programming - Class, Object, State, and Behavior #Object-Oriented Programming - Class, Object, State, and Behavior #Basics about Java Data Types - Casting, Operators and More', '#You have an attitude to learn while having fun :) #You have ZERO Programming Experience and Want to Learn Java', 1, 10, NULL, '2021-03-26', '13:00:00', '00:00:14'),
(12, 1, 'Learn Node Js', 1, 'Node.js developers are in high demand and the language is used for everything from traditional web apps with server-side rendered views over REST APIs all the way up to GraphQL APIs and real-time web services. Not to mention its applications in build workflows for projects of all sizes.\r\n\r\nThis course will teach you all of that! From scratch with zero prior knowledge assumed. Though if you do bring some knowledge, you\'ll of course be able to quickly jump into the course modules that are most interesting to you.', '#Basics of Java Programming - Expressions, Variables, and Printing Output #Java Operators - Java Assignment Operator, Relational and Logical Operators, Short Circuit Operators #ava Conditionals and If Statement #Methods - Parameters, Arguments, and Return Values #Object-Oriented Programming - Class, Object, State, and Behavior #Object-Oriented Programming - Class, Object, State, and Behavior #Basics about Java Data Types - Casting, Operators and More', '#You have an attitude to learn while having fun :) #You have ZERO Programming Experience and Want to Learn Java', 3, 50, NULL, '2021-03-26', '13:00:00', '00:00:14'),
(18, 1, 'React JS Course', 1, '-', '-', '-', 3, 50, '/images/1618076664495-banner.jpg', '2021-03-26', '13:00:00', '14:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `course_chapters`
--

CREATE TABLE `course_chapters` (
  `id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_chapters`
--

INSERT INTO `course_chapters` (`id`, `courses_id`, `name`) VALUES
(1, 2, 'HTML Essential Training'),
(2, 2, 'CSS Essential Training'),
(3, 2, 'Javascript Essential Training'),
(4, 2, 'Responsive Layout'),
(5, 2, 'Mid-term Exam'),
(6, 2, 'Bootstrap4 Essential Training'),
(7, 2, 'Learning React.js'),
(8, 2, 'Sass Essential Training'),
(9, 2, 'UX for Web Design'),
(10, 2, 'Final-term Exam'),
(11, 3, 'Introduction to HTML 5'),
(12, 3, 'Text Formatting in HTML'),
(13, 3, 'Creating Links'),
(14, 3, 'Table and Nested Tables'),
(15, 3, 'Embedding Iframes'),
(16, 3, 'Structure of an HTML Page'),
(17, 3, 'Embedding Video'),
(18, 3, 'Anchor Tag'),
(19, 3, 'Building Forms'),
(20, 3, 'Inserting Image');

-- --------------------------------------------------------

--
-- Table structure for table `student_chapter_progress`
--

CREATE TABLE `student_chapter_progress` (
  `student_course_id` int(11) NOT NULL,
  `course_chapter_id` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_chapter_progress`
--

INSERT INTO `student_chapter_progress` (`student_course_id`, `course_chapter_id`, `score`) VALUES
(1, 1, 100),
(1, 2, 42),
(1, 3, 21),
(1, 4, 98),
(1, 5, 86),
(1, 6, 72),
(1, 7, 65),
(1, 8, NULL),
(1, 9, NULL),
(1, 10, NULL),
(3, 11, 100),
(3, 12, 92),
(3, 13, 81),
(3, 14, 98),
(3, 15, 86),
(3, 16, 72),
(3, 17, 90),
(3, 18, 78),
(3, 19, 0),
(3, 20, NULL),
(2, 1, 100),
(2, 2, 82),
(2, 3, 91),
(2, 4, 98),
(2, 5, 96),
(2, 6, 80),
(2, 7, 60),
(2, 8, NULL),
(2, 9, NULL),
(2, 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_course`
--

CREATE TABLE `student_course` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_course`
--

INSERT INTO `student_course` (`id`, `student_id`, `course_id`) VALUES
(1, 6, 2),
(2, 4, 2),
(3, 6, 3),
(4, 2, 3),
(5, 6, 1),
(6, 6, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `role` int(11) DEFAULT 2,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `role`, `email`, `avatar`, `password`) VALUES
(1, 'Aman Ansari', 'ansari_aman', 1, 'amanansariofc@gmail.com', '/images/1618076738579-avatar.jpg', '$2b$10$5KnFXlHAfI36B4I5DAq7h.QqrPOXTJyQwuM1X9JUadxYtlrU/5A5a'),
(2, 'Tia Ellison', 'tiaell', 1, 'tiaell@gmail.com', NULL, '$2b$10$uHPtJP09a.3u0nozSU6na.Hu8LrclR/zHskVX.81tPosl9xQuPf2u'),
(3, 'Abid Hardy', 'hardyabid', 1, 'hardyabid@gmail.com', NULL, '$2b$10$W7GEt2SctFm6.hMY/ky6QOB7yoIYzxocBuViuZLmm7tHQIfTFs4CS'),
(4, 'Jamaal Freeman', 'mas_jamal', 2, 'masjamal@gmail.com', NULL, '$2b$10$Yru4HrBxg/uDMlI.e6sPaOIUuKo4C/62d2w/xv1DelXxWurYVd46.'),
(5, 'Shayne Merrill', 'shyane', 2, 'shaynemerril@gmail.com', NULL, '$2b$10$BwrJZTjg4qr2PmHX9UT2QOY9K8KUPntZKgYjZchKoN8j.kltPz5lK'),
(6, 'Buddy Gaines', 'bangbuddy', 2, 'buddygaines@gmail.com', NULL, '$2b$10$26ExW4rvByzixV9QY9gYVuxXCpW/7XqFqy..QAPHnxFFb0msT.NkS'),
(7, 'Taslima Bruce', 'taslimbruce', 2, 'taslimbruce@gmail.com', NULL, '$2b$10$jPBPLC0Sg2tlbNdDPmODFuVt1uK6J9musUZWNa562kaByLUwuk5PW'),
(8, 'Anayah Jensen', 'anayah', 2, 'anayahjensen@gmail.com', NULL, '$2b$10$J7nKchEyrA88LFoe0T.J9eADgdGmJM5tGftT2uGdbCaPF/YVBGdYG'),
(9, 'Mihai Caldwell', 'mihayyy', 1, 'mihayywell@gmail.com', NULL, '$2b$10$36Tu0iwOUUNtrzQoSAZRl.bunXe6SlQOpWh.O6H9dzfX907Tutjv6'),
(10, 'Chelsey Fisher', 'chelchel', 1, 'chelchel@gmail.com', NULL, '$2b$10$U5EatyeSOBZFC.E2NGMmoemZ0y7nGH.P/opyijI2Cesn8Mf12UJXS'),
(11, 'Amelia-Mae Farmer', 'maemelia', 1, 'maemelia@gmail.com', NULL, '$2b$10$aChvS4MwayQ6g8AnsPlll.wB.rIaeMCsQJNUeOpSLr.NC2C2cLSHO'),
(12, 'Awaliyatul Hikmah', 'ahikmah', 2, 'imadlz15@gmail.com', NULL, '$2b$10$wd5alNGyM6g8wzq.9CSM0eP3TDPBUMdQblXNHvhRPmvUmeNN7Z4R6'),
(13, 'Itsna Maulana Hasan', 'hasann', 2, 'hasanmaul@gmail.com', NULL, '$2b$10$yndVMvtp81Q4XPbauv3edegwsiczQCWt.GI.rqKAXYloRXiBkaKTS'),
(14, 'Endang Mintartik', 'endming', 2, 'endming@gmail.com', NULL, '$2b$10$nSil5X7voqPrjcCUKjZAt.YgZYG5Wnk7K5ToKsNu8FCbrIKpE1gCW'),
(15, 'Mooza Harriet', 'moozaharriet', 2, 'moozaharriet@gmail.com', NULL, '$2b$10$Z6smFJd1/HcxBZRy7VKqsOBRWZRBT/ww.C0tD7ubxRXeKTLaJB2zS'),
(16, 'Zain Ansari', 'ansari_zain', 2, 'zainn@gmail.com', NULL, '$2b$10$F8A7kNf.DDpBqpNI60jpzOrJ9OVhYW2YFXf6.1hyzTyQ3K2sSVsDq'),
(17, 'Kobe Norton', 'bumbukobe', 2, 'kobenorton@gmail.com', NULL, '$2b$10$OuPqkS.MNb42oRKs9/N8w.osLljMbjFaOyZ78iDLhlTlua6NdCcSq'),
(19, 'Phillip Perry', 'phillips', 1, 'phillips@gmail.com', NULL, '$2b$10$ZtjtUpa39iRnKfdD.FoyV.LDUXgGvSFaxDDyZ0vfMxAtS7AqGS25m'),
(20, 'Jackson Pilkington', 'jackpilk', 1, 'jackpilk@gmail.com', NULL, '$2b$10$Fc7ebLnnx.i4oZgcdpEL1exFk9qp2r/yAb6bThdWnUbQ1JRLqsZDW'),
(21, 'Juliet Hoop', 'juhoop', 1, 'juhoop@gmail.com', NULL, '$2b$10$6X1Q6yEw71Yc6gETPiEngOyQjY.7WM6.So1LwOY4OQeO4B4XyJHJu'),
(114, NULL, 'ahikmah99', 2, 'awalhikmah99@gmail.com', NULL, '$2b$10$lUmU5ltkDKSkni6KFaeefOaHc2tm2rM4NaI.1pBkxMQLr.JWuaQ16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_categories` (`category_id`),
  ADD KEY `users_courses` (`instructor_id`);

--
-- Indexes for table `course_chapters`
--
ALTER TABLE `course_chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_chapters_courses` (`courses_id`);

--
-- Indexes for table `student_chapter_progress`
--
ALTER TABLE `student_chapter_progress`
  ADD KEY `learning_progress_course_chapters` (`course_chapter_id`),
  ADD KEY `learning_progress_enrollment` (`student_course_id`);

--
-- Indexes for table `student_course`
--
ALTER TABLE `student_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `enrollment_courses` (`course_id`),
  ADD KEY `enrollment_users` (`student_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `course_chapters`
--
ALTER TABLE `course_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `student_course`
--
ALTER TABLE `student_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `users_courses` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `course_chapters`
--
ALTER TABLE `course_chapters`
  ADD CONSTRAINT `course_chapters_courses` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `student_chapter_progress`
--
ALTER TABLE `student_chapter_progress`
  ADD CONSTRAINT `learning_progress_course_chapters` FOREIGN KEY (`course_chapter_id`) REFERENCES `course_chapters` (`id`),
  ADD CONSTRAINT `learning_progress_enrollment` FOREIGN KEY (`student_course_id`) REFERENCES `student_course` (`id`);

--
-- Constraints for table `student_course`
--
ALTER TABLE `student_course`
  ADD CONSTRAINT `enrollment_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `enrollment_users` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
