<?php

namespace App\Http\Controllers;

use App\Models\Sanphams;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SanphamsController extends Controller
{
    // Lấy danh sách tất cả sản phẩm
    public function index()
    {
        $products = Sanphams::all();
        return response()->json($products);
    }

    // Thêm sản phẩm mới
    public function store(Request $request)
    {
        // Validate dữ liệu
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'danhsachsanpham_id' => 'required|exists:danhsachsanpham,id',
    ]);

    // Lưu hình ảnh
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('public/products');
        $imageName = str_replace('public/', '', $imagePath);
    }

    // Tạo sản phẩm mới với mối quan hệ
    $product = new Sanphams();
    $product->title = $request->title;
    $product->description = $request->description;
    $product->price = $request->price;
    $product->image = $imageName;
    $product->danhsachsanpham_id = $request->danhsachsanpham_id;
    $product->save();

    return response()->json($product, 201);
    }

    // Lấy chi tiết sản phẩm
    public function show($id)
    {
        $product = Sanphams::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $product = Sanphams::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validate dữ liệu
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Cập nhật hình ảnh
        if ($request->hasFile('image')) {
            // Xóa hình ảnh cũ
            Storage::delete('public/' . $product->image);

            // Lưu hình ảnh mới
            $imagePath = $request->file('image')->store('public/products');
            $imageName = str_replace('public/', '', $imagePath);
            $product->image = $imageName;
        }

        // Cập nhật các trường khác
        $product->title = $request->title ?? $product->title;
        $product->description = $request->description ?? $product->description;
        $product->price = $request->price ?? $product->price;
        $product->save();

        return response()->json($product);
    }

    // Xóa sản phẩm
    public function destroy($id)
    {
        $product = Sanphams::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Xóa hình ảnh
        Storage::delete('public/' . $product->image);

        // Xóa sản phẩm
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}