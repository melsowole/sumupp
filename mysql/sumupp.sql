-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 09, 2024 at 06:33 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sumupp`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL,
  `author_type` enum('person','organization') DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `citations`
--

CREATE TABLE `citations` (
  `citation_id` int(11) NOT NULL,
  `type` enum('book','academic article','journal','website') NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `publication_name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `publication_year` int(11) NOT NULL,
  `accessed_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `citations`
--

INSERT INTO `citations` (`citation_id`, `type`, `title`, `subtitle`, `publication_name`, `url`, `publication_year`, `accessed_year`) VALUES
(1, 'book', 'Learning Javascript', NULL, 'Pagina Förlags AB', NULL, 2016, 2024),
(4, 'book', 'The maturing of gamification research', NULL, 'Computers in Human Behavior', 'https://doi.org/10.1016/j.chb.2016.11.062', 2017, 2024),
(5, 'book', 'Actionable Gamification', 'Beyond Points, Badges, and Leaderboards', 'Packt Publishing', NULL, 2019, 2023);

-- --------------------------------------------------------

--
-- Table structure for table `citation_authors`
--

CREATE TABLE `citation_authors` (
  `citation_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `role` enum('author','editor','translator') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` enum('duck','lion','panda') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `profile_picture`) VALUES
(1, 'melchandes', '1234', 'panda'),
(2, 'rikkiekun', '1234', 'lion'),
(3, 'kantoorchan', '1234', 'duck');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`author_id`),
  ADD UNIQUE KEY `last_name` (`last_name`,`name`);

--
-- Indexes for table `citations`
--
ALTER TABLE `citations`
  ADD PRIMARY KEY (`citation_id`);

--
-- Indexes for table `citation_authors`
--
ALTER TABLE `citation_authors`
  ADD PRIMARY KEY (`citation_id`,`author_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citations`
--
ALTER TABLE `citations`
  MODIFY `citation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `citation_authors`
--
ALTER TABLE `citation_authors`
  ADD CONSTRAINT `citation_authors_ibfk_1` FOREIGN KEY (`citation_id`) REFERENCES `citations` (`citation_id`),
  ADD CONSTRAINT `citation_authors_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
