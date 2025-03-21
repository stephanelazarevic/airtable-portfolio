'use client';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ProjectCard from './components/ProjectCard';

async function getProjects() {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Project`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
      cache: "no-store", // Évite la mise en cache
    }
  );

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.records; // Retourne uniquement la liste des projets
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project: any) =>
    project.fields.visible && project.fields.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Liste des Projets</h1>
        <div className="bg-gray-800 p-4 rounded mb-8">
          <SearchBar setSearch={setSearch} />
        </div>
        
        {filteredProjects.length === 0 ? (
          <p className="text-gray-300 mt-6">Aucun projet disponible.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project: any) => (
              <li key={project.id}>
                <ProjectCard project={project.fields} id={project.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}