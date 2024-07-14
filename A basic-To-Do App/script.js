// script.js
document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-btn');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const imageInput = document.getElementById('image');
    const pendingTasksList = document.getElementById('pending-tasks-list');
    const completedTasksList = document.getElementById('completed-tasks-list');

    saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const imageFile = imageInput.files[0];
        const currentTime = new Date().toLocaleString();

        if (title === '' || description === '') {
            alert('Please fill out both fields.');
            return;
        }

        let imageUrl = '';
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl = e.target.result;
                const task = {
                    title: title,
                    description: description,
                    addedTime: currentTime,
                    completed: false,
                    imageUrl: imageUrl,
                    id: Date.now()
                };
                addTaskToList(task, pendingTasksList);
            };
            reader.readAsDataURL(imageFile);
        } else {
            const task = {
                title: title,
                description: description,
                addedTime: currentTime,
                completed: false,
                imageUrl: imageUrl,
                id: Date.now()
            };
            addTaskToList(task, pendingTasksList);
        }

        titleInput.value = '';
        descriptionInput.value = '';
        imageInput.value = '';
    });

    function addTaskToList(task, list) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <small>Added on: ${task.addedTime}</small>
                ${task.completed ? `<small>Completed on: ${task.completedTime}</small>` : ''}
            </div>
            ${task.imageUrl ? `<img src="${task.imageUrl}" alt="Task Image">` : ''}
            <div>
                <button class="complete-btn"><i class="fas fa-check"></i></button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        const completeBtn = li.querySelector('.complete-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            task.completedTime = new Date().toLocaleString();
            li.classList.toggle('completed');
            if (task.completed) {
                completedTasksList.appendChild(li);
                completeBtn.innerHTML = '<i class="fas fa-undo"></i>';
                li.querySelector('div').innerHTML += `<small>Completed on: ${task.completedTime}</small>`;
            } else {
                pendingTasksList.appendChild(li);
                completeBtn.innerHTML = '<i class="fas fa-check"></i>';
                li.querySelector('small:last-of-type').remove();
            }
        });

        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        list.appendChild(li);
    }
});
