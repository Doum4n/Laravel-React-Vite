<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Auth;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;
use Kreait\Laravel\Firebase\Facades\Firebase;

class UserController extends Controller
{
    public function getById(){
        $response = Firebase::auth()->getUser("d1b2CmC5Z1RxJnoJNolVKw08jbw1");
//        Firebase::auth()->
        echo $response->displayName;
    }

    public function getUsername($uuid): JsonResponse
    {
        $username = User::query()->where('uuid', $uuid)->value('name');
        return response()->json($username);
    }
    public function getUser(Request $request, Auth $auth): JsonResponse
    {

        $idToken = $request->bearerToken();

        try {
            $verifiedIdToken = $auth->verifyIdToken($idToken);
            $uid = $verifiedIdToken->claims()->get('sub');
            $user = $auth->getUser($uid);
            return response()->json(['user' => $user]);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => 'Could not parse token'], 401);
        } catch (AuthException|FirebaseException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    public function createUser(Request $request): JsonResponse
    {
        User::factory()->createOne([
           'uuid' => $request->input('id'),
           'name' => $request->input('name'),
           'email' => $request->input('email'),
        ]);

        return response()->json('Create user successfully!');
    }
}
