# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.6.23)
# Database: media
# Generation Time: 2015-03-27 17:19:18 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `creator` int(11) unsigned DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updator` int(11) unsigned DEFAULT NULL,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subject_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;

INSERT INTO `article` (`id`, `title`, `content`, `creator`, `createTime`, `updator`, `updateTime`, `subject_id`)
VALUES
	(2,'这是标题啊','内容主体',1,'2015-03-12 01:32:49',1,'2015-03-12 01:32:49',1),
	(3,'这是标题啊','内容主体',1,'2015-03-12 01:33:47',1,'2015-03-12 01:33:47',1),
	(4,'这是标题啊','内容主体',1,'2015-03-12 01:42:04',1,'2015-03-12 01:42:04',1),
	(5,'这是标题啊','内容主体',1,'2015-03-18 14:12:31',1,'2015-03-18 14:12:31',1),
	(6,'这是标题啊','内容主体',1,'2015-03-18 14:12:56',1,'2015-03-18 14:12:56',1),
	(7,'这是标题啊','内容主体',1,'2015-03-18 15:00:16',1,'2015-03-18 15:00:16',1),
	(8,'这是标题啊','内容主体',1,'2015-03-18 15:00:16',1,'2015-03-18 15:00:16',1),
	(9,'这是标题啊','内容主体',1,'2015-03-18 15:00:18',1,'2015-03-18 15:00:18',1),
	(10,'这是标题啊','内容主体',1,'2015-03-18 15:00:19',1,'2015-03-18 15:00:19',1),
	(11,'这是标题啊','内容主体',1,'2015-03-18 15:00:20',1,'2015-03-18 15:00:20',1),
	(12,'这是标题啊','内容主体',1,'2015-03-18 15:00:20',1,'2015-03-18 15:00:20',1),
	(13,'这是标题啊','内容主体',1,'2015-03-18 15:00:59',1,'2015-03-18 15:00:59',1),
	(14,'这是标题啊','内容主体',1,'2015-03-18 15:01:00',1,'2015-03-18 15:01:00',1),
	(15,'这是标题啊','内容主体',1,'2015-03-18 15:01:01',1,'2015-03-18 15:01:01',1),
	(16,'这是标题啊','内容主体',1,'2015-03-18 15:01:01',1,'2015-03-18 15:01:01',1),
	(17,'这是标题啊','内容主体',1,'2015-03-18 15:01:02',1,'2015-03-18 15:01:02',1),
	(18,'这是标题啊','内容主体',1,'2015-03-18 15:01:02',1,'2015-03-18 15:01:02',1),
	(19,'这是标题啊','内容主体',1,'2015-03-18 15:01:03',1,'2015-03-18 15:01:03',1),
	(20,'这是标题啊','内容主体',1,'2015-03-18 15:01:03',1,'2015-03-18 15:01:03',1),
	(21,'这是标题啊','内容主体',1,'2015-03-18 15:01:04',1,'2015-03-18 15:01:04',1),
	(22,'这是标题啊','内容主体',1,'2015-03-18 15:01:05',1,'2015-03-18 15:01:05',1),
	(23,'这是标题啊','内容主体',1,'2015-03-18 15:01:05',1,'2015-03-18 15:01:05',1),
	(24,'这是标题啊','内容主体',1,'2015-03-18 15:01:08',1,'2015-03-18 15:01:08',1),
	(25,'这是标题啊','内容主体',1,'2015-03-19 13:14:45',1,'2015-03-19 13:14:45',1);

