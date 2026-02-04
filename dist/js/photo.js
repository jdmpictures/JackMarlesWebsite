function filterImagesByCategory(category) {
  const gallery = document.querySelector('.gallery');
  const items = gallery.querySelectorAll('.gallery-item'); // we'll add this class to imgs or their wrappers

  items.forEach(item => {
    const img = item.querySelector('img') || item; // in case you put class on img or div
    if (category === 'all') {
      item.style.display = '';
    } else {
      if (img.classList.contains(category)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    }
  });

  if (window.fjGallery) {
    window.fjGallery.gallery.refresh();
  }
}

document.querySelectorAll('.sub, .subitem').forEach(item => {
  item.addEventListener('click', (e) => {
    let category = item.textContent.trim().toLowerCase();
    // map special cases if needed, e.g. "PORTRAITS" → "portraits"
    if (category === 'portaits') category = 'portraits'; // typo fix if any

    filterImagesByCategory(category);
    console.log('Filtered by:', category);

    // Optional: close mobile menu after click
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar').classList.remove('active');
    }
  });
});



//Lightbox Coding

const gallery = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('#lightbox .close');
const prevBtn = document.querySelector('.lightbox-nav .prev');
const nextBtn = document.querySelector('.lightbox-nav .next');

let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = gallery[index].src;
  lightbox.style.display = 'flex';
}


closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % gallery.length;
  showLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
  showLightbox(currentIndex);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

/* Optional: swipe support for mobile */
let startX = 0;
lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
lightbox.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) nextBtn.click();
  if (endX > startX + 50) prevBtn.click();
});

const API_KEY = '6563b87141c932c33052c972c3b79f00';
const USER_ID = '64165286@N05';  // or use photoset_id for album
const method = 'flickr.people.getPhotos';  // or 'flickr.photosets.getPhotos' + &photoset_id=XXX

$.getJSON(`https://www.flickr.com/services/rest/?method=${method}&api_key=${API_KEY}&user_id=${USER_ID}&per_page=500&format=json&nojsoncallback=1`, function(data) {
    if (data.stat === 'ok') {
        const items = [];
        data.photos.photo.forEach(photo => {
            const farm = photo.farm;
            const server = photo.server;
            const id = photo.id;
            const secret = photo.secret;
            const src = `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}_b.jpg`;  // _b = large; use _m/_z for smaller
            const item = document.createElement('div');
            item.className = 'fj-gallery-item';
            item.innerHTML = `<img src="${src}" width="800" height="600" alt="${photo.title}" loading="lazy">`;  // Use real sizes if possible, or approx
            items.push(item);
        });
        // Append dynamically (check library docs for exact syntax; often 'appendImages' or direct DOM + resize)
        fjGallery(document.querySelectorAll('.fj-gallery'), 'appendImages', items);  // Or $('.fj-gallery').fjGallery('appendImages', items);
        // Or simply $('.fj-gallery').append(items); then gallery.resize() or re-init if needed
    }
});