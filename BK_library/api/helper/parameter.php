<?php
/**
 * User: anch
 * Date: 3/28/12
 * Time: 11:58 PM
 */

/**
 *
 */
class ParameterHelper extends Helper{
    private static $_instance;
    /**
     * @static
     * @param $parameter_name
     * @param string $type 'int' 'string'
     * @param string $from
     * @return null
     */
    public static function getParameter($parameter_name, $type = 'int', $from = "GET"){
        if($from == 'GET' || $from == 'POST'){
            eval('$from = $_'.$from.';');
        }else{
            return null;
        }

        if( array_key_exists($parameter_name, $from)){
            $value = $from[$parameter_name];
        }else{
            return null;
        }

        switch ($type){
            case 'int':
                if ( is_int($value) ){
                     return $value;
                }
                break;
            case 'string':
                break;
            default:
                return null;
        }
        return null;
    }
}
