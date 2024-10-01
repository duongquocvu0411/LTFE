import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Khởi tạo giỏ hàng từ localStorage, nếu không có thì sử dụng mảng rỗng
  const [giohang, setGiohang] = useState(() => {
    //Đoạn mã dưới đây giúp khởi tạo giá trị cho giohang từ localStorage. 
    //Nếu trong localStorage có lưu giỏ hàng (savedCart), nó sẽ được chuyển đổi từ chuỗi JSON 
    //thành mảng và sử dụng làm giá trị ban đầu cho giohang. Nếu không có, mảng rỗng sẽ được sử dụng.
    const savedCart = localStorage.getItem('giohang');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    //Sử dụng useEffect để theo dõi sự thay đổi của giohang. Mỗi khi giohang thay đổi,
    // dữ liệu sẽ được lưu lại vào localStorage dưới dạng chuỗi JSON.
    localStorage.setItem('giohang', JSON.stringify(giohang));
  }, [giohang]);

  const addToCart = (sanPham) => {
    setGiohang((giohanghientai) => {
      
      const sanPhamTonTai = giohanghientai.find((item) => item.id === sanPham.id);
      if (sanPhamTonTai) {
        return giohanghientai.map((item) =>
          item.id === sanPham.id ? { ...item, soLuong: item.soLuong + 1 } : item
        );
      } else {
        return [...giohanghientai, { ...sanPham, soLuong: 1 }];
      }
       });
  };
  const removeFromCart = (sanPhamId) => {
    // Tìm sản phẩm muốn xóa
    const sanPhamXoa = giohang.find((item) => item.id === sanPhamId);

    // Cập nhật giỏ hàng trước
    setGiohang((giohanghientai) => giohanghientai.filter((item) => item.id !== sanPhamId));
    
    // Hiển thị thông báo sau khi cập nhật giỏ hàng
    if (sanPhamXoa) {
        alert(`Xóa sản phẩm "${sanPhamXoa.title}" khỏi giỏ hàng thành công!`);
    }
};



  const increaseQuantity = (sanPhamId) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId ? { ...item, soLuong: item.soLuong + 1 } : item
      )
    );
  };

  const decreaseQuantity = (sanPhamId) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId && item.soLuong > 1
          ? { ...item, soLuong: item.soLuong - 1 }
          : item
      )
    );
  };

  // Hàm cập nhật số lượng trực tiếp từ ô nhập
  const updateQuantity = (sanPhamId, soLuongMoi) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId ? { ...item, soLuong: parseInt(soLuongMoi) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ giohang, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
