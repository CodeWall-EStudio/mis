# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.6.23)
# Database: media
# Generation Time: 2015-04-05 17:38:52 +0000
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
	(25,'这是标题啊','内容主体',1,'2015-03-19 13:14:45',1,'2015-03-19 13:14:45',1),
	(26,NULL,'第三个撒公司',2,'2015-03-29 16:47:22',2,'2015-03-29 16:47:22',19),
	(27,NULL,'第三个撒公司东东',2,'2015-03-29 16:47:25',2,'2015-03-29 16:47:25',19),
	(28,NULL,'dd',2,'2015-03-29 22:45:13',2,'2015-03-29 22:45:13',19),
	(29,NULL,'ddddddddddddddd',2,'2015-03-29 22:45:29',2,'2015-03-29 22:45:29',19),
	(30,NULL,'dsagsag',2,'2015-03-29 22:48:32',2,'2015-03-29 22:48:32',19),
	(31,NULL,'sdfdaggsd',2,'2015-03-29 22:57:08',2,'2015-03-29 22:57:08',19),
	(32,NULL,'的闪光灯撒个是大家看了会撒娇',2,'2015-03-29 22:58:04',2,'2015-03-29 22:58:04',19),
	(33,'saaaaaaaaaaaaaaaa','dddddddddddddddddddddddd',2,'2015-03-29 22:59:45',2,'2015-03-29 22:59:45',19),
	(34,'等等等等','倒萨官方送达公司打工还是大',2,'2015-03-29 23:23:17',2,'2015-03-29 23:23:17',19),
	(35,'大撒个是大概','但是公司打工时的公司打工后',2,'2015-03-29 23:44:42',2,'2015-03-29 23:44:42',19),
	(37,'这是标题啊','内容主体',1,'2015-04-01 23:37:26',1,'2015-04-01 23:37:26',14),
	(39,'这是标题啊','内容主体',2,'2015-04-01 23:40:39',2,'2015-04-01 23:40:39',14),
	(40,'这是标题啊','内容主体',2,'2015-04-01 23:40:49',2,'2015-04-01 23:40:49',35),
	(43,'ddddddddddd','呆呆呆呆呆呆呆呆呆呆地顶顶顶顶顶顶',2,'2015-04-01 23:43:09',2,'2015-04-01 23:43:09',35),
	(47,'到底是大多数购房','上的广告',2,'2015-04-01 23:48:13',2,'2015-04-01 23:48:13',35),
	(48,'dsg','asdfsag',2,'2015-04-01 23:58:36',2,'2015-04-01 23:58:36',35),
	(49,'dsgsad','dsdddddddddddddd',2,'2015-04-01 23:59:15',2,'2015-04-01 23:59:15',35),
	(50,'ddd','dsdddd',2,'2015-04-04 00:11:47',2,'2015-04-04 00:11:47',37),
	(51,'dsg','dddddd',2,'2015-04-04 00:12:05',2,'2015-04-04 00:12:05',37),
	(52,'等等等等','都是狗屎狗屎',2,'2015-04-04 00:12:21',2,'2015-04-04 00:12:21',37),
	(53,'顶顶顶顶顶顶的的','电视上的',2,'2015-04-04 00:14:54',2,'2015-04-04 00:14:54',37),
	(54,'的萨嘎是的','',2,'2015-04-04 00:15:49',2,'2015-04-04 00:15:49',37),
	(55,'但是公司','大撒个',2,'2015-04-04 00:15:53',2,'2015-04-04 00:15:53',37),
	(56,'但是公司','的闪光灯撒个是',2,'2015-04-04 00:15:56',2,'2015-04-04 00:15:56',37),
	(57,'菜单','内容主体点点点',2,'2015-04-04 01:18:17',2,'2015-04-04 01:18:17',37);

/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article_collect
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_collect`;

CREATE TABLE `article_collect` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_collect` WRITE;
/*!40000 ALTER TABLE `article_collect` DISABLE KEYS */;

INSERT INTO `article_collect` (`id`, `article_id`, `user_id`, `createTime`)
VALUES
	(1,2,1,'2015-04-06 00:29:06');

/*!40000 ALTER TABLE `article_collect` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article_label
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_label`;

CREATE TABLE `article_label` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) unsigned DEFAULT NULL,
  `label_id` int(11) unsigned DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_label` WRITE;
/*!40000 ALTER TABLE `article_label` DISABLE KEYS */;

