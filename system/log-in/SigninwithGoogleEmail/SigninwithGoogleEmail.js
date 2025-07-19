function validateEmail() {
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("email-error");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^0[0-9]{9}$/;
    let email = emailInput.value.trim();
    localStorage.setItem("registeredaccount", email);
    localStorage.setItem("registeredemail", email);
    if (isSubmitAttempted) {
        if (email === "") {
            errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์";
            emailInput.style.border = "2px solid red";
            return false;
        } else if (!emailPattern.test(email) && !phonePattern.test(email)) {
            emailInput.style.border = "2px solid red";
            errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์ที่ถูกต้อง";
            return false;
        } else {
            emailInput.style.border = "1px solid #ccc";
            errorMessage.innerText = "";
            return true;
        }
    }
    return true;
}
document.querySelector(".next-bnt").addEventListener("click", function (event) {
    isSubmitAttempted = false;
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("email-error");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^0[0-9]{9}$/;
    let email = emailInput.value.trim();
    if (email === "") {
        errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์";
        emailInput.style.border = "2px solid red";
        event.preventDefault();
    } else if (!emailPattern.test(email) && !phonePattern.test(email)) {
        emailInput.style.border = "2px solid red";
        errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์ที่ถูกต้อง";
        event.preventDefault();
    } else {
        window.location.href = "../SigninwithGooglePassword/SigninwithGooglePassword.html";
    }
});


document.getElementById("email").addEventListener("keypress", function (event) {
    isSubmitAttempted = false;
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("email-error");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^0[0-9]{9}$/;
    let email = emailInput.value.trim();
    if (event.key === "Enter") {
        event.preventDefault();
        if (email === "") {
            errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์";
            emailInput.style.border = "2px solid red";
            event.preventDefault();
        } else if (!emailPattern.test(email) && !phonePattern.test(email)) {
            emailInput.style.border = "2px solid red";
            errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์ที่ถูกต้อง";
            event.preventDefault();
        } else {
            window.location.href = "../SigninwithGooglePassword/SigninwithGooglePassword.html";
        }
    }
});
