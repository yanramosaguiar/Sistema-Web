var nome = document.getElementById("nomeForm");
var cpf = document.getElementById("cpfForm");
var telefone = document.getElementById("telefoneForm");
var nomeEmpresa = document.getElementById("nomeEmpresaForm");
var cnpj = document.getElementById("cnpjForm");
var email = document.getElementById("emailForm");
var confirmEmail = document.getElementById("confirmEmailForm");
var senha = document.getElementById("senhaForm");
var confirmSenha = document.getElementById("confirmSenhaForm");
var erro = document.getElementById("erroForm");

var formArray = [nome, cpf, telefone, nomeEmpresa, email, confirmEmail, senha, confirmSenha];

window.onload = function () {

    cpf.addEventListener("keyup", () => {
      let value = cpf.value.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
      cpf.value = value;
    });

    cnpj.addEventListener("keyup", () => {
        let value = cnpj.value.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{3})?([\d]{3})?([\d]{4})?([\d]{2})?/, "$1.$2.$3/$4-$5");
        
        cnpj.value = value;
    });

    telefone.addEventListener("keyup", () => {

        if(telefone.value != undefined && telefone.value.length < 14){        
            let value = telefone.value.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{4})?([\d]{4})?/, "($1)$2-$3");
            telefone.value = value;
        }

        if(telefone.value != undefined && telefone.value.length == 14){
            let value = telefone.value.replace(/[^0-9]/g, "").replace(/^([\d]{2})([\d]{5})?([\d]{4})?/, "($1)$2-$3");
            telefone.value = value;
        }                       
        
    });

    confirmEmail.addEventListener("keyup", () => {
        if(email.value != confirmEmail.value){
            confirmEmail.style.borderColor = "red";
            email.style.borderColor = "red";
        }else{
            confirmEmail.style.borderColor = "rgb(206, 212, 218)";
            email.style.borderColor = "rgb(206, 212, 218)";
        }
    });

    confirmSenha.addEventListener("keyup", () => {
        if(senha.value != confirmSenha.value){
            confirmSenha.style.borderColor = "red";
            senha.style.borderColor = "red";
        }else{
            confirmSenha.style.borderColor = "rgb(206, 212, 218)";
            senha.style.borderColor = "rgb(206, 212, 218)";
        }
    });
    
}


function validaForm(){

    
    for(i=0; i < formArray.length; i++){
        if(formArray[i].value == ""){                        
            erro.style.display = "block";
            erro.innerHTML = "Existem campos obrigatórios não preenchidos!";
            event.preventDefault();
            return;
        }
    }

    if(nome.value.length < 5){
        erro.style.display = "block";
        erro.innerHTML = "Digite seu nome completo!";
        event.preventDefault();
        return;
    }

    if(validaCpf(cpf) == false){
        erro.style.display = "block";
        erro.innerHTML = "CPF inválido!";
        event.preventDefault();
        return;
    }

    if(telefone.value.length < 13){
        erro.style.display = "block";
        erro.innerHTML = "Telefone inválido!";
        event.preventDefault();
        return;
    }

    if(nomeEmpresa.value.length < 5){
        erro.style.display = "block";
        erro.innerHTML = "Razão Social ou Nome fantasia inválido!";
        event.preventDefault();
        return;
    }

    if(cnpj.value.length >= 1 && cnpj.value.length < 18){
        erro.style.display = "block";
        erro.innerHTML = "Digite um CNPJ válido caso possua, se não deixe o campo em branco.";
        event.preventDefault();
        return;
    }

    if(email.value != confirmEmail.value){
        erro.style.display = "block";
        erro.innerHTML = "Verifique o e-mail digitado.";
        event.preventDefault();
        return;
    }

    if(senha.value != confirmSenha.value){
        erro.style.display = "block";
        erro.innerHTML = "Verifique as senhas digitadas!";
        event.preventDefault();
        return;
    }
    

}


function validaCpf(cpf) {

    let value = cpf.value.replace(/[^\d]+/g,'');
    cpfSemPontuacao = value;
    var soma;
    var resto;
    soma = 0;

    if (cpfSemPontuacao == "00000000000") return false;
     
    for (i=1; i<=9; i++) soma = soma + parseInt(cpfSemPontuacao.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
   
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpfSemPontuacao.substring(9, 10)) ) return false;
   
    soma = 0;

    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpfSemPontuacao.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
   
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpfSemPontuacao.substring(10, 11) ) ) return false;
    return true;
}