let elInput = document.querySelector(".js-input")
let elList = document.querySelector(".js-list")
let elPrev = document.querySelector(".prev")
let elNext = document.querySelector(".next")
let elFilmsTemplate = document.querySelector(".films_template").content;

const API_KEY = "bc100a3f";
let activePage = 1
// fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=iron`)
// .then(res => res.json())
// .then(data => console.log(data))

let elInputVal = ""
elInput.addEventListener("change", (evt) => {
    elInputVal = evt.target.value
    getMovies()
})

const fragment = document.createDocumentFragment()
const renderToDom = (array, node) => {
    node.innerHTML = ""
    array.forEach(el => {
        const newTemplate = elFilmsTemplate.cloneNode(true)
        newTemplate.querySelector(".item__img").src = el.Poster
        newTemplate.querySelector(".item__title").textContent = el.Title
        newTemplate.querySelector(".item__year").textContent = "Year: " + el.Year
        newTemplate.querySelector(".item__type").textContent = "Actions: " + el.Type
        newTemplate.querySelector(".item__id").textContent = "Id: " + el.imdbID
        fragment.appendChild(newTemplate)
    })
    node.appendChild(fragment)
}

async function getMovies() {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${elInputVal}&page=${activePage}`)
    const data = await res.json()
    let totalPages = Math.ceil(data.totalResults / 10)
    if(activePage == 1) {
        elPrev.setAttribute("disabled", true)
    }else {
        elPrev.removeAttribute("disabled")
    }
    if(activePage == totalPages) {
        elNext.setAttribute("disabled", true)
    }else {
        elNext.removeAttribute("disabled")
    }
    if(data.Search.length) {
        elPrev.classList.remove("active")
        elNext.classList.remove("active")
    }
    renderToDom(data.Search, elList)
}


elPrev.addEventListener("click", () => {
    activePage--
    getMovies()
})

elNext.addEventListener("click", () => {
    activePage++
    getMovies()
})
