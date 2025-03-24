import Link from 'next/link';

export default function ProjectCard({ project, id }: { project: any, id: string }) {
  return (
    <div className="bg-gray-800 rounded p-6 hover:bg-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-100">{project.name}</h2>
      <p className="text-gray-300 mb-4">{project.description.substring(0, 100)}...</p>
      
      <div className="mt-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {Array.isArray(project.category) && project.category.length > 0 ? (
            project.category.map((cat: string, index: number) => (
              <span 
                key={index} 
                className="inline-block bg-gray-700 text-blue-400 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="inline-block bg-gray-700 text-blue-400 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
              {project.category || "Non catégorisé"}
            </span>
          )}
        </div>
      </div>
      
      <Link href={`/projects/${id}`}>
        <span className="text-blue-400 hover:text-blue-300 inline-block">Voir plus</span>
      </Link>
    </div>
  );
}