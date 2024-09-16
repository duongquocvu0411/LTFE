<?php

namespace App\Http\Controllers;
use App\Models\Sanpham;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class SanphamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Sanpham::all();
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
    public function store(Request $request)
    {
       // Validate incoming request
    $request->validate([
        'hinhanh' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Ensure it's an image
        'tensp' => 'required|string',
        'gia' => 'required|numeric'
    ]);

    // Handle the image upload
    if ($request->hasFile('hinhanh')) {
        // Get the file from the request
        $file = $request->file('hinhanh');
        
        // Create a unique filename
        $filename = time() . '_' . $file->getClientOriginalName();
        
        // Move the file to the public/img directory
        $file->move(public_path('img'), $filename);
        
        // Save the product with the image path
        $sanpham = Sanpham::create([
            'hinhanh' => 'img/' . $filename,  // Store the image path
            'tensp' => $request->tensp,
            'gia' => $request->gia
        ]);
        
        return response()->json($sanpham, 201);
    } else {
        return response()->json(['message' => 'Image upload failed'], 400);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Sanpham::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $sanpham = Sanpham::findOrFail($id);
    
                $validator = Validator::make($request->all(), [
                    'hinhanh' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Ensure it's an image
                    'tensp' => 'nullable|string',
                    'gia' => 'nullable|numeric'
                ]);
        
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }
        
            if ($request->hasFile('hinhanh')) {
                if ($sanpham->image && file_exists(public_path($sanpham->image))) {
                    unlink(public_path($sanpham->image));
                }
                $image = $request->file('hinhanh');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('img'), $imageName);
                $sanpham->image = 'img/' . $imageName;
            }
            $sanpham->hinhanh = $request->input('hinhanh',$sanpham->hinhanh);
            $sanpham->tensp = $request->input('tensp', $sanpham->tensp);
            $sanpham->gia = $request->input('gia', $sanpham->gia);
          
            $sanpham->save();
        
            return response()->json($sanpham, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Cập nhật món ăn không thành công. Lỗi: ' . $e->getMessage()], 500);
        }

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $sanpham = Sanpham::find($id);
        if (!$sanpham) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $sanpham->delete();
        return response()->json(['message' => 'Product deleted'], 200);
    }
}