// const baseUrl = "https://rickandmortyapi.com/api/character/"
// const container = document.querySelector('.js-list')
// const loadBtn = document.querySelector('.js-load-more')
// let pages = 1;
// loadBtn.addEventListener('click', onLoadMore)

// function serviceCharackter(page=1){
//     return fetch(`${baseUrl}?page=${page}`).then((resp)=> {

//         if (!resp.ok){
//             throw new Error(resp.statusText)
//         }
//         return resp.json()
//     })
// }
// serviceCharackter().then((data)=>{
//     console.log(data);
//     container.insertAdjacentHTML("beforeend", createMarkup(data.results))
//     if(data.info.pages > 1){
//     loadBtn.hidden = false;
//     }
// })

// function createMarkup(arr){
// return arr.map(({image, name})=> `<li><img src="${image}" alt="${name}" width = "200" ><h2>${name}</h2></li>`).join(" ")
// }
// function onLoadMore(){
// pages +=1;
// serviceCharackter(pages).then((resp)=> {

//     if (!resp.ok){
//         throw new Error(resp.statusText)
//     }
//     return resp.json()
// })
// }

const baseUrl = "https://rickandmortyapi.com/api/character/";
const container = document.querySelector(".js-list");
const options = {
  root: null,
  rootMargin: "300px",
};

const observer = new IntersectionObserver(callback, options);
const guard = document.querySelector(".js-guard");
console.log(guard);
let pages = 1;

function serviceCharackter(page = 1) {
  return fetch(`${baseUrl}?page=${page}`).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ image, name }) =>
        `<li><img src="${image}" alt="${name}" width = "200" ><h2>${name}</h2></li>`
    )
    .join(" ");
}
serviceCharackter().then((data) => {
  container.insertAdjacentHTML("beforeend", createMarkup(data.results));
  if (data.info.pages > 1) {
    observer.observe(guard);
  }
});

function callback(entries) {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      pages += 1;
      try {
        const data = await serviceCharackter(pages);
        container.insertAdjacentHTML("beforeend", createMarkup(data.results));
        if (data.info.pages === pages) {
          observer.unobserve(guard);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}
// axios.get(`${baseUrl}?page=${page}`)
