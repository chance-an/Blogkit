<?php
/**
 * User: anch
 * Date: 3/18/12
 * Time: 1:38 AM
 */

/**
 * Examples listing
 * @uri /article
 */
class ArticleResource extends Resource {

    function get($request) {

        $response = new Response($request);
        $response->code = Response::OK;

        $response->body = <<<END
Ahh, the great outdoors!
END;
        return $response;
    }

}

/**
 * Examples listing
 * @uri /articles
 */
class ArticlesResource extends Resource {

    function get($request) {

        $response = new Response($request);

        $session_helper = Helper::load('session');

        $current_user = $session_helper::getCurrentUser();

        $response->code = Response::OK;

        $response->body = <<<END
Ahh, the great outdoors!
END
.$current_user['id'];
        return $response;
    }

}
