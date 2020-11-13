document.addEventListener("DOMContentLoaded", onPageLoaded)

function onPageLoaded() {
   const input = document.querySelector("input[type = 'text']")
   const ul = document.querySelector("ul")
   const spans = document.getElementsByTagName("span")
   const pencil = document.querySelector("#pencil")
   const clearBtn = document.querySelector(".clear")
   const tipsBtn = document.querySelector(".tipBtn")
   const closeBtn = document.querySelector(".closeBtn")
   const overlay = document.getElementById("overlay")
   const setting = document.querySelector('.setting')
   // const doneBtn = document.querySelector('.done_y')
   // const notDoneBtn = document.querySelector('.done_n')
   // const deadlineDayBtn = document.querySelector('.deadline_d')
   // const deadlineWeakBtn = document.querySelector('.deadline_w')


   let liArr = []

   pencil.addEventListener('click', function() {
      input.classList.toggle('display')
      setting.classList.toggle('display')
   })

   input.addEventListener("keypress", function(keyPressed) {
      if(keyPressed.which === 13) {
         const li = document.createElement("li")
         const spanElement = document.createElement("span")
         const icon = document.createElement("i")
         const select = document.createElement('select')
               
         const newTodo = this.value
         this.value = " " 
         
         icon.classList.add('fas', 'fa-trash')
         spanElement.append(icon)
         ul.appendChild(li).append(spanElement, newTodo, select)

         let liObj = {
            item: ul.innerHTML,
            dateId: Date.now(),
            isChecked:false
         }
         liArr.push(liObj)

         localStorage.setItem('todoList', JSON.stringify(liArr))  
      
         deleteTodo()    
      }     
   })

   function deleteTodo() {
      for(let span of spans) {
         span.addEventListener("click", function(event) {
            span.parentElement.remove()
            event.stopPropagation()
         })
      }
   }

   ul.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
         event.target.classList.toggle('checked')
      }
   }, false)

   tipsBtn.addEventListener("click", function() {
      overlay.style.height = "100%" 
   })

   closeBtn.addEventListener("click", function(event) {
      event.preventDefault
      overlay.style.height = "0"   
   })

   function loadTodo() {
      if(localStorage.getItem('todoList')) {
         let items = JSON.parse(localStorage.getItem('todoList'))
         for (const element of items) {
            ul.innerHTML = element.item
         }
         deleteTodo()
      }
   }

   clearBtn.addEventListener('click', function() {
      ul.innerHTML = ""
      localStorage.clear()
   })

   deleteTodo()
   loadTodo()
}