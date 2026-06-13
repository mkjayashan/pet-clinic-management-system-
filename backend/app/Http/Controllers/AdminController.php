<?php

namespace App\Http\Controllers;

use App\Models\Clinic;

class AdminController extends Controller
{
    public function approve($id)
    {
        $clinic = Clinic::find($id);
        $clinic->status = "approved";
        $clinic->save();

        return response()->json([
            "message" => "Clinic approved"
        ]);
    }

    public function reject($id)
    {
        $clinic = Clinic::find($id);
        $clinic->status = "rejected";
        $clinic->save();

        return response()->json([
            "message" => "Clinic rejected"
        ]);
    }

    public function delete($id)
    {
        Clinic::destroy($id);

        return response()->json([
            "message" => "Deleted"
        ]);
    }
}