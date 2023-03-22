"use strict";

let divWrapper = document.querySelector(".wrapper-post");
let overlay = document.querySelector(".overlay");
let content = document.querySelector(".content");
let closeIcon = document.querySelector(".close");

function ajaxPost(url, callback) {
  let request = new XMLHttpRequest();
  request.open("get", url);

  request.addEventListener("load", function () {
    let responseDataJs = JSON.parse(request.responseText);
    // console.log(responseDataJs);
    callback(responseDataJs);
  });
  request.send();
}
ajaxPost("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach((element) => {
    Divebi(element);
  });
});
function Divebi(item) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("post");
  mainDiv.setAttribute("data-id", `${item.id}`);

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;
  mainDiv.appendChild(h4Element);
  mainDiv.appendChild(h2Element);

  mainDiv.addEventListener("click", function (e) {
    console.log(e.target);
    let divID = e.target.getAttribute("data-id");
    console.log(divID);

    overlay.classList.add("overlayactive");
    let newurl = `https://jsonplaceholder.typicode.com/posts/${divID}`;
    console.log(newurl);
    ajaxPost(newurl, function (x) {
      addContent(x);
    });
  });
  divWrapper.appendChild(mainDiv);
}
function addContent(y) {
  let pElement = document.createElement("p");
  pElement.innerText = `${y.body}`;
  content.appendChild(pElement);
}
closeIcon.addEventListener("click", function () {
  overlay.classList.remove("overlayactive");
  content.innerText = " ";
});
