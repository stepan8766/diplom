CREATE TABLE IF NOT EXISTS `products_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` bigint NOT NULL DEFAULT '0',
  `product` int NOT NULL DEFAULT '0',
  `name` tinytext NOT NULL,
  `webUrl` tinytext NOT NULL,
  `regularPrice` float NOT NULL DEFAULT '0',
  `discountPrice` float NOT NULL DEFAULT '0',
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(144) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `city_id` varchar(10) DEFAULT NULL,
  `store_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `default_time` smallint unsigned DEFAULT '300',
  `time` smallint unsigned DEFAULT '300',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