INSERT INTO `article_label` (`id`, `article_id`, `label_id`, `createTime`)
VALUES
	(1,2,1,'2015-04-06 01:32:56'),
	(2,2,2,'2015-04-06 01:32:56'),
	(3,3,1,'2015-04-06 01:32:56'),
	(4,3,2,'2015-04-06 01:32:56'),
	(5,4,1,'2015-04-06 01:32:56'),
	(6,4,2,'2015-04-06 01:32:56'),
	(9,6,1,'2015-04-06 01:32:56'),
	(10,6,2,'2015-04-06 01:32:56'),
	(11,7,1,'2015-04-06 01:32:56'),
	(12,7,2,'2015-04-06 01:32:56'),
	(13,8,1,'2015-04-06 01:32:56'),
	(14,8,2,'2015-04-06 01:32:56'),
	(15,9,1,'2015-04-06 01:32:56'),
	(16,9,2,'2015-04-06 01:32:56'),
	(17,10,1,'2015-04-06 01:32:56'),
	(18,10,2,'2015-04-06 01:32:56'),
	(19,11,1,'2015-04-06 01:32:56'),
	(20,11,2,'2015-04-06 01:32:56'),
	(21,12,1,'2015-04-06 01:32:56'),
	(22,12,2,'2015-04-06 01:32:56'),
	(23,13,1,'2015-04-06 01:32:56'),
	(24,13,2,'2015-04-06 01:32:56'),
	(25,14,1,'2015-04-06 01:32:56'),
	(26,14,2,'2015-04-06 01:32:56'),
	(27,15,1,'2015-04-06 01:32:56'),
	(28,15,2,'2015-04-06 01:32:56'),
	(29,16,1,'2015-04-06 01:32:56'),
	(30,16,2,'2015-04-06 01:32:56'),
	(31,17,1,'2015-04-06 01:32:56'),
	(32,17,2,'2015-04-06 01:32:56'),
	(33,18,1,'2015-04-06 01:32:56'),
	(34,18,2,'2015-04-06 01:32:56'),
	(35,19,1,'2015-04-06 01:32:56'),
	(36,19,2,'2015-04-06 01:32:56'),
	(37,20,1,'2015-04-06 01:32:56'),
	(38,20,2,'2015-04-06 01:32:56'),
	(39,21,1,'2015-04-06 01:32:56'),
	(40,21,2,'2015-04-06 01:32:56'),
	(41,22,1,'2015-04-06 01:32:56'),
	(42,22,2,'2015-04-06 01:32:56'),
	(43,23,1,'2015-04-06 01:32:56'),
	(44,23,2,'2015-04-06 01:32:56'),
	(45,24,1,'2015-04-06 01:32:56'),
	(46,24,2,'2015-04-06 01:32:56'),
	(47,25,1,'2015-04-06 01:32:56'),
	(48,25,2,'2015-04-06 01:32:56'),
	(49,26,1,'2015-04-06 01:32:56'),
	(50,26,2,'2015-04-06 01:32:56'),
	(51,27,1,'2015-04-06 01:32:56'),
	(52,27,2,'2015-04-06 01:32:56'),
	(53,28,1,'2015-04-06 01:32:56'),
	(54,28,2,'2015-04-06 01:32:56'),
	(55,29,1,'2015-04-06 01:32:56'),
	(56,29,2,'2015-04-06 01:32:56'),
	(57,30,1,'2015-04-06 01:32:56'),
	(58,30,2,'2015-04-06 01:32:56'),
	(59,31,1,'2015-04-06 01:32:56'),
	(60,31,2,'2015-04-06 01:32:56'),
	(61,32,1,'2015-04-06 01:32:56'),
	(62,32,2,'2015-04-06 01:32:56'),
	(63,33,1,'2015-04-06 01:32:56'),
	(64,33,2,'2015-04-06 01:32:56'),
	(65,34,1,'2015-04-06 01:32:56'),
	(66,34,2,'2015-04-06 01:32:56'),
	(67,35,1,'2015-04-06 01:32:56'),
	(68,35,2,'2015-04-06 01:32:56'),
	(71,37,1,'2015-04-06 01:32:56'),
	(72,37,2,'2015-04-06 01:32:56'),
	(73,39,1,'2015-04-06 01:32:56'),
	(74,39,2,'2015-04-06 01:32:56'),
	(75,40,1,'2015-04-06 01:32:56'),
	(76,40,2,'2015-04-06 01:32:56'),
	(79,43,1,'2015-04-06 01:32:56'),
	(80,43,2,'2015-04-06 01:32:56'),
	(87,47,1,'2015-04-06 01:32:56'),
	(88,47,2,'2015-04-06 01:32:56'),
	(89,48,1,'2015-04-06 01:32:56'),
	(90,48,2,'2015-04-06 01:32:56'),
	(91,49,1,'2015-04-06 01:32:56'),
	(92,49,2,'2015-04-06 01:32:56'),
	(93,50,1,'2015-04-06 01:32:56'),
	(94,50,2,'2015-04-06 01:32:56'),
	(95,51,1,'2015-04-06 01:32:56'),
	(96,51,2,'2015-04-06 01:32:56'),
	(97,52,1,'2015-04-06 01:32:56'),
	(98,52,2,'2015-04-06 01:32:56'),
	(99,53,1,'2015-04-06 01:32:56'),
	(100,53,2,'2015-04-06 01:32:56'),
	(101,54,1,'2015-04-06 01:32:56'),
	(102,54,2,'2015-04-06 01:32:56'),
	(103,55,1,'2015-04-06 01:32:56'),
	(104,55,2,'2015-04-06 01:32:56'),
	(105,56,1,'2015-04-06 01:32:56'),
	(106,56,2,'2015-04-06 01:32:56'),
	(107,57,1,'2015-04-06 01:32:56'),
	(108,57,2,'2015-04-06 01:32:56');

