function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function applyRandomAvatarColors() {
    document.querySelectorAll('.avatar').forEach(avatar => {
        if (!avatar.classList.contains('Magenta')) {
            avatar.style.backgroundColor = getRandomColor();
        }
    });
}

document.addEventListener('DOMContentLoaded', applyRandomAvatarColors);

function registeredaccount() {
    let email = document.getElementById("email").innerText;
    let account = document.getElementById("account").innerText;
    localStorage.setItem("registeredemail", email);
    localStorage.setItem("registeredpassword", "xxxxxxxx");
    localStorage.setItem("registeredaccount", account);
    window.location.href = "../google/google.html";
}
function registeredaccountadmin() {
    let email = document.getElementById("emailemail-admin").innerText;
    localStorage.setItem("registeredemailadmin", email);
    localStorage.setItem("registeredpasswordadmin", "12345678");
    localStorage.setItem("registeredaccountadmin", "admin");
    window.location.href = "../google-admin/google.html";
}
