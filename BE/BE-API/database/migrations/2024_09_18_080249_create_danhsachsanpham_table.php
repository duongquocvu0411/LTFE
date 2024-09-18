<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDanhsachsanphamTable extends Migration
{
public function up()
{
Schema::create('danhsachsanpham', function (Blueprint $table) {
$table->id();
$table->string('name');
$table->timestamps();
});

// Thêm khóa ngoại vào bảng sanphams
Schema::table('sanphams', function (Blueprint $table) {
$table->unsignedBigInteger('danhsachsanpham_id');

$table->foreign('danhsachsanpham_id')->references('id')->on('danhsachsanpham')->onDelete('cascade');
});
}

public function down()
{
// Xóa khóa ngoại từ sanphams trước khi xóa bảng
Schema::table('sanphams', function (Blueprint $table) {
$table->dropForeign(['danhsachsanpham_id']);
$table->dropColumn('danhsachsanpham_id');
});

Schema::dropIfExists('danhsachsanpham');
}
}