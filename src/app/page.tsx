'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/UserCard';
import SearchBar from '@/components/SearchBar';

const famousProjects = ['facebook/react', 'vuejs/vue', 'angular/angular', 'vercel/next.js'];

const Home = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const promises = famousProjects.map((project) => {
        const encodedProject = project.replace(/\//g, '%2F');
        return fetch(`/api/github?endpoint=repos/${encodedProject}`).then((res) => res.json());
      });
      const results = await Promise.all(promises);
      setProjects(results);
    };
    fetchProjects();
  }, []);

  const handleSearch = async (query: string) => {
    const userResult = await fetch(`/api/github?endpoint=users/${query}`).then((res) => res.json());
    const reposResult = await fetch(`/api/github?endpoint=users/${query}/repos`).then((res) => res.json());
    setSearchResults([userResult, ...reposResult]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Famous GitHub Projects</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {searchResults.map((result) => (
            result.full_name ? (
              <ProjectCard key={result.id} project={result} />
            ) : (
              <UserCard key={result.id} user={result} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