/*!40000 ALTER TABLE `article_label` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article_resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_resource`;

CREATE TABLE `article_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) unsigned DEFAULT NULL,
  `resource_id` int(10) unsigned DEFAULT NULL,
  `subject_id` int(11) unsigned DEFAULT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_resource` WRITE;
/*!40000 ALTER TABLE `article_resource` DISABLE KEYS */;

INSERT INTO `article_resource` (`id`, `article_id`, `resource_id`, `subject_id`, `createTime`)
VALUES
	(1,2,1,NULL,'2015-04-06 01:32:23'),
	(2,2,2,37,'2015-04-06 01:32:23'),
	(3,3,1,NULL,'2015-04-06 01:32:23'),
	(4,3,2,NULL,'2015-04-06 01:32:23'),
	(5,4,1,NULL,'2015-04-06 01:32:23'),
	(6,4,2,NULL,'2015-04-06 01:32:23'),
	(9,6,1,NULL,'2015-04-06 01:32:23'),
	(10,6,2,NULL,'2015-04-06 01:32:23'),
	(11,7,1,NULL,'2015-04-06 01:32:23'),
	(12,7,2,NULL,'2015-04-06 01:32:23'),
	(13,8,1,NULL,'2015-04-06 01:32:23'),
	(14,8,2,NULL,'2015-04-06 01:32:23'),
	(15,9,1,NULL,'2015-04-06 01:32:23'),
	(16,9,2,NULL,'2015-04-06 01:32:23'),
	(17,10,1,NULL,'2015-04-06 01:32:23'),
	(18,10,2,NULL,'2015-04-06 01:32:23'),
	(19,11,1,NULL,'2015-04-06 01:32:23'),
	(20,11,2,NULL,'2015-04-06 01:32:23'),
	(21,12,1,NULL,'2015-04-06 01:32:23'),
	(22,12,2,NULL,'2015-04-06 01:32:23'),
	(23,13,1,NULL,'2015-04-06 01:32:23'),
	(24,13,2,NULL,'2015-04-06 01:32:23'),
	(25,14,1,NULL,'2015-04-06 01:32:23'),
	(26,14,2,NULL,'2015-04-06 01:32:23'),
	(27,15,1,NULL,'2015-04-06 01:32:23'),
	(28,15,2,NULL,'2015-04-06 01:32:23'),
	(29,16,1,NULL,'2015-04-06 01:32:23'),
	(30,16,2,NULL,'2015-04-06 01:32:23'),
	(31,17,1,NULL,'2015-04-06 01:32:23'),
	(32,17,2,NULL,'2015-04-06 01:32:23'),
	(33,18,1,NULL,'2015-04-06 01:32:23'),
	(34,18,2,NULL,'2015-04-06 01:32:23'),
	(35,19,1,NULL,'2015-04-06 01:32:23'),
	(36,19,2,NULL,'2015-04-06 01:32:23'),
	(37,20,1,NULL,'2015-04-06 01:32:23'),
	(38,20,2,NULL,'2015-04-06 01:32:23'),
	(39,21,1,NULL,'2015-04-06 01:32:23'),
	(40,21,2,NULL,'2015-04-06 01:32:23'),
	(41,22,1,NULL,'2015-04-06 01:32:23'),
	(42,22,2,NULL,'2015-04-06 01:32:23'),
	(43,23,1,NULL,'2015-04-06 01:32:23'),
	(44,23,2,NULL,'2015-04-06 01:32:23'),
	(45,24,1,NULL,'2015-04-06 01:32:23'),
	(46,24,2,NULL,'2015-04-06 01:32:23'),
	(47,25,1,NULL,'2015-04-06 01:32:23'),
	(48,25,2,NULL,'2015-04-06 01:32:23'),
	(49,26,1,NULL,'2015-04-06 01:32:23'),
	(50,27,1,NULL,'2015-04-06 01:32:23'),
	(51,28,1,NULL,'2015-04-06 01:32:23'),
	(52,29,1,NULL,'2015-04-06 01:32:23'),
	(53,30,1,NULL,'2015-04-06 01:32:23'),
	(54,31,16,NULL,'2015-04-06 01:32:23'),
	(55,32,17,NULL,'2015-04-06 01:32:23'),
	(56,33,19,NULL,'2015-04-06 01:32:23'),
	(57,34,22,NULL,'2015-04-06 01:32:23'),
	(58,34,23,NULL,'2015-04-06 01:32:23'),
	(59,35,24,NULL,'2015-04-06 01:32:23'),
	(60,35,25,NULL,'2015-04-06 01:32:23'),
	(61,30,18,NULL,'2015-04-06 01:32:23'),
	(62,30,19,NULL,'2015-04-06 01:32:23'),
	(63,30,21,NULL,'2015-04-06 01:32:23'),
	(64,37,1,NULL,'2015-04-06 01:32:23'),
	(65,37,2,NULL,'2015-04-06 01:32:23'),
	(66,39,1,NULL,'2015-04-06 01:32:23'),
	(67,39,2,NULL,'2015-04-06 01:32:23'),
	(68,40,1,NULL,'2015-04-06 01:32:23'),
	(69,40,2,NULL,'2015-04-06 01:32:23'),
	(70,43,27,NULL,'2015-04-06 01:32:23'),
	(71,56,27,37,'2015-04-06 01:32:23'),
	(72,56,28,37,'2015-04-06 01:32:23'),
	(73,57,27,37,'2015-04-06 01:32:23'),
	(74,57,28,37,'2015-04-06 01:32:23'),
	(75,50,48,37,'2015-04-06 01:32:23'),
	(76,50,49,37,'2015-04-06 01:32:23'),
	(77,50,50,37,'2015-04-06 01:32:23');

