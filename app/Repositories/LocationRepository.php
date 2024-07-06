<?php

namespace App\Repository;
use App\Models\Locations;
use App\Interfaces\LocationsRepositoryInterface;
class LocationsReposiotry implements LocationsRepositoryInterface
{
    public function index(){
        return Locations::all();
    }

    public function getById($id){
       return Locations::findOrFail($id);
    }

    public function store(array $data){
       return Locations::create($data);
    }

    public function update(array $data,$id){
       return Locations::whereId($id)->update($data);
    }
    
    public function delete($id){
       Locations::destroy($id);
    }
}