export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
}

export interface Review {
  id: string;
  user: User;
  product: Product;
  rating: number;
  title: string;
  content: string;
  createdAt: string; // Ngày đăng review
  upvotes: number;
  comments: number;

  purchaseDate: string; //
  vendor: string;       // Nơi mua (VD: "Shopee", "Tiki", "CellS") (Bắt buộc)
  price?: string;       // Giá mua (Tùy chọn)

  failureDate?: string;    // Ngày sản phẩm hỏng (Optiona)
  failureDetails?: string; // Chi tiết hỏng hóc (Optiona)
}


export const mockReviews: Review[] = [
  {
    // Review bình thường
    id: 'rev1',
    user: { id: 'user1', name: 'Thanh Le', username: 'thanhle', avatar: 'https://i.pravatar.cc/150?u=user1' },
    product: { id: 'prod1', name: 'Dell UltraSharp U2723QE', brand: 'Dell', category: 'Monitor', image: 'https://cdn.tgdd.vn//News/0//1-730x411.png' },
    rating: 5,
    title: 'Màn hình 4K tuyệt vời cho code và media',
    content: 'Màu sắc chính xác, độ phân giải cao giúp text siêu nét. Cổng USB-C hub rất tiện lợi...',
    createdAt: '2 hours ago',
    upvotes: 128,
    comments: 16,
    purchaseDate: '01/03/2023',
    vendor: 'Phong Vũ',
    price: "13500000",
  },
  {
    // Review có thông tin sản phẩm bị hỏng
    id: 'rev2',
    user: { id: 'user2', name: 'An Nguyen', username: 'annguyen', avatar: 'https://i.pravatar.cc/150?u=user2' },
    product: { id: 'prod2', name: 'Keychron K2 (Version 2)', brand: 'Keychron', category: 'Keyboard', image: 'https://siliconz.vn/cdn/shop/files/7d4a985e420e7f8a52bbe7e0de71ef75.png?v=1728272336' },
    rating: 2, // Rating có thể giảm sau khi hỏng
    title: 'Trải nghiệm gõ tốt, nhưng không bền',
    content: 'Switch Gateron Brown cho cảm giác gõ tactile nhưng không quá ồn. Bluetooth kết nối ổn định. Build quality ổn trong tầm giá.',
    createdAt: '1 day ago',
    upvotes: 97,
    comments: 22,
    purchaseDate: '15/07/2022',
    vendor: 'SiliconZ',
    price: "****",
    failureDate: '20/08/2023',
    failureDetails: 'Sau hơn 1 năm sử dụng, mạch bàn phím bị chập chờn, một vài phím (G, H) không nhận tín hiệu. Đã thử reset và update firmware nhưng không khắc phục được.',
  },
];

// --- CẤU TRÚC DỮ LIỆU MỚI CHO COMMENT ---

export interface Comment {
  id: string;
  reviewId: string; // Liên kết với bài review nào
  user: User;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[]; // Mảng chứa các reply, chỉ một cấp
}

export const mockComments: Comment[] = [
  {
    id: 'cmt1',
    reviewId: 'rev1', // Comment cho bài review Dell Monitor
    user: { id: 'user2', name: 'An Nguyen', username: 'annguyen', avatar: 'https://i.pravatar.cc/150?u=user2' },
    content: 'Review chi tiết quá! Mình cũng đang phân vân con này với LG 27GP950. Cảm ơn bạn nhiều!',
    createdAt: '1 hour ago',
    likes: 15,
    replies: [
      {
        id: 'reply1_1',
        reviewId: 'rev1',
        user: { id: 'user1', name: 'Thanh Le', username: 'thanhle', avatar: 'https://i.pravatar.cc/150?u=user1' }, // User gốc trả lời
        content: 'Con LG đó cũng ngon đó bạn, nhưng thiên về gaming hơn. Con Dell này làm việc màu chuẩn hơn.',
        createdAt: '30 minutes ago',
        likes: 7,
      }
    ]
  },
  {
    id: 'cmt2',
    reviewId: 'rev1',
    user: { id: 'user3', name: 'Bao Tran', username: 'baotran', avatar: 'https://i.pravatar.cc/150?u=user3' },
    content: 'Cái hub USB-C của nó sạc được cho Macbook Pro M1 không bạn ơi?',
    createdAt: '45 minutes ago',
    likes: 5,
    replies: []
  },
];