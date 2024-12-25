import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rater from "react-rater";
const ProductReviews = ({ reviews }) => {
  // Nếu reviews không tồn tại hoặc không phải là một mảng, trả về mảng rỗng để tránh lỗi.
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const totalRatings = safeReviews.length;
  const ratingCounts = [0, 0, 0, 0, 0]; // For 5 to 1 star ratings
  safeReviews.forEach((review) => {
    ratingCounts[5 - review.rating]++;
  });

  return (
    <div className="bg-white p-5 border rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          {ratingCounts.map((count, index) => (
            <p key={index}>
              {5 - index} sao: {count} đánh giá
            </p>
          ))}
        </div>
      </div>
      <hr />
      {safeReviews.map((review, index) => (
        <div key={index} className="mt-4">
          <p className="font-semibold">{review.user}</p>
          <p className="text-gray-500">{review.date}</p>
          <div className="flex">
            {Array(review.rating)
              .fill()
              .map((_, i) => (
                <AiFillStar key={i} className="text-yellow-500" />
              ))}
            {Array(5 - review.rating)
              .fill()
              .map((_, i) => (
                <AiOutlineStar key={i} className="text-gray-300" />
              ))}
          </div>
          <p>{review.content}</p>
          {review.images && (
            <div className="flex gap-2 mt-2">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Review ${index} image ${idx}`}
                  className="w-16 h-16 object-cover"
                />
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border p-3 rounded-lg shadow">
              <p className="text-lg font-semibold">{review.user}</p>
              <p className="text-sm text-gray-500">
                Đánh giá: {review.rating} sao
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
