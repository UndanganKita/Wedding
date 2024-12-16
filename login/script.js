const API_URL = 'https://script.google.com/macros/s/AKfycby2B5Z_ykBlzfD_IS5Bysvy1IsdVNke3HGF9qSqZfhHznooAFcGcKlPiZzKXgb2cK0qVQ/exec'; // Ganti dengan URL Web App Anda

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'login',
                    email: email,
                    password: password
                })
            });

            const result = await response.json();
            if (result.success) {
                alert(result.message + " Selamat datang, " + result.name);
                window.location.href = "index.html";
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan, coba lagi nanti.");
        }
    });
}

// Sign-up form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'signup',
                    name: name,
                    email: email,
                    password: password
                })
            });

            const result = await response.json();
            if (result.success) {
                alert(result.message);
                window.location.href = "index.html";
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan, coba lagi nanti.");
        }
    });
}
