'use client';

import { useState } from 'react';

export default function LikeButton({ projectId, likes }: { projectId: string, likes: number }) {
  const [like_number, setLikes] = useState(likes);

  async function handleLike() {
    await fetch(`/api/like/${projectId}`, { method: 'POST' });
    setLikes(like_number + 1);
  }

  return (
    <button 
      onClick={handleLike} 
      className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
    >
      ❤️ {like_number}
    </button>
  );
}