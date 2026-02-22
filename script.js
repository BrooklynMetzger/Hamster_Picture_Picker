const databaseUrl = './stickers.json'; 

async function loadStickers() {
  try {
    const response = await fetch(databaseUrl);
    const stickers = await response.json();
    
    // Assuming you have a <div id="sticker-container"> in your index.html
    const container = document.getElementById('sticker-container');

    stickers.forEach(sticker => {
      const img = document.createElement('img');
      img.src = sticker.url; 
      img.alt = sticker.name;
      img.className = 'sticker';
      container.appendChild(img);
    });

  } catch (error) {
    console.error('Failed to load the sticker database:', error);
  }
}

loadStickers();
