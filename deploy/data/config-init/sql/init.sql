/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.36 : Database - noop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`noop` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `noop`;

/*Table structure for table `knowledge` */

DROP TABLE IF EXISTS `knowledge`;

CREATE TABLE `knowledge` (
  `id` varchar(255) NOT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `type` char(1) DEFAULT NULL COMMENT '0为文件夹，1为文件',
  `title` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `knowledge` */

insert  into `knowledge`(`id`,`parent_id`,`type`,`title`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1792575783556415490','1749837707132424193','0','1111111111','2024-05-20 15:19:06','2024-05-21 14:11:41','0',NULL),('1792575784055537665','1792575783556415490','1','test1','2024-05-20 15:19:06','2024-05-21 14:11:41','0',NULL),('1792575785003450369','1749837707132424193','0','2222222222222','2024-05-20 15:19:06','2024-05-21 14:11:42','0',NULL),('1792575785477406721','1792575785003450369','1','thi222222','2024-05-20 15:19:06','2024-05-21 14:11:42','0',NULL),('1792587002128433153','1792575785003450369','1','t','2024-05-20 16:03:41','2024-05-21 14:11:42','0',NULL),('1792921207194095618','1792575783556415490','1','test2','2024-05-21 14:11:41','2024-05-21 14:11:41','0',NULL);

/*Table structure for table `page` */

DROP TABLE IF EXISTS `page`;

CREATE TABLE `page` (
  `id` varchar(255) NOT NULL,
  `content` text,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `page` */

insert  into `page`(`id`,`content`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1792575784055537665','<p class=\"bn-inline-content\">This is test1 content</p><p class=\"bn-inline-content\"></p>','2024-05-20 15:19:06','2024-05-22 14:53:41','0',NULL),('1792575785477406721','<p class=\"bn-inline-content\"></p><p class=\"bn-inline-content\">1</p><p class=\"bn-inline-content\">123</p><p class=\"bn-inline-content\"></p>','2024-05-20 15:19:06','2024-05-21 14:15:05','0',NULL),('1792587002128433153','<p class=\"bn-inline-content\">123</p><p class=\"bn-inline-content\"></p>','2024-05-20 16:03:41','2024-05-21 14:15:07','0',NULL),('1792921207194095618','<p class=\"bn-inline-content\">Text2 Content</p><p class=\"bn-inline-content\"></p>','2024-05-21 14:11:41','2024-05-21 14:18:32','0',NULL);

/*Table structure for table `sys_auth` */

DROP TABLE IF EXISTS `sys_auth`;

CREATE TABLE `sys_auth` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_auth` */

insert  into `sys_auth`(`id`,`name`,`url`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1','测试接口','GET:/test','2024-01-24 20:42:41','2024-01-24 20:42:41','0',NULL);

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_role` */

insert  into `sys_role`(`id`,`name`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1','ROLE_USER','2024-01-24 20:34:09','2024-01-24 20:34:09','0',NULL);

/*Table structure for table `sys_role_auth` */

DROP TABLE IF EXISTS `sys_role_auth`;

CREATE TABLE `sys_role_auth` (
  `id` varchar(255) NOT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `auth_id` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_role_auth` */

insert  into `sys_role_auth`(`id`,`role_id`,`auth_id`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1','1','1','2024-01-24 20:42:41','2024-01-24 20:42:41','0',NULL);

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`username`,`password`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1749837707132424193','lear','$2a$10$BGDBsZwetB5wS1oGLSMhtuZ5.Fb5quYd3k/5xXMxUL/D59.TAlTx.','2024-01-24 00:53:14','2024-01-24 00:53:14','0',NULL);

/*Table structure for table `sys_user_role` */

DROP TABLE IF EXISTS `sys_user_role`;

CREATE TABLE `sys_user_role` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_user_role` */

insert  into `sys_user_role`(`id`,`user_id`,`role_id`,`create_date`,`update_date`,`del_flag`,`remarks`) values ('1749837707132114514','1749837707132424193','1','2024-01-24 20:34:42','2024-01-24 20:34:42','0',NULL);

/*Table structure for table `undo_log` */

DROP TABLE IF EXISTS `undo_log`;

CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `undo_log` */

/*Table structure for table `user_article` */

DROP TABLE IF EXISTS `user_article`;

CREATE TABLE `user_article` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_article` */

insert  into `user_article`(`id`,`user_id`,`title`,`platform`,`del_flag`,`create_date`,`update_date`,`remarks`) values ('1749837707132424666','1749837707132424193','string','微信','0','2024-05-23 13:15:03','2024-05-23 13:15:03',NULL);

/*Table structure for table `user_wechat` */

DROP TABLE IF EXISTS `user_wechat`;

CREATE TABLE `user_wechat` (
  `id` varchar(255) NOT NULL,
  `app_id` varchar(255) DEFAULT NULL,
  `authorizer_refresh_token` varchar(255) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_wechat` */

insert  into `user_wechat`(`id`,`app_id`,`authorizer_refresh_token`,`update_date`,`create_date`,`del_flag`,`remarks`) values ('1749837707132424193','wxbc61f9d10aad13d7','refreshtoken@@@U789JdHjhCKz-kBli54687KyZpucMWYN7mYs80RAg68','2024-05-23 05:44:46','2024-05-22 07:16:33','0',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
