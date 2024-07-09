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
                

                $token = $jwt = JWT::get('api', ['firstName' => $user->name]);
                $data=[
                    "status" => "Success",
                    "api_token" => $token,
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


      public function register(Request $request) {  
        $username=$request->username;
        $email=$request->email;
        $password=$request->password;    
        $user = User::where('name', '=', $username)->first();
        //dd($email);    
        Log::info($user);
        if (empty($user)) {
            $user = User::where('email', '=', $email)->first();
            if (empty($user)) {
                $data=[
                    "status" => "Success",
                ];
                $newuser = new User;
                $newuser->name = $username;
                $newuser->email = $email;
                $newuser->password = $password;
                $newuser->save();
            }
            if(!empty($user)) {
                $data=[
                    "status" => "Email taken.",
                ];
            } 
        } 
        elseif(!empty($user)) {
            $data=[
                "status" => "Username taken.",
            ];
        }        
        return response()->json($data);
      }
}
