<?php

class ResultHelper extends Helper{

    public static function getSuccessfulJSONResult($data){
        $json = array(
            'error' => null,
            'data' => $data
        );

        return json_encode($json);

    }

    public static function getErrorJSONResult($error_object){
        $error_message = &$error_object;
        if( $error_object instanceof Exception){
            $error_message = $error_object->getMessage();
        }

        $json = array(
            'error' => $error_message,
            'data' => null
        );

        return json_encode($json);
    }
}
