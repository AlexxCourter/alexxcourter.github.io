//find each data-src containing element
let imageLoader = document.querySelectorAll('img[data-src]');

//function loads the images by replacing the src containing a placeholder with the data-src containing the real image.
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

//intersection observer checks if the image has entered the viewport and calls function to load the image.
if('IntersectionObserver' in window) {
const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
    if(item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
    }
    });
});
imageLoader.forEach((img) => {
    observer.observe(img);
});
} else {
imageLoader.forEach((img) => {
    loadImages(img);
});
}