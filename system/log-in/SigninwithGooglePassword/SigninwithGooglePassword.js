function validatePassword() {
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("password-error");

    if (isSubmitAttempted) {
        if (password ==="" ){
            errorMessage.innerText = "❗ป้อนรหัสผ่าน";
            passwordInput.style.border = "2px solid red";
            return false;
        } else if (password.length < 8) {
            errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
            passwordInput.style.border = "2px solid red";
            return false;
        } else {
            errorMessage.innerText = "";
            passwordInput.style.border = "1px solid #ccc";
            return true;
        }
    }
    return true;
}
document.getElementById("toggle-password").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.replace("bx-square", "bx-check-square");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.replace("bx-check-square", "bx-square");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let email = localStorage.getItem("registeredaccount");
    document.getElementById("email").innerText = email;

    document.querySelector(".next-bnt").addEventListener("click", function (event) {
        let passwordInput = document.getElementById("password");
        let password = passwordInput.value.trim();
        let errorMessage = document.getElementById("password-error");

        if (email === "admin@gmail.com" && password !== "12345678") {
            passwordInput.style.border = "2px solid red";
            errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
            event.preventDefault();
        } else if (password === "") {
            passwordInput.style.border = "2px solid red";
            errorMessage.innerText = "❗ป้อนรหัสผ่าน";
            event.preventDefault();
        } else if (password.length < 8) {
            passwordInput.style.border = "2px solid red";
            errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
            event.preventDefault();
        } else if (email === "admin@gmail.com" && password === "12345678") {
            localStorage.setItem("registeredemailadmin", email);
            localStorage.setItem("registeredpasswordadmin", password);
            localStorage.setItem("registeredaccountadmin", "Admin");
            window.location.href = "../google-admin/google.html";
        } else {
            window.location.href = "../google/google.html";
        }
    });

    document.getElementById("password").addEventListener("keypress", function (event) {
        let passwordInput = document.getElementById("password");
        let password = passwordInput.value.trim();
        let errorMessage = document.getElementById("password-error");

        if (event.key === "Enter") {
            event.preventDefault();
            if (email === "admin@gmail.com" && password !== "12345678") {
                passwordInput.style.border = "2px solid red";
                errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
                event.preventDefault();
            } else if (password === "") {
                passwordInput.style.border = "2px solid red";
                errorMessage.innerText = "❗ป้อนรหัสผ่าน";
                event.preventDefault();
            } else if (password.length < 8) {
                passwordInput.style.border = "2px solid red";
                errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
                event.preventDefault();
            } else if (email === "admin@gmail.com" && password === "12345678") {
                localStorage.setItem("registeredemailadmin", email);
                localStorage.setItem("registeredpasswordadmin", password);
                localStorage.setItem("registeredaccountadmin", "admin");
                window.location.href = "../google-admin/google.html";
            } else {
                window.location.href = "../google/google.html";
            }
        }
    });
});

document.getElementById("email").innerText = localStorage.getItem("registeredaccount");

document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("avatar-btn");
    let registeredaccount = localStorage.getItem("registeredaccount");

    if (registeredaccount.length > 1) {
        btn.innerText = registeredaccount.substring(0, 2);
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("email").innerText = localStorage.getItem("registeredemail");

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeAvatarColor() {
    const avatar = document.querySelector('.avatar');
    avatar.style.backgroundColor = getRandomColor();
}

document.addEventListener('DOMContentLoaded', changeAvatarColor);
document.querySelector('.avatar').addEventListener('click', changeAvatarColor);
