const addButtonEl = document.getElementById("submit");
const fileNameInputEl = document.getElementById("item-content");
const fileNameListEl = document.getElementById("filename-list");
const fileNameContent = document.getElementById("filename-content");
var textArea = "";
var curFileNameId;
const addItem = (id) => {
    if (fileNameInputEl.value.trim() === "") {
        return
    }
    const body = {
        id: id,
        name: fileNameInputEl.value
    }
    fetch("/api/filename", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json()
        )
        .then(res => {
            fileNameInputEl.value = "";
            renderList(res)
        })
}

const deleteItem = (id) => {
    const body = {
        id: id
    }
    fetch("/api/filename", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json()
        )
        .then(res => {
            if (curFileNameId === id) {
                fileNameContent.innerHTML = ""
            }
            renderList(res)
        })
}

const updateItem = (id) => {
    const body = {
        id: id,
        name: textArea.value
    }
    fetch("/api/filename", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json()
        )
        .then(res => {
            renderList(res)
        })
}

const renderList = (res) => {
    fileNameListEl.innerHTML = "";
    fileNameListEl.id = "filename-list"
    for (const filename of res.data) {
        const liEl = document.createElement("li");
        liEl.textContent = filename.name.slice(0, 20) + "...";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        liEl.appendChild(deleteButton);
        //add on click event listener to the list to display content in a text area
        liEl.addEventListener("click", () => {
            curFileNameId = filename.id;
            //create a text box with the content
            textArea = document.createElement("textarea");
            textArea.value = filename.name;
            fileNameContent.innerHTML = ""
            // SAVE BUTTON
            const saveButton = document.createElement("button");
            saveButton.textContent = "SAVE";
            saveButton.addEventListener("click", () => {
                updateItem(filename.id);
            })
            fileNameContent.appendChild(textArea);
            fileNameContent.appendChild(saveButton);
        })


        deleteButton.addEventListener("click", () => {
            deleteItem(filename.id)
        })
        fileNameListEl.appendChild(liEl);
    }
}





const init = () => {
    addButtonEl.addEventListener("click", () => {
        addItem();
    })

    fetch("/api/filename")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            renderList(res)
        })
}

init();