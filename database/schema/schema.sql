
CREATE TABLE `tb_events` (
 `id` bigint NOT NULL AUTO_INCREMENT,
 `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
 `start_time` datetime NOT NULL,
 `duration` int unsigned NOT NULL DEFAULT '0' COMMENT 'In Minutes',
 `is_active` tinyint(1) NOT NULL DEFAULT '1',
 `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin

