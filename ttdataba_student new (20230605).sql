-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 05, 2023 at 03:36 PM
-- Server version: 5.6.51
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ttdataba_student`
--

-- --------------------------------------------------------

--
-- Table structure for table `addcourse`
--

CREATE TABLE `addcourse` (
  `matricNum` int(7) NOT NULL,
  `courseID` int(7) NOT NULL,
  `approvalDate` varchar(45) DEFAULT NULL,
  `approvalDocumentScan` varchar(45) DEFAULT NULL,
  `approvalDocument` varchar(45) DEFAULT NULL,
  `sessionID` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `approvedprogrammes`
--

CREATE TABLE `approvedprogrammes` (
  `programmeID` int(7) NOT NULL,
  `facultyID` int(7) DEFAULT NULL,
  `departmentID` int(7) DEFAULT NULL,
  `approvalDate` varchar(45) DEFAULT NULL,
  `approvalSession` varchar(45) DEFAULT NULL,
  `programmeTitle` varchar(45) DEFAULT NULL,
  `programmeDescription` varchar(45) DEFAULT NULL,
  `programmeStatus` varchar(45) DEFAULT NULL,
  `programofstudy_matricNum` int(7) NOT NULL,
  `changeofprogramme_matricNum` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bursaryscholarship`
--

