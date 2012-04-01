<?php
/**
 * User: anch
 * Date: 3/29/12
 * Time: 12:03 AM
 */

class Helper{

    protected static $instance_mapping = array();

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
        if( !array_key_exists($class, self::$instance_mapping) ){
            $instance = null;
            eval('$instance = new '.$class.'();');
            self::$instance_mapping[$class] = $instance;
        }

        return self::$instance_mapping[$class];
    }
}
