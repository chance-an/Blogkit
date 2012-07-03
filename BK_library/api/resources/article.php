<?php
/**
 * User: anch
 * Date: 3/18/12
 * Time: 1:38 AM
 */

/**
 * Examples listing
 * @uri /article/:id
 */
class ArticleResource extends Tonic\Resource {

    /**
     * @method GET
     * @param $article_id
     * @return string
     */
    function get($article_id) {

        $session_helper = Helper::load('session');

        $current_user = $session_helper::getCurrentUser();

        if( !empty($current_user) ){
            $user_id = $current_user['id'];
        }else{
            throw new Tonic\ConditionException('Session lost');
        }

        $acl_model = new AclModel();
        if(!$acl_model->editArticle($article_id, $user_id)){
            throw new Tonic\PermissionDeniedException();
        };
        $article_model = new ArticleModel();
        $article = $article_model->getArticle($article_id);

        $data = $article->dump();

        $result_helper = Helper::load('result');

        $response = new Tonic\Response(Tonic\Response::OK, $result_helper->getSuccessfulJSONResult($data));
        $response->contentType = $this->request->mimetypes['json'];

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
     * @method GET
     * @return string
     */
    function get() {

        $response = new Tonic\Response();

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
            $response->code = Tonic\Response::PRECONDITIONFAILED;
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

        $response->code = Tonic\Response::OK;
        $response->body = $result_helper::getSuccessfulJSONResult($result);
        $response->contentType = $this->request->mimetypes['json'];

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
        SELECT `title`, `id`, `author`
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
