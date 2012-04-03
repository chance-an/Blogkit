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

function jsonRemoveUnicodeSequences($struct) {
    return preg_replace("/\\\\u([a-f0-9]{4})/e", "iconv('UCS-4LE','UTF-8',pack('V', hexdec('U$1')))", json_encode($struct));
}

/**
 * Examples listing
 * @uri /articles
 */
class ArticlesResource extends ArticleResource {

    /**
     * @webservice_parm user_id
     * @param $request
     * @return Response
     */
    function get($request) {

        $response = new Response($request);

        /**
         * @var $parameter_helper ParameterHelper
         */
        $parameter_helper = Helper::load('parameter');

        $user_id = $parameter_helper::getParameter('user_id', 'int');

        if( empty($user_id) ){
            /**
             * @var $session_helper SessionHelper
             */
            $session_helper = Helper::load('session');

            $current_user = $session_helper::getCurrentUser();

            if( !empty($current_user) ){
                $user_id = $current_user['id'];
            }

        }

        if(empty($user_id)){
            //cannot get an id
            $response->code = Response::PRECONDITIONFAILED;
            return $response;
        }

        /**
         * @var $result_helper ResultHelper
         */
        $result_helper = Helper::load('result');

        try{
            $result = $this->getArticlesByUserId($user_id);
        }catch(Exception $e){
            $response->code = Response::INTERNALSERVERERROR;
            $response->body = $result_helper::getErrorJSONResult($e);
            return $response;
        }


        $response->code = Response::OK;
        $response->body = $result_helper::getSuccessfulJSONResult($result);
        $response->addHeader('Content-Type', $request->mimetypes['json']);

        return $response;
    }

    private function getArticlesByUserId($user_id){
        /**
         * @var $database_helper DatabaseHelper
         */
        $database_helper = Helper::load('database');

        $dbh = $database_helper::getDatabaseHandler();

        if( empty($dbh) ){
            throw new PDOConnection();
        }

        $statement = $dbh->prepare(<<<SQL
        SELECT `title`, `id`
            FROM `articles`
            WHERE `author` = :user_id
SQL
        , array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));
        $statement->bindValue(':user_id', $user_id, PDO::PARAM_INT);

        $result = $statement->execute();
        if($result){
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }else{
            throw new PDOOperation('Fetching Articles failed.');
        }
    }

}
