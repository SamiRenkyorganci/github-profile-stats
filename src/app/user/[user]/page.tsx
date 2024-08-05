'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

Chart.register(ArcElement, Title, Tooltip, Legend);

const User = () => {
  const params = useParams();
  const username = typeof params.user === 'string' ? params.user : '';
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (username) {
      const fetchUser = async () => {
        const result = await fetch(`/api/github?endpoint=users/${username}`).then((res) => res.json());
        setUserData(result);
      };
      fetchUser();
    }
  }, [username]);

  if (!userData) return <div>Loading...</div>;

  const repoData = {
    labels: ['Public Repos'],
    datasets: [
      {
        label: 'Public Repos',
        data: [userData.public_repos],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const followerData = {
    labels: ['Followers', 'Following'],
    datasets: [
      {
        label: 'Followers vs Following',
        data: [userData.followers, userData.following],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">{userData.login}</h1>
      <div className="flex items-center mb-4">
        <img src={userData.avatar_url} alt={`${userData.login} avatar`} className="w-24 h-24 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-lg">{userData.bio}</p>
          <p className="text-lg">Location: {userData.location}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Public Repos</h2>
          <Doughnut data={repoData} />
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Followers vs Following</h2>
          <Doughnut data={followerData} />
        </div>
      </div>
    </div>
  );
};

export default User;
