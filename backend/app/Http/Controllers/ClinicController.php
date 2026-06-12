<?php

namespace App\Http\Controllers;


use App\Models\Clinic;

use Illuminate\Http\Request;



class ClinicController extends Controller
{


public function store(Request $request)
{


return Clinic::create([


'user_id'=>auth()->id(),


'clinic_name'=>$request->clinic_name,


'address'=>$request->address,


'phone'=>$request->phone



]);


}



public function index()
{

return Clinic::where(
'status',
'approved'
)->get();

}



}