

import { motion } from 'framer-motion';
import { 
  ArrowBigUp, ArrowBigDown, MessageSquare, Bookmark, MoreHorizontal, 
  Store, CalendarDays, Tag, AlertTriangle 
} from 'lucide-react';
import type { Review } from '../lib/mockData';

interface ReviewCardProps {
  review: Review;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }

  return (
    <motion.div
      className="flex bg-gray-900 border border-gray-700 rounded-md hover:border-gray-500 transition-colors cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Vote Gutter */}
      <div className="flex flex-col items-center w-10 bg-gray-800/40 p-2 rounded-l-md">
        <button className="text-gray-400 hover:text-indigo-500"><ArrowBigUp size={22} /></button>
        <span className="text-xs font-bold my-1 text-white">{review.upvotes}</span>
        <button className="text-gray-400 hover:text-red-500"><ArrowBigDown size={22} /></button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4"> {/* Tăng padding lên p-4 */}
        {/* Post Metadata */}
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <img src={review.user.avatar} alt={review.user.name} className="w-5 h-5 rounded-full mr-2" />
          <span className="font-bold text-white hover:underline">c/{review.product.category}</span>
          <span className="mx-1">•</span>
          <span>Đăng bởi <span className="hover:underline">{review.user.username}</span></span>
          <span className="mx-1">•</span>
          <span>{review.createdAt}</span>
        </div>

        {/* Title and Rating */}
        <h2 className="text-lg font-bold text-white mb-1">{review.title}</h2>
        <StarRating rating={review.rating} />
        
        {/* Purchase Info */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-2 border-t border-gray-800 pt-2">
            <div className="flex items-center gap-1"><CalendarDays size={14}/> <span>Mua ngày: {review.purchaseDate}</span></div>
            <div className="flex items-center gap-1"><Store size={14}/> <span>Tại: {review.vendor}</span></div>
            {review.price && (
                <div className="flex items-center gap-1"><Tag size={14}/> <span>Giá: {review.price}</span></div>
            )}
        </div>

        {/* Content Preview */}
        <div className="mt-3">
            <p className="text-sm text-gray-300 line-clamp-3">
                {review.content}
            </p>
        </div>

        {/* --- KHỐI THÔNG TIN HỎNG HÓC (HIỂN THỊ CÓ ĐIỀU KIỆN) --- */}
        {review.failureDate && review.failureDetails && (
            <div className="mt-3 p-3 rounded-md bg-red-900/30 border border-red-800/50">
                <div className="flex items-center gap-2 text-sm font-bold text-red-400 mb-2">
                    <AlertTriangle size={16} />
                    <span>Cập nhật: Sản phẩm đã hỏng</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">Ngày hỏng: {review.failureDate}</div>
                <p className="text-sm text-red-300/90">{review.failureDetails}</p>
            </div>
        )}
        
        {/* Image */}
        <div className="mt-3">
            <img src={review.product.image} alt={review.product.name} className="max-h-96 w-auto rounded-md" />
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-400 mt-3 border-t border-gray-800 pt-2">
          <button className="flex items-center gap-1.5 p-2 -ml-2 rounded-md hover:bg-gray-700">
            <MessageSquare size={16} />
            <span>{review.comments} Comments</span>
          </button>
          <button className="flex items-center gap-1.5 p-2 rounded-md hover:bg-gray-700">
            <Bookmark size={16} />
            <span>Save</span>
          </button>
          <button className="p-2 rounded-md hover:bg-gray-700">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}