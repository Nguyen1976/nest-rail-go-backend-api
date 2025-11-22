

import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  submitLabel: string;
  initialText?: string;
  placeholder: string;
}

export default function CommentForm({
  onSubmit,
  onCancel,
  submitLabel,
  initialText = '',
  placeholder,
}: CommentFormProps) {
  const [content, setContent] = useState(initialText);
  const isSubmitDisabled = content.trim().length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3 mt-2">
      <img
        src="https://i.pravatar.cc/150?u=currentuser" 
        alt="Your avatar"
        className="w-9 h-9 rounded-full"
      />
      <div className="flex-1">
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-sm text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          rows={2}
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end items-center mt-2 gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md text-sm"
            >
              Hủy
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md text-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}