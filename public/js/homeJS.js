document.querySelectorAll('.optionsIcon').forEach(icon => {
    icon.addEventListener('click', function() {
        const taskId = this.getAttribute('data-task-id');
        const optionsDiv = document.getElementById('options_' + taskId);
        optionsDiv.style.display = optionsDiv.style.display === 'none' ? 'block' : 'none';
    });
});

