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