/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article_label
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_label`;

CREATE TABLE `article_label` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) unsigned DEFAULT NULL,
  `label_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_label` WRITE;
/*!40000 ALTER TABLE `article_label` DISABLE KEYS */;

INSERT INTO `article_label` (`id`, `article_id`, `label_id`)
VALUES
	(1,2,1),
	(2,2,2),
	(3,3,1),
	(4,3,2),
	(5,4,1),
	(6,4,2),
	(7,5,1),
	(8,5,2),
	(9,6,1),
	(10,6,2),
	(11,7,1),
	(12,7,2),
	(13,8,1),
	(14,8,2),
	(15,9,1),
	(16,9,2),
	(17,10,1),
	(18,10,2),
	(19,11,1),
	(20,11,2),
	(21,12,1),
	(22,12,2),
	(23,13,1),
	(24,13,2),
	(25,14,1),
	(26,14,2),
	(27,15,1),
	(28,15,2),
	(29,16,1),
	(30,16,2),
	(31,17,1),
	(32,17,2),
	(33,18,1),
	(34,18,2),
	(35,19,1),
	(36,19,2),
	(37,20,1),
	(38,20,2),
	(39,21,1),
	(40,21,2),
	(41,22,1),
	(42,22,2),
	(43,23,1),
	(44,23,2),
	(45,24,1),
	(46,24,2),
	(47,25,1),
	(48,25,2);

/*!40000 ALTER TABLE `article_label` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article_resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_resource`;

CREATE TABLE `article_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) unsigned DEFAULT NULL,
  `resource_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_resource` WRITE;
/*!40000 ALTER TABLE `article_resource` DISABLE KEYS */;

INSERT INTO `article_resource` (`id`, `article_id`, `resource_id`)
VALUES
	(1,2,1),
	(2,2,2),
	(3,3,1),
	(4,3,2),
	(5,4,1),
	(6,4,2),
	(7,5,1),
	(8,5,2),
	(9,6,1),
	(10,6,2),
	(11,7,1),
	(12,7,2),
	(13,8,1),
	(14,8,2),
	(15,9,1),
	(16,9,2),
	(17,10,1),
	(18,10,2),
	(19,11,1),
	(20,11,2),
	(21,12,1),
	(22,12,2),
	(23,13,1),
	(24,13,2),
	(25,14,1),
	(26,14,2),
	(27,15,1),
	(28,15,2),
	(29,16,1),
	(30,16,2),
	(31,17,1),
	(32,17,2),
	(33,18,1),
	(34,18,2),
	(35,19,1),
	(36,19,2),
	(37,20,1),
	(38,20,2),
	(39,21,1),
	(40,21,2),
	(41,22,1),
	(42,22,2),
	(43,23,1),
	(44,23,2),
	(45,24,1),
	(46,24,2),
	(47,25,1),
	(48,25,2);

/*!40000 ALTER TABLE `article_resource` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table label
# ------------------------------------------------------------

DROP TABLE IF EXISTS `label`;

CREATE TABLE `label` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `creator` int(10) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;

INSERT INTO `label` (`id`, `name`, `type`, `creator`, `createTime`)
VALUES
	(7,'标签1',0,1,'2015-03-19 13:16:42'),
	(8,'标签1',0,1,'2015-03-19 13:16:49'),
	(9,'标签1',0,1,'2015-03-19 13:16:49'),
	(10,'标签1',0,1,'2015-03-19 13:16:50'),
	(11,'标签1',0,1,'2015-03-19 13:16:50'),
	(12,'标签1',0,1,'2015-03-19 13:16:50'),
	(13,'标签1',0,1,'2015-03-19 13:16:50'),
	(14,'标签1',0,1,'2015-03-19 13:16:50'),
	(15,'标签1',0,1,'2015-03-19 13:16:51'),
	(16,'标签1',0,1,'2015-03-19 13:16:51'),
	(17,'标签2',0,1,'2015-03-19 13:16:54'),
	(18,'标签2',0,1,'2015-03-19 13:16:54'),
	(19,'标签2',0,1,'2015-03-19 13:16:54'),
	(20,'标签1',0,1,'2015-03-22 17:08:39'),
	(21,'标签1',0,1,'2015-03-22 17:09:13'),
	(22,'标签1',0,1,'2015-03-25 10:00:43');

/*!40000 ALTER TABLE `label` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource`;

