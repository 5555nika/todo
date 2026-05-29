let form = document.getElementById('form');
let input = document.getElementById('input');
let ul = document.querySelector('.card-list');
let empty = document.querySelector('.empty');

ul.addEventListener('click', del)
ul.addEventListener('click', done)

function checkEmpty () {
    let tasks = ul.querySelectorAll('.items')
    if (tasks.length === 0) {
        empty.classList.remove('none')
    } else {
        empty.classList.add('none')
    }
}
function save () {
    let tasks = []
    document.querySelectorAll('.items').forEach(li => {
        let spanValue = li.querySelector('.text')
        tasks.push({
            text: spanValue.textContent,
            done: spanValue.classList.contains('text--done')
        })
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function load () {
    let savedTask = localStorage.getItem('tasks')
    if (savedTask) {
        let tasks = JSON.parse(savedTask)
        tasks.forEach(task => {
            ul.insertAdjacentHTML('beforeend', `
                <li class="items">
                    <span class="text ${task.done ? 'text--done' : ''}">${task.text}</span>
                    <div class="btn-group">
                        <button class="btn btn-success">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </li>
            `)
        })
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let key = input.value.trim()
    if (key === '') return

    ul.insertAdjacentHTML('beforeend', `
        <li class="items">
            <span class="text">${key}</span>
            <div class="btn-group">
                <button class="btn btn-success">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button class="btn btn-danger">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </li>
        `)
    input.value = ''
    input.focus()
    checkEmpty()
    save()
})
function del (e) {
    if (e.target.closest('.btn-danger')) {
        let li = e.target.closest('.items')
        if (li) {
            li.remove()
        }
        checkEmpty()
        save()
    }  
}
function done(e) {
    if (e.target.closest('.btn-success')) {
        let li = e.target.closest('.items')
        let span = li.querySelector('.text')
        if (span) {
            span.classList.toggle('text--done')
        }
        save()
    }
}

// Загружаем данные и проверяем пустоту списка при старте страницы
load()
checkEmpty()