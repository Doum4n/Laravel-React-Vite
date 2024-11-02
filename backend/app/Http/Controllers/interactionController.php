<?php

namespace App\Http\Controllers;

use App\Models\Interaction;
use Illuminate\Http\Request;

class interactionController extends Controller
{
    public function update(Request $request){
        switch ($request->input('action')) {
            case 'like': {
                Interaction::query()
                    ->where('post_id', $request->input('post_id'))
                    ->where('user_id',  $request->input('user_id'))
                    ->update(['like' => $request->input('like')]);
                return response()->json(['success' => true]);
            }
            case 'save': {
                Interaction::query()->find($request->post_id)->update(['save' => $request->input('save')]);
                return response()->json(['success' => true]);
            }
            case 'share': {
                Interaction::query()->find($request->post_id)->update(['share' => $request->input('share')]);
                return response()->json(['success' => true]);
            }
        }
    }
}
