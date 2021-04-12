const images = () => {
    const imgPopup = document.createElement('div');
    const worksField = document.querySelector('.works');
    const img = document.createElement('img');
    const scroll = calcScroll();

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
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            const path = e.target.parentNode.getAttribute('href');
            img.setAttribute('src', path);
        }
        if (e.target && e.target.classList.contains('popup')){
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        }
    });

    function calcScroll() {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'none';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        return scrollWidth;
    }
};
export default images;