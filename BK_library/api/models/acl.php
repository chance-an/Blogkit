<?php
/**
 * User: anch
 * Date: 7/1/12
 * Time: 11:18 PM
 */

class AclModel {
    public function editArticle($article_id, $user_id){
        $article_model = new ArticleModel();

        $article = $article_model->getArticle($article_id);

        if($article->author == $user_id || $this->isAdmin($user_id)){
            return true;
        }

        return false;
    }

    public function isAdmin($user_id){
        return true;
    }
}
