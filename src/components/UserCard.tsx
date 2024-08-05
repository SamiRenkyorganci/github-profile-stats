import Link from 'next/link';
import { FC } from 'react';

interface UserCardProps {
  user: {
    login: string;
    bio: string;
    avatar_url: string;
  };
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg m-3 p-4">
      <img src={user.avatar_url} alt={`${user.login} avatar`} className="w-24 h-24 object-cover rounded-full mx-auto" />
      <h2 className="text-xl font-bold mt-3 text-center">{user.login}</h2>
      <p className="text-sm mt-2 text-center">{user.bio}</p>
      <Link href={`/user/${user.login}`} passHref>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white p-2 rounded-lg mt-3 mx-auto block transition-all duration-300 ease-in-out">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default UserCard;
