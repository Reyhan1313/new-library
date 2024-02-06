let container = document.querySelector(".container");
let addbtn = document.querySelector(".add-to-cart");
let bars = document.getElementById("bars");
let shoppingCart = document.querySelector(".cart")
let counter = document.querySelector(".cart-counter");
let genreList = document.querySelector(".genre-list");
let langList = document.querySelector(".lang-list"); 
let pagination=document.querySelector(".paginationC"); 

let filterC=document.querySelector(".filter"); 
let home=document.querySelector(".main-page");
let genres = [];
let langs = [];
let selectedKeeper=[];  
let genreInput;
let langsInput;
let filteredBooks; 
let pagesContainer; 



BOOKS.forEach(element => {
    if (!langs.includes(element.language)) langs.push(element.language)
});


BOOKS.forEach(element => {
    if (!genres.includes(element.genre)) genres.push(element.genre)
});








function renderLangs() {
    const template = langs.map((lang, index) => {
        return `
            <li>
                <lable for="${index}">${lang}</lable>
                <input value="${lang}" class="lang-input" id="${index}" type="checkbox" />
            </li>
        `
    }).join("")

    langList.innerHTML = template;

    langsInput = document.querySelectorAll(".lang-input")

    for (const inp of langsInput) {
        inp.addEventListener('change', handleFilter)
    }
}

renderLangs();



function renderGenre() {
    const template = genres.map((genre, index) => {
        return `
            <li>
                <lable for="${index}">${genre}</lable>
                <input value="${genre}" class="genre-input" id="${index}" type="checkbox" />
            </li>
        `
    }).join("")

    genreList.innerHTML = template;

    genreInput = document.querySelectorAll(".genre-input");

    for (const inp of genreInput) {
        inp.addEventListener('change', handleFilter)
    }
}

renderGenre();




function handleFilter() {


    let selectedGenre = [];
    let selectedLangs = [];


    genreInput.forEach(input => {
        if (input.checked) selectedGenre.push(input.value)
    });

    langsInput.forEach(input => {
        if (input.checked) selectedLangs.push(input.value)
    });




    if (selectedGenre.length == 0) {
        selectedGenre = genres;
    }

    if (selectedLangs.length == 0) {
        selectedLangs = langs;
    }



     filteredBooks = BOOKS.filter(book => selectedGenre.includes(book.genre))

    filteredBooks = filteredBooks.filter(book => selectedLangs.includes(book.language))


    render(filteredBooks);




}













function render(list , currentPage=1) { 

    let start=(currentPage-1)*5; 
    let thisPageBooks=list.slice(start,start+5) 
  

    let template = thisPageBooks.map(book => {
        return ` 


            <div class="card">
                <img src="./image/${book.imgSrc}" >
                <div class="info">
                    <h3 style="color:#171b45;"> ${book.title}</h3> 
                    
                    <div class="overlay">
                    <p> ${book.author}</p> 
                    <p> تاریخ انتشار: ${book.published_date}</p>  
                    <p> زبان: ${book.language} </p> 
                    <p>ژانر: ${book.genre}</p> 
                    <button class="add-to-cart" onclick="addtocart(${book.id})"  > ${selectedKeeper.includes(book.id) ? "به سبد خرید اضافه شد" : "  افزودن به سبد خرید  "}  </button>
                    </div>
                    </div>
            </div>
        `
    }).join("")
    container.innerHTML = template;
    renderPagination(list)
    addbtn=document.querySelectorAll(".add-to-cart"); 

    for (const addbutton of addbtn) {
       addbutton.addEventListener("click", function(){ 
         Toastify({  
             text: "  به سبد خرید اضافه شد  ",
           duration: 3000,
           newWindow: false,
           close: true,
           gravity: "top",
           position: "right",
           stopOnFocus: true, 
           style: {
             background: "#3566e3",
           }
         }).showToast();
     })
     }


}
 
function addtocart(id){ 

    if(!selectedKeeper.includes(Number(id))) { 
        selectedKeeper.push(Number(id));
        
        }
counter.textContent=0; 
counter.textContent=selectedKeeper.length;
console.log(selectedKeeper); 

render(filteredBooks);
}


function showAdded(){  
  
    container.classList.add(".hide");
   

    let selectedbooks = selectedKeeper.map(bookId => {
        return (BOOKS.find(book => book.id == +bookId))
    })

    let template = selectedbooks.map(book => {
        return `
            <div class="selected-c"> 
            
            <img class="selected-img" src="./image/${book.imgSrc}" alt="">
<div class="selected-info">  
<p> ${book.author}</p> 
<p> تاریخ انتشار: ${book.published_date}</p>  
<p> زبان: ${book.language} </p> 
<p>ژانر: ${book.genre}</p> 

</div>
            </div>
            
        `
    }).join("");


    container.innerHTML = template

}






shoppingCart.addEventListener("click",showAdded);


function main_page(){ 
  render(filteredBooks)



}


function  renderPagination(list){ 
    pagination.innerHTML = `
    <div class="paginationC"> </div>
    `

    pagesContainer = document.querySelector(".paginationC");

    let pages = list.length / 5;

    if (list.length % 5) pages++;

    let paginationTemp = "";

    for (let i = 1; i <= pages; i++) {
        paginationTemp += `<div onclick="render(filteredBooks,${i})" class="paginationNumber">${i}</div>`
    }


    pagesContainer.innerHTML = paginationTemp;
    
}

home.addEventListener("click",main_page);
handleFilter()
render(filteredBooks)




























