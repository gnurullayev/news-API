"use strict";

const elList = document.querySelector(".movies-list");
const elTemplate = document.getElementById("js-template").content;

let elModalImg = document.querySelector(".modal-img")
let elModalTitle = document.querySelector(".modal-title")
let elModalInfo = document.querySelector(".modal-info")

function newsMap(arr) {
  let newsArrMap = arr.map((item,index) => {
        return{
            ...item,
            id:index + 1
        }
    })

    renderNews(newsArrMap)
    modalRender(newsArrMap)
}

function listItemObject(obj) {
    let elItem = elTemplate.cloneNode(true);
    elItem.querySelector(".js-img").src = obj.urlToImage
    elItem.querySelector(".js-img").alt = obj.title
    elItem.querySelector(".js-title").textContent = obj.title.slice(0,15) + "..."
    elItem.querySelector(".js-name").textContent = obj.source.name
    elItem.querySelector(".js-link").href = obj.url
    elItem.querySelector(".js-more-btn").dataset.id = obj.id

    return elItem
}

function renderNews (news) {
    console.log(news);
    elList.innerHTML = null;

    let elTemplateFragment = document.createDocumentFragment()

    news.forEach(element => {
        // console.log(element);
        elTemplateFragment.appendChild(listItemObject(element))
    });

    elList.append(elTemplateFragment)

}


const FETCH_URL = "http://newsapi.org/v2/everything?q=tesla&from=2022-08-15&sortBy=publishedAt&apiKey=b1e7ffcf8b66448ab6add09db6a01190"

let fetchingNews = async () => {
    try{
        let response =  await fetch(FETCH_URL);
        let res =await response.json();
        newsMap(res.articles)

    }catch(e) {
        console.log(e.message);
    }
   
} 

fetchingNews()

function modalRender (news) {
    elList.addEventListener("click", (evt) => {
        if(evt.target.matches(".js-more-btn")) {
            let id = evt.target.dataset.id

            let findNews = news.find(el => {
                return el.id == id
            })

            console.log(findNews);
            console.log();

            elModalImg.src = findNews.urlToImage
            elModalTitle.textContent = findNews.title
            elModalInfo.textContent = findNews.description
        }
    })
}





















































































