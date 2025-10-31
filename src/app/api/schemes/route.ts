import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile } = body;

    // Validate input
    if (!profile || typeof profile !== 'string' || profile.trim().length === 0) {
      return NextResponse.json({ error: 'Profile text is required' }, { status: 400 });
    }

    // Run Python script
    const results = await new Promise<string>((resolve, reject) => {
      const pyshell = new PythonShell('scheme_recommend.py', {
        mode: 'text',
        pythonPath: 'python', // Adjust if needed
        scriptPath: process.cwd(),
      });

      pyshell.send(JSON.stringify({ profile }));

      pyshell.on('message', (message) => {
        resolve(message);
      });

      pyshell.on('error', (error) => {
        reject(error);
      });

      pyshell.end((err) => {
        if (err) reject(err);
      });
    });

    const data = JSON.parse(results);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Scheme recommendation error:', error);
    return NextResponse.json({ error: 'Failed to get scheme recommendations' }, { status: 500 });
  }
}
