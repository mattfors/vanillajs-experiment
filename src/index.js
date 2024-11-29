import './styles.css';
let counter = 0;

document.getElementById('app').innerText = `Counter: ${counter}`;

document.getElementById('button').addEventListener('click', () => {
    counter++;
    document.getElementById('app').innerText = `Counter: ${counter}`;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      const swUrl = `${window.location.pathname}service-worker.bundle.js`;
    navigator.serviceWorker.register(swUrl).then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
