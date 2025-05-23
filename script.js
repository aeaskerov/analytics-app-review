document.addEventListener('DOMContentLoaded', function() {
    // Хранилище пользователей (в реальном проекте это должно быть на сервере)
    const usersStorage = JSON.parse(localStorage.getItem('users')) || {};

    const loginForm = document.getElementById('loginForm');
    const userStatus = document.getElementById('userStatus');
    const errorMessage = document.getElementById('errorMessage');
    const projectLinks = document.querySelectorAll('.sec2 a');
    const userCount = document.getElementById('userCount');

    // Retrieve the authenticated user count from localStorage or initialize it
    let authenticatedUserCount = parseInt(localStorage.getItem('authenticatedUserCount')) || 0;
    userCount.textContent = authenticatedUserCount;

    // Проверяем, есть ли сохранённый пользователь в sessionStorage
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        userStatus.textContent = currentUser;
        toggleLinks(true);
    } else {
        toggleLinks(false);
    }

    // Обработка формы авторизации
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Проверяем, существует ли пользователь
        if (usersStorage[username]) {
            // Проверяем пароль
            if (usersStorage[username] === password) {
                // Успешный вход
                userStatus.textContent = username;
                sessionStorage.setItem('currentUser', username);
                toggleLinks(true);
                errorMessage.textContent = '';
            } else {
                // Неверный пароль
                errorMessage.textContent = 'Неверный пароль';
            }
        } else {
            // Создаём нового пользователя
            usersStorage[username] = password;
            localStorage.setItem('users', JSON.stringify(usersStorage));
            userStatus.textContent = username;
            sessionStorage.setItem('currentUser', username);
            toggleLinks(true);
            errorMessage.textContent = '';
        }

        // Increment the user count
        authenticatedUserCount++;
        userCount.textContent = authenticatedUserCount;
        localStorage.setItem('authenticatedUserCount', authenticatedUserCount);

        // Очищаем форму
        loginForm.reset();
    });

    // Функция для переключения видимости ссылок
    function toggleLinks(show) {
        projectLinks.forEach(link => {
            link.style.pointerEvents = show ? 'auto' : 'none';
            link.style.opacity = show ? '1' : '0.5';
            link.style.textDecoration = show ? 'underline' : 'none';
        });
    }
});
