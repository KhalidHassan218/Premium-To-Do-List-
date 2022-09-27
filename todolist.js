let input = document.querySelector("[type=text]");
let notcontainer = document.querySelector(".not");
let donecontainer = document.querySelector(".done");
let button = document.querySelector("[type=button]")
let arroftasks=[];
let code=0;
// let check = document.querySelector(".check");
let Reg = /\S/ig;
// let trash1 = document.querySelectorAll("i");
// let trash2 = document.querySelector(".trash2");
// let trash1="";
// input.addEventListener("blur",function(){
//     if(input.value!="" && Reg.test(input.value) ){
// let newelement = document.createElement("div");
// newelement.classList.add("not-completed");
// let task = document.createElement("p");
// task.textContent=input.value;
// let icon = document.createElement("p");
// icon.classList.add("icon");
// let check = document.createElement("i");
// check.classList.add("fa-solid","fa-check");
// let trashn = document.createElement("i");
// trashn.classList.add("fa-solid","fa-trash-can","trash1");
// trashn.setAttribute("onclick","remove()");
// icon.appendChild(check);
// icon.appendChild(trashn);
// newelement.appendChild(task);
// newelement.appendChild(icon);
// notcontainer.appendChild(newelement);
// input.value="";

//     }
//  trash1 = document.querySelectorAll(".trash1");

// })

// function remove(){
// event.target.parentElement.parentElement.remove();
// }
if(localStorage.getItem("task")){
arroftasks=JSON.parse(localStorage.getItem("task"))

createmylist(arroftasks);


}

input.onkeyup=function(e){
if(e.key == "Enter"){
butto();
}

}

button.onclick = butto ; 

function butto(){
    code=arroftasks.length+1
if(Reg.test(input.value)){
arrayoftasks(input.value)
input.value="";
}
}

function arrayoftasks(tasks){
const taskobj ={
id:code,
task:tasks,
completed:false 
}
arroftasks.push(taskobj);
createmylist(arroftasks);

//add to local storage fun()
addtolocalstorage(arroftasks);
}

function createmylist(arroftasks){
notcontainer.innerHTML="";
donecontainer.innerHTML="";
    arroftasks.forEach((task) => {
        if(!task.completed){ 
let notcompleted = document.createElement("div")
notcompleted.className ="not-completed";
let para1 = document.createElement("p");
para1.appendChild(document.createTextNode(task.task))
notcompleted.appendChild(para1);
//adding icons
let icon = document.createElement("div");
icon.classList.add("icon");
let check = document.createElement("i");
check.classList.add("fa-solid","fa-check");
let trash = document.createElement("i");
trash.classList.add("fa-solid","fa-trash-can","trash");
icon.appendChild(check);
icon.appendChild(trash);
//added icons
notcompleted.appendChild(icon)
notcompleted.setAttribute("data-id",task.id);
notcontainer.appendChild(notcompleted)
        }
        else{
            let completed = document.createElement("div")
            completed.className="completed"
            let para2 = document.createElement("p");
             para2.appendChild(document.createTextNode(task.task))
             completed.appendChild(para2);
             let trash = document.createElement("i");
             trash.classList.add("fa-solid","fa-trash-can","trash");
              completed.setAttribute("data-id",task.id);
              completed.appendChild(trash);
              donecontainer.appendChild(completed);
        }
    });

} 

function addtolocalstorage(task){
    
    let data = JSON.stringify(task)
window.localStorage.setItem("task",data)




}

notcontainer.onclick= (e) =>{
if(e.target.classList.contains("trash")){
    let removing = e.target.parentElement.parentElement;
    let id= removing.dataset.id;
   
    removefromlocalstorge(id)
     removing.remove();
     addtolocalstorage(arroftasks);
}
else if(e.target.classList.contains("fa-check")){
    let done = e.target.parentElement.parentElement;
    let id= done.dataset.id;
   
    editatlocalstorge(id)
     createmylist(arroftasks)
     addtolocalstorage(arroftasks);
}



}

donecontainer.onclick= (e) =>{
if(e.target.classList.contains("trash")){
    let removefromcompleted = e.target.parentElement;
    let id= removefromcompleted.dataset.id;
   
    removefromlocalstorge(id)
     removefromcompleted.remove();
     addtolocalstorage(arroftasks);
}
}











function editatlocalstorge(id){
window.localStorage.clear();
for(let i=0;i<arroftasks.length;i++){
    if( arroftasks[i].id == id){
        arroftasks[i].completed=true;
    }
}

}



function removefromlocalstorge(id){
window.localStorage.clear();
for(let i=0;i<arroftasks.length;i++){
    
    if( arroftasks[i].id == id){
        arroftasks.splice(i,1);
    }
    
}

    
}
