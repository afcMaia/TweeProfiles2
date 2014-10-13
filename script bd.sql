--
-- Database: `tweeprofiles`
--

-- --------------------------------------------------------

--
-- Table structure for table `clusters`
--

CREATE TABLE IF NOT EXISTS `clusters` (
  `id` int(11) NOT NULL,
  `test` int(11) NOT NULL,
  `n` int(11) NOT NULL,
  `nwords` int(11) NOT NULL,
  `center_lat` double NOT NULL,
  `center_lon` double NOT NULL,
  `center_hou` double NOT NULL,
  `center_wkd` double NOT NULL,
  `dist_geo` double NOT NULL,
  `dist_temp` double NOT NULL,
  `dist_text` double NOT NULL,
  `weight` double NOT NULL,
  `radius` double NOT NULL,
  `lambda` double NOT NULL,
  `creation_t` int(11) NOT NULL,
  `lastedit_t` int(11) NOT NULL,
  `creation_d` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastedit_d` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`,`test`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `cluster_words`
--

CREATE TABLE IF NOT EXISTS `cluster_words` (
  `cluster_id` int(11) NOT NULL,
  `test` int(11) NOT NULL,
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `freq` int(11) NOT NULL,
  UNIQUE KEY `u_cwords` (`test`,`cluster_id`,`word`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




--
-- Table structure for table `micro_clusters`
--

CREATE TABLE IF NOT EXISTS `micro_clusters` (
  `id` int(11) NOT NULL,
  `test` int(11) NOT NULL,
  `n` int(11) NOT NULL,
  `nwords` int(11) NOT NULL,
  `center_lat` double NOT NULL,
  `center_lon` double NOT NULL,
  `center_hou` double NOT NULL,
  `center_wkd` double NOT NULL,
  `dist_geo` double NOT NULL,
  `dist_temp` double NOT NULL,
  `dist_text` double NOT NULL,
  `weight` double NOT NULL,
  `radius` double NOT NULL,
  `lambda` double NOT NULL,
  `creation_t` int(11) NOT NULL,
  `lastedit_t` int(11) NOT NULL,
  `creation_d` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastedit_d` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`,`test`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `micro_cluster_words`
--

CREATE TABLE IF NOT EXISTS `micro_cluster_words` (
  `mcluster_id` int(11) NOT NULL,
  `test` int(11) NOT NULL,
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `freq` int(11) NOT NULL,
  UNIQUE KEY `u_mcwords` (`test`,`mcluster_id`,`word`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

