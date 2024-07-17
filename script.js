const imageApiKey = 'd7zoq31BLB0xKF682Y6Wj3fINVjrbifOCiDxh5V94UZgZflEl1euA6J2';
const videoApiKey =  'AIzaSyD01rbEXi_6uANuOC4x-9Shsr2JKnxCy2M';
const searchInput = document.getElementById('search-input');
const imageSearchButton = document.getElementById('image-search-button');
const videoSearchButton = document.getElementById('video-search-button');
const mediaResults = document.getElementById('media-results');

async function searchImages(query) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
            headers: {
                Authorization: imageApiKey,
            },
        });
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching images:', error.message);
        return [];
    }
}

async function searchVideos(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${videoApiKey}&part=snippet&maxResults=10&type=video`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        return [];
    }
}

imageSearchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const images = await searchImages(query);
        mediaResults.innerHTML = images
            .map((image) => `<img src="${image.src.medium}" alt="${image.photographer}">`)
            .join('');
    } else {
        mediaResults.innerHTML = '<p>Please enter a search query.</p>';
    }
});

videoSearchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const videos = await searchVideos(query);
        mediaResults.innerHTML = videos
            .map((video) => `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>`)
            .join('');
    } else {
        mediaResults.innerHTML = '<p>Please enter a search query.</p>';
    }
});
