document.addEventListener('DOMContentLoaded', function(){
        const opcoes = document.querySelectorAll(".radio-option")
        
        opcoes.forEach(opcao =>{
            opcao.addEventListener("click", function(){
                opcoes.forEach(op => op.classList.remove('.ativa'));
                
                this.classList.add('.ativa')


                const radioInput = this.querySelector('input[type="radio"]');
                if(radioInput){
                    radioInput.checked = true;
                }
            })
        })
    });