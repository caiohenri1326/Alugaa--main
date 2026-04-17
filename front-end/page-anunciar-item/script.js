
const selectCustom = document.querySelector('.select-custom');
const selected = selectCustom.querySelector('.select-selected');
const options = selectCustom.querySelectorAll('.select-options li');
const inputHidden = selectCustom.querySelector('input[type="hidden"]');

// Abre / fecha o select
selected.addEventListener('click', () => {
  selectCustom.classList.toggle('open');
});

// Clique em uma opção
options.forEach(option => {
  option.addEventListener('click', () => {
    selected.textContent = option.textContent;
    inputHidden.value = option.dataset.value;
    selectCustom.classList.remove('open');
  });
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (!selectCustom.contains(e.target)) {
    selectCustom.classList.remove('open');
  }
});


