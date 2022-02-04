///////////////////////////////
// DISABLE MOUSE SCROLL ICON //
///////////////////////////////
const scrollIco = document.getElementById("scroll");
let tid;
window.addEventListener("scroll", function () {
  if (this.scrollY > 300) {
    scrollIco.classList.add("fade-out");
    tid = this.setTimeout(() => {
      scrollIco.classList.add("hide");
    }, 1500);
  } else {
    scrollIco.classList.remove("fade-out");
    scrollIco.classList.remove("hide");
    this.clearTimeout(tid);
  }
});

//////////////////////////
// SET DEFAULT LANGUAGE //
//////////////////////////
const lang = localStorage.getItem("lang");
const bodyEl = document.getElementById("body");
const selectEl = document.getElementById("deflng");
// Clear default pl class attribute:
bodyEl.removeAttribute("class");
switch (lang) {
  case "en":
    bodyEl.classList.add("en");
    // Set default text in select field:
    selectEl.innerHTML = "EN";
    break;
  default:
    bodyEl.classList.add("pl");
}

///////////////////////////
// LANGUAGE SELECT FIELD //
///////////////////////////
let x, i, j, l, ll, selElmnt, a, b, c;
// Look for any elements with the class "custom-select":
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  // For each element, create a new DIV that will act as the selected item:
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  // For each element, create a new DIV that will contain the option list:
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    // For each option in the original select element, create a new DIV that will act as an option item:
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      // When an item is clicked, update the original select box, and the selected item:
      let y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          // Add selected value to body tag as class:
          const bodyEl = document.getElementById("body");
          bodyEl.removeAttribute("class");
          bodyEl.classList.add(this.innerHTML.toLowerCase());
          // Save users choice to local storage:
          localStorage.setItem("lang", this.innerHTML.toLowerCase());
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    // When the select box is clicked, close any other select boxes, and open/close the current select box:
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  // A function that will close all select boxes in the document, except the current select box:
  let x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

// If the user clicks anywhere outside the select box, then close all select boxes:
document.addEventListener("click", closeAllSelect);

///////////////////////
// PROJECTS CAROUSEL //
///////////////////////
!(function (d) {
  var itemClassName = "carousel-div";
  (items = d.getElementsByClassName(itemClassName)),
    (totalItems = items.length),
    (slide = 0),
    (moving = true);

  // To initialise the carousel we'll want to update the DOM with our own classes
  function setInitialClasses() {
    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  // Set click events to navigation buttons

  function setEventListeners() {
    var next = d.getElementsByClassName("carousel-button--next")[0],
      prev = d.getElementsByClassName("carousel-button--prev")[0];

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction();

      // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Test if carousel has more than three items
      if (totalItems - 1 > 3) {
        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // Set moving to false now that the carousel is ready
    moving = false;
  }

  // make it rain
  initCarousel();
})(document);

/////////////////////
// CONTACT BUTTONS //
/////////////////////
const telBtn = document.getElementById("ctel");
const addBtn = document.getElementById("cadd");

const telEl = document.createElement("span");
telEl.innerText = "(+48) 600 777 330";

const addEl = document.createElement("span");
addEl.innerText = "piotrszymanskipoczta@gmail.com";

let telRevealed = false;
let addRevealed = false;

function revealNumber() {
  if (telRevealed) return;
  telBtn.innerHTML = "";
  telBtn.appendChild(telEl);
  telBtn.classList.add("revealed");
  telRevealed = true;
}

function revealAddress() {
  if (addRevealed) return;
  addBtn.innerHTML = "";
  addBtn.appendChild(addEl);
  addBtn.classList.add("revealed");
  addRevealed = true;
}

telBtn.addEventListener("click", revealNumber);
addBtn.addEventListener("click", revealAddress);

//////////////////
// MODAL TOGGLE //
//////////////////
const showBtn = document.getElementById("show-more");
const hideBtn = document.getElementById("hide-more");

function toggleModal(isOn) {
  const bodyEl = document.getElementById("body");

  if (isOn) {
    bodyEl.classList.add("show-modal");
  } else {
    const content = document.getElementsByClassName("modal-content");
    content[0].scrollTop = 0;
    bodyEl.classList.remove("show-modal");
  }
}

showBtn.addEventListener("click", () => toggleModal(true));
hideBtn.addEventListener("click", () => toggleModal(false));
