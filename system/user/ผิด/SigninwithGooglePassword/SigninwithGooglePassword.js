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
document.querySelector(".next-bnt").addEventListener("click", function (event) {
    isSubmitAttempted = false;
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("password-error");
    let passwordInput = document.getElementById("password");

    if (password === "") {
        passwordInput.style.border = "2px solid red";
        errorMessage.innerText = "❗ป้อนรหัสผ่าน";
        event.preventDefault();
    } else if (password.length < 8) {
        passwordInput.style.border = "2px solid red";
        errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
        event.preventDefault();
    } else {
        window.location.href = "../google/google.html";
    }
});
document.getElementById("password").addEventListener("keypress", function (event) {
    isSubmitAttempted = false;
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("password-error");
    let passwordInput = document.getElementById("password");
    if (event.key === "Enter") {
        event.preventDefault();
        if (password === "") {
            passwordInput.style.border = "2px solid red";
            errorMessage.innerText = "❗ป้อนรหัสผ่าน";
            event.preventDefault();
        } else if (password.length < 8) {
            passwordInput.style.border = "2px solid red";
            errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
            event.preventDefault();
        } else {
            window.location.href = "../google/google.html";
        }
    }
});

document.getElementById("email").innerText = localStorage.getItem("registeredaccount");