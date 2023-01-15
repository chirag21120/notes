console.log("this is app.js");
showNotes();
//if user adds a note, add it to local storage
let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("AddTxt");
  let addtitle = document.getElementById("title");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    title: addtitle.value,
    text: addtxt.value,
  };
  if (myobj.title != "" && myobj.text != "") {
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value = "";
    //console.log(notesobj);
    showNotes();
  }else{
    let top = document.getElementById('body');
    top.innerHTML += `<div class="alert alert-warning d-flex align-items-center alert-dismissible fade show" role="alert" >
    <div>
      Please Enter the content
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    
  }
});

//function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `<div class="notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary del">Delete Note</button>
        </div>
      </div>  `;
  });
  let noteselm = document.getElementById("notes");
  if (notesobj.length != 0) {
    noteselm.innerHTML = html;
  } else {
    noteselm.innerHTML = `Nothing to show up now`;
  }
}

//function to delete a note
function deleteNode(index) {
  //console.log('I am deleteing',index)
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
  e.preventDefault();
  let inputVal = search.value;
  //console.log('Input event fired',inputVal);
  let noteCards = document.getElementsByClassName("notecard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    //console.log(cardTxt);
    if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
