function registeredaccount() {
    let email = document.getElementById("email").innerText;
    localStorage.setItem("registeredemail", email);
    localStorage.setItem("registeredaccount", email);
    window.location.href = "../google/google.html";
}