# GitHub Profile Statistics and Famous Projects

This is a Next.js project that showcases GitHub profile statistics and information about famous projects. Users can search for GitHub users or projects and view detailed statistics without logging in.

## Features

- Display information about famous GitHub projects on the homepage.
- Search for GitHub users or projects using the search bar.
- View detailed statistics for GitHub users including repositories and language distribution.
- View detailed statistics for GitHub projects including stars, forks, and primary language.

## Tech Stack

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) - Simple yet flexible JavaScript charting for designers & developers
- [React Chart.js 2](https://react-chartjs-2.js.org/) - React wrapper for Chart.js

## Setup

### Prerequisites

- Node.js (version 12 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-profile-stats.git
   cd github-profile-stats
2. Install the dependencies:  
    ```bash
    npm install
    # or
    yarn install
3. Create a .env.local file in the root directory and add your GitHub API key:      
    GITHUB_API_KEY=your_github_api_key
4. Run the development server:    
    npm run dev
    # or
    yarn dev
5. Open http://localhost:3000 with your browser to see the result.
Project Structure
src/app - Contains Next.js app directory structure.
api - Contains API routes to fetch data from GitHub.
project/[project] - Dynamic route for displaying project details.
user/[user] - Dynamic route for displaying user profile and statistics.
src/components - Contains React components like ProjectCard, SearchBar, and UserCard.
src/styles - Contains global styles.
src/utils - Contains utility functions.
API Usage
The application uses the GitHub API to fetch data. Ensure you have a valid GitHub API key and add it to the .env.local file as shown in the installation steps.

License
This project is licensed under the MIT License - see the LICENSE file for details.    

