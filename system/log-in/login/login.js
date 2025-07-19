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
    }else if (password.length < 8) {
        passwordError.innerText = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        document.getElementById("password").style.border = "2px solid red";
    }else{
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
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let registeredemail = localStorage.getItem("registeredemail");
    let registeredpassword = localStorage.getItem("registeredpassword");

    if (email === "admin@gmail.com" && password === "12345678") {
        alert("เข้าสู่ระบบสำเร็จ! (บัญชีเจ้าของร้าน)");
        localStorage.setItem("registeredemailadmin", email);
        localStorage.setItem("registeredpasswordadmin", password);
        localStorage.setItem("registeredaccountadmin", "admin");
        window.location.href = "../../admin/index/index-admin.html";
    } else if (email === registeredemail && password === registeredpassword) {
        alert("เข้าสู่ระบบสำเร็จ!");
        window.location.href = "../../user/index/index.html";
    } else if (email !== registeredemail) {
        alert("ไม่มีบัญชีที่ลงทะเบียนด้วยข้อมูลนี้\nกรุณาสมัครสมาชิกก่อน!");
        window.location.href = "../CreateAccount/CreateAccount.html";
    } else {
        alert("รหัสผ่านไม่ถูกต้อง");
        document.getElementById("password").value = "";
    }
}


// window.addEventListener("message", function (event) {
//     console.log(event.data);
//     if (event.data === "google success") {
//         window.location.href = "/";
//     }
// });