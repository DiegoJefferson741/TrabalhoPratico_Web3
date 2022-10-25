function limpatela(){
    document.querySelector("#rua").value = '';
    document.querySelector("#bairro").value = '';
    document.querySelector("#cidade").value = '';
    document.querySelector("#uf").value = '';
    document.querySelector("#ibge").value = '';
    document.querySelector("#result").textContent = '';
}

function formulario(endereco){
    document.querySelector("#rua").value = endereco.logradouro;
    document.querySelector("#bairro").value = endereco.bairro;
    document.querySelector("#cidade").value = endereco.localidade;
    document.querySelector("#uf").value = endereco.uf;
    document.querySelector("#ibge").value = endereco.ibge;
}

function numero(num){
    if(/^[0-9]+$/.test(num)){
        return true;
    }else{
        return false;
    }
}

function cepValido(cep){
    if((cep.length == 8) && (numero(cep))){
        return true;
    }else{
        return false;
    }
}

async function pesquisaCep(){
    limpatela();

    let cep = document.querySelector("#cep").value.replace("-","");
    let url = "https://viacep.com.br/ws/"+cep+"/json/";
    if(cepValido(cep)){
        //Chamar a API
        let dados = await fetch(url);
        let endereco = await dados.json();
        if(endereco.hasOwnProperty("erro")){
            document.querySelector("#result").textContent = "CEP não encontrado";
        }else{
            formulario(endereco);
        }
    }else{
        document.querySelector("#result").textContent = "CEP Incorreto!";
    }
}

document.querySelector("#cep").addEventListener("blur", pesquisaCep);