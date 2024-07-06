<?php

namespace App\Http\Controllers;
use App\Models\Locations;
use App\Models\User;
use Illuminate\Http\Request;

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
}
