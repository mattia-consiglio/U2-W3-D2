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
	history.forEach((history, i) => {
		const content = `
		<div class="btn-group" role="group">
			<input type="radio" class="btn-check" name="historyradio" id="historyradio${i}" autocomplete="off" oninput="setCurrentHistory(${i})">
			<label class="btn btn-outline-secondary" for="historyradio${i}"><i>${history.time}</i>: <b>${history.name}</b></label>
			<button class="btn btn-outline-danger delete-btn" onclick="deleteHistory(${i})"><i class="bi bi-trash-fill"></i></button>
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
let intervalId = null

const mProgress = document.getElementById('mProgress')
const hProgress = document.getElementById('hProgress')

const storedTimer = sessionStorage.getItem('timer')
let timer = storedTimer ? storedTimer : 0
const timerText = document.getElementById('timerText')

const setTimer = () => {
	const h = Math.floor(timer / (60 * 60))
	const m = Math.floor(timer / 60) - h * 60
	const s = timer % 60

	const hText = h > 0 ? h + 'm ' : ''
	const mText = m > 0 ? m + 'h ' : ''
	const sText = s + 's'

	mProgress.style.width = (s / 60) * 100 + '%'
	mProgress.closest('.progress').setAttribute('aria-valuenow', s)
	hProgress.style.width = (m / 60) * 100 + '%'
	hProgress.closest('.progress').setAttribute('aria-valuenow', m)
	timerText.innerText = `${hText}${mText}${sText}`
	sessionStorage.setItem('timer', timer)
	timer++
}

setTimer()

intervalId = setInterval(() => {
	setTimer()
}, 1000)

const checkTabFocused = () => {
	if (document.visibilityState === 'visible') {
		intervalId = setInterval(() => {
			setTimer()
		}, 1000)
	} else {
		clearInterval(intervalId)
		intervalId = null
	}
}

document.addEventListener('visibilitychange', checkTabFocused)

const changeTheme = theme => {
	localStorage.setItem('theme', theme)
	document.getElementsByTagName('body')[0].dataset.bsTheme = theme

	document.querySelectorAll('#theme label').forEach(label => {
		if (theme === 'dark') {
			label.classList.remove('btn-outline-dark')
			label.classList.add('btn-outline-light')
		} else {
			label.classList.add('btn-outline-dark')
			label.classList.remove('btn-outline-light')
		}
	})
}

const storedTheme = localStorage.getItem('theme')
const theme = storedTheme ? storedTheme : 'dark'

document.getElementById('theme' + theme.charAt(0).toUpperCase() + theme.slice(1)).checked = true

changeTheme(theme)

document.querySelectorAll('#theme input').forEach(radio => {
	radio.addEventListener('change', () => {
		const theme = radio.value
		changeTheme(theme)
	})
})
