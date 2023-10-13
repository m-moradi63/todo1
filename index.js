const save_button = document.querySelector("#save-btn");
const input_title = document.querySelector("#title");
const list = document.querySelector(".list");

let todo_list = []

function RenderItem(title){
    const item = document.createElement("div");
      item.classList.add("form")
     
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
function RenderList(){
    for (let i = 0 ; i< todo_list.length ; i++){
        const title = todo_list[i]
        RenderItem(title)
}
}
function syncSrorage(title){
    
    todo_list.push(title)
    const next_list = JSON.stringify(todo_list)
    localStorage.setItem("my_list", next_list) 
}
function load_from_storage(){
    const ListFromStorage = JSON.parse(localStorage.getItem("my_list")) || []
    todo_list=ListFromStorage
    RenderList()

    }
function Events(){
    save_button.addEventListener("click" , () => {
        const val = input_title.value 
        if (val===""){
            alert("you should input no null")
        }else{
          syncSrorage(val)
          RenderItem(val)
          clear_input()
    
        }
    })
}

function init(){
    load_from_storage()
    Events()

}

init()
