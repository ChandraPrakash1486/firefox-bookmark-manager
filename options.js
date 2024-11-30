document.getElementById('darkMode').addEventListener('change', function() {
    const isDarkMode = this.checked;
    chrome.storage.sync.set({ darkMode: isDarkMode }, function() {
        document.body.classList.toggle('dark-mode', isDarkMode);
    });
});

chrome.storage.sync.get('darkMode', function(data) {
    const isDarkMode = data.darkMode || false;
    document.getElementById('darkMode').checked = isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
});
