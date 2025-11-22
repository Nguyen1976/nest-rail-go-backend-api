import { useState } from 'react';
import { ThumbsUp, Mic } from 'lucide-react';
import type { Comment } from '../lib/mockData';
import CommentForm from './CommentForm';

interface CommentCardProps {
  comment: Comment;
  ownerId: string; 
  onAddReply: (content: string, rootCommentId: string) => void;
  rootCommentId: string; 
}

export default function CommentCard({ comment, ownerId, onAddReply, rootCommentId }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const isOwner = comment.user.id === ownerId;

  const handleReplySubmit = (content: string) => {
    
    onAddReply(content, rootCommentId);
    setIsReplying(false); 
  };

  return (
    <div className="flex gap-3">
      <img src={comment.user.avatar} alt={comment.user.name} className="w-9 h-9 rounded-full mt-1" />
      <div className="flex-1">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">{comment.user.name}</span>
            {isOwner && (
              <span className="flex items-center gap-1 bg-blue-900/50 text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
                <Mic size={12} />
                OP
              </span>
            )}
            <span className="text-gray-500 text-xs">• {comment.createdAt}</span>
          </div>
          <p className="text-gray-300 mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold mt-1 px-2">
          <button className="flex items-center gap-1 hover:text-white">
            <ThumbsUp size={14} /> {comment.likes}
          </button>
          {/* <<< THAY ĐỔI: Bỏ điều kiện isReply, hiển thị nút Reply cho tất cả comment */}
          <button onClick={() => setIsReplying(!isReplying)} className="hover:text-white">
            Reply
          </button>
        </div>

        {isReplying && (
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={() => setIsReplying(false)}
            submitLabel="Trả lời"
            
            placeholder={`Trả lời ${comment.user.name}...`}
            initialText={`@${comment.user.username} `}
          />
        )}

        {/* Khu vực hiển thị replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 border-l-2 border-gray-700 pl-4">
            {comment.replies.map(reply => (
              <CommentCard
                key={reply.id}
                comment={reply}
                ownerId={ownerId}
                onAddReply={onAddReply}
                
                rootCommentId={rootCommentId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}