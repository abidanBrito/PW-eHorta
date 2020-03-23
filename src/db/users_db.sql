-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2020 a las 11:08:13
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plots`
--

CREATE TABLE `plots` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plots`
--

INSERT INTO `plots` (`id`, `name`, `longitude`, `latitude`) VALUES
(1, 'Naranjos Paterna', -0.441465, 39.497875),
(2, 'Manzanos Bétera', -0.470384, 39.593231),
(4, 'Granja Norte', 0, -0.470384);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `probes`
--

CREATE TABLE `probes` (
  `position` int(11) NOT NULL,
  `serial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(9, 'meowth', '', 'gato@gmail.com', 'miau', 1);

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
(9, 1),
(9, 2),
(6, 4),
(6, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pos` (`position`);

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
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_user_role` (`roleId`);

--
-- Indices de la tabla `users-plots`
--
ALTER TABLE `users-plots`
  ADD KEY `plot_set` (`plot`),
  ADD KEY `user_set` (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `measurements`
--
ALTER TABLE `measurements`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `probes`
--
ALTER TABLE `probes`
  MODIFY `serial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `measurements`
--
ALTER TABLE `measurements`
  ADD CONSTRAINT `pos` FOREIGN KEY (`position`) REFERENCES `positions` (`id`);

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
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `users-plots`
--
ALTER TABLE `users-plots`
  ADD CONSTRAINT `plot_set` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`),
  ADD CONSTRAINT `user_set` FOREIGN KEY (`user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
