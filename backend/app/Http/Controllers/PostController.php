<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Ramsey\Uuid\Type\Integer;

class PostController extends Controller
{
    public function show(string $id): JsonResponse
    {
        $post = Post::query()->where('id', $id)->firstOrFail();
        return response()->json($post, 200);
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function createPost(Request $request): JsonResponse
    {
        $post = Post::factory()->createOne([
            'title' => $request->get('title'),
            'content' => $request->input('content_post'),
            'user_id' => $request->input('user_id'),
        ]);

        session()->forget('temporary_images');

        return response()->json(['id' => $post->id], 200);
    }

    public function getPost(int $id): JsonResponse
    {
        $post = Post::query()->where('id', $id)->firstOrFail();
        return response()->json(['post' => $post]);
    }

    public function likePost(int $id): JsonResponse
    {
        Post::query()->find($id)->increaseLikes();
        return response()->json('liked', 200);
    }

    public function getLikes(string $id): JsonResponse
    {
        $post = Post::query()->select('likes')->where('id', $id)->firstOrFail();
        return response()->json(['likes' => $post->likes], 200);
    }

    public function getPostByUuid(string $uuid): JsonResponse
    {
        $post = Post::query()->where('user_id', $uuid)->get();
        return response()->json(['post' => $post]);
    }

    public function viewPost(int $id): JsonResponse
    {
        Post::query()->find($id)->increaseViews();
        return response()->json('view', 200);
    }

    public function getMostViewedPosts(): JsonResponse
    {
        $post = Post::query()->orderBy('views', 'desc')->take(8)->get();
        return response()->json(['posts' => $post]);
    }

    public function getFeaturedPosts(): JsonResponse
    {
        $post = Post::query()
            ->orderBy('views', 'desc')
            ->orderBy('likes', 'desc')
            ->take(6)
            ->get();
        return response()->json(['posts' => $post]);
    }
}
