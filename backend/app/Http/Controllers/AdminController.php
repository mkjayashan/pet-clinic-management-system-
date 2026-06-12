<?php

namespace App\Http\Controllers;


use App\Models\Clinic;


class AdminController extends Controller
{


public function approve($id)
{


$clinic=Clinic::find($id);


$clinic->status="approved";


$clinic->save();



return $clinic;


}



public function delete($id)
{

Clinic::destroy($id);


return [
"message"=>"deleted"
];

}


}