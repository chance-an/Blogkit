<?php
/**
 * User: anch
 * Date: 3/28/12
 * Time: 11:58 PM
 */


class SessionHelper extends Helper{

    public static function getCurrentUser(){
        require_once APP_ROOT.'3rd_party/facebook/facebook.php';

        $facebook = new Facebook(array(
            'appId' => FACEBOOK_API_ID,
            'secret' => FACEBOOK_SECRET
        ));

        $uid = $facebook->getUser();

        if($uid == 0){
            return null;
        }

        return array(
            'id' => $uid
        );
    }
}
