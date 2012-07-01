<?php
require_once 'config.php';
define('APP_ROOT', dirname(__FILE__).'/../../');

require_once 'helper/helper.php';
require_once 'helper/database.php';
require_once 'helper/parameter.php';
require_once 'helper/result.php';
require_once 'helper/session.php';


// load Tonic
require_once '../../3rd_party/tonic/Autoloader.php';

$config = array(
    'load' => array('resources/*.php'), // load resources
    #'mount' => array('Tyrell' => '/nexus'), // mount in example resources at URL /nexus
    #'cache' => new Tonic\MetadataCache('/tmp/tonic.cache') // use the metadata cache
);

$app = new Tonic\Application($config);

#echo $app;

$request = new Tonic\Request();

#echo $request;

$resource = $app->getResource($request);

#echo $resource;

$response = $resource->exec();

#echo $response;

$response->output();


