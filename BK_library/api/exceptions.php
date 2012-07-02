<?php
/**
 * User: anch
 * Date: 7/2/12
 * Time: 12:58 AM
 */

namespace Tonic{
    class PermissionDeniedException extends Exception {
        protected $code = 403;
    }
}
 
