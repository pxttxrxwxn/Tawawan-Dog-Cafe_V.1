function validateAccount() {
    let accountInput = document.getElementById("account");
    let errorMessage = document.getElementById("account-error");
    let accountPattern = /^(?! )[a-zA-Z0-9ก-ฮ๑-๙ ]{4,}(?<! )$/; // \w อักขระพิเศษ
    if (accountPattern.test(accountInput.value) || accountInput.value === "") {
        accountInput.style.border = "1px solid #ccc";
        errorMessage.innerText = "";
    } else {
        accountInput.style.border = "2px solid red";
        errorMessage.innerText = "ชื่อผู้ใช้ต้องมีอย่างน้อย 4 ตัวอักษร และห้ามใช้อักขระพิเศษ";
    }
}
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
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
    });
    input.addEventListener('input', (event) => {
        const value = event.target.value;
        if (value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', (e) => {
        const value = e.target.value;
        if (e.key === 'Backspace') {
            if (!value && index > 0) {
                inputs[index - 1].focus();
            } else {
                input.value = ''; 
            }
        }
    });
});
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function sendOtp() {
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert("รหัส OTP ของคุณคือ " + generatedOtp);
    let otpButton = document.getElementById("otp-button");
    otpButton.disabled = true;
    let seconds = 60;
    otpButton.innerText = `รับ OTP อีกครั้ง (${seconds}s)`;
    let countdown = setInterval(() => {
        seconds--;
        otpButton.innerText = `รับ OTP อีกครั้ง (${seconds}s)`;
        if (seconds === 0) {
            clearInterval(countdown);
            otpButton.innerText = "รับ OTP";
            otpButton.disabled = false;
        }
    }, 1000);
}
function validateOtp() {
    let otpInputs = document.querySelectorAll(".input-group input");
    let otpValue = Array.from(otpInputs).map(input => input.value.trim()).join("");
    let otpErrorMessage = document.getElementById("otp-error");
    if (otpValue !== generatedOtp && otpValue.length == 6) {
        otpErrorMessage.innerText = "รหัส OTP ไม่ถูกต้อง";
        otpErrorMessage.style.color = "red";
    } else {
        otpErrorMessage.innerText = "";
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
    }else{
        passwordError.innerText = "";
        document.getElementById("password").style.border = "1px solid #ccc";
    }
}
function validateconfirmPassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let confirmPasswordError = document.getElementById("confirm-password-error");

    if (confirmPassword === ""){
        confirmPasswordError.innerText = "";
        document.getElementById("confirm-password").style.border = "1px solid #ccc";
    }else if (confirmPassword.length < 8) {
        confirmPasswordError.innerText = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        document.getElementById("confirm-password").style.border = "2px solid red";
    } else if (password !== confirmPassword) {
        confirmPasswordError.innerText = "รหัสผ่านไม่ตรงกัน";
        document.getElementById("confirm-password").style.border = "2px solid red";
    } else {
        confirmPasswordError.innerText = "";
        document.getElementById("confirm-password").style.border = "1px solid #ccc";
    }
}
function togglePasswordVisibility(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.replace("bx-hide", "bx-show");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.replace("bx-show", "bx-hide");
    }
}
document.getElementById("toggle-password").addEventListener("click", function () {
    togglePasswordVisibility("password", "toggle-password");
});
document.getElementById("toggle-confirm-password").addEventListener("click", function () {
    togglePasswordVisibility("confirm-password", "toggle-confirm-password");
});
document.querySelectorAll(".input-group input").forEach(input => {
    input.addEventListener("input", validateOtp);
});
function register() {
    let account = document.getElementById("account").value.trim();
    let emailOrPhone = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();
    let accountError = document.getElementById("account-error").innerText.trim();
    let emailError = document.getElementById("email-error").innerText.trim();
    let passwordError = document.getElementById("password-error").innerText.trim();
    let confirmPasswordError = document.getElementById("confirm-password-error").innerText.trim();
    let otpInputs = document.querySelectorAll(".input-group input");
    let otpValue = Array.from(otpInputs).map(input => input.value.trim()).join("");
    let otpErrorMessage = document.getElementById("otp-error");
    if (!account || !emailOrPhone || !password || !confirmPassword) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }
    if (accountError || emailError || passwordError || confirmPasswordError) {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        return;
    }
    if (otpValue.length < 6 || otpValue !== generatedOtp) {
        otpErrorMessage.innerText = "รหัส OTP ไม่ถูกต้อง";
        otpErrorMessage.style.color = "red";
        alert("รหัส OTP ไม่ถูกต้อง");
        return;
    }
    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};
    // ตรวจสอบว่าอีเมลหรือเบอร์นี้เคยลงทะเบียนแล้วหรือไม่
    if (users[emailOrPhone]) {
        alert("อีเมลหรือเบอร์โทรศัพท์นี้เคยสมัครสมาชิกแล้ว กรุณาเข้าสู่ระบบ");
        window.location.href = "../login/login.html";
        return;
    }
    // บันทึกข้อมูลผู้ใช้ใหม่
    users[emailOrPhone] = { account, password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
    window.location.href = "../login/login.html";
}
