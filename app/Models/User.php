<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $fillable = [
        'name',
        'email', 
        'password',
    ];
    public function AauthAcessToken(){
        return $this->hasMany('\App\Models\OauthAccessToken');
    }
}
