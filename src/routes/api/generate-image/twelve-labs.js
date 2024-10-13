// src/routes/api/twelvelabs.js
export async function POST({ request }) {
    const body = await request.json();
    const apiKey = process.env.TWELVELABS_API;
  
    const res = await fetch('https://api.twelvelabs.io/endpoint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: body.query, // or whatever data you need
      }),
    });
  
    const data = await res.json();
  
    return {
      status: 200,
      body: data
    };
  }
