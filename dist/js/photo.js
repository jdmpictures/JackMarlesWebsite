function filterImagesByPhrase(phrase) {
    var gallery = document.querySelector('.gallery');
    var images = gallery.querySelectorAll('img');

    // Convert NodeList to Array for filtering
    var imagesArray = Array.from(images);

    // Filter images based on the specified phrase in their id attribute
    imagesArray = imagesArray.filter(function(image) {
        return image.id.includes(phrase);
    });

    // Clear the gallery
    gallery.innerHTML = '';

    // Append the filtered images back to the gallery
    imagesArray.forEach(function(image) {
        gallery.appendChild(image);
    });
}