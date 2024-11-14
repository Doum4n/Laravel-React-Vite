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
use function Laravel\Prompts\select;

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
        //SELECT p.*, i.path FROM `posts` as p JOIN `images` as i on p.id = i.post_id WHERE p.id = 1
        $post = DB::table('posts')
            ->join('images', 'images.post_id', '=', 'posts.id')
            ->select('images.path', 'posts.*')
            ->where('posts.id', $id)
            ->first();
//        $post = Post::query()->join('images', 'posts.id', '=', 'images.post_id')->where('id', $id)->select()->firstOrFail();
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
        $post = DB::table('images')
            ->join('posts', 'images.post_id', '=', 'posts.id')
            ->selectRaw('posts.*, max(images.path) as path')
            ->orderBy('posts.views', 'desc')
            ->groupBy('posts.id')
            ->limit(10)
            ->get();
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

    public function getPostByTopicId(int $topicId): JsonResponse
    {
        $post = DB::table('posts')
            ->join('post_tag', 'posts.id', '=', 'post_tag.post_id')
            ->join('tags', 'post_tag.tag_id', '=', 'tags.id')
            ->join('topics', 'tags.topic_id', '=', 'topics.id')
            ->join('images', 'posts.id', '=', 'images.post_id')
            ->where('topics.id', $topicId)
            ->select('posts.*', 'images.path', 'topics.name as topic_name')
            ->limit(3)
            ->get();
        return response()->json($post);
    }

    public function getRecentPosts(): JsonResponse
    {
//        $post = Post::query()->orderBy('created_at', 'desc')->take(6)->get();
        $post = DB::table('images')
            ->join('posts', 'images.post_id', '=', 'posts.id')
            ->select('images.path', 'posts.*')
            ->orderBy('posts.created_at', 'desc')
            ->limit(10)
            ->get();
        return response()->json($post);
    }

    public function index()
    {
        return Post::all();
    }
}
