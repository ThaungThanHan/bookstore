<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AuthController extends Controller
{
    public $successStatus = 200;

    public function register(Request $request){
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['name'] = $user->name;
        return response()->json(['success'=>$success]);
    }
    public function loggingout(Request $request){
        if (Auth::check()) {
            Auth::user()->AauthAcessToken()->delete();
            Auth::logout();
         }else{
            return response()->json([
                'message'=> 'Already logged out'
            ]);
         }

        return response()->json([
            'message'=> 'Successfully logged out'
        ]);
    }
    public function login(Request $request){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->accessToken;
            // $token = $success->accessToken;
            return response()->json(['success'=>$success],$this->successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorized'],401);
        }
    }
    public function details(){
        if(Auth::check()){
            $user = Auth::user();
        }else{
            $user= null;
        }
        return response()->json($user);
    }
}
