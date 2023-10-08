-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 05, 2023 at 12:13 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scoreboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `GameID` int NOT NULL AUTO_INCREMENT,
  `GameName` varchar(255) DEFAULT NULL,
  `MatchDate` date NOT NULL,
  `HomeTotal` int DEFAULT NULL,
  `VisitorTotal` int DEFAULT NULL,
  PRIMARY KEY (`GameID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`GameID`, `GameName`, `MatchDate`, `HomeTotal`, `VisitorTotal`) VALUES
(1, 'YourGameName', '2023-10-02', 11, 11),
(2, 'ICC World Cup', '2023-10-02', 47, 117),
(3, 'ICC World Cup', '2023-10-02', 15, 30),
(4, 'ICC World Cup', '2023-10-02', 15, 30),
(5, 'ICC World Cup', '2023-10-02', 80, 75),
(6, 'ICC World Cup', '2023-10-02', 80, 75),
(7, 'ICC World Cup', '2023-10-02', 84, 30),
(8, 'ICC World Cup', '2023-10-02', 11, 11),
(9, 'ICC World Cup', '2023-10-02', 91, 99),
(10, 'ICC World Cup', '2023-10-02', 37, 22),
(11, 'ICC World Cup', '2023-10-02', 43, 39);

-- --------------------------------------------------------

--
-- Table structure for table `hometeamstatistics`
--

DROP TABLE IF EXISTS `hometeamstatistics`;
CREATE TABLE IF NOT EXISTS `hometeamstatistics` (
  `HomeTeamStatisticsID` int NOT NULL AUTO_INCREMENT,
  `HomeCountryName` varchar(255) NOT NULL,
  `Wickets` int DEFAULT NULL,
  `NoBalls` int DEFAULT NULL,
  `Runs` int DEFAULT NULL,
  `Fours` int DEFAULT NULL,
  `Sixes` int DEFAULT NULL,
  `GameID` int DEFAULT NULL,
  PRIMARY KEY (`HomeTeamStatisticsID`),
  KEY `GameID` (`GameID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hometeamstatistics`
--

INSERT INTO `hometeamstatistics` (`HomeTeamStatisticsID`, `HomeCountryName`, `Wickets`, `NoBalls`, `Runs`, `Fours`, `Sixes`, `GameID`) VALUES
(1, 'Home', 1, 1, 1, 1, 1, 1),
(2, 'India', 2, 16, 5, 3, 5, 2),
(3, 'Bangladesh', 2, 2, 1, 2, 1, 3),
(4, 'Bangladesh', 2, 2, 1, 2, 1, 4),
(5, 'India', 2, 1, 4, 7, 8, 5),
(6, 'India', 2, 1, 4, 7, 8, 6),
(7, 'SriLanka', 4, 1, 6, 3, 11, 7),
(8, 'India', 1, 2, 1, 1, 1, 8),
(9, 'Srilanka', 1, 3, 3, 10, 8, 9),
(10, 'Srilanka', 2, 1, 3, 4, 3, 10),
(11, 'Srilanka', 1, 1, 3, 7, 2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE IF NOT EXISTS `player` (
  `PlayerID` int NOT NULL AUTO_INCREMENT,
  `PlayerName` varchar(255) NOT NULL,
  `HighestScore` int DEFAULT NULL,
  `Sixes` int DEFAULT NULL,
  `Fours` int DEFAULT NULL,
  `Wides` int DEFAULT NULL,
  `GameID` int DEFAULT NULL,
  PRIMARY KEY (`PlayerID`),
  KEY `GameID` (`GameID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Role` enum('Admin','Moderator','User') NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `Role`) VALUES
(1, 'Johnwick', 'johnwick123', 'johnwick@example.com', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `visitorteamstatistics`
--

DROP TABLE IF EXISTS `visitorteamstatistics`;
CREATE TABLE IF NOT EXISTS `visitorteamstatistics` (
  `VisitorTeamStatisticsID` int NOT NULL AUTO_INCREMENT,
  `VisitorCountryName` varchar(255) NOT NULL,
  `Wickets` int DEFAULT NULL,
  `NoBalls` int DEFAULT NULL,
  `Runs` int DEFAULT NULL,
  `Fours` int DEFAULT NULL,
  `Sixes` int DEFAULT NULL,
  `GameID` int DEFAULT NULL,
  PRIMARY KEY (`VisitorTeamStatisticsID`),
  KEY `GameID` (`GameID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visitorteamstatistics`
--

INSERT INTO `visitorteamstatistics` (`VisitorTeamStatisticsID`, `VisitorCountryName`, `Wickets`, `NoBalls`, `Runs`, `Fours`, `Sixes`, `GameID`) VALUES
(1, 'Visitor', 1, 1, 1, 1, 1, 1),
(2, 'Pakistan', 3, 3, 11, 7, 13, 2),
(3, 'Srilanka', 2, 2, 4, 2, 3, 3),
(4, 'Srilanka', 2, 2, 4, 2, 3, 4),
(5, 'Srilanka', 7, 1, 5, 4, 9, 5),
(6, 'Srilanka', 7, 1, 5, 4, 9, 6),
(7, 'Japan', 1, 1, 4, 2, 3, 7),
(8, 'Srilanka', 1, 1, 1, 1, 1, 8),
(9, 'India', 1, 2, 9, 9, 9, 9),
(10, 'Bangladesh', 1, 1, 2, 2, 2, 10),
(11, 'India', 4, 1, 3, 3, 4, 11);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
