<?php

namespace App\Http\Controllers;
use App\Models\Locations;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TostController extends Controller
{
    public function index(){
        $loc = Locations::all();
        foreach ($loc as $location){
            $location->author = User::where('id', '=', $location->author)->first('name');
            $location->author = $location->author["name"];
            $likes_arr = explode(",", $location->likes);
            $location->likes = count($likes_arr);
            $saves_arr = explode(",", $location->saves);
            $location->saves = count($saves_arr);
        }
        return response()->json($loc);
    }

    public function detail($id){
        $loc = Locations::where("id", "=", $id)->first();
        $loc->author = User::where('id', '=', $loc->author)->first('name');
        $loc->author = $loc->author["name"];
        $likes_arr = explode(",", $loc->likes);
        $loc->likes = count($likes_arr);
        $saves_arr = explode(",", $loc->saves);
        $loc->saves = count($saves_arr);
        $loc->is_liked = false;
        return response()->json($loc);
    }

    public function like(Request $request){
        $loc = Locations::where("id", "=", $request->id)->first();
        $user = User::where('name', '=', $request->username)->first();
        $likes_arr = explode(",", $loc->likes);

        Log::info($likes_arr);
        Log::info($user->id);

        if (in_array(str($user->id), $likes_arr)){
            Log::info("w tablicy");
            $key = array_search($user->id, $likes_arr);
            array_splice($likes_arr, $key, 1);
        }
        else{
            Log::info("nie w tablicy");

            array_push($likes_arr, $user->id);
        }
        $list = implode(',', $likes_arr);
        $loc->likes = $list;
        $loc->save();
    
        return response()->json($loc);
    }

    public function liked(Request $request){
        $loc = Locations::where("id", "=", $request->id)->first();
        $user = User::where('name', '=', $request->username)->first();
        $likes_arr = explode(",", $loc->likes);

        Log::info($likes_arr);

        if (in_array(str($user->id), $likes_arr)){
            $likedornot = true;
        }
        else{
            $likedornot = false;
        }
        return response()->json($likedornot);

    }
    
}
