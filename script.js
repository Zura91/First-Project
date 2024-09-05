// Класс для управления факультетами
class Faculty {
	constructor() {
		// Загружаем данные факультетов из localStorage или создаем пустой массив
		this.faculties = JSON.parse(localStorage.getItem('faculties')) || [];
		this.updateFacultyList();
	}

	// Инициализация данных факультетов
	initialize() {
		const initialFaculties = [
			'Факультет математики',
			'Факультет физики',
			'Факультет химии',
			'Факультет биологии'
		];
		if (this.faculties.length === 0) {
			this.faculties = initialFaculties.map(name => ({ name }));
			localStorage.setItem('faculties', JSON.stringify(this.faculties));
			this.updateFacultyList();
		}
	}

	// Обновление списка факультетов на странице
	updateFacultyList() {
		const facultyListElement = document.getElementById('facultyList');
		if (!facultyListElement) return;
		facultyListElement.innerHTML = '';
		this.faculties.forEach(faculty => {
			const li = document.createElement('li');
			li.textContent = faculty.name;

			const editButton = document.createElement('button');
			editButton.textContent = 'Изменить';
			editButton.addEventListener('click', () => {
				this.editFaculty(faculty.name);
			});

			const removeButton = document.createElement('button');
			removeButton.textContent = 'Удалить';
			removeButton.addEventListener('click', () => {
				this.removeFaculty(faculty.name);
			});

			li.append(editButton);
			li.append(removeButton);
			facultyListElement.append(li);
		});
	}

	// Добавление нового факультета
	addFaculty(name) {
		if (name && this.faculties.find(faculty => faculty.name === name)) {
			showModal(`Факультет с названием "${name}" уже существует!`);
		} else if (name) {
			this.faculties.push({ name });
			localStorage.setItem('faculties', JSON.stringify(this.faculties));
			this.updateFacultyList();
		}
	}

	// Изменение факультета
	editFaculty(oldName) {
		const newName = prompt('Введите новое название факультета:', oldName);
		if (newName && newName !== oldName) {
			if (this.faculties.find(faculty => faculty.name === newName)) {
				showModal(`Факультет с названием "${newName}" уже существует!`);
			} else {
				const faculty = this.faculties.find(faculty => faculty.name === oldName);
				if (faculty) {
					faculty.name = newName;
					localStorage.setItem('faculties', JSON.stringify(this.faculties));
					this.updateFacultyList();
				}
			}
		}
	};

	// Удаление факультета
	removeFaculty(name) {
		this.faculties = this.faculties.filter(faculty => faculty.name !== name);
		localStorage.setItem('faculties', JSON.stringify(this.faculties));
		this.updateFacultyList();
	}
};

// Класс для управления группами
class Group {
	constructor() {
		// Загружаем данные групп из localStorage или создаем пустой массив
		this.groups = JSON.parse(localStorage.getItem('groups')) || [];
		this.updateGroupList();
	}

	// Инициализация данных групп
	initialize() {
		const initialGroups = [
			{ name: 'Группа 1', size: 30, faculty: 'Факультет математики' },
			{ name: 'Группа 2', size: 25, faculty: 'Факультет физики' },
			{ name: 'Группа 3', size: 20, faculty: 'Факультет химии' },
			{ name: 'Группа 4', size: 15, faculty: 'Факультет биологии' }
		];
		if (this.groups.length === 0) {
			this.groups = initialGroups;
			localStorage.setItem('groups', JSON.stringify(this.groups));
			this.updateGroupList();
		}
	}

	// Обновление списка групп на странице
	updateGroupList() {
		const groupListElement = document.getElementById('groupList');
		if (!groupListElement) return;
		groupListElement.innerHTML = '';
		this.groups.forEach(group => {
			const li = document.createElement('li');
			li.textContent = `${group.name} (Студенты: ${group.size}, Факультет: ${group.faculty})`;

			const editButton = document.createElement('button');
			editButton.textContent = 'Изменить';
			editButton.addEventListener('click', () => {
				this.editGroup(group.name);
			});

			const removeButton = document.createElement('button');
			removeButton.textContent = 'Удалить';
			removeButton.addEventListener('click', () => {
				this.removeGroup(group.name);
			});

			li.append(editButton);
			li.append(removeButton);
			groupListElement.append(li);
		});
	}


