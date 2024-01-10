document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const searchForm = document.getElementById("search-form");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            window.location.href = `result.html`;
        });
    }

    console.log('Script loaded');

    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        console.log('Login button found');

        loginButton.addEventListener('click', function (event) {
            event.preventDefault();

            console.log('Login button clicked');

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const user = loginUser(email, password);
            if (user) {
                window.location.href = 'pages/home.html';
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    } else {
        console.error('Login button not found');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isEmailUnique(email) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        return !storedUsers.some(user => user.email === email);
    }

    function registerUser(name, email, password, newsletter) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = { name, email, password, newsletter };
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    function loginUser(email, password) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        return storedUsers.find(u => u.email === email && u.password === password);
    }

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const newsletter = document.getElementById("newsletter").checked;

        // Validate inputs
        if (!name || !email || !password) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!isEmailUnique(email)) {
            alert("This email is already registered. Please use a different email address.");
            return;
        }

        registerUser(name, email, password, newsletter);
        alert("Account registered successfully. You can now sign in.");
        toggleOverlay();
    });

    
});