CREATE TABLE `resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `ext` varchar(200) DEFAULT NULL,
  `mimetype` varchar(200) DEFAULT NULL,
  `path` varchar(500) DEFAULT '',
  `size` int(11) NOT NULL DEFAULT '0',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;

INSERT INTO `resource` (`id`, `name`, `ext`, `mimetype`, `path`, `size`, `createTime`, `creator`)
VALUES
	(1,'3-10例会纪要.md','md','application/octet-stream','2015/03/28/0033/5d164e5216eb74a888853be30491edb4.md',218,'2015-03-28 00:33:39',1),
	(2,'测试服务器.md','md','application/octet-stream','2015/03/28/0115/d466991a60e0c299d8f966ac58d487ff.md',173,'2015-03-28 01:15:49',1);

/*!40000 ALTER TABLE `resource` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `sid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `session` text COLLATE utf8_unicode_ci NOT NULL,
  `expires` int(11) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL DEFAULT '',
  `private` tinyint(1) DEFAULT '0',
  `guest` tinyint(1) DEFAULT '0',
  `mark` varchar(200) DEFAULT NULL,
  `creator` int(11) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updator` int(10) unsigned DEFAULT NULL,
  `isArchive` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;

INSERT INTO `subject` (`id`, `title`, `private`, `guest`, `mark`, `creator`, `createTime`, `updateTime`, `updator`, `isArchive`)
VALUES
	(1,'测试标题',0,1,'这是备注',1,'2015-03-08 23:01:00','2015-03-08 23:01:00',1,0),
	(2,'测试标题',0,1,'这是备注',1,'2015-03-08 23:20:37','2015-03-08 23:20:37',1,0),
	(3,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:09:55','2015-03-11 22:09:55',1,0),
	(4,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:12:37','2015-03-11 22:12:37',1,0),
	(5,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:13:21','2015-03-11 22:13:21',1,0),
	(6,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:13:45','2015-03-11 22:13:45',1,0),
	(7,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:13:47','2015-03-11 22:13:47',1,0),
	(8,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:16:17','2015-03-11 22:16:17',1,0),
	(9,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:16:53','2015-03-11 22:16:53',1,0),
	(10,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:17:49','2015-03-11 22:17:49',1,0),
	(11,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:20:25','2015-03-11 22:20:25',1,0),
	(12,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:20:43','2015-03-11 22:20:43',1,0),
	(13,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:24:09','2015-03-11 22:24:09',1,0),
	(14,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:25:15','2015-03-11 22:25:15',1,0),
	(15,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:25:55','2015-03-11 22:25:55',1,0),
	(16,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:26:20','2015-03-11 22:26:20',1,0),
	(17,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:26:25','2015-03-11 22:26:25',1,0),
	(18,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:27:24','2015-03-11 22:27:24',1,0),
	(19,'这是标题啊',0,0,'备足说明呀',1,'2015-03-11 22:28:27','2015-03-11 22:28:27',1,0),
	(20,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:29:20','2015-03-11 22:29:20',1,0),
	(21,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:29:52','2015-03-11 22:29:52',1,0),
	(22,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:46:09','2015-03-11 23:46:09',1,0),
	(23,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:47:02','2015-03-11 23:47:02',1,0),
	(24,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:52:02','2015-03-11 23:52:02',1,0),
	(26,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:53:44','2015-03-11 23:53:44',1,0),
	(27,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:58:41','2015-03-11 23:58:41',1,0),
	(28,'这是标题啊',1,1,'备足说明呀',1,'2015-03-22 00:53:48','2015-03-22 00:53:48',1,0),
	(29,'这是标题啊',1,1,'备足说明呀',1,'2015-03-23 23:02:41','2015-03-23 23:02:41',1,0),
	(30,'这是标题啊',1,1,'备足说明呀',1,'2015-03-25 09:58:36','2015-03-25 09:58:36',1,0);

/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subject_follow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subject_follow`;

CREATE TABLE `subject_follow` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `subject_follow` WRITE;
/*!40000 ALTER TABLE `subject_follow` DISABLE KEYS */;

INSERT INTO `subject_follow` (`id`, `subject_id`, `user_id`, `createTime`)
VALUES
	(1,2,1,'2015-03-24 22:19:47'),
	(3,4,1,'2015-03-24 22:29:12'),
	(4,5,1,'2015-03-24 22:29:46');

/*!40000 ALTER TABLE `subject_follow` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subject_label
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subject_label`;

CREATE TABLE `subject_label` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) unsigned DEFAULT NULL,
  `label_id` int(11) unsigned DEFAULT NULL,
  `type` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `subject_label` WRITE;
/*!40000 ALTER TABLE `subject_label` DISABLE KEYS */;

