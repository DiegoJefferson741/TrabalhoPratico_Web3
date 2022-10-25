let url = "https://jsonplaceholder.typicode.com/posts";

let loading = document.querySelector("#loading");
let postContainer = document.querySelector("#posts-container");

async function getAll(){
    let result = await fetch(url);
    let dados = await result.json();

    //esconder o loading
    loading.setAttribute("class", "ocultar");

    dados.map((postagem) =>{
        let div = document.createElement("div");
        let title = document.createElement("h2");
        let text = document.createElement("p");
        let link = document.createElement("a");

        title.innerText = postagem.title;
        text.innerText = postagem.body;
        link.innerText = "Saiba mais";
        link.setAttribute("href", "postagem.html?id="+postagem.id);

        div.appendChild(title);
        div.appendChild(text);
        div.appendChild(link);
        postContainer.appendChild(div);
    });
}

getAll();