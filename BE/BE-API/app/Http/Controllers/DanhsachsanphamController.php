<?php

namespace App\Http\Controllers;

use App\Models\Danhsachsanpham;
use Illuminate\Http\Request;

class DanhsachsanphamController extends Controller
{
    // Lấy danh sách tất cả danh sách sản phẩm
    public function index()
    {
        $lists = Danhsachsanpham::all();
        return response()->json($lists);
    }

    // Thêm danh sách sản phẩm mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $list = Danhsachsanpham::create([
            'name' => $request->name,
        ]);

        return response()->json(['message'=>'thêm sản phẩm thành công',$list],201);
    }

    // Lấy chi tiết danh sách sản phẩm
    public function show($id)
    {
        $list = Danhsachsanpham::find($id);

        if (!$list) {
            return response()->json(['message' => 'Không tìm thấy dữ liệu'], 404);
        }

        return response()->json($list);
    }

    // Cập nhật danh sách sản phẩm
    public function update(Request $request, $id)
    {
        $list = Danhsachsanpham::find($id);

        if (!$list) {
            return response()->json(['message' => 'Không tìm thấy dữ liệu'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
        ]);

        $list->name = $request->name ?? $list->name;
        $list->save();

        return response()->json($list);
    }

    // Xóa danh sách sản phẩm
    public function destroy($id)
    {
        $list = Danhsachsanpham::find($id);

        if (!$list) {
            return response()->json(['message' => 'Không tìm thấy dữ liệu'], 404);
        }

        $list->delete();

        return response()->json(['message' => 'Xóa sản phẩm thành công']);
    }
}