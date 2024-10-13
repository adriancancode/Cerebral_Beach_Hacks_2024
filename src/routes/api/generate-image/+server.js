import { OPEN_AI_KEY } from '$env/static/private';


export async function POST({ request }) {
  const { prompt } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPEN_AI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model:"dall-e-3",
        prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    const data = await response.json();
    const imageUrl = data.data[0].url; // Assuming the API returns the URL of the generated image

    return new Response(JSON.stringify({ imageUrl }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

