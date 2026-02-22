import Head from 'next/head';

// 1. Your React Component (The Frontend)
export default function Home({ images }) {
  return (
    <>
      <Head>
        <title>My Cloudinary Stickers</title>
      </Head>

      <main style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>My Sticker Pack</h1>
        
        <div className="sticker-grid">
          {/* We loop (map) over the images array and create an img tag for each one */}
          {images.map((image) => (
            <img 
              key={image.public_id} 
              src={image.secure_url} 
              alt={image.public_id} 
              className="sticker"
            />
          ))}
        </div>
      </main>
    </>
  );
}

// 2. Your Server-Side Fetch (The Backend)
export async function getStaticProps() {
  const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());

  return {
    props: {
      // Pass the fetched resources array to the Home component above
      images: results.resources || [] 
    }
  }
}
