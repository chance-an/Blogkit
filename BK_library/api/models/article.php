<?php
/**
 * User: anch
 * Date: 7/1/12
 * Time: 11:18 PM
 */
class Article extends Model{
    private $__title;
    private $__id;
    private $__author;
    private $__content;
}

class ArticleModel {
    public function getArticle($article_id) {
        $database_helper = Helper::load('database');
        $dbh = $database_helper::getDatabaseHandler();

        if (empty($dbh)) {
            throw new PDOConnection();
        }

        $statement = $dbh->prepare(<<<SQL
        SELECT `title`, `id`, `author`, `content`
            FROM `articles`
            WHERE `articles`.`id` = :id
SQL
            , array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));
        $statement->bindValue(':id', $article_id, PDO::PARAM_INT);

        $result = $statement->execute();
        if(!$result){
            throw new PDOOperation('Fetching an articles failed.');
        }

        $data = $statement->fetch(PDO::FETCH_ASSOC);

        if(empty($data)){
            throw new PDOException($statement->errorCode());
        }

        $article = new Article();
        $article->loadFromArray($data);

        return $article;
    }
}
