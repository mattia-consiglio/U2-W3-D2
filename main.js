const nameInput = document.getElementById('name')
const saveBtn = document.getElementById('save')
const deleteBtn = document.getElementById('delete')
const name = localStorage.getItem('name')
const savedName = document.getElementById('savedName')
const localHistory = localStorage.getItem('history')
const history = localHistory ? JSON.parse(localHistory) : []
const historyGroup = document.getElementById('historyGroup')
let currHistoryIndex = null

const deleteHistory = (index = null) => {
	if (index !== null) {
		currHistoryIndex = index
	}
	history.splice(currHistoryIndex, 1)
	currHistoryIndex = null
	updateHistory()
	nameInput.value = ''
	deleteBtn.disabled = true
}

const setCurrentHistory = (index = null) => {
	if (index !== null) {
		currHistoryIndex = index
	}
	nameInput.value = history[currHistoryIndex].name
	savedName.innerHTML = history[currHistoryIndex].name
	deleteBtn.disabled = false
}

const updateHistory = () => {
	historyGroup.innerHTML = ''
	console.log(historyGroup.innerHTML)
	history.forEach((history, i) => {
		const content = `
		<div class="btn-group" role="group">
			<input type="radio" class="btn-check" name="historyradio" id="historyradio${i}" autocomplete="off" oninput="setCurrentHistory(${i})">
			<label class="btn btn-outline-secondary" for="historyradio${i}"><i>${history.time}</i>: <b>${history.name}</b></label>
			<button class="btn btn-outline-danger" onclick="de"><i class="bi bi-trash-fill"></i></button>
		</div>`
		historyGroup.insertAdjacentHTML('beforeEnd', content)
	})
	localStorage.setItem('history', JSON.stringify(history))
}

class History {
	constructor(name) {
		this.name = name
		const now = new Date()

		this.time = now.toLocaleDateString('it-IT') + ' ' + now.toLocaleTimeString('it-IT')
		history.unshift(this)
	}
}

updateHistory()

saveBtn.addEventListener('click', () => {
	const name = nameInput.value
	localStorage.setItem('name', name)
	nameInput.value = ''
	savedName.innerText = name
	new History(name)
	updateHistory()
})

deleteBtn.addEventListener('click', () => {
	localStorage.removeItem('name')
	if (history.length === 0) {
		deleteBtn.disabled = true
		savedName.innerText = 'nessuno'
	}
	deleteHistory()
})

const setTimer = () => {
	const h = Math.floor(timer / (60 * 60)) + 'h '
	const m = Math.floor(timer / 60) - parseInt(h) * 60 + 'm '
	const s = (timer % 60) + 's'
	timerText.innerText = `${h}${m}${s}`
	sessionStorage.setItem('timer', timer)
	timer++
}
const storedTimer = sessionStorage.getItem('timer')
let timer = storedTimer ? storedTimer : 0
const timerText = document.getElementById('timerText')
setTimer()

setInterval(() => {
	setTimer()
}, 1000)
