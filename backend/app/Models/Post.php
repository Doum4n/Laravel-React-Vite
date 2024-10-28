<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'user_id',
        'likes',
    ];

    public function image(): HasMany{
        return $this->hasMany(Image::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
