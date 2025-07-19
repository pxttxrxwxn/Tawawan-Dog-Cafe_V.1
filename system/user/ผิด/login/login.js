function validateEmail() {
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("email-error");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^0[0-9]{9}$/;
    
    if (emailPattern.test(emailInput.value) || phonePattern.test(emailInput.value) || emailInput.value === "") {
        emailInput.style.border = "1px solid #ccc";
        errorMessage.innerText = "";
    } else {
        emailInput.style.border = "2px solid red";
        errorMessage.innerText = "กรุณากรอกอีเมลหรือเบอร์โทรศัพท์ให้ถูกต้อง";
    }
}
function validatePassword() {
    let password = document.getElementById("password").value;
    let passwordError = document.getElementById("password-error");

    if (password === "") {
        passwordError.innerText = "";
        document.getElementById("password").style.border = "1px solid #ccc";
    } else if (password.length < 8) {
        passwordError.innerText = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        document.getElementById("password").style.border = "2px solid red";
    } else {
        passwordError.innerText = "";
        document.getElementById("password").style.border = "1px solid #ccc";
    }
}

document.getElementById("toggle-password").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.replace("bx-hide", "bx-show");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.replace("bx-show", "bx-hide");
    }
});
function login() {
    let emailOrPhone = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[emailOrPhone]) {
        alert("ไม่มีบัญชีนี้ กรุณาสมัครสมาชิก");
        window.location.href = "../CreateAccount/CreateAccount.html";
        return;
    }

    if (users[emailOrPhone].password !== password) {
        alert("รหัสผ่านไม่ถูกต้อง");
        document.getElementById("password").value = "";
        return;
    }

    localStorage.setItem("loggedInUser", users[emailOrPhone].account);
    alert(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${users[emailOrPhone].account}`);
    window.location.href = "../index/index.html";
}



// window.addEventListener("message", function (event) {
//     console.log(event.data);
//     if (event.data === "google success") {
//         window.location.href = "/";
//     }
// });