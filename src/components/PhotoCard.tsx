import React from 'react';
import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-shadow hover:shadow-md">
      <div className="relative pt-[75%] bg-gray-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/300`}
          alt={`Photo by ${photo.author}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 truncate pr-4" title={photo.author}>
          {photo.author}
        </h3>
        <button
          onClick={() => onToggleFavourite(photo.id)}
          className="focus:outline-none flex-shrink-0 p-1 -mr-1 rounded-full hover:bg-gray-50 transition-colors"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill={isFavourite ? 'currentColor' : 'none'}
            className={`w-5 h-5 transition-colors ${
              isFavourite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
