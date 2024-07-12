<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Locations;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use JWT;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;


use Illuminate\Http\Request;
class UserController extends Controller
{
    public function login(Request $request) {  
        $username=$request->username;
        $password=$request->password;    
        $user = User::where('name', '=', $username)->first();
        //dd($email);    
        if (!empty($user)) {
            
            if (Hash::check($password, $user->password)) {
                $user_obj=[
                    "name" => $user->name,
                ];
                
                $token_time = Carbon::parse($user->api_key_created);
                $now_time = Carbon::now();
                $minuteDiff = $token_time->diffInMinutes($now_time);

                if ($minuteDiff > 120){
                    $token = JWT::get('api', ['firstName' => $user->name]);
                    $user->api_key = $token;
                    $user->api_key_created = $now_time->toDateTimeString();
                    $user->save();
                }else{
                    $token = $user->api_key;
                }
                $data=[
                    "status" => "Success",
                    "api_token" => $token,
                    "username" => $user->name
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
        if (empty($user)) {
            $user = User::where('email', '=', $email)->first();
            if (empty($user)) {
                $data=[
                    "status" => "Success",
                ];
                $newuser = new User;
                $newuser->name = $username;
                $newuser->api_key = JWT::get('api', ['firstName' => $username]);
                $newuser->api_key_created = Carbon::now()->toDateTimeString();
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


    public function validate(Request $request ){
        $user = User::where('name', '=', $request->username)->first();
        if(!empty($user)){
            if ($user->api_key == $request->apitoken){
                $data=[
                    "status" => "Success",
                ];
            }
            else{
                $data=[
                    "status" => "Wrong api key",
                ];
            }
        }else{
            $data=[
                "status" => "You need to be logged in",
            ];
        }
        return response()->json($data);
    }

    public function profile($id){
        $user = User::where('name', '=', $id)->first();
        $locations = Locations::all();
        $liked = [];
        foreach ($locations as $location){
            $likes_arr = explode(",", $location->likes);
            if (in_array($user->id, $likes_arr)){
                $liked_location = [$location->id, $location->title, $location->base64_photo];
                array_push($liked, $liked_location);
            };
        }
        $data=[
            "status" => "Success",
            "username" => $user->name,
            "email" => $user->email,
            "liked" => $liked,
            
        ];
        return response()->json($data);
    }
}
