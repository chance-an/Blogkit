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

    protected $non_update_attributes = array('id');

    public static $data_types = array(
        'id' => PDO::PARAM_INT,
        'title' => PDO::PARAM_STR,
        'content' => PDO::PARAM_STR,
        'author' => PDO::PARAM_INT
    );
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

    public function save($article_id , $attributes){
        $article = new Article();
        $properties_to_update = $article->filter_attributes_to_update($attributes);

        $database_helper = Helper::load('database');
        $dbh = $database_helper::getDatabaseHandler();

        if (empty($dbh)) {
            throw new PDOConnection();
        }
        $properties_clause = implode(',', array_map(function($key){return $key.'=:'.$key;}, array_keys($properties_to_update)));

        $statement = $dbh->prepare('UPDATE `articles` SET '.$properties_clause.' WHERE `articles`.`id` = :id'
            , array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));
        foreach($properties_to_update as $property_name => &$value){
            $statement->bindValue(':'.$property_name, $value, Article::$data_types[$property_name]);

        }
        $statement->bindValue(':id', $article_id, Article::$data_types['id']);

        $result = $statement->execute();

        if(!$result){
            throw new PDOOperation('Saving an article failed.');
        }

        return true;
    }
}
