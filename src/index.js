import './styles.css';
let counter = 0;

document.getElementById('app').innerText = `Counter: ${counter}`;

document.getElementById('button').addEventListener('click', () => {
    counter++;
    document.getElementById('app').innerText = `Counter: ${counter}`;
});
