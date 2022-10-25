let url = "https://jsonplaceholder.typicode.com/posts";

let parametros = new URLSearchParams(window.location.search);
let id = parametros.get("id");

let postContainer = document.querySelector("#post-container");
let comentContainer = 
    document.querySelector("#coments-container");
let post = document.querySelector("#post");
let carregando = document.querySelector("#loading");

async function getPost(pid){
    let [resultPost, resultComent] = await Promise.all([
        fetch(url+"/"+pid), fetch(url+"/"+pid+"/comments")
    ]);

    let dadosComent = await resultComent.json();
    let dadosPost = await resultPost.json();

    carregando.setAttribute("class", "ocultar");
    post.classList.remove("ocultar");

    let title = document.createElement("h1");
    let text = document.createElement("p");

    title.innerText = dadosPost.title;
    text.innerText = dadosPost.body;

    postContainer.appendChild(title);
    postContainer.appendChild(text);

    //percorrer os comentarios
}

getPost(id);