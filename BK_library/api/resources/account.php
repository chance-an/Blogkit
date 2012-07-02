<?php
/**
 * User: anch
 * Date: 3/18/12
 * Time: 1:38 AM
 */

/**
 * Examples listing
 * @uri /account/:id
 */
class AccountResource extends Tonic\Resource {

    /**
     * @method GET
     * @param $article_id
     * @return string
     */
    function get($article_id) {

        return "Ahh, the great outdoors!";
    }


}