	// // Добавление новой группы
	addGroup(name, size, faculty) {
		const existingGroup = this.groups.find(group => group.name === name);
		const existingFaculty = this.groups.find(group => group.faculty === faculty);

		if (existingGroup) {
			showModal(`Группа с названием "${name}" уже существует!`);
		} else if (existingFaculty) {
			showModal(`Факультет "${faculty}" уже привязан к другой группе!`);
		} else if (name && size > 0 && faculty) {
			this.groups.push({ name, size, faculty });
			localStorage.setItem('groups', JSON.stringify(this.groups));
			this.updateGroupList();
		}
	};

	//Изменение группы
	editGroup(oldName) {
		const group = this.groups.find(group => group.name === oldName);
		if (group) {
			const newName = prompt('Введите новое название группы:', group.name);
			const newSize = prompt('Введите новое количество студентов:', group.size);
			const newFaculty = prompt('Введите новый факультет:', group.faculty);

			const existingGroup = this.groups.find(g => g.name === newName && g.name !== oldName);
			const existingFaculty = this.groups.find(g => g.faculty === newFaculty && g.faculty !== group.faculty);

			if (existingGroup) {
				showModal(`Группа с названием "${newName}" уже существует!`);
			} else if (existingFaculty) {
				showModal(`Факультет "${newFaculty}" уже существует привязан к другой группе!`);
			} else if (newName && newSize > 0 && newFaculty) {
				group.name = newName;
				group.size = parseInt(newSize);
				group.faculty = newFaculty;
				localStorage.setItem('groups', JSON.stringify(this.groups));
				this.updateGroupList();
			}
		}
	};

	// Удаление группы
	removeGroup(name) {
		this.groups = this.groups.filter(group => group.name !== name);
		localStorage.setItem('groups', JSON.stringify(this.groups));
		this.updateGroupList();
	}

	// Получение факультета группы
	getFacultyForGroup(groupName) {
		const group = this.groups.find(group => group.name === groupName);
		return group ? group.faculty : null;
	}
}

// Класс для управления аудиториями
class Auditory {
	constructor(groupManager) {
		this.groupManager = groupManager;
		// Загружаем данные аудиторий из localStorage или создаем пустой массив
		this.auditories = JSON.parse(localStorage.getItem('auditories')) || [];
		this.updateAuditoryList();
	}

	// Инициализация данных аудиторий
	initialize() {
		const initialAuditories = [
			{ name: 'Аудитория 1', size: 15, faculty: 'Факультет математики' },
			{ name: 'Аудитория 2', size: 20, faculty: 'Факультет физики' },
			{ name: 'Аудитория 3', size: 12, faculty: 'Факультет химии' },
			{ name: 'Аудитория 4', size: 18, faculty: 'Факультет биологии' }
		];
		if (this.auditories.length === 0) {
			this.auditories = initialAuditories;
			localStorage.setItem('auditories', JSON.stringify(this.auditories));
			this.updateAuditoryList();
		}
	}

	// Обновление списка аудиторий на странице
	updateAuditoryList() {
		const auditoryListElement = document.getElementById('auditoryList');
		if (!auditoryListElement) return;
		auditoryListElement.innerHTML = '';
		this.auditories.forEach(auditory => {
			const li = document.createElement('li');
			li.textContent = `${auditory.name} (Мест: ${auditory.size}, Факультет: ${auditory.faculty})`;

			const editButton = document.createElement('button');
			editButton.textContent = 'Изменить';
			editButton.addEventListener('click', () => {
				this.editAuditory(auditory.name);
			});

			const removeButton = document.createElement('button');
			removeButton.textContent = 'Удалить';
			removeButton.addEventListener('click', () => {
				this.removeAuditory(auditory.name);
			});

			li.append(editButton);
			li.append(removeButton);
			auditoryListElement.append(li);
		});
	}


