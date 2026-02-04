// Wait for DOM ready
$(document).ready(function () {

    // ====================
    // Category Filtering
    // ====================
    function filterImagesByCategory(category) {
        const gallery = document.querySelector('.gallery');
        const items = gallery.querySelectorAll('.fj-gallery-item');  // Use the correct class

        items.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;

            if (category === 'all') {
                item.style.display = '';
            } else {
                // Currently using title lowercase match – improve with real tags/sets later
                const titleLower = (img.alt || '').toLowerCase();
                if (titleLower.includes(category)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        });

        // After hiding/showing → force re-layout
        if (window.fjGallery && window.fjGallery.resize) {
            window.fjGallery(document.querySelectorAll('.fj-gallery'), 'resize');
        }
    }

    // Menu click handlers
    document.querySelectorAll('.sub, .subitem').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // if it's <a>
            let category = item.textContent.trim().toLowerCase();

            // Normalize your menu items
            if (category === 'portait') category = 'portraits';
            if (category === 'all') category = 'all';

            filterImagesByCategory(category);
            console.log('Filtered by:', category);

            // Close mobile sidebar
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });

    // ====================
    // Lightbox
    // ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('#lightbox .close');
    const prevBtn = document.querySelector('.lightbox-nav .prev');
    const nextBtn = document.querySelector('.lightbox-nav .next');

    let currentIndex = 0;
    let visibleImages = []; // We'll update this after loading/filtering

    function updateVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll('.gallery .fj-gallery-item:not([style*="display: none"]) img'));
    }

    function showLightbox(index) {
        if (visibleImages.length === 0) return;
        currentIndex = (index + visibleImages.length) % visibleImages.length; // wrap around
        lightboxImg.src = visibleImages[currentIndex].src;
        lightbox.style.display = 'flex';
    }

    closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });

    nextBtn.addEventListener('click', () => showLightbox(currentIndex + 1));
    prevBtn.addEventListener('click', () => showLightbox(currentIndex - 1));

    // Touch swipe
    let startX = 0;
    lightbox.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 50) nextBtn.click();
        if (endX > startX + 50) prevBtn.click();
    });

    // Open lightbox when clicking an image
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.fj-gallery-item')) {
            updateVisibleImages();
            const clickedImg = e.target;
            currentIndex = visibleImages.indexOf(clickedImg);
            if (currentIndex !== -1) showLightbox(currentIndex);
        }
    });

    // ====================
    // Flickr Loading
    // ====================
    const API_KEY = '6563b87141c932c33052c972c3b79f00';
    const USER_ID = '64165286@N05';
    const method = 'flickr.people.getPhotos';

    $.getJSON(
        `https://www.flickr.com/services/rest/?method=${method}&api_key=${API_KEY}&user_id=${USER_ID}&per_page=500&format=json&nojsoncallback=1`,
        function (data) {
            if (data.stat !== 'ok') {
                console.error('Flickr API error:', data);
                return;
            }

            const items = [];
            data.photos.photo.forEach(photo => {
                const farm = photo.farm;
                const server = photo.server;
                const id = photo.id;
                const secret = photo.secret;
                // Use _z for medium-large (640px), _b for large (1024px), or _c/_h for bigger if available
                const src = `https://live.staticflickr.com/${server}/${id}_${secret}_z.jpg`;

                const item = document.createElement('div');
                item.className = 'fj-gallery-item';
                item.innerHTML = `
                    <img src="${src}" 
                         alt="${photo.title._content || 'Photo'}" 
                         loading="lazy" 
                         width="800" height="600">
                `;
                items.push(item);
            });

            const galleryEl = document.querySelector('.gallery');

            // Append items to DOM
            items.forEach(item => galleryEl.appendChild(item));

            // Tell fjGallery about the new items (this is the key!)
            fjGallery(document.querySelectorAll('.fj-gallery'), 'appendImages', items);

            // Update lightbox list now that images exist
            updateVisibleImages();

            console.log(`Loaded ${items.length} photos from Flickr`);
        }
    ).fail(function (jqxhr, textStatus, error) {
        console.error('Flickr request failed:', textStatus, error);
    });

});