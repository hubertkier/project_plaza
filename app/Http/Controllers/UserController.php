<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use JWT;

use Illuminate\Http\Request;
class UserController extends Controller
{
    public function login(Request $request) {  
        $username=$request->username;
        $password=$request->password;    
        $user = User::where('name', '=', $username)->first();
        //dd($email);    
        if (!empty($user)) {
            
            if ($user->password == $password) {
                $user_obj=[
                    "name" => $user->name,
                ];
                $data=[
                    "status" => "Success",
                    "api_token" => $jwt = JWT::get('api', ['firstName' => $user->name]),
                    "user" => $user_obj
                ];
            } else {
                $data=[
                    "status" => "Password did not match.",
                    "user" => null
                ];
            }
        } 
        if(empty($user)) {
            $data=[
                "status" => "Username did not match.",
                "user" => null
            ];
        }        
        return response()->json($data);
      }
}
