<?php
/**
 * Joomla! common library.
 *
 * @copyright  Copyright (C) 2017 Roberto Segura López, Inc. All rights reserved.
 * @license    GNU/GPL 2, http://www.gnu.org/licenses/gpl-2.0.htm
 */

defined('JPATH_PLATFORM') or die;

// Require our Composer libraries
$composerAutoload = __DIR__ . '/vendor/autoload.php';

if (file_exists($composerAutoload))
{
	$loader = require_once $composerAutoload;
}

// Load library language
$lang = JFactory::getLanguage();
$lang->load('lib_phproberto', __DIR__);
