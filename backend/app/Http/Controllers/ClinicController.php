<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;

class ClinicController extends Controller
{
    // Clinic sends request
    public function store(Request $request)
{
    $clinic = Clinic::create([
        'user_id' => auth()->id(),
        'clinic_name' => $request->clinic_name,
        'address' => $request->address,
        'phone' => $request->phone,
        'status' => 'pending'
    ]);

    return response()->json($clinic);
}

    // Admin sees all clinics
    public function index()
    {
        return Clinic::all();
    }
    public function approve($id)
{
    $clinic = Clinic::findOrFail($id);

    $clinic->status = "approved";
    $clinic->message = "Your clinic request has been APPROVED by admin.";
    $clinic->save();

    return response()->json(["message" => "Clinic approved"]);
}
public function reject($id)
{
    $clinic = Clinic::findOrFail($id);

    $clinic->status = "rejected";
    $clinic->message = "Your clinic request has been REJECTED by admin.";
    $clinic->save();

    return response()->json(["message" => "Clinic rejected"]);
}
public function destroy($id)
{
    Clinic::destroy($id);

    return response()->json(["message" => "Clinic deleted"]);
}

public function myClinic()
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $clinic = Clinic::where('user_id', $user->id)->first();

    if (!$clinic) {
        return response()->json([
            'status' => 'none',
            'message' => 'No clinic found'
        ]);
    }

    return response()->json($clinic);
}

public function sendRequest(Request $request)
{
    $user = auth()->user();

    $clinic = Clinic::where('user_id', $user->id)->first();

    if (!$clinic) {
        return response()->json(['message' => 'Clinic not found'], 404);
    }

    $clinic->status = "pending";
    $clinic->save();

    return response()->json([
        'message' => 'Request sent successfully'
    ]);
}
}