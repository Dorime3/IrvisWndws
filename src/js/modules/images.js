const images = () => {
    const imgPopup = document.createElement('div');
    const worksField = document.querySelector('.works');
    const img = document.createElement('img');

    imgPopup.classList.add('popup');
    worksField.appendChild(imgPopup);
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';
    imgPopup.appendChild(img);


    worksField.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target && e.target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = e.target.parentNode.getAttribute('href');
            img.setAttribute('src', path);
        }
        if (e.target && e.target.classList.contains('popup')){
            imgPopup.style.display = 'none';
        }
    });
};
export default images;