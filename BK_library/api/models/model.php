<?php
/**
 * User: anch
 * Date: 7/1/12
 * Time: 11:40 PM
 */

class Model{

    private $_model_properties;

    function __construct(){
        $reflect = new ReflectionClass($this);
        $properties = $reflect->getProperties(ReflectionProperty::IS_PRIVATE);
        $properties = array_map(function($e){
            $name = $e->name;
            return substr($name, 0, 2) == '__' ? substr($name, 2, strlen($name)) : null ;
        }, $properties);

        $properties = array_filter($properties, function($name){ return !empty($name);});

        $this->_model_properties = $properties;
    }

    public function __set($name, $value){
        if( !in_array($name, $this->_model_properties) ){
            return;
        }
        $name = '__'.$name;
        $reflection = new ReflectionProperty($this, $name);
        $reflection->setAccessible(true);
        $reflection->setValue($this, $value);
    }

    public function __get($name){
        if( !in_array($name, $this->_model_properties) ){
            return null;
        }
        $name = '__'.$name;
        $reflection = new ReflectionProperty($this, $name);
        $reflection->setAccessible(true);
        return $reflection->getValue($this);
    }

    public function loadFromArray(&$data){
        foreach($data as $key => &$value){
            $this->{$key} = $value;
        }
    }

    public function dump(){
        $data  = array();
        foreach($this->_model_properties as $key){
            $data[$key] = $this->{$key};
        }

        $data['type'] = $this->from_camel_case(get_class($this));
        return $data;
    }

    private function from_camel_case($str) {
        $str[0] = strtolower($str[0]);
        return preg_replace_callback('/([A-Z])/', function($c){
            return "_" . strtolower($c[1]);
        }, $str);
    }
}
 
