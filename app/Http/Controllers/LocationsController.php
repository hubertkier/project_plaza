<?php

namespace App\Http\Controllers;

use App\Models\Locations;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Interfaces\LocationRepository;
use App\Classes\ResponseClass;
use App\Http\Resources\LocationsResource;
use Illuminate\Support\Facades\DB;
class LocationsController extends Controller
{
    
    private LocationRepository $LocationRepository;
    
    public function __construct(LocationRepository $LocationRepository)
    {
        $this->LocationRepository = $LocationRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->LocationRepository->index();

        return ResponseClass::sendResponse(LocationsResource::collection($data),'',200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        $description =[
            'title' => $request->title,
            'description' => $request->description
        ];
        DB::beginTransaction();
        try{
             $Locations = $this->LocationRepository->store($description);

             DB::commit();
             return ResponseClass::sendResponse(new LocationsResource($Locations),'Locations Create Successful',201);

        }catch(\Exception $ex){
            return ResponseClass::rollback($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Locations = $this->LocationRepository->getById($id);

        return ResponseClass::sendResponse(new LocationsResource($Locations),'',200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Locations $Locations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, $id)
    {
        $updatedescription =[
            'title' => $request->title,
            'description' => $request->description
        ];
        DB::beginTransaction();
        try{
             $Locations = $this->LocationRepository->update($updatedescription,$id);

             DB::commit();
             return ResponseClass::sendResponse('Locations Update Successful','',201);

        }catch(\Exception $ex){
            return ResponseClass::rollback($ex);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
         $this->LocationRepository->delete($id);

        return ResponseClass::sendResponse('Locations Delete Successful','',204);
    }
}