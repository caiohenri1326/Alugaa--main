const AbaVendedor = document.getElementById('aba-vendedor');

const AbaTabs = document.querySelectorAll('mudar')

AbaVendedor.addEventListener('click', function(){
    alternarAbasTabs();
})

function alternarAbasTabs(){
    AbaTabs.classList.add('active');
}