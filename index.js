const save_button = document.querySelector("#save-btn");
const input_title = document.querySelector("#title");
const list = document.querySelector(".list");
const filterse = document.querySelector("#filters")



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

      
      filterse.addEventListener("change" , ()=>{
        filterSelect(filterse.value)
        
      })
      
      delet.addEventListener("click" , ()=>{ 
        remove(todoItem.title)
        
     })

      checkbox.addEventListener("click" , ()=>{
       toggleStatus(todoItem.title)
       console.log(todo_list)
      })
      
}

function RenderList(){
   list.innerHTML=""
   
    for (let i = 0 ; i< todo_list.length ; i++){
        const title = todo_list[i] 
        RenderItem(title)
}
}

function clear_input(){
    input_title.value = "";
}
//work with storage
function syncSrorage() {
    const next_list = JSON.stringify(todo_list)
    localStorage.setItem("my_list", next_list) 
}
function load_from_storage(){
    const ListFromStorage = JSON.parse(localStorage.getItem("my_list")) || []
    todo_list=ListFromStorage
    RenderList()

    }



//functionality
function filterSelect(events){
    console.log(events)
    let temp =  []
        if(events === "done"){
            for (let i=0 ; i<todo_list.length; i++){
               if(todo_list.status===true){
                    temp.push(todo_list[i])
               }
            }
            RenderItem()

            if(events === "todo"){
                for (let i=0 ; i<todo_list.length; i++){
                   if(todo_list.status===false){
                        temp.push(todo_list[i])
                   } 
                } 
            
                }
                RenderItem()
                
            }
        }
            

       

    
       
    /*    switch(event){
                 case done: {todo_list.filter((item)=>{
                    const listFilter = todo_list.status === true
                 })                                        
                 break;}
                 case todo: {todo_list.filter((item)=>{
                    const listFilter = todo_list.status === false
                 })
                 break;}
                 
                default: todo_list.filter((item)=>{
                    const listFilter= (item.status===true && item.status===false)
                })} */
         


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
function Donefunc(item){
    todo_list.filter((item) , ()=>{
         return item.status===true
    })
        
    }



/* function filters(filterItem){
    for (let i=0 ; i<todo_list.length; i++){
        const list_item = todo_list[i]
        
        if(list_item.status===filterItem){
           /*  list_item.filter((item)=>{
                return list_item[i]
            }) */
          /*   console.log(list_item[i])
            
        }
        RenderItem()
}}  */
function remove(title){
    for (let i=0 ; i<todo_list.length; i++){
        const list_item = todo_list[i]
         if(list_item.title===title){
            todo_list.splice(i,1)
            
         }
         
         syncSrorage()
         RenderList()
       }
}
/* function remove(title) {
    console.log("remove" , title)
    const remove_item = {
        title : item.title , 
        status : item.status
    }
    todo_list.splice(i, 1)
} */

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
