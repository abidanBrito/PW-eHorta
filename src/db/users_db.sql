-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2020 a las 18:44:00
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
(3, 'Gavia #1', -14.019314, 28.494176),
(4, 'Gavia #2', -14.019035, 28.493408),
(5, 'Granja Norte', 0, -0.470384);;

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
(4, 4, -14.019035, 28.493408);

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
(10, 'root', 'Abidán', 'admin', 'pass', 1);

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
(10, 3),
(10, 4),
(6, 5);

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
-- Volcado de datos para la tabla `users-plots`
--

INSERT INTO `vertex` (`id`, `plot`, `latitude`, `longitude`) VALUES
-- Gavia #1
(1, 3, 28.494433, -14.019011),
(2, 3, 28.494207, -14.019575),
(3, 3, 28.494080, -14.019704),
(4, 3, 28.493858, -14.019565),
(5, 3, 28.494056, -14.019270),
(6, 3, 28.494216, -14.018916),

-- Gavia #2
(7, 4, 28.492835, -14.019104),
(8, 4, 28.493288, -14.018895),
(3, 4, 28.493618, -14.018600),
(10, 4, 28.493773, -14.018755),
(11, 4, 28.493537, -14.019318),
(12, 4, 28.493480, -14.019356);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

--
-- Filtros para la tabla `vertex`
--
ALTER TABLE `vertex`
  ADD CONSTRAINT `vertex-plot` FOREIGN KEY (`plot`) REFERENCES `plots` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
