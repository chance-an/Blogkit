<?php
/**
 * User: anch
 * Date: 3/29/12
 * Time: 12:03 AM
 */

class Helper{
    protected static $_instance;

    private function __construct(){
    }

    public static function load($helper_name){
        require_once dirname(__FILE__).'/'.$helper_name.'.php';

        $classname = ucfirst($helper_name).'Helper';
        $instance = null;
        eval('$instance = '. $classname. '::getInstance();');
        return $instance;
    }

    public static function getInstance(){
        $class = get_called_class();
        if ( empty(self::$_instance) ){
            eval($class.'::$_instance = new '.$class.'();');
        }

        $instance = null;
        eval('$instance = '.$class.'::$_instance;');
        return $instance;
    }
}
