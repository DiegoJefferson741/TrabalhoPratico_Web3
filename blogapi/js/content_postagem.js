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
    dadosComent.map((comment)=>{
       insertComment(comment);
    });
}

function insertComment(comment){
    let div = document.createElement("div");
    let email = document.createElement("h3");
    let text = document.createElement("p");

    email.innerText = comment.email;
    text.innerText =comment.body;
    div.appendChild(email);
    div.appendChild(text);
    comentContainer.appendChild(div);
}

getPost(id);

async function postComment(comment){
    let response = await fetch(url, {
        method: "POST",
        body: comment,
        headers: {"content-type":"application/json"}
    });
    const data = await response.json();

    //console.log(data);
    insertComment(data);

    document.querySelector("#email").value="";
    document.querySelector("#coment").value="";
}

let commentForm = document.querySelector("#coment-form");
commentForm.addEventListener("submit", function(e){
    e.preventDefault();
    let comment = {
        email: document.querySelector("#email").value,
        body: document.querySelector("#coment").value
    };
    comment = JSON.stringify(comment);

    //Enviar para a API
    postComment(comment);
});