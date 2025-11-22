
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MainSidebar, CategoryInfoSidebar } from "../components/layout/AppLayout";
import type { Review } from "../lib/mockData";

type FormInputs = Omit<Review, 'id' | 'user' | 'createdAt' | 'upvotes' | 'comments' | 'product'> & { productName: string };

export default function CreateReviewPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsSubmitting(true);
    console.log("Dữ liệu bài đánh giá mới:", data);
    
    // Giả lập cuộc gọi API để gửi dữ liệu
    setTimeout(() => {
      alert("Bài đánh giá của bạn đã được gửi và đang chờ kiểm duyệt. Cảm ơn bạn!");
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="flex w-full max-w-screen-2xl">
        <MainSidebar />
        <main className="flex-1 max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Tạo bài đánh giá mới</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-800 p-6 rounded-lg">
            
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-300">Tên sản phẩm *</label>
              <input {...register("productName", { required: "Tên sản phẩm là bắt buộc" })} id="productName" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2"/>
              {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName.message}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">Tiêu đề bài viết *</label>
              <input {...register("title", { required: "Tiêu đề là bắt buộc" })} id="title" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2"/>
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">Nội dung đánh giá *</label>
              <textarea {...register("content", { required: "Nội dung là bắt buộc" })} id="content" rows={6} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2"/>
              {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-300">Đánh giá (1-5 sao) *</label>
                    <input type="number" {...register("rating", { required: "Vui lòng cho điểm", valueAsNumber: true, min: { value: 1, message: "Điểm phải từ 1-5" }, max: { value: 5, message: "Điểm phải từ 1-5" } })} id="rating" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2" />
                    {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
                </div>
                <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-300">Ngày mua *</label>
                    <input type="date" {...register("purchaseDate", { required: "Vui lòng chọn ngày mua" })} id="purchaseDate" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2" />
                    {errors.purchaseDate && <p className="text-red-500 text-xs mt-1">{errors.purchaseDate.message}</p>}
                </div>
                <div>
                    <label htmlFor="vendor" className="block text-sm font-medium text-gray-300">Nơi mua *</label>
                    <input {...register("vendor", { required: "Vui lòng điền nơi mua" })} id="vendor" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2" />
                    {errors.vendor && <p className="text-red-500 text-xs mt-1">{errors.vendor.message}</p>}
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300">Giá (Để trống hoặc điền **** nếu muốn ẩn)</label>
                    <input {...register("price")} id="price" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2" />
                </div>
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-full text-sm disabled:bg-gray-500">
              {isSubmitting ? "Đang gửi..." : "Gửi bài đánh giá"}
            </button>
          </form>
        </main>
        <CategoryInfoSidebar />
      </div>
    </div>
  );
}