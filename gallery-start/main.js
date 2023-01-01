const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const texts = {
    pic1: 'eye',
    pic2: 'grey',
    pic3: 'flower',
    pic4: 'Egypt',
    pic5: 'butterfly'
}

/* Looping through images */
/* Loop through the array of filenames, and for each one, */
// insert an <img> element inside the thumb-bar <div> that embeds that image in the page along with its alternative text.

for (let image of images) {
    const newImage = document.createElement('img');
    const srcValue = `images/${image}`;
    const altValue = texts[image.split('.')[0]];
    newImage.setAttribute('src', srcValue);
    newImage.setAttribute('alt', altValue);
    thumbBar.appendChild(newImage);

// Add a click event listener to each <img> inside the thumb-bar <div> so that, when they are clicked, 
// the corresponding image and alternative text are displayed in the displayed-img <img> element.

    function displayImage() {
        displayedImage.setAttribute('src', srcValue);
        displayedImage.setAttribute('alt', altValue);
    }
    newImage.addEventListener('click', displayImage);
}

/* Wiring up the Darken/Lighten button */
// Add a click event listener to the <button> so that when it is clicked, a darken effect is applied to the full-size image. 
// When it is clicked again, the darken effect is removed again.

btn.addEventListener('click', changeBackground);
function changeBackground() {
    const btnName = btn.getAttribute('class');
    if (btnName === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
};
