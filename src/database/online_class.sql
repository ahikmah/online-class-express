INSERT INTO 
	users(full_name, username, role, email, password)
VALUES
	('Aman Ansari', 'ansari_aman', 1, 'amanansariofc@gmail.com', md5('amanadmin')), 
	('Tia Ellison', 'tiaell', 1, 'awalhikmah99@gmail.com', md5('tiaelladmin')), 
	('Abid Hardy', 'hardyabid', 1, 'hardyabid@gmail.com', md5('hardyadmin')), 
	('Jamaal Freeman', 'mas_jamal', 2, 'masjamal@gmail.com', md5('12345')), 
	('Shayne Merrill', 'shyane', 2, 'shaynemerril@gmail.com', md5('12345')), 
	('Buddy Gaines', 'bangbuddy', 2, 'buddygaines@gmail.com', md5('12345')), 
	('Taslima Bruce', 'taslimbruce', 2, 'taslimbruce@gmail.com', md5('12345')), 
	('Anayah Jensen', 'anayah', 2, 'anayahjensen@gmail.com', md5('12345'))
	('Mihai Caldwell', 'mihayyy', 1, 'mihayywell@gmail.com', md5('mihayadmin'))
	('Chelsey Fisher', 'chelchel', 1, 'chelchel@gmail.com', md5('chelcheladmin')),
	('Amelia-Mae Farmer', 'maemelia', 1, 'maemelia@gmail.com', md5('maemelialadmin'))

INSERT INTO
    categories(name)
VALUES
    ('Software'),
    ('History'),
    ('Psychology'),
    ('Finance'),
    ('Math')


INSERT INTO
    courses(instructor_id, name, category_id, description, objectives, requirements, level, price, schedule, start_time, end_time) 
