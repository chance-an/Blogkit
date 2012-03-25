<?php
/**
 * User: anch
 * Date: 3/18/12
 * Time: 1:38 AM
 */

/**
 * Examples listing
 * @uri /session
 */
class SessionResource extends Resource {

    function get($request) {
        $response = new Response($request);

        require_once APP_ROOT.'3rd_party/facebook/facebook.php';

        $facebook = new Facebook(array(
            'appId' => FACEBOOK_API_ID,
            'secret' => FACEBOOK_SECRET
        ));

        $uid = $facebook->getUser();

        if($uid == 0){
            $response->code = Response::PRECONDITIONFAILED;
        }


        $response->code = Response::OK;

        $response->body = <<<END
Ahh, the great outdoors!
END
. $uid;
        return $response;
    }

    /**
     * Create a session
     */
    function post(){

        $aaa = 1;

    }

}