	// Добавление новой аудитории
	addAuditory(name, size, faculty) {
		const existingAuditory = this.auditories.find(auditory => auditory.name === name);
		const existingFaculty = this.auditories.find(auditory => auditory.faculty === faculty);

		if (existingAuditory) {
			showModal(`Аудитория с названием "${name}" уже существует!`);
		} else if (existingFaculty) {
			showModal(`Факультет "${faculty}" уже привязан к другой аудитории!`);
		} else if (name && size >= 10 && size <= 20 && faculty) {
			this.auditories.push({ name, size, faculty });
			localStorage.setItem('auditories', JSON.stringify(this.auditories));
			this.updateAuditoryList();
		}
	}

	// Редактирование существующей аудитории
	editAuditory(oldName) {
		const auditory = this.auditories.find(auditory => auditory.name === oldName);
		if (auditory) {
			const newName = prompt('Введите новое название аудитории:', auditory.name);
			const newSize = prompt('Введите новое количество мест:', auditory.size);
			const newFaculty = prompt('Введите новый факультет:', auditory.faculty);

			const existingAuditory = this.auditories.find(a => a.name === newName && a.name !== oldName);
			const existingFaculty = this.auditories.find(a => a.faculty === newFaculty && a.faculty !== auditory.faculty);

			if (existingAuditory) {
				showModal(`Аудитория с названием "${newName}" уже существует!`);
			} else if (existingFaculty) {
				showModal(`Факультет "${newFaculty}" уже привязан к другой аудитории!`);
			} else if (newName && newSize >= 10 && newSize <= 20 && newFaculty) {
				auditory.name = newName;
				auditory.size = parseInt(newSize);
				auditory.faculty = newFaculty;
				localStorage.setItem('auditories', JSON.stringify(this.auditories));
				this.updateAuditoryList();
			}
		}
	};

	// Удаление аудитории
	removeAuditory(name) {
		this.auditories = this.auditories.filter(auditory => auditory.name !== name);
		localStorage.setItem('auditories', JSON.stringify(this.auditories));
		this.updateAuditoryList();
	}
	
	// Получение аудиторий для группы по имени группы
	getAuditoriesForGroup(groupName) {
		const faculty = this.groupManager.getFacultyForGroup(groupName);
		if (!faculty) return [];
		return this.getAuditoriesByFaculty(faculty);
	}

	// Получение аудиторий по факультету
	getAuditoriesByFaculty(faculty) {
		return this.auditories.filter(auditory => auditory.faculty === faculty);
	}

	// Сортировка аудиторий по размеру
	sortAuditoriesBySize() {
		this.auditories.sort((a, b) => a.size - b.size);
		localStorage.setItem('auditories', JSON.stringify(this.auditories));
		this.updateAuditoryList();
	}

	// Сортировка аудиторий по имени
	sortAuditoriesByName() {
		this.auditories.sort((a, b) => a.name.localeCompare(b.name));
		localStorage.setItem('auditories', JSON.stringify(this.auditories));
		this.updateAuditoryList();
	}
};

// Создание экземпляров классов и инициализация
const facultyManager = new Faculty();
const groupManager = new Group();
const auditoryManager = new Auditory(groupManager);

facultyManager.initialize();
groupManager.initialize();
auditoryManager.initialize();

// Обработчики событий для добавления и удаления факультетов, групп и аудиторий
document.getElementById('addFaculty').addEventListener('click', () => {
	const facultyName = document.getElementById('facultyName').value;
	if (facultyName) {
		facultyManager.addFaculty(facultyName);
		document.getElementById('facultyName').value = '';
	}
});

document.getElementById('removeFaculty').addEventListener('click', () => {
	const facultyName = document.getElementById('facultyName').value;
	if (facultyName) {
		facultyManager.removeFaculty(facultyName);
		document.getElementById('facultyName').value = '';
	}
});