/*!40000 ALTER TABLE `article_resource` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article_star
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_star`;

CREATE TABLE `article_star` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_star` WRITE;
/*!40000 ALTER TABLE `article_star` DISABLE KEYS */;

INSERT INTO `article_star` (`id`, `article_id`, `user_id`, `createTime`)
VALUES
	(3,2,1,'2015-04-06 00:17:37');

/*!40000 ALTER TABLE `article_star` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `creator` int(11) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `article_id` int(11) unsigned NOT NULL,
  `subject_id` int(11) unsigned NOT NULL,
  `updator` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;

INSERT INTO `comment` (`id`, `title`, `content`, `creator`, `createTime`, `updateTime`, `article_id`, `subject_id`, `updator`)
VALUES
	(1,'回复的标题1','回复的内容1',2,'2015-04-04 22:36:34','2015-04-04 22:36:34',50,37,2),
	(3,'回复的标题1','回复的内容45',2,'2015-04-04 22:36:47','2015-04-04 22:36:47',50,37,2),
	(6,'回复的标题','2123124421',2,'2015-04-04 22:56:05','2015-04-04 22:56:05',50,37,2),
	(7,'回复的标题','回复的内容445436',2,'2015-04-04 22:58:24','2015-04-04 22:58:24',50,37,2),
	(8,'tet1','回复的内容445436',2,'2015-04-04 22:59:32','2015-04-04 22:59:32',50,37,2);

/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment_collect
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment_collect`;

CREATE TABLE `comment_collect` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comment_collect` WRITE;
/*!40000 ALTER TABLE `comment_collect` DISABLE KEYS */;

INSERT INTO `comment_collect` (`id`, `comment_id`, `user_id`, `createTime`)
VALUES
	(1,2,1,'2015-04-06 00:52:19'),
	(2,1,1,'2015-04-06 00:53:14');