VALUES
    (1,
    
    'Know More Javascript',

    1,
    
    'Javascript from the basic for beginner. JavaScript is a programming language that adds interactivity to your website. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms; with dynamic styling; with animation, etc. This className helps you get started with JavaScript and furthers your understanding of what is possible.',

    
    '#Build 5 beautiful real-world projects for your portfolio! In these projects, you will learn how to plan and architect your applications using flowcharts and common JavaScript patterns. #Master the JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, and more #Learn modern JavaScript (ES6+) from the beginning: arrow functions, destructuring, spread operator, default arguments, optional chaining (ES2020), and more #How JavaScript works behind the scenes: engines, the call stack, hoisting, scoping, the "this" keyword, reference values, and more. #Deep dive into functions: arrow functions, first-class and higher-order functions, bind, and closures. #Deep dive into object-oriented programming: prototypal inheritance, constructor functions (ES5), classes (ES6), encapsulation, abstraction, inheritance, and polymorphism.',

    '#No coding experience is necessary to take this course! I take you from beginner to expert! #Any computer and OS will work — Windows, macOS or Linux. We will set up your text editor the course. #A basic understanding of HTML and CSS is a plus, but not a must! The course includes an HTML and CSS crash course.',
    
    1,

    0,

    '2021-03-26',

    '08:00:00',

    '08:50:00'

    ),



    (1,
    
    'Front-end Fundamental',

    1,
    
    'Learn the fundamentals of front end development. If you would like to get started as a front-end web developer, you are going to LOVE this course! Work on projects ranging from a simple HTML page to a complete JavaScript based Google Chrome extension.',

    
    '#Front-End development basics #Responsive web design with Bootstrap 4 #How to give interactive view to the pages with jquery #Style web pages using CSS  #How to create web pages working with HTML and CSS #How to code in JavaScript for absolutely beginners',

    '#No previous development experience required #You need a computer with an internet.',
    
    1,

    0,

    '2021-04-05',

    '08:00:00',

    '09:40:00'

    ),




    (1,
    
    'HTML for Beginners',

    1,
    
    'HTML from scratch. All that you need to learn about HTML, explained with examples, pure HTML without overwhelming with other technologies!',

    
    '#Learn what is HTML and how it works #Learn about HTML tags and HTML elements #Learn about text formatting in HTML #Learn how to link different HTML pages #Learn how to import content from another website in your web page, #Learn about various form elements (input fields, dropdown lists, radio buttons, checkboxes, buttons etc.) #Learn how to optimize your website to be better ranked in searching engines (Google, Yahoo) #We will prepare you for HTML job interview with more than 100 the most common interview questions #Learn how to create HTML documents (web pages) #Learn how to customize HTML elements with HTML attributes #Learn how to organize data in HTML page with tables and list #Learn how to import images in your web pages #Learn how to create HTML forms (login, sign up etc.) #Learn how to validate your form data #Learn how to create website from scratch step-by-step',

    '#The only prerequisite for attending this course is basic knowledge of any text editor (Notepad, Notepad++ etc.) #You do not need to have any previous knowledge about HTML or website development',
    
    1,

    0,

    '2021-04-06',

    '11:00:00',

    '11:50:00'

    ),



    (2,
    
    'History of Europe',

    2,
    
    'It’s the encounters that occurred beyond European borders that shaped Europe itself. In this course, you will explore the history of the first encounters modern Europe has had with the rest of the world. You will become familiar with the origins and nature of European interactions with the lands and people beyond its borders across the 15th and early 16th centuries. This includes investigating the discovery of a westward route to the Americas and the building of European empires in the New World.',

    
    '#Develop introductory understanding of key events in modern European history.#Analyse modern European imperialism through a variety of themes #Gain experience in analysing a variety of primary sources recorded by Europeans and First Peoples.',

    '#Have a high interest in history',
    
    2,

    10,

    '2021-04-06',

    '11:00:00',

    '12:40:00'

    ),



    (9,
    
    'Molecular Biology',

    6,
    
    "Nucleotides have a variety of roles in cellular metabolism. They are the energy currency in metabolic transactions. They are the constituents of nucleic acids: deoxyribonucleic acid (DNA) and ribonucleic acid (RNA), the molecular repositories of genetic information. The structure of every protein is a product of information programmed into the nucleotide sequence of a cell's nucleic acids. The ability to store and transmit genetic information from one generation to the next is a fundamental condition for life",

    
    "#What is nucleotide? #Structure of nucleotide. #Which nucleotides are unique in DNA and RNA. #Structure of DNA. #Importance of nucleotide. #Organization of nucleotides into nucleic acids. #Timeline of discovery of DNA. #Differences between DNA and RNA.",

    "#The course is designed for students and researchers of biology, biotechnology, genetics, molecular biology disciplines. #Anyone looking to study molecular biology or biology at college or university and wants quick, to the point knowledge about nucleic acid. #Anyone who wants to persude his carrer in molecular biology, medical and genetics.",
    
    3,

    50,

    '2021-04-07',

    '13:00:00',

    '13:50:00'

    ),



    (3,
    
    'Trigonometry',

    5,
    
    'Learn everything from Trigonometry and Precalculus, then test your knowledge with 470+ practice questions',

    
    "#Angles and their measure, including degrees, DMS and radians #Six circular functions, including sine, cosine, tangent, cosecant, secant, and cotangent #The unit circle, including finding sine and cosine, and how to complete a triangle #Angles in circles, including oriented arcs, circular sectors, and linear and angular velocity #Graphing the trig functions, including sine and cosine graphs, and transformations #Inverse trig functions, including their graphs #Trig identities, including even-odd, sum-difference, half-angle, double-angle, product-to-sum, and sum-to-product identities #The law of sines and the law of cosines, including Heron's formula #Polar coordinates, including converting coordinates and equations #Graphing polar curves, including circles, roses, cardioids, limacons, and lemniscates #Parametric curves, including converting and sketching parametric curves #Analytic geometry, including conic sections like circles, ellipses, parabolas, and hyperbolas #Complex numbers, including polar forms and De Moivre's theorem Matrices, including solving systems, Gauss-Jordan elimination, and transformations and inverses",

    "#You should be comfortable with the Fundamentals of Math. #You should be comfortable with basic Algebra, like equation solving. #A little Geometry is helpful, but not absolutely necessary. #We'll start the course by talking about angles, so if you know some algebra and geometry basics, you'll be well-prepared for the course.",
    
    2,

    10,

    '2021-04-07',

    '08:00:00',

    '09:40:00'

    ),



    (10,
    
    'Banking Finance',

    4,
    
    'Do you work in the Global Banking & Finance industry? If you do, this is the perfect course for you! Learn the grammar, vocabulary, and skills you need to be more successful. This course is designed for Pre-Intermediate students and is part 1 of a 2 part series on English For Banking & Finance.',

    
    "#Learn the grammar and vocabulary used in Banking & Finance. #Learn about the different jobs and careers available in the banking industry. #Learn the skills you need to deal with bank customers.",

    "#Be able to read and understand English at the Pre Intermediate level. #Have access to a printer.",
    
    3,

    50,

    '2021-04-08',

    '08:00:00',

    '09:40:00'

    ),



    (10,
    
    'Buddhism and Modern Psychology',

    3,
    
    'This course will examine how Buddhism is faring under this scrutiny. Are neuroscientists starting to understand how meditation “works”? Would such an understanding validate meditation—or might physical explanations of meditation undermine the spiritual significance attributed to it? And how are some of the basic Buddhist claims about the human mind holding up? We’ll pay special attention to some highly counterintuitive doctrines: that the self doesn’t exist, and that much of perceived reality is in some sense illusory. Do these claims, radical as they sound, make a certain kind of sense in light of modern psychology? And what are the implications of all this for how we should live our lives? Can meditation make us not just happier, but better people?',

    
    "#The Buddhist Diagnosis #The Buddhist Prescription #Does Your Self Exist?#A New Model of the Mind #Mental Modules and Meditation #What is Enlightenment?",

    "#No prior knowledge of psychology is necessary for this course.#Openness to confronting prejudice and discrimination in yourself and others.",
    
    1,

    0,

    '2021-04-08',

    '08:00:00',

    '08:50:00'

    )



    (1,
    
    'HTML and CSS to code',

    1,
    
    'The easiest way to learn modern web design, HTML5 and CSS3 step-by-step from scratch. Design AND code a huge project.',

    
    "#Real-world skills to build real-world websites: professional, beautiful and truly responsive websites #A huge project that will teach you everything you need to know to get started with HTML5 and CSS3 #The proven 7 real-world steps from complete scratch to a fully functional and optimized website #Simple-to-use web design guidelines and tips to make your website stand out from the crowd #Learn super cool jQuery effects like animations, scroll effects and 'sticky' navigation #Downloadable lectures, code and design assets for the entire project #Get helpful support in the course Q&A #Get my e-book 'Best Resources for Web Design and Development with HTML5 & CSS3' for free",

    "#No coding or design experience necessary #Any computer will do — Windows, OSX or Linux #You don’t need to buy any software — we will use the best free web development editor in the world",
    
    2,

    10,

    '2021-04-08',

    '13:00:00',

    '14:40:00'

    )

    


