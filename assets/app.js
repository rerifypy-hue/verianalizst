const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";
const SETTINGS_KEY = "verianalizstSettings";

const defaultSettings = {
  brandName: "VeriAnalizST",
  topButton: "Teklif Al",
  heroKicker: "SPSS, R, Python ve Minitab ile analiz desteği",
  heroTitle: "Veri setinizi raporlanabilir, anlaşılır ve savunulabilir sonuca dönüştürün.",
  heroText:
    "Tez, makale, anket, memnuniyet araştırması ve iş verileri için yöntem seçimi, veri temizleme, istatistiksel analiz, grafikler ve yorumlanmış rapor teslimi.",
  primaryButton: "İletişime Geç",
  contactTitle: "Veri setinizi gönderin, en doğru analiz yolunu birlikte netleştirelim.",
  contactText:
    "Bu site tek iletişim noktasıdır. WhatsApp veya e-posta üzerinden dosya, çalışma konusu ve beklenen analiz türünü paylaşabilirsiniz.",
  phone: "905551112233",
  email: "ornek@mail.com",
};

const adminPanel = document.querySelector("#adminPanel");
const adminLogin = document.querySelector("#adminLogin");
const adminDashboard = document.querySelector("#adminDashboard");
const loginMessage = document.querySelector("#loginMessage");
const saveMessage = document.querySelector("#saveMessage");
const whatsappLink = document.querySelector("#whatsappLink");
const emailLink = document.querySelector("#emailLink");

function getSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (!saved) return { ...defaultSettings };

  try {
    return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    return { ...defaultSettings };
  }
}

function normalizePhone(phone) {
  return phone.replace(/\D/g, "");
}

function applySettings() {
  const settings = getSettings();

  document.querySelectorAll("[data-setting]").forEach((element) => {
    const key = element.dataset.setting;
    if (settings[key]) element.textContent = settings[key];
  });

  whatsappLink.href = `https://wa.me/${normalizePhone(settings.phone)}`;
  emailLink.href = `mailto:${settings.email}`;
  emailLink.textContent = settings.email;
  whatsappLink.textContent = "WhatsApp";
}

function fillAdminForm() {
  const settings = getSettings();
  adminDashboard.querySelectorAll("[name]").forEach((field) => {
    field.value = settings[field.name] || "";
  });
}

function openAdmin() {
  adminPanel.classList.add("is-open");
  adminPanel.setAttribute("aria-hidden", "false");
  fillAdminForm();
}

function closeAdmin() {
  adminPanel.classList.remove("is-open");
  adminPanel.setAttribute("aria-hidden", "true");
}

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
    fillAdminForm();
    return;
  }

  loginMessage.textContent = "Kullanıcı adı veya şifre hatalı.";
});

adminDashboard.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(adminDashboard);
  const settings = { ...getSettings() };

  formData.forEach((value, key) => {
    settings[key] = String(value).trim();
  });

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  applySettings();
  saveMessage.textContent = "Ayarlar bu tarayıcıda kaydedildi.";
});

document.querySelector("#resetSettings").addEventListener("click", () => {
  localStorage.removeItem(SETTINGS_KEY);
  applySettings();
  fillAdminForm();
  saveMessage.textContent = "Varsayılan ayarlara dönüldü.";
});

if (window.location.hash === "#admin") {
  openAdmin();
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "a") {
    openAdmin();
  }
});

applySettings();
