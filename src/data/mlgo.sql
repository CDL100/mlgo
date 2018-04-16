/*
Navicat MySQL Data Transfer

Source Server         : angelzouzou
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : mlgo

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-04-16 20:47:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ml_id` int(10) NOT NULL,
  `mlname` varchar(100) NOT NULL,
  `special` decimal(10,2) NOT NULL,
  `md` int(10) NOT NULL,
  `count` int(10) NOT NULL,
  `img` varchar(100) NOT NULL,
  `market` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('1', '1', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '128.00', '9', '4', '../img/NN011.jpg', '216.99');
INSERT INTO `cart` VALUES ('2', '2', '荷兰乳牛 中老年配方奶粉900g?2罐礼盒装', '112.00', '9', '2', '../img/NN021.jpg', '200.99');
INSERT INTO `cart` VALUES ('3', '3', ' 伊利 新西兰原装进口?全脂奶粉 1kg', '173.00', '16', '1', '../img/NN031.jpg', '216.99');
INSERT INTO `cart` VALUES ('4', '4', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '108.00', '26', '1', '../img/NN041.jpg', '216.99');

-- ----------------------------
-- Table structure for milk
-- ----------------------------
DROP TABLE IF EXISTS `milk`;
CREATE TABLE `milk` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ml_id` int(10) NOT NULL,
  `type_id` int(10) NOT NULL DEFAULT '1',
  `imgurl1` varchar(255) NOT NULL,
  `imgurl2` varchar(255) DEFAULT NULL,
  `imgurl3` varchar(255) DEFAULT NULL,
  `imgurl4` varchar(255) DEFAULT NULL,
  `imgurl5` varchar(255) DEFAULT NULL,
  `imgurl6` varchar(255) DEFAULT NULL,
  `Bimgurl1` varchar(255) NOT NULL,
  `Bimgurl2` varchar(255) DEFAULT NULL,
  `Bimgurl3` varchar(255) DEFAULT NULL,
  `Bimgurl4` varchar(255) DEFAULT NULL,
  `Bimgurl5` varchar(255) DEFAULT NULL,
  `Bimgurl6` varchar(255) DEFAULT NULL,
  `mlname` varchar(255) NOT NULL,
  `introduce` varchar(255) NOT NULL,
  `special` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `market` decimal(10,2) NOT NULL,
  `sale` int(10) NOT NULL,
  `comment` int(10) NOT NULL,
  `md` int(10) NOT NULL,
  `like` int(10) NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of milk
-- ----------------------------
INSERT INTO `milk` VALUES ('1', '1', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '../img/NN011B.jpg', '../img/NN012B.jpg', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '128.00', '188.00', '216.99', '56', '89', '9', '20');
INSERT INTO `milk` VALUES ('2', '2', '1', '../img/NN021.jpg', '../img/NN022.jpg', '../img/NN023.jpg', '../img/NN024.jpg', '', '', '../img/NN021B.jpg', '../img/NN022B.jpg', '../img/NN023B.jpg', '../img/NN024B.jpg', '', '', '荷兰乳牛 中老年配方奶粉900g?2罐礼盒装', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '112.00', '188.00', '200.99', '575', '1121', '9', '20');
INSERT INTO `milk` VALUES ('3', '3', '1', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN033.jpg', '../img/NN034.jpg', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN031B.jpg', '../img/NN032B.jpg', '../img/NN033B.jpg', '../img/NN034B.jpg', '../img/NN031B.jpg', '../img/NN032B.jpg', ' 伊利 新西兰原装进口?全脂奶粉 1kg', '全球购周年庆，满299元减25�?�?99元减40�?�?99�?0,4�?号到15�?', '173.00', '188.00', '216.99', '232', '543', '16', '20');
INSERT INTO `milk` VALUES ('4', '4', '1', '../img/NN041.jpg', '../img/NN042.jpg', '../img/NN043.jpg', '../img/NN044.jpg', '', '', '../img/NN041B.jpg', '../img/NN042B.jpg', '../img/NN043B.jpg', '../img/NN044B.jpg', '', '', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '【恒大乳业】新西兰原装进口奶粉 高钙不含�?每袋仅售68�?�?', '108.00', '188.00', '216.99', '65', '313', '26', '20');
INSERT INTO `milk` VALUES ('5', '5', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '164.00', '188.00', '216.99', '20', '1111', '28', '20');
INSERT INTO `milk` VALUES ('6', '6', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '100.00', '188.00', '216.99', '67', '222', '34', '20');
INSERT INTO `milk` VALUES ('7', '7', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '134.00', '188.00', '216.99', '109', '633', '9', '73');
INSERT INTO `milk` VALUES ('8', '8', '1', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN033.jpg', '../img/NN034.jpg', '', '', '../img/NN031B.jpg', '../img/NN032B.jpg', '../img/NN033B.jpg', '../img/NN034B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '173.00', '188.00', '216.99', '2012', '1526', '9', '22');
INSERT INTO `milk` VALUES ('9', '9', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '../img/NN011B.jpg', '../img/NN012B.jpg', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '168.00', '188.00', '214.80', '565', '121', '9', '83');
INSERT INTO `milk` VALUES ('10', '10', '1', '../img/NN021.jpg', '../img/NN022.jpg', '../img/NN023.jpg', '../img/NN024.jpg', '', '', '../img/NN021B.jpg', '../img/NN022B.jpg', '../img/NN023B.jpg', '../img/NN024B.jpg', '', '', '荷兰乳牛 中老年配方奶粉900g2罐礼盒装', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '152.00', '188.00', '180.00', '201', '1526', '27', '20');
INSERT INTO `milk` VALUES ('11', '11', '1', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN033.jpg', '../img/NN034.jpg', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN031B.jpg', '../img/NN032B.jpg', '../img/NN033B.jpg', '../img/NN034B.jpg', '../img/NN031B.jpg', '../img/NN032B.jpg', ' 伊利 新西兰原装进?全脂奶粉 1kg', '全球购周年庆，满299元减25�?�?99元减40�?�?99�?0,4�?号到15�?', '119.00', '188.00', '216.99', '674', '1974', '11', '42');
INSERT INTO `milk` VALUES ('12', '12', '1', '../img/NN041.jpg', '../img/NN042.jpg', '../img/NN043.jpg', '../img/NN044.jpg', '', '', '../img/NN041B.jpg', '../img/NN042B.jpg', '../img/NN043B.jpg', '../img/NN044B.jpg', '', '', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '【恒大乳业】新西兰原装进口奶粉 高钙不含�?每袋仅售68�?�?', '179.00', '188.00', '216.99', '889', '3667', '9', '20');
INSERT INTO `milk` VALUES ('13', '13', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '159.00', '188.00', '216.99', '793', '890', '9', '26');
INSERT INTO `milk` VALUES ('14', '14', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '193.00', '188.00', '156.00', '232', '3212', '9', '45');
INSERT INTO `milk` VALUES ('15', '15', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '151.00', '188.00', '216.99', '465', '1526', '9', '20');
INSERT INTO `milk` VALUES ('16', '16', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '140.00', '188.00', '216.99', '890', '1526', '9', '43');
INSERT INTO `milk` VALUES ('17', '17', '1', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN033.jpg', '../img/NN034.jpg', '', '', '../img/NN031B.jpg', '../img/NN032B.jpg', '../img/NN033B.jpg', '../img/NN034B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '179.00', '188.00', '216.99', '121', '3345', '9', '20');
INSERT INTO `milk` VALUES ('18', '18', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '../img/NN011B.jpg', '../img/NN012B.jpg', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '286.00', '188.00', '389.00', '232', '6634', '46', '20');
INSERT INTO `milk` VALUES ('19', '19', '1', '../img/NN021.jpg', '../img/NN022.jpg', '../img/NN023.jpg', '../img/NN024.jpg', '', '', '../img/NN021B.jpg', '../img/NN022B.jpg', '../img/NN023B.jpg', '../img/NN024B.jpg', '', '', '荷兰乳牛 中老年配方奶粉900g2罐礼盒装', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '168.00', '188.00', '200.33', '284', '565', '9', '34');
INSERT INTO `milk` VALUES ('20', '20', '1', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN033.jpg', '../img/NN034.jpg', '../img/NN031.jpg', '../img/NN032.jpg', '../img/NN031B.jpg', '../img/NN032B.jpg', '../img/NN033B.jpg', '../img/NN034B.jpg', '../img/NN031B.jpg', '../img/NN032B.jpg', ' 伊利 新西兰原装进口?全脂奶粉 1kg', '全球购周年庆，满299元减25�?�?99元减40�?�?99�?0,4�?号到15�?', '132.00', '188.00', '216.99', '121', '567', '121', '20');
INSERT INTO `milk` VALUES ('21', '21', '1', '../img/NN041.jpg', '../img/NN042.jpg', '../img/NN043.jpg', '../img/NN044.jpg', '', '', '../img/NN041B.jpg', '../img/NN042B.jpg', '../img/NN043B.jpg', '../img/NN044B.jpg', '', '', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '【恒大乳业】新西兰原装进口奶粉 高钙不含�?每袋仅售68�?�?', '145.00', '188.00', '216.99', '1112', '3253', '9', '20');
INSERT INTO `milk` VALUES ('22', '22', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '176.00', '168.00', '216.99', '43', '34', '9', '63');
INSERT INTO `milk` VALUES ('23', '23', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '312.00', '168.00', '330.00', '768', '1526', '9', '22');
INSERT INTO `milk` VALUES ('24', '24', '1', '../img/NN041.jpg', '../img/NN042.jpg', '../img/NN043.jpg', '../img/NN044.jpg', '', '', '../img/NN041B.jpg', '../img/NN042B.jpg', '../img/NN043B.jpg', '../img/NN044B.jpg', '', '', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '【恒大乳业】新西兰原装进口奶粉 高钙不含�?每袋仅售68�?�?', '179.00', '188.00', '200.82', '3280', '4545', '9', '57');
INSERT INTO `milk` VALUES ('25', '25', '1', '../img/NN021.jpg', '../img/NN022.jpg', '../img/NN023.jpg', '../img/NN024.jpg', '', '', '../img/NN021B.jpg', '../img/NN022B.jpg', '../img/NN023B.jpg', '../img/NN024B.jpg', '', '', '荷兰乳牛 中老年配方奶粉900g2罐礼盒装', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '183.00', '188.00', '200.33', '1037', '565', '9', '82');
INSERT INTO `milk` VALUES ('26', '26', '1', '../img/NN011.jpg', '../img/NN012.jpg', '../img/NN013.jpg', '../img/NN014.jpg', '', '', '../img/NN011B.jpg', '../img/NN012B.jpg', '../img/NN013B.jpg', '../img/NN014B.jpg', '', '', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '踏春优选，好奶当先，买牛奶上麦乐，低至2�?�?', '109.00', '188.00', '216.99', '1674', '890', '9', '31');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `ml_id` int(100) NOT NULL,
  `mlname` varchar(100) NOT NULL,
  `special` decimal(10,2) NOT NULL,
  `market` decimal(10,2) NOT NULL,
  `sale` int(100) NOT NULL,
  `img` varchar(255) NOT NULL,
  `count` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('1', '2', '荷兰乳牛 中老年配方奶粉900g?2罐礼盒装', '112.00', '200.99', '575', '../img/NN021B.jpg', '1');
INSERT INTO `record` VALUES ('2', '7', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '134.00', '216.99', '109', '../img/NN011B.jpg', '1');
INSERT INTO `record` VALUES ('3', '4', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '108.00', '216.99', '65', '../img/NN041B.jpg', '1');
INSERT INTO `record` VALUES ('4', '5', '法国原装进口 荷兰乳牛3.5 3.8全脂牛奶1L*6 整箱', '164.00', '216.99', '20', '../img/NN011B.jpg', '1');
INSERT INTO `record` VALUES ('5', '11', ' 伊利 新西兰原装进?全脂奶粉 1kg', '119.00', '216.99', '674', '../img/NN031B.jpg', '1');
INSERT INTO `record` VALUES ('6', '24', '咔哇熊（【恒大乳业】新西兰原装进口成人中老年奶粉1kg*2高钙全脂奶粉', '179.00', '200.82', '3280', '../img/NN041B.jpg', '1');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `type_id` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL,
  `kind1` varchar(255) NOT NULL,
  `kind2` varchar(255) NOT NULL,
  `kind3` varchar(255) NOT NULL,
  `kind4` varchar(255) NOT NULL,
  `kind5` varchar(255) NOT NULL,
  `kind6` varchar(255) NOT NULL,
  `kind7` varchar(255) NOT NULL,
  `kind8` varchar(255) NOT NULL,
  `kind9` varchar(255) NOT NULL,
  `kind10` varchar(255) NOT NULL,
  `kind11` varchar(255) NOT NULL,
  `kind12` varchar(255) NOT NULL,
  `brand1` varchar(255) NOT NULL,
  `brand2` varchar(255) NOT NULL,
  `imgurl1` varchar(255) NOT NULL,
  `imgurl2` varchar(255) NOT NULL,
  `imgurl3` varchar(255) NOT NULL,
  `imgurl4` varchar(255) NOT NULL,
  `imgurl5` varchar(255) NOT NULL,
  `imgurl6` varchar(255) NOT NULL,
  `imgurl7` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('1', '1', '宝宝奶粉', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type1_b1.jpg', 'img/type1_b2.jpg', 'img/type1_i1.jpg', 'img/type1_i2.jpg', 'img/type1_i3.jpg', 'img/type1_i4.jpg', 'img/type1_i5.jpg', 'img/type1_i6.jpg', 'img/type1_i7.jpg');
INSERT INTO `type` VALUES ('2', '2', '宝宝辅食', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type2_b1.jpg', 'img/type2_b2.jpg', 'img/type2_i1.jpg', 'img/type2_i2.jpg', 'img/type2_i3.jpg', 'img/type2_i4.jpg', 'img/type2_i5.jpg', 'img/type2_i6.jpg', 'img/type2_i7.jpg');
INSERT INTO `type` VALUES ('3', '3', '营养健康', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type3_b1.jpg', 'img/type3_b2.jpg', 'img/type3_i1.jpg', 'img/type3_i2.jpg', 'img/type3_i3.jpg', 'img/type3_i4.jpg', 'img/type3_i5.jpg', 'img/type3_i6.jpg', 'img/type3_i7.jpg');
INSERT INTO `type` VALUES ('4', '4', '宝宝用品', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type2_b1.jpg', 'img/type2_b2.jpg', 'img/type2_i1.jpg', 'img/type2_i2.jpg', 'img/type2_i3.jpg', 'img/type2_i4.jpg', 'img/type2_i5.jpg', 'img/type2_i6.jpg', 'img/type2_i7.jpg');
INSERT INTO `type` VALUES ('5', '5', '宝宝服饰', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type5_b1.jpg', 'img/type5_b2.jpg', 'img/type5_i1.jpg', 'img/type5_i2.jpg', 'img/type5_i3.jpg', 'img/type5_i4.jpg', 'img/type5_i5.jpg', 'img/type5_i6.jpg', 'img/type5_i7.jpg');
INSERT INTO `type` VALUES ('6', '6', '宝宝玩具', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type6_b1.jpg', 'img/type6_b2.jpg', 'img/type6_i1.jpg', 'img/type6_i2.jpg', 'img/type6_i3.jpg', 'img/type6_i4.jpg', 'img/type6_i5.jpg', 'img/type6_i6.jpg', 'img/type6_i7.jpg');
INSERT INTO `type` VALUES ('7', '7', '孕产用品', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type7_b1.jpg', 'img/type7_b2.jpg', 'img/type7_i1.jpg', 'img/type7_i2.jpg', 'img/type7_i3.jpg', 'img/type7_i4.jpg', 'img/type7_i5.jpg', 'img/type7_i6.jpg', 'img/type7_i7.jpg');
INSERT INTO `type` VALUES ('8', '8', '化妆品', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type8_b1.jpg', 'img/type8_b2.jpg', 'img/type8_i1.jpg', 'img/type8_i2.jpg', 'img/type8_i3.jpg', 'img/type8_i4.jpg', 'img/type8_i5.jpg', 'img/type8_i6.jpg', 'img/type8_i7.jpg');
INSERT INTO `type` VALUES ('9', '9', '居家生活', '牛奶粉', '羊奶粉', '有机奶粉', '早产儿奶粉', '乳糖不耐受', '乳糖不耐受', '牛乳过敏', '益生菌奶粉', '0-6个月', '6-12个月', '1-2月', '2-3月', 'img/type9_b1.jpg', 'img/type9_b2.jpg', 'img/type9_i1.jpg', 'img/type9_i2.jpg', 'img/type9_i3.jpg', 'img/type9_i4.jpg', 'img/type9_i5.jpg', 'img/type9_i6.jpg', 'img/type9_i7.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
