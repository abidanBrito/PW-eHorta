-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2020 a las 20:58:42
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `users_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `measurements`
--

CREATE TABLE `measurements` (
  `id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `salinity` double NOT NULL,
  `rain` double NOT NULL,
  `humidity` double NOT NULL,
  `luminosity` double NOT NULL,
  `temperature` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `measurements`
--

INSERT INTO `measurements` (`id`, `position`, `datetime`, `salinity`, `rain`, `humidity`, `luminosity`, `temperature`) VALUES
(1, 3, '2020-03-22 10:39:41', 56, 5, 68, 72, 23),
(2, 3, '2020-03-22 12:00:24', 47, 4, 61, 84, 25),
(3, 3, '2020-03-23 08:15:10', 35, 0, 55, 85, 18),
(4, 3, '2020-03-23 11:24:38', 37, 2, 46, 89, 21),
(5, 4, '2020-03-20 06:00:00', 56, 0, 55, 72, 13),
(6, 4, '2020-03-20 08:00:00', 47, 3, 50, 84, 17),
(7, 4, '2020-03-20 10:00:00', 40, 2, 48, 85, 21),
(8, 4, '2020-03-20 12:00:00', 38, 4, 46, 89, 23),
(9, 4, '2020-03-20 14:00:00', 42, 0, 33, 89, 27),
(10, 5, '2020-03-20 06:00:00', 42, 1, 55, 72, 13),
(11, 5, '2020-03-20 08:00:00', 25, 3, 50, 84, 17),
(12, 5, '2020-03-23 11:24:38', 35, 2, 46, 89, 21),
(13, 6, '2020-03-23 08:15:10', 44, 4, 55, 85, 18),
(14, 6, '2020-03-22 12:00:24', 47, 3, 61, 84, 25),
(15, 6, '2020-03-22 10:39:41', 55, 5, 68, 72, 23),
(16, 7, '2020-03-23 08:15:10', 59, 2, 55, 85, 18),
(17, 7, '2020-03-22 10:39:41', 65, 7, 68, 72, 23),
(18, 7, '2020-03-22 12:00:24', 63, 5, 61, 84, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `note` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `notes`
--

INSERT INTO `notes` (`id`, `user`, `note`) VALUES
(2, 1, 'Nota Test'),
(4, 1, 'Testeo 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `plot` int(11) NOT NULL,
  `magnitude` varchar(20) NOT NULL,
  `day` datetime NOT NULL,
  `danger` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plots`
--

CREATE TABLE `plots` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  `codmun` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plots`
--

INSERT INTO `plots` (`id`, `name`, `longitude`, `latitude`, `codmun`) VALUES
(1, 'Naranjos Paterna', -0.441465, 39.497875, 46190),
(2, 'Manzanos Bétera', -0.470384, 39.593231, 46070),
(3, 'Gavia de Isidro', -14.019314, 28.494176, 35003),
(4, 'Gavia de Guzmán', -14.019035, 28.493408, 35003),
(5, 'Granja Norte', -14.01532, -0.470384, 46190);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `positions`
--

CREATE TABLE `positions` (
  `id` int(11) NOT NULL,
  `plot` int(11) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `positions`
--

INSERT INTO `positions` (`id`, `plot`, `longitude`, `latitude`) VALUES
(1, 1, -0.441462, 39.497727),
(2, 1, -0.441504, 39.498005),
(3, 3, -14.019314, 28.494176),
(4, 3, -14.019035, 28.494189),
(5, 3, -14.019532, 28.494001),
(6, 4, -14.018762, 28.493647),
(7, 4, -14.019035, 28.493408);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `probes`
--

CREATE TABLE `probes` (
  `position` int(11) NOT NULL,
  `serial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `probes`
--

INSERT INTO `probes` (`position`, `serial`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'cliente'),
(2, 'admin'),
(3, 'cliente-admin'),
(4, 'tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thresholds`
--

CREATE TABLE `thresholds` (
  `id` int(11) NOT NULL,
  `plot` int(11) NOT NULL,
  `magnitude` varchar(20) NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `thresholds`
--

INSERT INTO `thresholds` (`id`, `plot`, `magnitude`, `min`, `max`) VALUES
(635, 5, 'humidity', 0, 30),
(636, 5, 'temperature', 0, 0),
(637, 5, 'rain', 0, 30),
(638, 5, 'luminosity', 0, 20),
(639, 5, 'salinity', 0, 50),
(645, 2, 'humidity', 0, 34),
(646, 2, 'temperature', 0, 50),
(647, 2, 'rain', 0, 50),
(648, 2, 'luminosity', 0, 20),
(649, 2, 'salinity', 0, 10),
(815, 1, 'humidity', 1, 30),
(816, 1, 'temperature', 1, 100),
(817, 1, 'rain', 1, 20),
(818, 1, 'luminosity', 1, 10),
(819, 1, 'salinity', 1, 50),
(915, 1, '2', 1, 20),
(966, 2, '3', 4, 52),
(1676, 4, 'humidity', 28, 65),
(1677, 4, 'temperature', 19, 80),
(1678, 4, 'rain', 45, 85),
(1679, 4, 'luminosity', 33, 72),
(1680, 4, 'salinity', 14, 63),
(1706, 3, 'humidity', 26, 72),
(1707, 3, 'temperature', 14, 82),
(1708, 3, 'rain', 7, 75),
(1709, 3, 'luminosity', 13, 54),
(1710, 3, 'salinity', 7, 63);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `surname` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(16) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `roleId`) VALUES
(1, 'Juan', 'Pedro', 'juanpedro@gmail.com', 'juanpedro', 4),
(2, 'Luis', 'Eduardo', 'luiseduardo@gmail.com', 'luiseduardo', 2),
(3, 'Antonia', 'Pérez', 'antoniaperez@gmail.com', 'antoniaperez', 1),
(4, 'Andrea', 'Martínez', 'andreamartinez@gmail.com', 'andreamartinez', 2),
(5, 'Marco', 'Antonio', 'marcoantonio@gmail.com', 'marcoantonio', 3),
(6, 'Marcelo', 'Fernández', 'marcelofernandez@gmail.com', 'marcelofernandez', 4),
(7, 'Juana', 'Ramírez', 'juanaramirez@gmail.com', 'juanaramirez', 1),
(8, 'Manuela', 'Sánchez', 'manuelasanchez@gmail.com', 'manuelasanchez', 3),
(9, 'meowth', '', 'gato@gmail.com', 'miau', 1),
(10, 'Abidán', 'Brito', 'abidan', 'brito', 1),
(11, 'Abidán', 'Brito', 'admin', 'admin', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users-plots`
--

CREATE TABLE `users-plots` (
  `user` int(11) NOT NULL,
  `plot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users-plots`
--

INSERT INTO `users-plots` (`user`, `plot`) VALUES
(6, 5),
(9, 1),
(9, 2),
(10, 3),
(10, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vertex`
--

CREATE TABLE `vertex` (
  `id` int(11) NOT NULL,
  `plot` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vertex`
--

INSERT INTO `vertex` (`id`, `plot`, `latitude`, `longitude`) VALUES
(1, 3, 28.494207, -14.019575),
(2, 3, 28.49408, -14.019704),
(3, 3, 28.493858, -14.019565),
(4, 3, 28.494056, -14.01927),
(5, 3, 28.494216, -14.018916),
(6, 3, 28.494433, -14.019011),
(7, 4, 28.492835, -14.019104),
(8, 4, 28.493288, -14.018895),
(3, 4, 28.493618, -14.0186),
(10, 4, 28.493773, -14.018755),
(11, 4, 28.493537, -14.019318),
(12, 4, 28.49348, -14.019356);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mesurements` (`salinity`,`rain`,`humidity`,`luminosity`,`temperature`),
  ADD KEY `pos` (`position`);

--
-- Indices de la tabla `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`,`note`) USING BTREE;

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plot` (`plot`,`magnitude`,`day`,`danger`) USING BTREE;

--
-- Indices de la tabla `plots`
--
ALTER TABLE `plots`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plots` (`plot`);

--
-- Indices de la tabla `probes`
--
ALTER TABLE `probes`
  ADD PRIMARY KEY (`serial`),
  ADD KEY `id` (`position`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `thresholds`
--
ALTER TABLE `thresholds`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plot` (`plot`,`magnitude`) USING BTREE;

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_user_role` (`roleId`);

--
-- Indices de la tabla `users-plots`
--
ALTER TABLE `users-plots`
  ADD UNIQUE KEY `user` (`user`,`plot`),
  ADD KEY `plot_set` (`plot`),
  ADD KEY `user_set` (`user`);

--
-- Indices de la tabla `vertex`
--
ALTER TABLE `vertex`
  ADD KEY `vertex-plot` (`plot`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plots`
--
ALTER TABLE `plots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `probes`
--
ALTER TABLE `probes`
  MODIFY `serial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `thresholds`
--
ALTER TABLE `thresholds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1711;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `measurements`
--
ALTER TABLE `measurements`
  ADD CONSTRAINT `pos` FOREIGN KEY (`position`) REFERENCES `positions` (`id`);

--
-- Filtros para la tabla `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `plots` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`);

--
-- Filtros para la tabla `probes`
--
ALTER TABLE `probes`
  ADD CONSTRAINT `id` FOREIGN KEY (`position`) REFERENCES `positions` (`id`);

--
-- Filtros para la tabla `thresholds`
--
ALTER TABLE `thresholds`
  ADD CONSTRAINT `thresholds_ibfk_1` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `users-plots`
--
ALTER TABLE `users-plots`
  ADD CONSTRAINT `plot_set` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_set` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vertex`
--
ALTER TABLE `vertex`
  ADD CONSTRAINT `vertex-plot` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