CREATE TABLE `bursaryscholarship` (
  `matricNum` int(7) NOT NULL,
  `amount` int(7) DEFAULT NULL,
  `awardingBody` varchar(45) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `DatedAward` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `changeofprogramme`
--

CREATE TABLE `changeofprogramme` (
  `matricNum` int(7) NOT NULL,
  `ProgrammeID` int(7) DEFAULT NULL,
  `newProgrammeID` int(7) DEFAULT NULL,
  `newDepartmentID` int(7) DEFAULT NULL,
  `dateApprovalID` int(7) DEFAULT NULL,
  `approvalDocument` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='	';

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `countryID` int(11) NOT NULL,
  `countryName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `courseID` int(7) NOT NULL,
  `departmentID` int(7) DEFAULT NULL,
  `FacultyID` int(7) DEFAULT NULL,
  `sessionID` int(7) DEFAULT NULL,
  `courseTitle` varchar(45) DEFAULT NULL,
  `courseCode` varchar(45) DEFAULT NULL,
  `courseUnit` int(1) DEFAULT NULL,
  `courseStatus` varchar(45) DEFAULT NULL,
  `courseSemester` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `courselecturer`
--

CREATE TABLE `courselecturer` (
  `lecturerID` int(7) NOT NULL,
  `courseID` int(7) DEFAULT NULL,
  `departmentID` int(7) DEFAULT NULL,
  `facultyID` int(7) DEFAULT NULL,
  `staffNum` int(7) DEFAULT NULL,
  `sessionID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `courseprerequisite`
--

CREATE TABLE `courseprerequisite` (
  `coursePrerequisiteID` int(7) NOT NULL,
  `courseID` int(7) DEFAULT NULL,
  `sessionID` int(7) DEFAULT NULL,
  `facultyID` int(7) DEFAULT NULL,
  `departmentID` varchar(45) DEFAULT NULL,
  `Prerequisitecourse` varchar(45) DEFAULT NULL,
  `course_courseID` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `degree`
--

CREATE TABLE `degree` (
  `degreeID` int(7) NOT NULL,
  `departmentID` int(7) DEFAULT NULL,
  `degreeName` int(7) DEFAULT NULL,
  `facultyID` int(7) DEFAULT NULL,
  `department_departmentID` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `deletecourse`
--

CREATE TABLE `deletecourse` (
  `CourseID` int(7) NOT NULL,
  `matricNum` int(7) NOT NULL,
  `session` varchar(45) NOT NULL,
  `approvalDate` varchar(45) NOT NULL,
  `approvalDocumentScan` varchar(45) NOT NULL,
  `deletecoursecol` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `registeredcourses_matricNum` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmentID` int(7) NOT NULL,
  `facultyID` int(7) NOT NULL,
  `departmentName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `department_odd`
--

CREATE TABLE `department_odd` (
  `departmentID` int(7) NOT NULL,
  `facultyID` int(7) NOT NULL,
  `departmentName` varchar(45) NOT NULL,
  `departmentDescription` varchar(45) DEFAULT NULL,
  `student_studentMatricNum` int(7) DEFAULT NULL,
  `student_student_studentMatricNum` int(7) DEFAULT NULL,
  `faculty_facultyID` int(7) DEFAULT NULL,
  `approvedprogrammes_programmeID` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department_odd`
--

INSERT INTO `department_odd` (`departmentID`, `facultyID`, `departmentName`, `departmentDescription`, `student_studentMatricNum`, `student_student_studentMatricNum`, `faculty_facultyID`, `approvedprogrammes_programmeID`) VALUES
(1, 1, 'Agricultural Economics', NULL, NULL, NULL, NULL, NULL),
(2, 1, 'Agricultural Extension & Rural Development', NULL, NULL, NULL, NULL, NULL),
(3, 1, 'Animal Science', NULL, NULL, NULL, NULL, NULL),
(4, 1, 'Crop Protection & Environmental Biology', NULL, NULL, NULL, NULL, NULL),
(5, 1, 'Soil Resources Management', NULL, NULL, NULL, NULL, NULL),
(6, 1, 'Crop Horticulture', NULL, NULL, NULL, NULL, NULL),
(7, 2, 'Arabic & Islamic Studies', NULL, NULL, NULL, NULL, NULL),
(8, 2, 'Classics', NULL, NULL, NULL, NULL, NULL),
(9, 2, 'Communications & Language Arts', NULL, NULL, NULL, NULL, NULL),
(10, 2, 'English', NULL, NULL, NULL, NULL, NULL),
(11, 2, 'European Studies', NULL, NULL, NULL, NULL, NULL),
(12, 2, 'History', NULL, NULL, NULL, NULL, NULL),
(13, 2, 'Linguistics & African Languages', NULL, NULL, NULL, NULL, NULL),
(14, 2, 'Music', NULL, NULL, NULL, NULL, NULL),
(15, 2, 'Philosophy', NULL, NULL, NULL, NULL, NULL),
(16, 2, 'Religious Studies', NULL, NULL, NULL, NULL, NULL),
(17, 2, 'Theatre Arts', NULL, NULL, NULL, NULL, NULL),
(18, 3, 'Biochemistry', NULL, NULL, NULL, NULL, NULL),
(19, 3, 'Chemical Pathology', NULL, NULL, NULL, NULL, NULL),
(20, 3, 'Haematology', NULL, NULL, NULL, NULL, NULL),
(21, 3, 'Medical Microbiology & Parasitology', NULL, NULL, NULL, NULL, NULL),
(22, 3, 'Pathology', NULL, NULL, NULL, NULL, NULL),
(23, 3, 'Pharmacology & Therapeutics', NULL, NULL, NULL, NULL, NULL),
(24, 3, 'Physiology', NULL, NULL, NULL, NULL, NULL),
(25, 3, 'Virology', NULL, NULL, NULL, NULL, NULL),
(26, 3, 'Biomedical Lab Science', NULL, NULL, NULL, NULL, NULL),
(27, 3, 'Immunology', NULL, NULL, NULL, NULL, NULL),
(28, 3, 'Anatomy', NULL, NULL, NULL, NULL, NULL),
(29, 4, 'Anaesthesia', NULL, NULL, NULL, NULL, NULL),
(30, 4, 'Medicine', NULL, NULL, NULL, NULL, NULL),
(31, 4, 'Nursing', NULL, NULL, NULL, NULL, NULL),
(32, 4, 'Obstetrics & Gynaecology', NULL, NULL, NULL, NULL, NULL),
(33, 4, 'Ophthalmology', NULL, NULL, NULL, NULL, NULL),
(34, 4, 'Oto-Rhino-Laryngology', NULL, NULL, NULL, NULL, NULL),
(35, 4, 'Radiology ', NULL, NULL, NULL, NULL, NULL),
(36, 4, 'Radiotherapy Radiation Oncology', NULL, NULL, NULL, NULL, NULL),
(37, 4, 'Paediatrics', NULL, NULL, NULL, NULL, NULL),
(38, 4, 'Physiotherapy', NULL, NULL, NULL, NULL, NULL),
(39, 4, 'Psychiatry', NULL, NULL, NULL, NULL, NULL),
(40, 4, 'Surgery', NULL, NULL, NULL, NULL, NULL),
(41, 4, 'Nuclear Medicine', NULL, NULL, NULL, NULL, NULL),
(42, 5, 'Child Oral Health', NULL, NULL, NULL, NULL, NULL),
(43, 5, 'Oral & Maxillofacial Surgery', NULL, NULL, NULL, NULL, NULL),
(44, 5, 'Oral Pathology/Oral Medicine', NULL, NULL, NULL, NULL, NULL),
(45, 5, 'Peridontology & Comm. Dentistry', NULL, NULL, NULL, NULL, NULL),
(46, 5, 'Restorative Dentistry', NULL, NULL, NULL, NULL, NULL),
(47, 6, 'Accounting', NULL, NULL, NULL, NULL, NULL),
(48, 6, 'Business Administration', NULL, NULL, NULL, NULL, NULL),
(49, 6, 'Marketing and Consumer Studies', NULL, NULL, NULL, NULL, NULL),
(50, 6, 'Banking and Finance', NULL, NULL, NULL, NULL, NULL),
(51, 6, 'Economics', NULL, NULL, NULL, NULL, NULL),
(52, 7, 'Adult Education', NULL, NULL, NULL, NULL, NULL),
(53, 7, 'Educational Management', NULL, NULL, NULL, NULL, NULL),
(54, 7, 'Counselling and Human Development Studies', NULL, NULL, NULL, NULL, NULL),
(55, 7, 'Human Kinetic & Health Education', NULL, NULL, NULL, NULL, NULL),
(56, 7, 'Library Archival & Information Sciences', NULL, NULL, NULL, NULL, NULL),
(57, 7, 'Social Work', NULL, NULL, NULL, NULL, NULL),
(58, 7, 'Special Education', NULL, NULL, NULL, NULL, NULL),
(59, 7, 'Arts & Social Sciences Education', NULL, NULL, NULL, NULL, NULL),
(60, 7, 'Childhood and Educational Foundation', NULL, NULL, NULL, NULL, NULL),
(61, 7, 'Science, Mathematics & Technology Education', NULL, NULL, NULL, NULL, NULL),
(62, 8, 'Urban and Regional Planning', NULL, NULL, NULL, NULL, NULL),
(63, 8, 'Estate Management', NULL, NULL, NULL, NULL, NULL),
(64, 8, 'Quantity Surveying', NULL, NULL, NULL, NULL, NULL),
(65, 8, 'Architecture', NULL, NULL, NULL, NULL, NULL),
(66, 9, 'Commercial and Industrial Law', NULL, NULL, NULL, NULL, NULL),
(67, 9, 'Jurisprudence and International Law', NULL, NULL, NULL, NULL, NULL),
(68, 9, 'Private & Property Law', NULL, NULL, NULL, NULL, NULL),
(69, 9, 'Public Law', NULL, NULL, NULL, NULL, NULL),
(70, 10, 'Clinical Pharmacy & Pharmacy Administration', NULL, NULL, NULL, NULL, NULL),
(71, 10, 'Pharmacognosy', NULL, NULL, NULL, NULL, NULL),
(72, 10, 'Pharmaceutical Chemistry', NULL, NULL, NULL, NULL, NULL),
(73, 10, 'Pharmaceutics & Industrial Pharmacy', NULL, NULL, NULL, NULL, NULL),
(74, 10, 'Pharmaceutical Microbiology', NULL, NULL, NULL, NULL, NULL),
(75, 10, 'Pharmacology & Toxicology', NULL, NULL, NULL, NULL, NULL),
(76, 11, 'Environmental Health Sciences', NULL, NULL, NULL, NULL, NULL),
(77, 11, 'Epidemiology & Medical Statistics', NULL, NULL, NULL, NULL, NULL),
(78, 11, 'Health Promotion & Education', NULL, NULL, NULL, NULL, NULL),
(79, 11, 'Human Nutrition', NULL, NULL, NULL, NULL, NULL),
(80, 11, 'Preventive Medicine & Primary Health Care', NULL, NULL, NULL, NULL, NULL),
(81, 11, 'Health Policy and Management', NULL, NULL, NULL, NULL, NULL),
(82, 11, 'Community Medicine', NULL, NULL, NULL, NULL, NULL),
(83, 12, 'Aquaculture & Fisheries Management', NULL, NULL, NULL, NULL, NULL),
(84, 12, 'Social and Environmental Forestry', NULL, NULL, NULL, NULL, NULL),
(85, 12, 'Forest Production and Products', NULL, NULL, NULL, NULL, NULL),
(86, 12, 'Wildlife & Ecotourism Management', NULL, NULL, NULL, NULL, NULL),
(87, 13, 'Archaeology & Anthropology', NULL, NULL, NULL, NULL, NULL),
(88, 13, 'Botany', NULL, NULL, NULL, NULL, NULL),
(89, 13, 'Chemistry', NULL, NULL, NULL, NULL, NULL),
(90, 13, 'Computer Science', NULL, NULL, NULL, NULL, NULL),
(91, 13, 'Geology', NULL, NULL, NULL, NULL, NULL),
(92, 13, 'Mathematics', NULL, NULL, NULL, NULL, NULL),
(93, 13, 'Microbiology', NULL, NULL, NULL, NULL, NULL),
(94, 13, 'Physics', NULL, NULL, NULL, NULL, NULL),
(95, 13, 'Statistics', NULL, NULL, NULL, NULL, NULL),
(96, 13, 'Zoology', NULL, NULL, NULL, NULL, NULL),
(97, 14, 'Agricultural  & Environmental Engineering', NULL, NULL, NULL, NULL, NULL),
(98, 14, 'Civil Engineering', NULL, NULL, NULL, NULL, NULL),
(99, 14, 'Electrical & Electronic Engineering', NULL, NULL, NULL, NULL, NULL),
(100, 14, 'Food Technology', NULL, NULL, NULL, NULL, NULL),
(101, 14, 'Industrial & Production Engineering', NULL, NULL, NULL, NULL, NULL),
(102, 14, 'Mechanical Engineering', NULL, NULL, NULL, NULL, NULL),
(103, 14, 'Petroleum Engineering', NULL, NULL, NULL, NULL, NULL),
(104, 14, 'Wood Products Engineering', NULL, NULL, NULL, NULL, NULL),
(105, 14, 'Biomedical Engineering', NULL, NULL, NULL, NULL, NULL),
(106, 14, 'Automotive Engineering', NULL, NULL, NULL, NULL, NULL),
(107, 15, 'Geography', NULL, NULL, NULL, NULL, NULL),
(108, 15, 'Political Science', NULL, NULL, NULL, NULL, NULL),
(109, 15, 'Psychology', NULL, NULL, NULL, NULL, NULL),
(110, 15, 'Sociology', NULL, NULL, NULL, NULL, NULL),
(111, 16, 'Veterinary Anatomy', NULL, NULL, NULL, NULL, NULL),
(112, 16, 'Veterinary Medicine', NULL, NULL, NULL, NULL, NULL),
(113, 16, 'Veterinary Pathology', NULL, NULL, NULL, NULL, NULL),
(114, 16, 'Veterinary Surgery & Radiology', NULL, NULL, NULL, NULL, NULL),
(115, 16, 'Theriogenology', NULL, NULL, NULL, NULL, NULL),
(116, 16, 'Veterinary Microbiology ', NULL, NULL, NULL, NULL, NULL),
(117, 16, 'Veterinary Parasitology', NULL, NULL, NULL, NULL, NULL),
(118, 16, 'Veterinary Public Health & Preventive Medicin', NULL, NULL, NULL, NULL, NULL),
(119, 16, 'Veterinary Physiology and Biochemistry ', NULL, NULL, NULL, NULL, NULL),
(120, 16, 'Veterinary  Pharmacology & Toxicology', NULL, NULL, NULL, NULL, NULL),
(121, 16, 'Veterinary Teaching Hospital', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `examresult`
--

CREATE TABLE `examresult` (
  `MatricNum` int(7) NOT NULL,
  `courseID` int(7) DEFAULT NULL,
  `sessionID` int(7) DEFAULT NULL,
  `examScore` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `facultyID` int(7) NOT NULL,
  `facultyName` varchar(45) DEFAULT NULL,
  `facultyColour` varchar(45) DEFAULT NULL,
  `facultyDescription` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `localgov`
--

CREATE TABLE `localgov` (
  `id` int(11) NOT NULL,
  `state` int(11) DEFAULT NULL,
  `lg` text,
  `state_state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programofstudy`
--

CREATE TABLE `programofstudy` (
  `programmeID` int(7) NOT NULL,
  `matricNum` int(7) NOT NULL,
  `facultyID` int(7) DEFAULT NULL,
  `departmentID` int(7) DEFAULT NULL,
  `programDescription` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='			';

-- --------------------------------------------------------

--
-- Table structure for table `registeredcourses`
--

CREATE TABLE `registeredcourses` (
  `CoursesID` int(7) NOT NULL,
  `matricNum` int(10) NOT NULL,
  `sessionID` int(7) DEFAULT NULL,
  `registrationStaus` varchar(45) DEFAULT NULL,
  `DepartmentID` int(7) DEFAULT NULL,
  `FacultyID` int(7) DEFAULT NULL,
  `course_courseID` int(7) NOT NULL,
  `student_studentMatricNum` int(7) NOT NULL,
  `examresult_MatricNum` int(7) NOT NULL,
  `session_sessionID` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sessionID` int(7) NOT NULL,
  `session` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

CREATE TABLE `sponsor` (
  `sponsorID` int(7) NOT NULL,
  `sponsorFirstName` varchar(45) NOT NULL,
  `sponsorMiddleName` varchar(45) DEFAULT NULL,
  `sponsorLastName` varchar(45) NOT NULL,
  `sponsorAddress` varchar(200) NOT NULL,
  `sponsorEmail` varchar(200) NOT NULL,
  `sponsorPhoneNumber` varchar(11) NOT NULL,
  `student_studentMatricNum` int(7) NOT NULL,
  `student_student_studentMatricNum` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` int(11) NOT NULL,
  `state` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `studentID` int(7) NOT NULL,
  `studentMatricNum` int(7) NOT NULL,
  `jambRegNumber` varchar(45) NOT NULL,
  `studentFirstName` varchar(45) NOT NULL,
  `studentMiddleName` varchar(45) DEFAULT NULL,
  `studentLastSurname` varchar(45) NOT NULL,
  `studentSuffix` varchar(45) DEFAULT NULL,
  `maritalStatus` enum('M','S') DEFAULT NULL,
  `departmentID` varchar(45) DEFAULT NULL,
  `faculty` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `dateofBirth` date DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `yearOFEntryIntoUI` varchar(45) DEFAULT NULL,
  `modeOfEntry` varchar(45) DEFAULT NULL,
  `passportDocument` varchar(45) DEFAULT NULL,
  `signatureDocument` varchar(45) DEFAULT NULL,
  `stateOfOrigin` varchar(45) DEFAULT NULL,
  `studentLga` varchar(45) DEFAULT NULL,
  `homeTown` varchar(45) DEFAULT NULL,
  `permanentAddress` varchar(45) DEFAULT NULL,
  `studyStatus` varchar(45) DEFAULT NULL,
  `studyLevel` varchar(45) DEFAULT NULL,
  `presentProgrammeEntryYear` varchar(45) DEFAULT NULL,
  `studentStatus` varchar(45) DEFAULT NULL,
  `currentSession` varchar(45) DEFAULT NULL,
  `localgov_id` int(11) NOT NULL,
  `state_state_id` int(11) NOT NULL,
  `countries_countryID` int(11) NOT NULL,
  `student_studentMatricNum` int(7) NOT NULL,
  `sponsorID` int(7) DEFAULT NULL,
  `studentcase_studentCaseID` int(7) NOT NULL,
  `session_sessionID` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `studentcase`
--

CREATE TABLE `studentcase` (
  `studentCaseID` int(7) NOT NULL,
  `matricNum` int(7) DEFAULT NULL,
  `studentCaseStartDate` varchar(45) DEFAULT NULL,
  `studentCaseFinalDecisionDate` varchar(45) DEFAULT NULL,
  `studentCaseFinalDecision` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addcourse`
--
ALTER TABLE `addcourse`
  ADD PRIMARY KEY (`matricNum`);

--
-- Indexes for table `approvedprogrammes`
--
ALTER TABLE `approvedprogrammes`
  ADD PRIMARY KEY (`programmeID`,`programofstudy_matricNum`,`changeofprogramme_matricNum`),
  ADD KEY `fk_approvedprogrammes_programofstudy1_idx` (`programofstudy_matricNum`),
  ADD KEY `fk_approvedprogrammes_changeofprogramme1_idx` (`changeofprogramme_matricNum`);

--
-- Indexes for table `bursaryscholarship`
--
ALTER TABLE `bursaryscholarship`
  ADD PRIMARY KEY (`matricNum`);

--
-- Indexes for table `changeofprogramme`
--
ALTER TABLE `changeofprogramme`
  ADD PRIMARY KEY (`matricNum`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`countryID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`courseID`);

--
-- Indexes for table `courselecturer`
--
ALTER TABLE `courselecturer`
  ADD PRIMARY KEY (`lecturerID`);

--
-- Indexes for table `courseprerequisite`
--
ALTER TABLE `courseprerequisite`
  ADD PRIMARY KEY (`coursePrerequisiteID`,`course_courseID`),
  ADD KEY `fk_courseprerequisite_course1_idx` (`course_courseID`);

--
-- Indexes for table `degree`
--
ALTER TABLE `degree`
  ADD PRIMARY KEY (`degreeID`),
  ADD KEY `fk_degree_department1_idx` (`department_departmentID`);

--
-- Indexes for table `deletecourse`
--
ALTER TABLE `deletecourse`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `fk_deletecourse_registeredcourses1_idx` (`registeredcourses_matricNum`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departmentID`);

--
-- Indexes for table `department_odd`
--
ALTER TABLE `department_odd`
  ADD PRIMARY KEY (`departmentID`),
  ADD KEY `fk_department_faculty1_idx` (`faculty_facultyID`),
  ADD KEY `fk_department_approvedprogrammes1_idx` (`approvedprogrammes_programmeID`);

--
-- Indexes for table `examresult`
--
ALTER TABLE `examresult`
  ADD PRIMARY KEY (`MatricNum`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`facultyID`);

--
-- Indexes for table `localgov`
--
ALTER TABLE `localgov`
  ADD PRIMARY KEY (`id`,`state_state_id`),
  ADD KEY `fk_localgov_state1_idx` (`state_state_id`);

--
-- Indexes for table `programofstudy`
--
ALTER TABLE `programofstudy`
  ADD PRIMARY KEY (`matricNum`);

--
-- Indexes for table `registeredcourses`
--
ALTER TABLE `registeredcourses`
  ADD PRIMARY KEY (`matricNum`,`student_studentMatricNum`,`examresult_MatricNum`),
  ADD KEY `fk_registeredcourses_course1_idx` (`course_courseID`),
  ADD KEY `fk_registeredcourses_student1_idx` (`student_studentMatricNum`),
  ADD KEY `fk_registeredcourses_examresult1_idx` (`examresult_MatricNum`),
  ADD KEY `fk_registeredcourses_session1_idx` (`session_sessionID`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sessionID`);

--
-- Indexes for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`sponsorID`,`student_studentMatricNum`,`student_student_studentMatricNum`),
  ADD KEY `fk_sponsor_student1_idx` (`student_studentMatricNum`,`student_student_studentMatricNum`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentMatricNum`,`student_studentMatricNum`,`studentcase_studentCaseID`,`session_sessionID`),
  ADD KEY `fk_student_localgov_idx` (`localgov_id`),
  ADD KEY `fk_student_state1_idx` (`state_state_id`),
  ADD KEY `fk_student_countries1_idx` (`countries_countryID`),
  ADD KEY `fk_student_studentcase1_idx` (`studentcase_studentCaseID`),
  ADD KEY `fk_student_session1_idx` (`session_sessionID`);

--
-- Indexes for table `studentcase`
--
ALTER TABLE `studentcase`
  ADD PRIMARY KEY (`studentCaseID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approvedprogrammes`
--
ALTER TABLE `approvedprogrammes`
  ADD CONSTRAINT `fk_approvedprogrammes_changeofprogramme1` FOREIGN KEY (`changeofprogramme_matricNum`) REFERENCES `changeofprogramme` (`matricNum`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_approvedprogrammes_programofstudy1` FOREIGN KEY (`programofstudy_matricNum`) REFERENCES `programofstudy` (`matricNum`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `courseprerequisite`
--
ALTER TABLE `courseprerequisite`
  ADD CONSTRAINT `fk_courseprerequisite_course1` FOREIGN KEY (`course_courseID`) REFERENCES `course` (`courseID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `degree`
--

--
-- Constraints for table `deletecourse`
--
ALTER TABLE `deletecourse`
  ADD CONSTRAINT `fk_deletecourse_registeredcourses1` FOREIGN KEY (`registeredcourses_matricNum`) REFERENCES `registeredcourses` (`matricNum`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `localgov`
--
ALTER TABLE `localgov`
  ADD CONSTRAINT `fk_localgov_state1` FOREIGN KEY (`state_state_id`) REFERENCES `state` (`state_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `registeredcourses`
--
ALTER TABLE `registeredcourses`
  ADD CONSTRAINT `fk_registeredcourses_course1` FOREIGN KEY (`course_courseID`) REFERENCES `course` (`courseID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_registeredcourses_examresult1` FOREIGN KEY (`examresult_MatricNum`) REFERENCES `examresult` (`MatricNum`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_registeredcourses_session1` FOREIGN KEY (`session_sessionID`) REFERENCES `session` (`sessionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_registeredcourses_student1` FOREIGN KEY (`student_studentMatricNum`) REFERENCES `student` (`studentMatricNum`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD CONSTRAINT `fk_sponsor_student1` FOREIGN KEY (`student_studentMatricNum`,`student_student_studentMatricNum`) REFERENCES `student` (`studentMatricNum`, `student_studentMatricNum`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `fk_student_countries1` FOREIGN KEY (`countries_countryID`) REFERENCES `countries` (`countryID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_localgov` FOREIGN KEY (`localgov_id`) REFERENCES `localgov` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_session1` FOREIGN KEY (`session_sessionID`) REFERENCES `session` (`sessionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_state1` FOREIGN KEY (`state_state_id`) REFERENCES `state` (`state_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_studentcase1` FOREIGN KEY (`studentcase_studentCaseID`) REFERENCES `studentcase` (`studentCaseID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
