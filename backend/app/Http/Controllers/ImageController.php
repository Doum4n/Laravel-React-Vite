<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $path = $request->file('image')->store('images', 'public');
        Image::factory()->create([
            'path' => $path,
        ]);
        return response()->json(['path' => $path], 200);
    }

    public function getImage(String $id)
    {
        $image = Image::query()->where('post_id', $id)->firstOrFail();

        $url = Storage::url($image->path); // Tạo URL từ đường dẫn

        return response()->json(['url' => $url], 200);
    }
}
