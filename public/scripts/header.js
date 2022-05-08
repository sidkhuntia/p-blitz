let navToggle = document.querySelector(".header-nav__toggle");
let navWrapper = document.querySelector(".header-nav__wrapper");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("header-active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("header-active");
  } else {
    navWrapper.classList.add("header-active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
    searchForm.classList.remove("header-active");
  }
});

window.onscroll = function () { header_myFunctionscroll() };
var nav = document.querySelector(".header-site-header");
function header_myFunctionscroll() {
  let h2 = nav.getBoundingClientRect().height;
  let scrollheight = window.pageYOffset;
  if (scrollheight > h2) {
    nav.classList.add("header-fixed");
  }
  if (scrollheight < h2) {
    nav.classList.remove("header-fixed");
  }
}


function header_myFunction() {
  document.getElementById("myDropdown").classList.toggle("header-show");
}

window.onclick = function (e) {
  if (!e.target.matches('.header-dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('header-show')) {
      myDropdown.classList.remove('header-show');
    }
  }
}
