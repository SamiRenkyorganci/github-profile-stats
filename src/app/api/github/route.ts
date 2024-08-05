import { NextRequest, NextResponse } from 'next/server';

const githubApiUrl = 'https://api.github.com';
const githubApiKey = process.env.GITHUB_API_KEY;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    const url = `${githubApiUrl}/${endpoint}`;
    console.log(`Fetching from GitHub API: ${url}`);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubApiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching data from GitHub:', errorData);
      return NextResponse.json({ error: 'Failed to fetch data from GitHub', status: response.status }, { status: response.status });
    }

    const data = await response.json();

    // languages endpoint için özel işlem
    if (endpoint.endsWith('/languages')) {
      const languageValues: number[] = Object.values(data) as number[];
      const total: number = languageValues.reduce((acc, value) => acc + value, 0);
      const languagePercentages = Object.keys(data).map((language) => ({
        language,
        percentage: ((data[language] / total) * 100).toFixed(2),
      }));
      return NextResponse.json(languagePercentages, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data from GitHub:', error);
    return NextResponse.json({ error: 'Failed to fetch data from GitHub' }, { status: 500 });
  }
}
