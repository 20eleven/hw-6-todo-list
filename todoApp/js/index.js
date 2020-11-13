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

   const liArr = []
   
   pencil.addEventListener('click', function() {
      input.classList.toggle('display')
      setting.classList.toggle('display')
   })

   input.addEventListener("keypress", function(keyPressed) {
      if(keyPressed.which === 13) {
         //FIXME: при обновлении страницы и добавлении новых элементов, перезаписывает полностью локал сторадж 
         // if(JSON.parse(localStorage.getItem('todoList')) !== null) {
         //    let concated = liArr.concat(JSON.parse(localStorage.getItem('todoList')))
         //    console.log(concated);
         //    localStorage.setItem('todoList', JSON.stringify(concated)) 
         // }
         
         const li = document.createElement("li")
         li.classList.add(`${Date.now()}`)

         const spanElement = document.createElement("span")
         const icon = document.createElement("i")
         const select = document.createElement('select')
               
         const newTodo = this.value
         this.value = " " 
         
         icon.classList.add('fas', 'fa-trash')
         spanElement.append(icon)
         ul.appendChild(li).append(spanElement, newTodo, select)

         let liObj = {
            item: li.innerHTML,
            dateId: li.classList.value,
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

            //TODO: удаление опрелеленного элемента из локал стораджа 
            // let arrItems = JSON.parse(localStorage.getItem('todoList'))
            // arrItems.forEach(element => {
            //    if (span.parentElement.getAttribute('class') == element.dateId) {
            //       let arr = JSON.parse(localStorage.getItem('todoList'))
            //       if (arr.includes(element)) {
            //          console.log('dfg');
            //          arr.filter(function() {
            //             return arr.includes(element)
            //          })
            //       }
            //       localStorage.setItem('todoList', JSON.stringify(arr)) 
            //    }
            // })

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
         let liStr = ''
         items.map(element => {
            liStr += `<li>${element.item}</li>` 
         })
         ul.innerHTML = liStr
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