INSERT INTO `subject_label` (`id`, `subject_id`, `label_id`, `type`)
VALUES
	(1,24,1,1),
	(2,24,2,1),
	(3,24,3,1),
	(4,24,1,2),
	(5,24,2,2),
	(9,26,1,1),
	(10,26,2,1),
	(11,26,3,1),
	(12,26,1,2),
	(13,26,2,2),
	(14,27,1,1),
	(15,27,2,1),
	(16,27,3,1),
	(17,27,1,2),
	(18,27,2,2),
	(19,28,1,1),
	(20,28,2,1),
	(21,28,3,1),
	(22,28,1,2),
	(23,28,2,2),
	(24,29,1,1),
	(25,29,2,1),
	(26,29,3,1),
	(27,29,1,2),
	(28,29,2,2),
	(29,30,1,1),
	(30,30,2,1),
	(31,30,3,1),
	(32,30,1,2),
	(33,30,2,2);

/*!40000 ALTER TABLE `subject_label` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subject_resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subject_resource`;

CREATE TABLE `subject_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) unsigned DEFAULT NULL,
  `resource_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `subject_resource` WRITE;
/*!40000 ALTER TABLE `subject_resource` DISABLE KEYS */;

INSERT INTO `subject_resource` (`id`, `subject_id`, `resource_id`)
VALUES
	(1,24,1),
	(2,26,1),
	(3,27,1),
	(4,28,1),
	(5,29,1),
	(6,30,1);

/*!40000 ALTER TABLE `subject_resource` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subject_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subject_user`;

CREATE TABLE `subject_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `role` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `subject_id_rel` (`subject_id`),
  KEY `user_id_rel` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `subject_user` WRITE;
/*!40000 ALTER TABLE `subject_user` DISABLE KEYS */;

INSERT INTO `subject_user` (`id`, `subject_id`, `user_id`, `role`)
VALUES
	(1,18,1,1),
	(2,19,1,1),
	(3,20,1,1),
	(4,21,1,1),
	(5,21,1,2),
	(6,21,2,2),
	(7,21,3,2),
	(16,24,1,1),
	(17,24,1,2),
	(18,24,2,2),
	(19,24,3,2),
	(24,26,1,1),
	(25,26,1,2),
	(26,26,2,2),
	(27,26,3,2),
	(28,27,1,1),
	(29,27,1,2),
	(30,27,2,2),
	(31,27,3,2),
	(32,28,1,1),
	(33,28,1,2),
	(34,28,2,2),
	(35,28,3,2),
	(36,29,1,1),
	(37,29,1,2),
	(38,29,2,2),
	(39,29,3,2),
	(40,30,1,1),
	(41,30,1,2),
	(42,30,2,2),
	(43,30,3,2);

/*!40000 ALTER TABLE `subject_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) NOT NULL DEFAULT '',
  `pwd` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(100) DEFAULT NULL,
  `auth` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `uid`, `pwd`, `name`, `auth`)
VALUES
	(1,'longfukang','cf79ae6addba60ad018347359bd144d2','龙福康',1),
	(2,'horde','cf79ae6addba60ad018347359bd144d2','HORDE',0),
	(3,'az','cf79ae6addba60ad018347359bd144d2','A-Z',0),
	(4,'hello','cf79ae6addba60ad018347359bd144d2','你好',1),
	(5,'hello2','cf79ae6addba60ad018347359bd144d2','你好',1),
	(6,'hello3','cf79ae6addba60ad018347359bd144d2','你好',1),
	(7,'hello4','cf79ae6addba60ad018347359bd144d2','你好',1),
	(8,'hello5','cf79ae6addba60ad018347359bd144d2','你好',1),
	(9,'gugu','cf79ae6addba60ad018347359bd144d2','你好啊',0),
	(10,'gugu2','cf79ae6addba60ad018347359bd144d2','你好啊',0),
	(11,'kaka','cf79ae6addba60ad018347359bd144d2','你好啊',0),
	(12,'gugu3','cf79ae6addba60ad018347359bd144d2','你好啊',0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
