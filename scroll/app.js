//set date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

//close links
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links= document.querySelector(".links");

navToggle.addEventListener("click", function(){
    //linksContainer.classList.toggle("show-links");
    //calculating the height of the elements
    //hardcoded in css the comntainer height because we have to hide it first
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`
    }
    else{
        linksContainer.style.height = 0;
    }
});
//that way it will be dynamic

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
//fixed navbar
window.addEventListener("scroll", function(){
    const scrollHeight =window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if(scrollHeight > navHeight){
        navbar.classList.add("fixed-nav");
    }
    else{
        navbar.classList.remove("fixed-nav");
    }

    if(scrollHeight > 500){
        topLink.classList.add("show-link");
    }
    else{
        topLink.classList.remove("show-link");
    }
});

//select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function(link){
link.addEventListener("click", function(e){
    //prevent default
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1); //->about
    const element = document.getElementById(id); //->  <section id="about" class="section">
    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position =element.offsetTop - navHeight; //->gives the element position - nav ű

    if(!fixedNav){
        position = position - navHeight
    }
    //this need to bee good on small screen
    if(navHeight > 82){
        position = position + containerHeight;
    }

    window.scrollTo({
        left:0,
        top: position
    });
    linksContainer.style.height=0; //->mobilnézetben bezérja a navot ha rákattintunk
});
});