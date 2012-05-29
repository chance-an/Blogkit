<?php
    define('MAIN_ENTRY', 1);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Blogkit Administration</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

<!--    <link rel="stylesheet" type="text/css" href="style/Hell/bootstrap.css">-->
<!--    <link rel="stylesheet" type="text/css" href="style/Hell/bootstrap-responsive.css">-->
    <link rel="stylesheet" type="text/css" href="style/Hell/style.css">
    <link rel="stylesheet" type="text/css" href="/BK_library/css/blogkit.css">
    <link rel="stylesheet" type="text/css" href="style/Hell/global.css">


    <script type="text/javascript" src="/3rd_party/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/3rd_party/underscore-min.js"></script>
    <script type="text/javascript" src="/3rd_party/backbone-min.js"></script>

    <!-- Import Blogkit lib -->
    <script type="text/javascript" src="/BK_library/blogkit.js"></script>
    <script type="text/javascript" src="/BK_library/blogkit_ui.js"></script>
    <script type="text/javascript" src="/BK_library/utility.js"></script>
    <script type="text/javascript" src="/BK_library/jquery.extension.js"></script>
    <script type="text/javascript" src="/BK_library/session-model.js"></script>
    <script type="text/javascript" src="/BK_library/facebook-user-model.js"></script>
    <script type="text/javascript" src="/BK_library/article.js"></script>

    <script type="text/javascript" src="js/abstract-controller.js"></script>

    <!--  -->
    <?php
        $dir_base = dirname(__FILE__).'/js/';
        $load_js_dirs = array('', 'controllers', 'views', 'models');

        foreach($load_js_dirs as $dir){
            $path = $dir_base . $dir;
            $dir .= empty($dir) ? '' : '/';
            if ($handle = opendir( $path )) {

                while (false !== ($entry = readdir($handle))) {
                    if( $entry == '.' ){
                        continue;
                    }
                    if( substr_compare($entry, 'js', -2, 2) != 0 ){
                        continue;
                    };

                    echo '<script type="text/javascript" src="js/'. $dir . $entry.'"></script> ';
                }
            }
        }

    ?>


</head>
<body>
</body>
</html>