/*!40000 ALTER TABLE `comment_collect` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment_resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment_resource`;

CREATE TABLE `comment_resource` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `resource_id` int(11) unsigned NOT NULL,
  `comment_id` int(11) unsigned NOT NULL,
  `article_id` int(11) unsigned NOT NULL,
  `subject_id` int(11) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `comment_resource` WRITE;
/*!40000 ALTER TABLE `comment_resource` DISABLE KEYS */;

INSERT INTO `comment_resource` (`id`, `resource_id`, `comment_id`, `article_id`, `subject_id`, `createTime`)
VALUES
	(1,48,6,50,37,'2015-04-06 01:32:05'),
	(2,49,6,50,37,'2015-04-06 01:32:05'),
	(3,48,7,50,37,'2015-04-06 01:32:05'),
	(4,49,7,50,37,'2015-04-06 01:32:05'),
	(5,48,8,50,37,'2015-04-06 01:32:05'),
	(6,49,8,50,37,'2015-04-06 01:32:05');

/*!40000 ALTER TABLE `comment_resource` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment_star
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment_star`;

CREATE TABLE `comment_star` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comment_star` WRITE;
/*!40000 ALTER TABLE `comment_star` DISABLE KEYS */;

INSERT INTO `comment_star` (`id`, `comment_id`, `user_id`, `createTime`)
VALUES
	(1,2,1,'2015-04-06 01:18:50');

/*!40000 ALTER TABLE `comment_star` ENABLE KEYS */;
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
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '分类',
  `md5` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;

