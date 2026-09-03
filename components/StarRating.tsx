import { Star, StarHalf } from "lucide-react";

type StarRatingProps = {
  rating: number;
  count?: number;
};

export default function StarRating({ rating, count }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-1">
      <div className="flex text-blue-600">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />;
          }
          if (i === fullStars && hasHalf) {
            return <StarHalf key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />;
          }
          return <Star key={i} className="w-4 h-4 text-blue-200 fill-blue-100" />;
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500 ml-1">({count})</span>
      )}
    </div>
  );
}
