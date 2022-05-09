
let form1 = document.getElementById("form1")
let form2 = document.getElementById("form2")
let form3 = document.getElementById("form3")

let next1 = document.getElementById("form-next1")
let next2 = document.getElementById("form-next2")
let back1 = document.getElementById("form-back1")
let back2 = document.getElementById("form-back2")

let progress = document.getElementById("progress")

next1.addEventListener("click", function(){
    form1.style.left = "-450px"
    form2.style.left = "40px"
    progress.style.width = "240px"
})
back1.addEventListener("click", function(){
    form1.style.left = "40px"
    form2.style.left = "450px"
    progress.style.width = "120px"

})
next2.addEventListener("click", function(){
    form2.style.left = "-450px"
    form3.style.left = "40px"
    progress.style.width = "360px"

})
back2.addEventListener("click", function(){
    form2.style.left = "40px"
    form3.style.left = "450px"
    progress.style.width = "240px"

})

// preview code

let imgInp = document.getElementById("profile-preview")
let previewImg = document.getElementById("preview-img")

imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      previewImg.src = URL.createObjectURL(file)
    }
  }
