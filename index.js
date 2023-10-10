const save_button = document.querySelector("#save-btn");
const input_title = document.querySelector("#title");
const list = document.querySelector(".list");

const todo_list = []

function mak_item(title){
    const item = document.createElement("div");
      item.classList.add("item")
     
      const checkbox = document.createElement("input")
      checkbox.setAttribute("type" , "checkbox")
      
      const span = document.createElement("span")
      span.textContent = title
      
      
      item.appendChild(checkbox)
      item.appendChild(span)
      list.appendChild(item)

      
}

function clear_input(){
    input_title.value = "";
}
function syncSrorage(title){
    todo_list.push(title)
    const next_list = JSON.stringify(todo_list)
    localStorage.setItem("my_list", next_list) 
}
save_button.addEventListener("click" , () => {
    const val = input_title.value 
    if (val===""){
        alert("you should input no null")
    }else{
      syncSrorage(val)
      mak_item(val)
      clear_input()


      //console.log(todo_list)

      //const my_collection = JSON.stringify(todo_list)
     // console.log(my_collection)
    }


});

const previouse_list = JSON.parse(localStorage.getItem("my_list"))   
console.log(previouse_list)

for (let i = 0 ; i< previouse_list.length ; i++){
    const title = previouse_list[i]
    mak_item(title)
}
