let deferredPrompt;
const installButton = document.getElementById("installButton");
const connectionStatus = document.getElementById("connectionStatus");
function updateConnectionStatus() { connectionStatus.textContent = navigator.onLine ? "Status: Online" : "Status: Offline - cached app files can still load."; }
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();
if ("serviceWorker" in navigator) { window.addEventListener("load", () => { navigator.serviceWorker.register("./service-worker.js").then(registration => console.log("Service worker registered:", registration.scope)).catch(error => console.error("Service worker registration failed:", error)); }); }
window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredPrompt = event; installButton.hidden = false; });
installButton.addEventListener("click", async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; installButton.hidden = true; });
window.addEventListener("appinstalled", () => { console.log("Portfolio PWA installed."); installButton.hidden = true; });