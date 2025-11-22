
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import { mockReviews, mockComments, type Comment, type User } from '../lib/mockData';
import { MainSidebar, CategoryInfoSidebar } from '../components/layout/AppLayout';

const postCommentAPI = (content: string, user: User): Promise<Comment> => {
  console.log('Posting to fake API:', { content });
  return new Promise(resolve => {
    setTimeout(() => {
      const newComment: Comment = {
        id: `cmt_${Date.now()}`,
        reviewId: '',
        user: user,
        content: content,
        createdAt: 'Vừa xong',
        likes: 0,
        replies: [],
      };
      console.log('Fake API responded:', newComment);
      resolve(newComment);
    }, 500);
  });
};

export default function ReviewDetailPage() {
  const { reviewId } = useParams();
  const { isLoggedIn, user } = useAuth();
  
  const initialReview = mockReviews.find(r => r.id === reviewId);
  const initialComments = mockComments.filter(c => c.reviewId === reviewId);
  
  const [comments, setComments] = useState(initialComments);

  if (!initialReview) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p>Review not found!</p>
      </div>
    );
  }

  const handleAddComment = async (content: string) => {
    if (!user) return;
    const newComment = await postCommentAPI(content, user);
    setComments(prevComments => [...prevComments, newComment]);
  };

  const handleAddReply = async (content: string, rootCommentId: string) => {
    if (!user) return;
    const newReply = await postCommentAPI(content, user);
    
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === rootCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="flex w-full max-w-screen-2xl">
        <MainSidebar />
        <main className="flex-1 max-w-2xl mx-auto p-4">
          <ReviewCard review={initialReview} />
          
          <div className="mt-4 border-t border-gray-700 pt-4">
              <h3 className="font-bold text-lg text-white mb-2">{initialReview.comments} Bình luận</h3>
              {isLoggedIn ? (
                <CommentForm
                  onSubmit={handleAddComment}
                  submitLabel="Bình luận"
                  placeholder="Viết bình luận của bạn..."
                />
              ) : (
                <div className="text-center bg-gray-800 p-4 rounded-md text-gray-400">
                  <Link to="/login" className="font-bold text-indigo-400 hover:underline">Đăng nhập</Link> để tham gia thảo luận.
                </div>
              )}
          </div>

          <div className="mt-6 space-y-5">
            {comments.map(comment => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  ownerId={initialReview.user.id}
                  onAddReply={handleAddReply}
                  rootCommentId={comment.id} 
                />
            ))}
          </div>

        </main>
        <CategoryInfoSidebar />
      </div>
    </div>
  );
}