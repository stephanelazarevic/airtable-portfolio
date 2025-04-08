import React, { memo } from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  project: {
    name: string;
    description?: string;
    category?: string[];
  };
  id: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, id }) => {
  return (
    <div className="bg-gray-800 rounded p-6 hover:bg-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-100">{project.name}</h2>
      <p className="text-gray-300 mb-4">
        {project.description ? project.description.substring(0, 100) + '...' : 'Description non disponible.'}
      </p>

      <div className="mt-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {project.category && project.category.length > 0 ? (
            project.category.map((cat, index) => (
              <span
                key={index}
                className="inline-block bg-gray-700 text-blue-400 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="inline-block bg-gray-700 text-blue-400 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
              Non catégorisé
            </span>
          )}
        </div>
      </div>

      <Link href={`/projects/${id}`}>
        <span className="text-blue-400 hover:text-blue-300 inline-block">Voir plus</span>
      </Link>
    </div>
  );
};

export default memo(ProjectCard);