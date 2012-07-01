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
class SessionResource extends Tonic\Resource {

    function get($request) {
        $response = new Response($request);

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
