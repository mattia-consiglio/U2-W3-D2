const nameInput = document.getElementById('name')
const saveBtn = document.getElementById('save')
const deleteBtn = document.getElementById('delete')
const name = localStorage.getItem('name')
const savedName = document.getElementById('savedName')

saveBtn.addEventListener('click', () => {
	const name = nameInput.value
	localStorage.setItem('name', name)
	nameInput.value = ''
	deleteBtn.disabled = false
	savedName.innerText = name
})

deleteBtn.addEventListener('click', () => {
	localStorage.removeItem('name')
	deleteBtn.disabled = true
	savedName.innerText = 'nessuno'
})

const setTimer = () => {
	const m = Math.floor(timer / 60)
	const s = timer % 60
	timerText.innerText = m > 0 ? `${m}m ${s}s` : `${s}s`
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
