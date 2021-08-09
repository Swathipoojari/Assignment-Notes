const jwt = localStorage.getItem("jwt");
const user_id = localStorage.getItem("user_id");
const urlPath = "https://610f9659c848c900171b392e.mockapi.io/api/v1";
const header = "application/json;charset=UTF-8";
var MyNotes = [];
var UpdateNote;
if (jwt == null) {
  window.location.href = "./login.html";
}
setInterval(function () {
  var IsAddNoteShow = document.getElementById("addIconHld");
  if (
    isEmpty(document.getElementById("notes").value) ||
    isEmpty(document.getElementById("title").value)
  ) {
    IsAddNoteShow.style.display = "none";
  } else {
    IsAddNoteShow.style.display = "inline";
  }
}, 1000);
function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", urlPath + "/users/" + user_id);
  xhttp.setRequestHeader("Content-Type", header);
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects["status"] == "ok") {
        const user = objects["data"];
        const element = document.getElementById("username");
        element.innerHTML = user["userName"][0];
        element.classList.add("userName");
      }
    }
  };
}

loadUser();
function addNotes() {
  var title = document.getElementById("title").value;
  var notesContent = document.getElementById("notes").value;
  MyNotes.push({
    title: title,
    notes: notesContent,
  });
  document.getElementById("title").value = "";
  document.getElementById("notes").value = "";
  showNotes();
}

function showNotes() {
  let html = "";
  let element = document.getElementById("notesList");
  if (MyNotes.length != 0) {
    for (var i = 0; i < MyNotes.length; i++) {
      MyNotes[i].id = i + 1;
      html += `<div class="col-lg-4">
            <div class="card" id="card">
              <h5 class="notesTitle">${MyNotes[i].title}</h5>
              <p class="notestext">${MyNotes[i].notes}</p>
              <div class="notesOption" id="notesOption">
                <span class="iconHld" id="${MyNotes[i].id}" onclick="deleteNotes(this.id)"><i class="material-icons materialIcon">delete</i></span>
                <span class="iconHld" data-toggle="modal" data-target="#updateNote" id="${MyNotes[i].id}" onclick="updateNotes(this.id)"><i class="material-icons materialIcon">edit</i></span>
              </div>
            </div>
          </div>`;
    }
    element.innerHTML = html;
  } else {
    element.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
  }
}

function updateNotes(id) {
  let TitleElement = document.getElementById("updatedtitle");
  let NotesEle = document.getElementById("updatednotes");
  MyNotes.forEach((value, index) => {
    if (value.id == id) {
      updateNotes = value;
      TitleElement.value = updateNotes.title;
      NotesEle.value = updateNotes.notes;
    }
  });
  showNotes();
}

function updateNotesToList() {
  var title = document.getElementById("updatedtitle").value;
  var notesContent = document.getElementById("updatednotes").value;
  MyNotes.forEach((x) => {
    if (x.id == updateNotes.id) {
      x.title = title;
      x.notes = notesContent;
    }
  });
  document.getElementById("title").value = "";
  document.getElementById("notes").value = "";
  $("#updateNote").modal("hide");
  showNotes();
}

function deleteNotes(id) {
  MyNotes.forEach((value, index) => {
    if (value.id == id) MyNotes.splice(index, 1);
  });
  showNotes();
}

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "./login.html";
}

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (value instanceof Array && value.length === 0) ||
    (value instanceof Object && Object.keys(value).length === 0)
  );
}
