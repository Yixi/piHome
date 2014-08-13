<?php
/**
 * Created by PhpStorm.
 * User: yixi
 * Date: 8/13/14
 * Time: 11:25
 */

define('APP_DEBUG', true);

if(version_compare(PHP_VERSION, '5.3.0','<')) die ('require PHP > 5.3.0');

define('APP_PATH','./Application/');

require './ThinkPHP/ThinkPHP.php';