INSERT INTO 
	course_chapters(courses_id, name, required_duration)
VALUES 
	(2, "HTML Essential Training", 6000)
	(2, "CSS Essential Training", 6000)
	(2, "Javascript Essential Training", 6000)
	(2, "Responsive Layout", 6000)
	(2, "Mid-term Exam", 6000)
	(2, "Bootstrap4 Essential Training", 6000)
	(2, "Learning React.js", 6000)
	(2, "Sass Essential Training", 6000)
	(2, "UX for Web Design", 6000)
	(2, "Final-term Exam", 6000)


INSERT INTO 
	course_chapters(courses_id, name, required_duration)
VALUES 
	(3, "Introduction to HTML 5", 6000),
	(3, "Text Formatting in HTML", 6000),
	(3, "Creating Links", 6000),
	(3, "Table and Nested Tables", 6000),
	(3, "Embedding Iframes", 6000),
	(3, "Structure of an HTML Page", 6000),
	(3, "Embedding Video", 6000),
	(3, "Anchor Tag", 6000),
	(3, "Building Forms", 6000),
	(3, "Inserting Image", 6000)

INSERT INTO 
	student_course(student_id, course_id, is_paid) 
VALUES
	(6, 2, 1)
INSERT INTO 
	student_course(student_id, course_id, is_paid) 
VALUES
	(6, 3, 1)


INSERT INTO 
	student_chapter_progress(student_course_id, course_chapter_id, start_timestamp, end_timestamp, score)
VALUES 
    (1, 1,'2021-01-22 08:00:00',  '2021-01-22 09:40:00',100)
    (1, 2,'2021-01-29 08:00:00',  '2021-01-22 09:40:00',42)
    (1, 3,'2021-02-05 08:00:00',  '2021-02-05 09:40:00',21)
    (1, 4,'2021-02-12 08:00:00',  '2021-02-12 09:40:00',98)
    (1, 5,'2021-02-19 08:00:00',  '2021-02-19 09:40:00',86)
    (1, 6,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',72)
    (1, 7,null,  null, null)
    (1, 8,null,  null, null)
    (1, 9,null,  null, null)
    (1, 10,null, null, null)


INSERT INTO 
	student_chapter_progress(student_course_id, course_chapter_id, start_timestamp, end_timestamp, score)
VALUES 
    (3, 1,'2021-01-22 08:00:00',  '2021-01-22 09:40:00',100)
    (3, 2,'2021-01-29 08:00:00',  '2021-01-22 09:40:00',92)
    (3, 3,'2021-02-05 08:00:00',  '2021-02-05 09:40:00',81)
    (3, 4,'2021-02-12 08:00:00',  '2021-02-12 09:40:00',98)
    (3, 5,'2021-02-19 08:00:00',  '2021-02-19 09:40:00',86)
    (3, 6,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',72)
    (3, 7,'2021-02-26 08:00:00',  '2021-02-26 09:40:00', 90)
    (3, 8,'2021-02-26 08:00:00',  '2021-02-26 09:40:00', 78)
    (3, 9,null,  null, null)
    (3, 10,null, null, null)


    INSERT INTO 
	student_chapter_progress(student_course_id, course_chapter_id, start_timestamp, end_timestamp, score)
VALUES 
    (2, 1,'2021-01-22 08:00:00',  '2021-01-22 09:40:00',100)
    (2, 2,'2021-01-29 08:00:00',  '2021-01-22 09:40:00',82)
    (2, 3,'2021-02-05 08:00:00',  '2021-02-05 09:40:00',91)
    (2, 4,'2021-02-12 08:00:00',  '2021-02-12 09:40:00',98)
    (2, 5,'2021-02-19 08:00:00',  '2021-02-19 09:40:00',96)
    (2, 6,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',92)
    (2, 7,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',91)
    (2, 8,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',93)
    (2, 9,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',90)
    (2, 10,'2021-02-26 08:00:00',  '2021-02-26 09:40:00',98)