
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { mockReviews } from '../lib/mockData';
import { MainSidebar, CategoryInfoSidebar } from '../components/layout/AppLayout';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="flex w-full max-w-screen-2xl">
        <MainSidebar />
        <main className="flex-1 max-w-2xl mx-auto p-4">
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Link key={review.id} to={`/review/${review.id}`} className="block">
                  <ReviewCard review={review} />
                </Link>
              ))}
            </div>
        </main>
        <CategoryInfoSidebar />
      </div>
    </div>
  );
}