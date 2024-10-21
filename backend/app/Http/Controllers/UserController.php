<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase;

class UserController extends Controller
{
    public function getById(){
        $response = Firebase::auth()->getUser("d1b2CmC5Z1RxJnoJNolVKw08jbw1");
        echo $response->displayName;
    }
}
