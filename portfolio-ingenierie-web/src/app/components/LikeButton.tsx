'use client';
import { useState } from 'react';
import Airtable from 'airtable';

interface LikeButtonProps {
  projectId: string;
  likes?: number;
}

export default function LikeButton({ projectId, likes = 0 }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  async function handleLike() {
    if (hasLiked || isLoading) return;

    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing Airtable API credentials.');
      return;
    }

    setIsLoading(true);
    try {
      const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

      await base('Project').update(projectId, {
        likes: likeCount + 1,
      });

      setLikeCount(likeCount + 1);
      setHasLiked(true);
    } catch (error) {
      console.error('Error liking project:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || isLoading}
      className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-75 cursor-pointer"
      aria-label="Like project"
    >
      {isLoading ? '...' : hasLiked ? '❤️' : '🤍'} {likeCount}
    </button>
  );
}