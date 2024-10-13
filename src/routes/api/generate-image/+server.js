import { OPEN_AI_KEY } from '$env/static/private';
import { TWELVE_LABS_API } from '$env/static/private';

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

const fetch = require('node-fetch');

const url = 'https://api.twelvelabs.io/v1.2/indexes';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'x-api-key': TWELVE_LABS_API,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    index_name: 'cerebralHacks',
    engines: [
      {
        engine_name: 'marengo2.6',
        engine_options: ['visual', 'conversation', 'text_in_video', 'logo'],
        addons: ['thumbnail']
      },
      {engine_name: 'pagasus1.0', engine_options: ['visual', 'conversation']}
    ]
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
