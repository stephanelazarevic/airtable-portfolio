'use client';
import { useRouter, useParams } from 'next/navigation';
import { getProjectById } from '../../lib/airtable';
import LikeButton from '../../components/LikeButton';
import { useEffect, useState } from 'react';

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const data = await getProjectById(id);
          setProject(data);
        } catch (error) {
          console.error("Erreur lors du chargement du projet:", error);
        }
      };

      fetchProject();
    }
  }, [id]);

  if (!project) return <div className="flex justify-center items-center h-screen text-white">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Retour aux projets
          </button>
        </div>
        
        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{project.name}</h1>
          <div className="flex items-center space-x-4">
            <span className="bg-gray-800 text-blue-400 text-sm px-3 py-1 rounded">
              {project.category || "Non catégorisé"}
            </span>
            <div className="flex items-center text-gray-400">
              <span className="mr-2">{project.liked_by?.length || 0} likes</span>
              <LikeButton projectId={project.id} likes={project.liked_by?.length} />
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {project.visuals && (
              <div className="bg-gray-800 rounded p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Visuels</h2>
                <div className="bg-gray-700 p-4 rounded text-center">
                  <p className="text-gray-300">{project.visuals}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-400 mb-1">Technologies</h3>
                  <p className="text-gray-200">{project.technos || "Non spécifié"}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-400 mb-1">Étudiants</h3>
                  <p className="text-gray-200">{project.students || "Non spécifié"}</p>
                </div>
                
                {project.link && (
                  <div>
                    <h3 className="text-gray-400 mb-1">Lien</h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                      Voir le projet
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}