-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 17 jan 2022 om 16:46
-- Serverversie: 10.4.22-MariaDB
-- PHP-versie: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `souveni2_testdatabase`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `images`
--

INSERT INTO `images` (`id`, `imageUrl`, `createdAt`, `updatedAt`, `ProductId`) VALUES
(1, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/e53cf6f717951ac2d0e470c1c442a21adeeb7085.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 1),
(2, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/e4b6010f634f5e368d468c5e53fea6cc75639973.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 1),
(3, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/e4b6010f634f5e368d468c5e53fea6cc75639973.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 2),
(4, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/e4b6010f634f5e368d468c5e53fea6cc75639973.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 2),
(5, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/e4b6010f634f5e368d468c5e53fea6cc75639973.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 2),
(6, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/e4b6010f634f5e368d468c5e53fea6cc75639973.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 3),
(7, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/b99620b3a9320d506faf5c13964cf82266956af8.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 3),
(8, 'https://cdn.myonlinestore.eu/93c6c527-6be1-11e9-a722-44a8421b9960/image/cache/full/c33f3e3f5f6b03161cf849709a3281ed93cdc13b.jpg', '2021-06-05 08:16:58', '2021-06-05 08:16:58', 3),
(9, NULL, '2022-01-17 15:36:19', '2022-01-17 15:36:19', 5),
(10, NULL, '2022-01-17 15:43:48', '2022-01-17 15:43:48', 6);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orderproducts`
--

CREATE TABLE `orderproducts` (
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `orderproducts`
--

INSERT INTO `orderproducts` (`quantity`, `createdAt`, `updatedAt`, `OrderId`, `ProductId`) VALUES
(1, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 1, 1),
(2, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 1, 2),
(3, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 2, 3),
(4, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 2, 4),
(3, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 3, 2),
(2, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 3, 4),
(2, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 4, 2),
(1, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 4, 3),
(3, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 5, 1),
(4, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 5, 2),
(2, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 6, 3),
(3, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 6, 4),
(4, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 7, 1),
(3, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 7, 2),
(3, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 8, 1),
(2, '2021-06-05 08:16:58', '2021-06-05 08:16:58', 8, 2),
(5, '2022-01-17 14:53:00', '2022-01-17 14:53:00', 9, 1),
(1, '2022-01-17 14:53:00', '2022-01-17 14:53:00', 9, 2),
(5, '2022-01-17 14:53:27', '2022-01-17 14:53:27', 10, 1),
(1, '2022-01-17 14:53:27', '2022-01-17 14:53:27', 10, 2),
(2, '2022-01-17 14:58:27', '2022-01-17 14:58:27', 11, 1),
(2, '2022-01-17 14:58:27', '2022-01-17 14:58:27', 11, 2),
(2, '2022-01-17 15:03:57', '2022-01-17 15:03:57', 12, 1),
(2, '2022-01-17 15:03:57', '2022-01-17 15:03:57', 12, 2),
(3, '2022-01-17 15:27:12', '2022-01-17 15:27:12', 13, 1),
(3, '2022-01-17 15:27:12', '2022-01-17 15:27:12', 13, 2),
(3, '2022-01-17 15:28:18', '2022-01-17 15:28:18', 14, 1),
(3, '2022-01-17 15:28:18', '2022-01-17 15:28:18', 14, 2),
(3, '2022-01-17 15:31:52', '2022-01-17 15:31:52', 15, 1),
(3, '2022-01-17 15:31:52', '2022-01-17 15:31:52', 15, 2),
(1, '2022-01-17 15:33:49', '2022-01-17 15:33:49', 16, 1),
(3, '2022-01-17 15:33:49', '2022-01-17 15:33:49', 16, 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `placedAt` datetime DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `orders`
--

INSERT INTO `orders` (`id`, `placedAt`, `userEmail`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '2020-06-01 12:03:06', 'tim@tterwijn.nl', 1, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(2, '2020-07-01 12:03:06', 'rik@gmail.com', 1, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(3, '2020-08-01 12:03:06', 'mees@gmail.com', 1, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(4, '2020-09-01 12:03:06', 'adam@gmail.com', 1, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(5, '2020-10-01 12:03:06', 'luuk@gmail.com', 0, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(6, '2020-11-01 12:03:06', 'youssef@gmail.com', 0, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(7, '2020-12-01 12:03:06', 'yasmine@gmail.com', 0, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(8, '2021-01-01 12:03:06', 'stefan@gmail.com', 0, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(9, NULL, 'johanterwijn@quicknet.nl', 1, '2022-01-17 14:52:59', '2022-01-17 14:52:59'),
(10, NULL, 'johanterwijn@quicknet.nl', 1, '2022-01-17 14:53:27', '2022-01-17 14:53:27'),
(11, NULL, 'adsddasdad', 1, '2022-01-17 14:58:27', '2022-01-17 14:58:27'),
(12, NULL, 'adsddasdad', 1, '2022-01-17 15:03:57', '2022-01-17 15:03:57'),
(13, NULL, 'asdadadad', 1, '2022-01-17 15:27:12', '2022-01-17 15:27:12'),
(14, NULL, 'asdadadad', 1, '2022-01-17 15:28:18', '2022-01-17 15:28:18'),
(15, NULL, 'asdadadad', 1, '2022-01-17 15:31:51', '2022-01-17 15:31:51'),
(16, NULL, 'mees@tterwijn.nl', 1, '2022-01-17 15:33:49', '2022-01-17 15:33:49');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `description`, `province`, `region`, `createdAt`, `updatedAt`) VALUES
(1, 'Flevoland Magneet', NULL, '9.95', NULL, 'Groningen', NULL, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(2, 'Oorhanger rood', NULL, '19.95', NULL, 'Drenthe', NULL, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(3, 'Ovaal 1', NULL, '7.95', NULL, 'Noord-Holland', NULL, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(4, 'Coole Magneet', NULL, '69.69', NULL, 'Gelderland', NULL, '2021-06-05 08:16:58', '2021-06-05 08:16:58'),
(5, 'test', 'koelkastmagneet', '20.00', 'test product', 'NoordHolland', 'Amsterdam', '2022-01-17 15:36:18', '2022-01-17 15:36:18'),
(6, 'timtest', 'koelkastmagneet', '12.00', 'test123', 'NoordHolland', 'Amsterdam', '2022-01-17 15:43:48', '2022-01-17 15:43:48');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `provinces`
--

INSERT INTO `provinces` (`id`, `name`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(1, 'Noord-Holland', 'https://i.postimg.cc/fb15PjL8/pexels-liene-ratniece-1329510.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(2, 'Zuid-Holland', 'https://i.postimg.cc/Wp8YNZf1/pexels-chait-goli-2031706.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(3, 'Friesland', 'https://i.postimg.cc/G34zCfYq/wind-mill-3344661-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(4, 'Groningen', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(5, 'Drenthe', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(6, 'Noord-Brabant', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(7, 'Gelderland', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(8, 'Limburg', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(9, 'Overijssel', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(10, 'Zeeland', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(11, 'Utrecht', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00'),
(12, 'Flevoland', 'https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg', '2021-06-05 08:17:00', '2021-06-05 08:17:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProvinceId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `regions`
--

INSERT INTO `regions` (`id`, `name`, `createdAt`, `updatedAt`, `ProvinceId`) VALUES
(1, 'Amsterdam', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(2, 'Volendam', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(3, 'Marken', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(4, 'Edam', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(5, 'Monnickendam', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(6, 'Hoorn', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(7, 'Enkhuizen', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(8, 'Haarlem', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(9, 'Zandvoort', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(10, 'Alkmaar', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(11, 'Texel', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(12, 'Ijmuiden', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(13, 'Egmond aan Zee', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(14, 'Rotterdam', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 2),
(15, 'Den Haag', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 2),
(16, 'Scheveningen', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 2),
(17, 'Delft', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 2),
(18, 'Gouda', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 2),
(19, 'Leiden', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 2),
(20, 'Leeuwarden', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 3),
(21, 'Sneek', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 3),
(22, 'Hindeloopen', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 3),
(23, 'Groningen', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 4),
(24, 'Drenthe', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 5),
(25, 'Eindhoven', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 6),
(26, 'Tilburg', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 6),
(27, 'Nijmegen', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 7),
(28, 'Arnhem', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 7),
(29, 'Maastricht', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 8),
(30, 'Valkenburg', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 8),
(31, 'Enschede', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 9),
(32, 'Giethoorn', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 9),
(33, 'Goes', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 10),
(34, 'Middelburg', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 10),
(35, 'Utrecht', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 11),
(36, 'Amersfoort', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 11),
(37, 'Friesland', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 12),
(38, 'Leeuwarden', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 12),
(39, 'Sneek', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 12),
(40, 'Hindeloopen', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 12),
(41, 'Bolsward', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 12),
(42, 'Lelystad', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 12),
(43, 'Haarlem', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 1),
(44, 'Utrecht', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 11),
(45, 'Goes', '2021-06-05 08:17:00', '2021-06-05 08:17:00', 10);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `passwordHash` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `passwordHash`, `email`, `admin`, `createdAt`, `updatedAt`) VALUES
(1, '$2a$10$q0CxbHEmaIdQXVsAFi8yp.gRx7zpq2L5L7hHvSXy/rCrK6Gw8v7HW', 'admin@souvenirbeurs.com', 1, '2021-06-02 12:48:22', '2021-06-24 12:33:41'),
(9, '$2a$10$QMis0Z2E9pElY3nzGmNwI..kPimZywgo/d79KdWmF2ayXN.mgb..G', 'tim@tterwijn.nl', 1, '2022-01-15 12:51:34', '2022-01-15 12:51:34'),
(16, '$2a$10$nJUxAkudogmzcfT0/hspyOJw48kPvxyA3wgHbEcw0evAToxQmxtru', 'test', 1, '2022-01-16 16:22:08', '2022-01-16 16:22:08');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexen voor tabel `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD PRIMARY KEY (`OrderId`,`ProductId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProvinceId` (`ProvinceId`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT voor een tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT voor een tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT voor een tabel `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `regions`
--
ALTER TABLE `regions`
  ADD CONSTRAINT `regions_ibfk_1` FOREIGN KEY (`ProvinceId`) REFERENCES `provinces` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