document.getElementById('addGroup').addEventListener('click', () => {
	const groupName = document.getElementById('groupName').value;
	const groupSize = parseInt(document.getElementById('groupSize').value);
	const groupFaculty = document.getElementById('groupFaculty').value;
	if (groupName && groupSize && groupFaculty) {
		groupManager.addGroup(groupName, groupSize, groupFaculty);
		document.getElementById('groupName').value = '';
		document.getElementById('groupSize').value = '';
		document.getElementById('groupFaculty').value = '';
	}
});

document.getElementById('removeGroup').addEventListener('click', () => {
	const groupName = document.getElementById('groupName').value;
	if (groupName) {
		groupManager.removeGroup(groupName);
		document.getElementById('groupName').value = '';
	}
});

document.getElementById('addAuditory').addEventListener('click', () => {
	const auditoryName = document.getElementById('auditoryName').value;
	const auditorySize = parseInt(document.getElementById('auditorySize').value);
	const auditoryFaculty = document.getElementById('auditoryFaculty').value;
	if (auditoryName && auditorySize && auditoryFaculty) {
		auditoryManager.addAuditory(auditoryName, auditorySize, auditoryFaculty);
		document.getElementById('auditoryName').value = '';
		document.getElementById('auditorySize').value = '';
		document.getElementById('auditoryFaculty').value = '';
	}
});

document.getElementById('removeAuditory').addEventListener('click', () => {
	const auditoryName = document.getElementById('auditoryName').value;
	if (auditoryName) {
		auditoryManager.removeAuditory(auditoryName);
		document.getElementById('auditoryName').value = '';
	}
});

document.getElementById('viewAuditoriesByFaculty').addEventListener('click', () => {
	const facultyName = document.getElementById('filterFaculty').value;
	const auditories = auditoryManager.getAuditoriesByFaculty(facultyName);
	const auditoryListElement = document.getElementById('auditoryList');
	if (auditoryListElement) {
		auditoryListElement.innerHTML = '';
		auditories.forEach(auditory => {
			const li = document.createElement('li');
			li.textContent = `${auditory.name} (Мест: ${auditory.size}, Факультет: ${auditory.faculty})`;
			auditoryListElement.append(li);
		});
	}
});

document.getElementById('viewAuditoriesForGroup').addEventListener('click', () => {
	const groupName = document.getElementById('filterGroup').value;
	const auditories = auditoryManager.getAuditoriesForGroup(groupName);
	const auditoryListElement = document.getElementById('auditoryList');
	if (auditoryListElement) {
		auditoryListElement.innerHTML = '';
		auditories.forEach(auditory => {
			const li = document.createElement('li');
			li.textContent = `${auditory.name} (Мест: ${auditory.size}, Факультет: ${auditory.faculty})`;
			auditoryListElement.append(li);
		});
	}
});

// Обработчик события для кнопки "Сбросить фильтры"
document.getElementById('resetFilters').addEventListener('click', () => {
	auditoryManager.updateAuditoryList();
	document.getElementById('filterFaculty').value = '';
	document.getElementById('filterGroup').value = '';
});

document.getElementById('sortAuditoriesBySize').addEventListener('click', () => {
	auditoryManager.sortAuditoriesBySize();
});

document.getElementById('sortAuditoriesByName').addEventListener('click', () => {
	auditoryManager.sortAuditoriesByName();
});


// Показать модальное окно с сообщением
function showModal(message) {
	const modal = document.getElementById('modal');
	const modalMessage = document.getElementById('modalMessage');
	const closeButton = document.getElementById('closeBtn');
	modalMessage.textContent = message;
	modal.style.display = "block";

	// Закрыть модальное окно
	closeButton.onclick = function () {
		modal.style.display = "none";
	}

	//Предотвращяем закрытие модального окна при клике вне его
window.onclick = function (event) {
	if (event.target !== modal && event.target !== closeButton) {
		event.preventDefault();
	}
}
};









