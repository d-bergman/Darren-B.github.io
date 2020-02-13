function sendmail() {
  window.open('mailto:test@example.com?subject=subject&body=body');
}
function myButtonFunction() {
  document.getElementById("drop").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar1");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

var v1 = document.getElementById("h_about");
var v2 = document.getElementById("h_skills");
var v3 = document.getElementById("h_career");
var v4 = document.getElementById("h_projects");
var v5 = document.getElementById("h_contact");
var v6 = document.getElementById("name");
var v7 = document.getElementById("resume");
function to_about() {
  v1.scrollIntoView(true);
}
function to_skills() {
  v2.scrollIntoView(true);
}
function to_career() {
  v3.scrollIntoView(true);
}
function to_projects() {
  v4.scrollIntoView(true);
}
function to_contact() {
  v5.scrollIntoView(true);
}
function to_home() {
  v6.scrollIntoView(true);
}
function to_resume() {
  v7.scrollIntoView(true);
}

$(document).click(function () {
  $("#dropdown-content").hide();
});

/* Clicks within the dropdown won't make
   it past the dropdown itself */
$("#dropdown-content").click(function (e) {
  e.stopPropagation();
});


var lang = {
  "html": "30%",
  "css": "30%",
  "win10": "90%",
  "macios": "35%",
  "ios": "90%",
  "android": "30%",
  "msoffice": "70%",
  "wikian": "95%"
};

var multiply = 4;

$.each(lang, function (language, pourcent) {

  var delay = 500;

  setTimeout(function () {
    $('#' + language + '-pourcent').html(pourcent);
  }, delay * multiply);

  multiply++;

});
