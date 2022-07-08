const reviews =[
    {
        id:1,
        name:"Susan Smith",
        job:"web developer",
        img:
        "d77d82e020703bd1ac13f96418b0c103.jpg",
        text:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ..."
    },
    {
        id:2,
        name:"Jason Dolper",
        job:"web designer",
        img:
        "123026057_2099008166897023_618249393967907314_n.jpg",
        text:
        " bicycle rights tumeric chaerresuse before they sold out chambray pop-up. Shaman humblerag pickled colorring book salvia hoodie, cold-pressed four dollar toast everyday carry,",
    },
    {
        id:3,
        name:"Darlon Rock",
        job:"Mechaniker",
        img:
        "letöltés (1).jpg",
        text:
        "ima lorem ipsum +1, bicycle rights tumeric chaerresuse before they sold out chambray pop-up. Shaman humblerag pickled colorring book salvia hoodie, cold-pressed four dollar toast everyday carry,",
    },
    {
        id:4,
        name:"John Smith",
        job:"Slapper",
        img:
        "letöltés.jpg",
        text:
        "ima baby meggings twee health goth +1, bicycle rights tumeric chaerresuse before they sold out chambray pop-up. Shaman humblerag pickled colorring book salvia hoodie, cold-pressed four dollar toast everyday carry,",
    },

];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");


//set starting item
let currentItem = 0;

//load initial item
window.addEventListener("DOMContentLoaded", function(){ //csak akkor amikor minden betöltött
    showPerson();
});

// show person based on item
function showPerson(){
    const item = reviews[currentItem];
    img.src = item.img
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

//show next person

nextBtn.addEventListener("click", function(){
currentItem++;
if(currentItem > reviews.length - 1){
    currentItem = 0;
}
showPerson();
});

prevBtn.addEventListener("click", function(){
    currentItem--;
    if(currentItem < 0){
        currentItem = reviews.length -1;
    }
    showPerson();
    });

randomBtn.addEventListener("click", function(){
    let rand = Math.floor(Math.random()*reviews.length);
        currentItem=rand;
        showPerson();
        });


