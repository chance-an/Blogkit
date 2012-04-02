<?php
/**
 * User: anch
 * Date: 3/28/12
 * Time: 11:58 PM
 */


class DatabaseHelper extends Helper{

    public static function getDatabaseHandler(){
        try {
            $dbh = new PDO(DATA_SOURCE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            return null;
        }
        return $dbh;
    }
}


class PDOConnection extends PDOException{

    function __construct(){
        parent::__construct('Database connection error.');
    }

}

class PDOOperation extends PDOException{
    function __construct(){
        parent::__construct('Database operation error.');
    }
}