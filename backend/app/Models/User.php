<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected  $fillable = [
        'uuid',
        'name',
        'photoUrl',
        'email',
        'email_verified_at',
    ];

    protected $hidden = [
      'password',
    ];

    public function post(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
