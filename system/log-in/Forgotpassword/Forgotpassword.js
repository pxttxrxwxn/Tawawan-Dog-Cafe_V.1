function validateEmail() {
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("email-error");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^0[0-9]{9}$/;
    let registeredemail = localStorage.getItem("registeredemail");

    if (emailPattern.test(emailInput.value) || phonePattern.test(emailInput.value) || emailInput.value === "") {
        emailInput.style.border = "1px solid #ccc";
        errorMessage.innerText = "";
    }  else if (email !== registeredemail) {
        emailInput.style.border = "2px solid red";
        errorMessage.innerText = "ไม่มีบัญชีที่ลงทะเบียนด้วยข้อมูลนี้";
    } else {
        emailInput.style.border = "2px solid red";
        errorMessage.innerText = "กรุณากรอกอีเมลหรือเบอร์โทรศัพท์ให้ถูกต้อง";
    }
}
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach((input, index) => {
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
    alert("รับรหัส OTP ของคุณคือ " + generatedOtp);
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
    if (otpValue !== generatedOtp) {
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
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();
    let emailError = document.getElementById("email-error").innerText.trim();
    let passwordError = document.getElementById("password-error").innerText.trim();
    let confirmPasswordError = document.getElementById("confirm-password-error").innerText.trim();
    let otpInputs = document.querySelectorAll(".input-group input");
    let otpValue = Array.from(otpInputs).map(input => input.value.trim()).join("");
    let otpErrorMessage = document.getElementById("otp-error");
    if (email === "" || password === "" || confirmPassword === "") {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else if (emailError !== "" || passwordError !== "" || confirmPasswordError !== "") {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
    } else if (otpValue.length < 6) {
        otpErrorMessage.innerText = "กรุณากรอก OTP ให้ครบถ้วน";
        otpErrorMessage.style.color = "red";
        alert("กรุณากรอกรหัส OTP");
        return;
    }else if (password) {
        localStorage.setItem("registeredpassword", password);
        alert("กู้รหัสผ่านสำเร็จ!");
        window.location.href = "../login/login.html";
    }
}