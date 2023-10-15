const save_button = document.querySelector("#save-btn");
const input_title = document.querySelector("#title");
const list = document.querySelector(".list");

let todo_list = []
//work with DOM
function RenderItem(todoItem){
    const Item = document.createElement("div");
      Item.classList.add("form")
     
      const checkbox = document.createElement("input")
      checkbox.setAttribute("type" , "checkbox")
      if(todoItem.status){
        checkbox.checked = todoItem.status
      }
      
      
      const span = document.createElement("span")
      span.textContent = todoItem.title
      
      const delet = document.createElement("button")
      delet.classList.add("delet_btn")
      delet.textContent= "DELET"
      
      Item.appendChild(checkbox)
      Item.appendChild(span)
      Item.appendChild(delet)

      list.appendChild(Item)
      
     delet.addEventListener("click" , ()=>{
        for (let i=0 ; i<todo_list.length; i++){
            const list_item = todo_list[i]
            if(list_item.title===todoItem.title){
                
                remove(list_item.title)
                syncSrorage()
                RenderItem()
                
             }
        }
     })

      checkbox.addEventListener("click" , ()=>{
       toggleStatus(todoItem.title)
       console.log(todo_list)
      })
      
}
function RenderList(){
    for (let i = 0 ; i< todo_list.length ; i++){
        const title = todo_list[i] 
        RenderItem(title)
}
}

function clear_input(){
    input_title.value = "";
}
//work with storage
function syncSrorage(item) {
    const next_list = JSON.stringify(todo_list)
    localStorage.setItem("my_list", next_list) 
}
function load_from_storage(){
    const ListFromStorage = JSON.parse(localStorage.getItem("my_list")) || []
    todo_list=ListFromStorage
    RenderList()

    }



//functionality
function toggleStatus(title){
    for (let i=0 ; i<todo_list.length; i++){
        const list_item = todo_list[i]
         if(list_item.title===title){
            list_item.status =   list_item.status ? false : true 
            
         }
         
         syncSrorage()
       }
}
function addItem(item){
    const next_item = {
        title : item.title,
        status : item.status
      } 
      todo_list.push(next_item)
      syncSrorage()
}
function remove(item) {
    const remove_item = {
        title : item.title , 
        status : item.status
    }
    todo_list.pup(remove_item)
    syncSrorage()
}

// run your app
function onAddItem(){
    const val = input_title.value  
    if (val===""){
        alert("you should input no null")
    }else{
       const item = {
        title:val,
        status:false
       }
      addItem(item)
      RenderItem(item)
      clear_input()

    }
}    
function Events(){
    save_button.addEventListener("click" , onAddItem)
}
//reload
function init(){
    load_from_storage()
    Events()

}

init()
