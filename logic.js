// for phones

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.btn').addEventListener('click', function() {
  document.querySelector('.lines').classList.toggle('target');
  })
});

const button = document.querySelector('.btn');
const nav = document.querySelector('nav');

button.addEventListener('click', () => {
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
  }
});