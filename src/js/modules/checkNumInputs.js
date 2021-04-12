const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);
    numInputs.forEach(item => { // перебираем инпуты для телефонов
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); // регулярное выражение для нахождения всех diggits (букв) и заменяем их на пустое значение
        });
    });
};

export default checkNumInputs;