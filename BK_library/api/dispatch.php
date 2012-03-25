<?php
require_once 'config.php';
// load Tonic library
require_once '../../3rd_party/tonic/tonic.php';

require_once dirname(__FILE__).'/resources/article.php';
require_once dirname(__FILE__).'/resources/session.php';

define('APP_ROOT', dirname(__FILE__).'/../../');

// handle request
$request = new Request(array(
    'baseUri' => '/BK_library/api'
));
try {
    $resource = $request->loadResource();
    $response = $resource->exec($request);

} catch (ResponseException $e) {
    switch ($e->getCode()) {
        case Response::UNAUTHORIZED:
            $response = $e->response($request);
            $response->addHeader('WWW-Authenticate', 'Basic realm="Tonic"');
            break;
        default:
            $response = $e->response($request);
    }
}
$response->output();

