const openBookmarksButton = document.getElementById('openBookmarks');
const bookmarkOptions = document.getElementById('bookmarkOptions');
const openToolbarButton = document.getElementById('openToolbar');
const openMenuButton = document.getElementById('openMenu');
const removeBookmarksButton = document.getElementById('removeBookmarks');
const openAfterTimeInput = document.getElementById('openAfterTime');

// Toggle bookmark options visibility
openBookmarksButton.addEventListener('click', () => {
  bookmarkOptions.style.display =
    bookmarkOptions.style.display === 'none' ? 'block' : 'none';
});

// Open bookmarks from toolbar
openToolbarButton.addEventListener('click', () => {
  const time = parseInt(openAfterTimeInput.value) || 0;
  console.log(`Sending message to open toolbar bookmarks after ${time} minutes`);
  chrome.runtime.sendMessage({
    action: 'openBookmarks',
    category: 'toolbar',
    time: time,
  });
});

// Open bookmarks from menu
openMenuButton.addEventListener('click', () => {
  const time = parseInt(openAfterTimeInput.value) || 0;
  console.log(`Sending message to open menu bookmarks after ${time} minutes`);
  chrome.runtime.sendMessage({
    action: 'openBookmarks',
    category: 'menu',
    time: time,
  });
});

// Remove bookmarks
removeBookmarksButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'removeBookmarks' });
});
