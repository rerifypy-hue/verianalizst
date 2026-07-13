const DEFAULT_WP_URL = "https://siteadresin.wordpress.com";
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

const adminPanel = document.querySelector("#adminPanel");
const adminLogin = document.querySelector("#adminLogin");
const adminDashboard = document.querySelector("#adminDashboard");
const loginMessage = document.querySelector("#loginMessage");
const wpUrlInput = document.querySelector("#wpUrlInput");
const wpPreview = document.querySelector("#wpPreview");

function getWpUrl() {
  return localStorage.getItem("verianalizstWpUrl") || DEFAULT_WP_URL;
}

function updateWpPreview() {
  const url = getWpUrl();
  wpPreview.textContent = url;
  wpUrlInput.value = url;
}

function openWp() {
  window.location.href = getWpUrl();
}

function openAdmin() {
  adminPanel.classList.add("is-open");
  adminPanel.setAttribute("aria-hidden", "false");
  updateWpPreview();
}

function closeAdmin() {
  adminPanel.classList.remove("is-open");
  adminPanel.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("#openWpTop, #openWpHero, #openWpContact").forEach((button) => {
  button.addEventListener("click", openWp);
});

document.querySelector("#closeAdmin").addEventListener("click", closeAdmin);

adminPanel.addEventListener("click", (event) => {
  if (event.target === adminPanel) closeAdmin();
});

adminLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#adminUser").value.trim();
  const password = document.querySelector("#adminPass").value;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    adminLogin.hidden = true;
    adminDashboard.hidden = false;
    loginMessage.textContent = "";
    updateWpPreview();
    return;
  }

  loginMessage.textContent = "Kullanıcı adı veya şifre hatalı.";
});

document.querySelector("#saveWpUrl").addEventListener("click", () => {
  const value = wpUrlInput.value.trim();
  if (!value.startsWith("https://") && !value.startsWith("http://")) {
    wpPreview.textContent = "Link http:// veya https:// ile başlamalı.";
    return;
  }

  localStorage.setItem("verianalizstWpUrl", value);
  updateWpPreview();
});

if (window.location.hash === "#admin") {
  openAdmin();
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "a") {
    openAdmin();
  }
});
