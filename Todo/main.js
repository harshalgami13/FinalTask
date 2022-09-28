getWeather()
getRandomGif()
getCurrentTime()


function getWeather() {

    navigator.geolocation.getCurrentPosition((position) => {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        let api = "http://api.weatherapi.com/v1/current.json?"
        let key = "key=a98cae590ff541788ea52828222709"
        let url = api + key + "&q=" + lat + "," + long

        fetch(url)
            .then(Response => Response.json()).then(data => {
                let temp = data.current.temp_c
                let city = data.location.name

                document.getElementById('location').innerHTML = city
                document.getElementById('LatLong').innerHTML = lat.toFixed(2) + "," + long.toFixed(2)
                document.getElementById('temp').innerHTML = temp

            })

    });

}

function getCurrentTime() {
    setInterval(() => {
        var date = new Date()
        document.getElementById('time').innerHTML = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds().toFixed(0)}`
    }, 1000)
}


function getRandomGif() {
    fetchGif()
    setInterval(() => {
        fetchGif()
    }, 2000)
}


function fetchGif() {
    let api = "https://api.giphy.com/v1/gifs/random?"
    let key = "api_key=z306QfCFSekolhtZmGizRUsWfdVZaGEE"
    let url = api + key + "&tag=bollywood&rating=g"
    fetch(url)
        .then(Response => Response.json())
        .then(datas => {
            let src = datas.data.images.fixed_height_downsampled.url
            console.log(src)
            document.getElementById('gif').src = src
        })
}

var i = 0
document.getElementById('addTask').hidden = false
document.getElementById('updateTask').hidden = true

function addTask() {

    let listTodo = document.getElementById('listTodo')
    let task = document.getElementById('task').value

    if (task == "") {
        alert('Please Fill Task')
        return false
    }

    let li = document.createElement('li')
    let btnEdit = `<button class="btnEdit" id="edit" onclick="return doEdit()">Edit</button>`
    let btnDelete = `<button class="btnDelete" style="margin: 0 5px" id="delete" onclick="doDelete()">Delete</button>`
    let btnDone = `<button class="btnDone" id="done" onclick="doDone()">Complete</button>`
    li.className = "list-group-item"
    li.id = `li${i}`
    li.innerHTML = `${btnEdit} ${btnDelete} <span id="span${i}">${task}</span> ${btnDone}`
    listTodo.appendChild(li)

    document.getElementById('inputListForm').reset()

    i++
    return false
}

var a = 0

function doDone() {
    let liID = event.currentTarget.parentElement
    let span = document.getElementById(liID.id).childNodes[4]
    
    let completedTodo = document.getElementById('completedTodo')
    let li = document.createElement('li')
    let btnDelete = `<button class="btnDelete" style="margin: 0 5px" id="delete" onclick="doDelete()">Delete</button>`
    let unSubmit = `<button class="btnDone" id="undone" onclick="doUnsubmit()">Uncomplete</button>`
    li.className = "list-group-item"
    li.style = 'text-align: left;'
    li.id = `li${a}`
    li.innerHTML = `<span id="done${a}">${span.textContent}</span> ${btnDelete} ${unSubmit}`
    completedTodo.appendChild(li)
    
    document.getElementById(liID.id).remove()

}

function doUnsubmit(){
    let liID = event.currentTarget.parentElement
    let span = document.getElementById(liID.id).childNodes[0]
    let spanValue = document.getElementById(span.id).textContent

    let listTodo = document.getElementById('listTodo')

    let li = document.createElement('li')
    let btnEdit = `<button class="btnEdit" id="edit" onclick="return doEdit()">Edit</button>`
    let btnDelete = `<button class="btnDelete" style="margin: 0 5px" id="delete" onclick="doDelete()">Delete</button>`
    let btnDone = `<button class="btnDone" id="done" onclick="doDone()">Complete</button>`
    li.className = "list-group-item"
    li.id = `li${i}`
    li.innerHTML = `${btnEdit} ${btnDelete} <span id="span${i}">${spanValue}</span> ${btnDone}`
    listTodo.appendChild(li)

    document.getElementById(liID.id).remove()

}



function doDelete() {
    event.currentTarget.parentElement.remove();
}

function doEdit() {
    let liID = event.currentTarget.parentElement.id
    let span = document.getElementById(liID).childNodes[4]

    document.getElementById('task').value = span.textContent

    sessionStorage.setItem("spanID", span.id);

    document.getElementById('addTask').hidden = true
    document.getElementById('updateTask').hidden = false

}


function updateTask() {
    let task = document.getElementById('task').value
    let sessionValue = sessionStorage.getItem("spanID");

    console.log(sessionValue)

    let spanID = document.getElementById(sessionValue)

    spanID.textContent = task

    document.getElementById('inputListForm').reset()
    sessionStorage.removeItem("spanID");

    document.getElementById('addTask').hidden = false
    document.getElementById('updateTask').hidden = true

}