INSERT INTO `resource` (`id`, `name`, `ext`, `mimetype`, `path`, `size`, `createTime`, `creator`, `type`, `md5`)
VALUES
	(1,'3-10例会纪要.md','md','application/octet-stream','2015/03/28/0033/5d164e5216eb74a888853be30491edb4.md',218,'2015-03-28 00:33:39',1,0,NULL),
	(2,'测试服务器.md','md','application/octet-stream','2015/03/28/0115/d466991a60e0c299d8f966ac58d487ff.md',173,'2015-03-28 01:15:49',1,0,NULL),
	(3,'九寨沟.jpg','jpg','image/jpeg','2015/03/29/0147/0d6160d712b0e662edc69fd40a89bb7e.jpg',999978,'2015-03-29 01:47:37',1,1,NULL),
	(4,'win 7无法加载个人配置文件.txt','txt','text/plain','2015/03/29/0149/03a424a0f49581d232407b885ec4a0c7.txt',840,'2015-03-29 01:49:03',1,8,NULL),
	(5,'imatlas.com.txt','txt','text/plain','2015/03/29/0218/967fba18d91c5b3893e6f8b33d082d08.txt',437,'2015-03-29 02:18:26',1,8,NULL),
	(6,'gulpfile.js','js','application/javascript','2015/03/29/1649/7df27685158c434dd6ffdcc9308e01e5.js',4835,'2015-03-29 16:49:43',2,8,NULL),
	(7,'project.js','js','application/javascript','2015/03/29/1704/b5dfa7eed67021b166e1456c587aa69e.js',173,'2015-03-29 17:04:54',2,8,NULL),
	(8,'README.md','md','application/octet-stream','2015/03/29/1705/2ddb699bcd3e1ebacbd92b740f6d97ec.md',39,'2015-03-29 17:05:16',2,7,NULL),
	(9,'zepto.js','js','application/javascript','2015/03/29/2104/761cc4513e7d1b1f2ef5f704d57461e0.js',72504,'2015-03-29 21:04:47',2,8,NULL),
	(10,'zepto.js','js','application/javascript','2015/03/29/2105/795fd3cb79969dbe0968cdcf57c66ba8.js',72504,'2015-03-29 21:05:05',2,8,NULL),
	(11,'zepto.js','js','application/javascript','2015/03/29/2108/528c26b092b2480bf933844b832ed957.js',72504,'2015-03-29 21:08:52',2,8,NULL),
	(12,'zepto.js','js','application/javascript','2015/03/29/2112/bb5615d12d3a58bc6185819518822aab.js',72504,'2015-03-29 21:12:15',2,8,NULL),
	(13,'zepto.js','js','application/javascript','2015/03/29/2113/05d87bcf98d4d4960150852ab98c99f3.js',72504,'2015-03-29 21:13:08',2,8,NULL),
	(14,'zepto.js','js','application/javascript','2015/03/29/2113/75f082548dba190ed5736873fad115d6.js',72504,'2015-03-29 21:13:39',2,8,NULL),
	(15,'Chrysanthemum.jpg','jpg','image/jpeg','2015/03/29/2256/6b85cbaf1d720028d457942558996be2.jpg',879394,'2015-03-29 22:56:20',2,1,NULL),
	(16,'Desert.jpg','jpg','image/jpeg','2015/03/29/2257/ebe1cc9fa23de7d747065a599c93db5e.jpg',845941,'2015-03-29 22:57:01',2,1,NULL),
	(17,'Hydrangeas.jpg','jpg','image/jpeg','2015/03/29/2257/ac45c1d7caba7ad0982db0029007da06.jpg',595284,'2015-03-29 22:57:52',2,1,NULL),
	(18,'Jellyfish.jpg','jpg','image/jpeg','2015/03/29/2259/0d6e7959d1c8eec665f0c0a4bbbc537a.jpg',775702,'2015-03-29 22:59:07',2,1,NULL),
	(19,'Chrysanthemum.jpg','jpg','image/jpeg','2015/03/29/2259/0bb39526c3033d23f5e69d84d361badc.jpg',879394,'2015-03-29 22:59:34',2,1,NULL),
	(20,'Jellyfish.jpg','jpg','image/jpeg','2015/03/29/2300/ca2199727d6c3d0ca6d21e7897c2ec0d.jpg',775702,'2015-03-29 23:00:46',2,1,NULL),
	(21,'Lighthouse.jpg','jpg','image/jpeg','2015/03/29/2300/53bedb85a0f2b308ddfe5317e6463127.jpg',561276,'2015-03-29 23:00:49',2,1,NULL),
	(22,'Penguins.jpg','jpg','image/jpeg','2015/03/29/2323/10db17646d8e0a2a033ec75c3e357891.jpg',777835,'2015-03-29 23:23:10',2,1,NULL),
	(23,'Tulips.jpg','jpg','image/jpeg','2015/03/29/2323/bcffd7e908567d4d52a6c925e2edadfc.jpg',620888,'2015-03-29 23:23:12',2,1,NULL),
	(24,'永遠語り～光ノ歌～.mp3','mp3','audio/mp3','2015/03/29/2342/18c592a873e25292d404f1efad15c3e9.mp3',9853474,'2015-03-29 23:42:52',2,3,NULL),
	(25,'Cosett Vol.07 黒猫.mp4','mp4','video/mp4','2015/03/29/2343/12c07ca2c9a5113c9705a87fa360f89e.mp4',371577141,'2015-03-29 23:43:43',2,4,NULL),
	(26,'Desert.jpg','jpg','image/jpeg','2015/04/01/2342/e41bae8905e4ecceb0e870e829ae6475.jpg',845941,'2015-04-01 23:42:36',2,1,NULL),
	(27,'Desert.jpg','jpg','image/jpeg','2015/04/01/2342/5b1e37390bd3e2aec6b918e20d39910a.jpg',845941,'2015-04-01 23:42:56',2,1,NULL),
	(28,'Desert.jpg','jpg','image/jpeg','2015/04/03/0007/655271cd35f6782093e6e6a19c9b4e6c.jpg',845941,'2015-04-03 00:07:42',2,1,NULL),
	(29,'Hydrangeas.jpg','jpg','image/jpeg','2015/04/03/0050/2c8af161c2743d93155c219376b363f3.jpg',595284,'2015-04-03 00:50:45',2,1,NULL),
	(30,'Desert.jpg','jpg','image/jpeg','2015/04/03/0152/01061c3c2c04884a4042a038b0227124.jpg',845941,'2015-04-03 01:52:36',2,1,NULL),
	(31,'Hydrangeas.jpg','jpg','image/jpeg','2015/04/03/2117/ecf933ae7f6963a680467b721d9a51ec.jpg',595284,'2015-04-03 21:17:35',2,1,NULL),
	(32,'Tulips.jpg','jpg','image/jpeg','2015/04/03/2123/f000a60a593b2e023c80a869c6614b44.jpg',620888,'2015-04-03 21:23:57',2,1,NULL),
	(33,'Hydrangeas.jpg','jpg','image/jpeg','2015/04/03/2125/88966f2433615dc4642a2680c54e50d4.jpg',595284,'2015-04-03 21:25:03',2,1,NULL),
	(34,'Desert.jpg','jpg','image/jpeg','2015/04/03/2125/be80e6d82091f7d80575dba5a673f3db.jpg',845941,'2015-04-03 21:25:26',2,1,NULL),
	(35,'Desert.jpg','jpg','image/jpeg','2015/04/03/2132/59f682ba60043196b397ad7ba60ca796.jpg',845941,'2015-04-03 21:32:34',2,1,NULL),
	(36,'Desert.jpg','jpg','image/jpeg','2015/04/03/2133/59bc1736a6dee00c7a5da5458960c811.jpg',845941,'2015-04-03 21:33:06',2,1,NULL),
	(37,'Desert.jpg','jpg','image/jpeg','2015/04/03/2145/0b58922f87dc526618dcdf313368f29a.jpg',845941,'2015-04-03 21:45:03',2,1,NULL),
	(38,'Tulips.jpg','jpg','image/jpeg','2015/04/03/2145/1d79596521c05c34914fc49245bb32bb.jpg',620888,'2015-04-03 21:45:39',2,1,NULL),
	(39,'Desert.jpg','jpg','image/jpeg','2015/04/03/2146/1585f841763b5f0c7eb819c5e829a86c.jpg',845941,'2015-04-03 21:46:51',2,1,NULL),
	(40,'Desert.jpg','jpg','image/jpeg','2015/04/03/2152/d73179056f7891c108a588c9c8b70da2.jpg',845941,'2015-04-03 21:52:24',2,1,NULL),
	(41,'Hydrangeas.jpg','jpg','image/jpeg','2015/04/03/2153/74d21d040ee2c2ef2d978318844e8dba.jpg',595284,'2015-04-03 21:53:00',2,1,NULL),
	(42,'Koala.jpg','jpg','image/jpeg','2015/04/03/2153/a0cb158b564911d4322c1d563083aa2b.jpg',780831,'2015-04-03 21:53:04',2,1,NULL),
	(43,'Hydrangeas.jpg','jpg','image/jpeg','2015/04/03/2203/09834dad035233e6f98d97b1185492b3.jpg',595284,'2015-04-03 22:03:27',2,1,NULL),
	(44,'Koala.jpg','jpg','image/jpeg','2015/04/03/2203/fdb4632a345b090ba94c1d6cba9de2b2.jpg',780831,'2015-04-03 22:03:29',2,1,NULL),
	(45,'Jellyfish.jpg','jpg','image/jpeg','2015/04/03/2226/083d01e53272eaa802af1be852476adb.jpg',775702,'2015-04-03 22:26:20',2,1,NULL),
	(46,'Jellyfish.jpg','jpg','image/jpeg','2015/04/03/2241/c09813021115c3ff99e37c1c7038c434.jpg',775702,'2015-04-03 22:41:12',2,1,NULL),
	(47,'Jellyfish.jpg','jpg','image/jpeg','2015/04/03/2250/9ee07322d0a5973d516cd3aa24056799.jpg',775702,'2015-04-03 22:50:09',2,1,NULL),
	(48,'Lighthouse.jpg','jpg','image/jpeg','2015/04/03/2250/051573e3f2afcaf31b2879f8b2ff3dab.jpg',561276,'2015-04-03 22:50:12',2,1,NULL),
	(49,'Hydrangeas.jpg','jpg','image/jpeg','2015/04/03/2250/6766c8d1ade79d63d4a8fe9eb44b7716.jpg',595284,'2015-04-03 22:50:53',2,1,NULL),
	(50,'全息舞台 -澳门美高梅展艺空间 (时艺媒体制作)_高清.mp4','mp4','video/mp4','2015/04/04/1517/9d15f8c84ac33fca7ef08d596a0b4f20.mp4',10630040,'2015-04-04 15:17:18',2,4,NULL),
	(51,'平安银行.xlsx','xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','2015/04/04/1518/9a5827d836ecf6d93195428ee194ac89.xlsx',490187,'2015-04-04 15:18:03',2,2,NULL),
	(52,'test.txt','txt','text/plain','2015/04/04/1518/a1e4bdbc873d915d5e33e4e648d9f6be.txt',976,'2015-04-04 15:18:07',2,8,NULL),
	(53,'dbghelp.dll','dll','application/x-msdownload','2015/04/04/1518/d58660f9f79fe4f799f865aa4f3c3c50.dll',1061944,'2015-04-04 15:18:43',2,7,NULL);

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
	(1,'这是标题啊',1,1,'备足说明呀',1,'2015-03-08 23:01:00','2015-04-05 23:26:11',1,0),
	(2,'这是标题啊',1,1,'备足说明呀',1,'2015-03-08 23:20:37','2015-04-05 23:26:11',1,0),
	(3,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:09:55','2015-04-05 23:26:11',1,0),
	(4,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:12:37','2015-04-05 23:26:11',1,0),
	(6,'这是标题啊',1,1,'备足说明呀',2,'2015-03-11 22:13:45','2015-04-05 23:26:11',1,0),
	(7,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:13:47','2015-04-05 23:26:11',1,1),
	(8,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:16:17','2015-04-05 23:26:11',1,0),
	(9,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:16:53','2015-04-05 23:26:11',1,1),
	(10,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:17:49','2015-04-05 23:26:11',1,0),
	(11,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:20:25','2015-04-05 23:26:11',1,0),
	(12,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:20:43','2015-04-05 23:26:11',1,0),
	(13,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:24:09','2015-04-05 23:26:11',1,0),
	(14,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:25:15','2015-04-05 23:26:11',1,1),
	(15,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:25:55','2015-04-05 23:26:11',1,0),
	(16,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:26:20','2015-04-05 23:26:11',1,0),
	(17,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:26:25','2015-04-05 23:26:11',1,0),
	(18,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:27:24','2015-04-05 23:26:11',1,0),
	(19,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 22:28:27','2015-04-05 23:26:11',1,0),
	(20,'这是标题啊',1,1,'备足说明呀',2,'2015-03-11 22:29:20','2015-04-05 15:40:35',1,0),
	(21,'这是标题啊',1,1,'备足说明呀',2,'2015-03-11 22:29:52','2015-04-05 22:19:37',1,1),
	(22,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:46:09','2015-03-11 23:46:09',1,0),
	(23,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:47:02','2015-03-11 23:47:02',1,0),
	(24,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:52:02','2015-03-11 23:52:02',1,0),
	(26,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:53:44','2015-04-05 22:19:40',1,1),
	(27,'这是标题啊',1,1,'备足说明呀',1,'2015-03-11 23:58:41','2015-03-11 23:58:41',1,0),
	(28,'这是标题啊',1,1,'备足说明呀',1,'2015-03-22 00:53:48','2015-03-22 00:53:48',1,0),
	(29,'这是标题啊',1,1,'备足说明呀',1,'2015-03-23 23:02:41','2015-03-23 23:02:41',1,0),
	(30,'这是标题啊',1,1,'备足说明呀',1,'2015-03-25 09:58:36','2015-03-25 09:58:36',1,0),
	(31,'这是标题啊',1,1,'备足说明呀',2,'2015-04-01 00:08:04','2015-04-05 23:26:11',1,0),
	(32,'这是标题啊',1,1,'备足说明呀',2,'2015-04-01 00:14:10','2015-04-05 23:26:11',1,0),
	(33,'这是标题啊',1,1,'备足说明呀',2,'2015-04-01 00:19:14','2015-04-05 23:26:11',1,0),
	(34,'这是标题啊',1,1,'备足说明呀',2,'2015-04-01 00:21:16','2015-04-05 23:26:11',1,1),
	(35,'这是标题啊',1,1,'备足说明呀',2,'2015-04-01 00:21:51','2015-04-05 23:26:11',1,0),
	(36,'这是标题啊',1,1,'备足说明呀',2,'2015-04-03 22:50:23','2015-04-05 23:26:11',1,0),
	(37,'这是标题啊',1,1,'备足说明呀',2,'2015-04-03 22:50:59','2015-04-05 23:26:11',1,0);

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
	(4,5,1,'2015-03-24 22:29:46'),
	(10,37,2,'2015-04-04 18:18:16');

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
	(33,30,2,2),
	(34,36,9,1),
	(35,36,13,1),
	(36,37,8,1),
	(37,37,12,1),
	(38,1,1,1),
	(39,1,2,1),
	(40,1,3,1),
	(41,1,1,2),
	(42,1,2,2);

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
	(6,30,1),
	(7,36,47),
	(8,37,48),
	(9,37,49),
	(10,37,50),
	(11,37,51),
	(28,37,52),
	(31,37,52),
	(32,1,1);

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
	(43,30,3,2),
	(44,37,1,1),
	(45,37,2,2),
	(46,1,1,1),
	(47,1,1,2),
	(48,1,2,2),
	(49,1,3,2);

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
