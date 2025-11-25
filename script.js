const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode character for 'x'
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Mark task as done or remove it
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save data to local storage so tasks persist on page reload
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Display tasks when the app loads
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();