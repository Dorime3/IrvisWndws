import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'); // получаем формы, инпуты и инпуты для ввода телефонов
    const inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]'); // ввод цифр в поле ввода для телефона

    const message = { // сообщения для вывода результата запроса
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Чтото пошло не так'
    };

    const postData = async (url, data) => { // метод для отправки данных с форм (1арг - адрес, 2арг - данные, кторые мы собрали с помощью метода new FormData)
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, { // отправляем. присваиваем ответ в переменную (!!! await для ассинхронного выполнения кода. Поскольку жс не будет ждать ответа с сервера и следовательно не присовит нашей переменной значение. (будет андефайнд))
            method: "POST", // гет или пост. у нас форма - сл-но пост
            body: data 
        });
        return await res.text(); // преобразовываем в строковое значение
    };

    const clearInputs = () => { // функция для очистки инпутов
        inputs.forEach(input => {
            input.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяем перезагрузку странцы

            let statusMessage = document.createElement('div'); // создаем блок, стилизуем, помещаем в конец
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); // Собираем наши данные с инпутов. С помощью этого метода формируем их в такую структуру, понятную для сервера. Присваиваем в переменную.
            if(item.getAttribute('data-calc') === 'end'){ // отслеживаем форму с выбором профиля и размеров окон.
                for (let key in state) {
                    formData.append(key, state[key]); // Перебираем свойства и заносим наш объект в FormData  
                }
            }
            postData('assets/server.php', formData) // наша функция является своего рода промисом, которая может завершиться с разным результатом
                .then(res => {
                    console.log(res);statusMessage.textContent = message.success; // если успешно
                })
                .catch(() => {
                    statusMessage.textContent = message.failure; // если ошибка
                })
                .finally(() => { // выполняется в любом слкчае
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });

};

export default forms; // экспортируем. Затем в main.js импортируем.