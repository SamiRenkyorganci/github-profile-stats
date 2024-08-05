'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

Chart.register(ArcElement, Title, Tooltip, Legend);

const Project = () => {
  const params = useParams();
  const project = typeof params.project === 'string' ? params.project : '';
  const [projectData, setProjectData] = useState<any>(null);
  const [languages, setLanguages] = useState<any[]>([]);

  useEffect(() => {
    if (project) {
      const fetchProject = async () => {
        const decodedProject = decodeURIComponent(project);
        console.log('Decoded Project parameter:', decodedProject);
        const splitProject = decodedProject.split('/');
        if (splitProject.length !== 2) {
          console.error('Invalid project format:', decodedProject);
          return;
        }

        const [owner, repo] = splitProject;
        if (!owner || !repo) {
          console.error('Invalid project format:', decodedProject);
          return;
        }

        try {
          const result = await fetch(`/api/github?endpoint=repos/${owner}/${repo}`).then((res) => res.json());
          if (!result || result.error) {
            console.error('Error fetching project data:', result);
            return;
          }
          setProjectData(result);

          const languageResult = await fetch(`/api/github?endpoint=repos/${owner}/${repo}/languages`).then((res) => res.json());
          if (!languageResult || languageResult.error) {
            console.error('Error fetching language data:', languageResult);
            return;
          }
          setLanguages(Array.isArray(languageResult) ? languageResult : []);
        } catch (error) {
          console.error('Error fetching project data:', error);
        }
      };
      fetchProject();
    }
  }, [project]);

  if (!projectData) return <div>Loading...</div>;

  const languageData = {
    labels: languages.map((lang) => lang.language),
    datasets: [
      {
        label: 'Languages',
        data: languages.map((lang) => parseFloat(lang.percentage)),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">{projectData.full_name}</h1>
      <p className="text-lg mb-4">{projectData.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Stars</h2>
          <div className="text-center text-4xl font-bold text-gradient bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">{projectData.stargazers_count}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Forks</h2>
          <div className="text-center text-4xl font-bold text-gradient bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">{projectData.forks_count}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Languages</h2>
          <Doughnut data={languageData} />
        </div>
      </div>
    </div>
  );
};

export default Project;
