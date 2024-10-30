<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(): Collection
    {
        return Comment::all();
    }

    public function getComments(int $id): JsonResponse
    {
        $comment = Comment::with('children')->find($id);
        return response()->json($comment);
    }

    public function getCommentByPostId(int $id): JsonResponse
    {
        $comment = Comment::with('children')->where('post_id', $id)->get();
        return response()->json($comment);
    }
}
