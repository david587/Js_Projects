//Slect items
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit option
let editElement;
let editFLag = false;
let editID = "";

//event listeners
//submit form
form.addEventListener("submit",addItem);
//clear items
clearBtn.addEventListener("click",clearItems);
//loaditems
window.addEventListener("DOMContentLoaded", setupItems);
//functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString(); //unique id
    if(value && !editFLag){
        createListItem(id,value);
        //displayalert
        displayAlert("item added to the list","success");
        //show container
        container.classList.add("show-container");
        //add to local storage
        addToLocalStorage(id,value);
        //set back top default
        setBackToDefault();
    }
    else if(value && editFLag){
       editElement.innerHTML =value;
       displayAlert("value changed","success");
       //edit localstorage
       editLocalStorage(editID,value);
       setBackToDefault();

    }
    else{
       displayAlert("please enter value", "danger");
    }
}
//display alert
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
    },1000)
}

// clear items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");

    if(items.length >0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    // localStorage.removeItem("list");
}

//delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    //remove form local storage
    removeFromLocalStorage(id);
}
//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement; //creeated article with data-id
    //set edititem
    editElement = e.currentTarget.parentElement.previousElementSibling; //beirt érték
    //set form value
    grocery.value=editElement.innerHTML;
    editFLag =true;
    editID= element.dataset.id; //article id
    submitBtn.textContent = "edit";
    
}
//set back to default
function setBackToDefault(){
    grocery.value = "";
    editFLag = false;
    editID="";
    submitBtn.textContent="submit";
}
//local storage
function addToLocalStorage(id,value){
    const grocery = {id:id,value:value}; //{id,value->shortcut if the name is the same as the paramter/ : is =  }
    //condition ? ifTrue : ifFalse
    let items = localStorage.getItem("list")? //->null cause the first value  will not be there
    JSON.parse(localStorage.getItem("list"))
    : [];
    //if there is no item it will be an empty array [];
    //first makes a list and after put the values in it
    console.log(items);
    items.push(grocery); //push the {id,value} -->to []
    localStorage.setItem("list",JSON.stringify(items)); //upload to localstorage

}
function removeFromLocalStorage(id){
 let items = getLocalStorage();
 
 //filter -> if the statement is not true delete the element 
 items = items.filter(function(item){
    //item ->id,value
    //id -> dataset-id
    if(item.id !==id){
        return item;
    }
 });
 localStorage.setItem("list",JSON.stringify(items));
}
//id--> article dataset-id
//map() creates a new array from calling a function for every array element.
// map() calls a function once for each element in an array.
// map() does not execute the function for empty elements.
// map() does not change the original array.
function editLocalStorage(id,value){
    let items = getLocalStorage();
    items= items.map(function(item){
        if(item.id === id){
            item.value = value
        }
        //else
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));
}
//gets the datas from storage with this func
function getLocalStorage(){
    return  localStorage.getItem("list")? //->null cause the first value  will not be there
    JSON.parse(localStorage.getItem("list"))
    : [];
}
//localStorage API
//setitem
//getitem
//remoweitem
//save as strings
//setup items
function setupItems(){
    let items = getLocalStorage();
    if(items.length>0){
        items.forEach(function(item){
            createListItem(item.id,item.value)
        })
        container.classList.add("show-container");
    }
}

function createListItem(id,value){
    const element = document.createElement("article");
        //add class
        element.classList.add("grocery-item");
        //add id
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr); //ad the id to the element
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
        //when we have acces to delete and edit
        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);
        //append child
        list.appendChild(element);
}

// localStorage.setItem("orange",JSON.stringify(["item","item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// localStorage.removeItem("orange");