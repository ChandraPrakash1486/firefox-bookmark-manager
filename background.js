chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'openBookmarks') {
    const time = message.time || 0;
    console.log(`Received message to open ${message.category} bookmarks after ${time} minutes`);
    if (time === 0) {
      openBookmarks(message.category);
    } else {
      setTimeout(() => {
        console.log(`Opening ${message.category} bookmarks now`);
        openBookmarks(message.category);
      }, time * 60000);
    }
  } else if (message.action === 'removeBookmarks') {
    removeAllBookmarks();
  }
});

// Open bookmarks based on category
function openBookmarks(category) {
  chrome.bookmarks.getTree((nodes) => {
    nodes.forEach((node) => {
      traverseBookmarks(node, category, (bookmark) => {
        if (bookmark.url) chrome.tabs.create({ url: bookmark.url });
      });
    });
  });
}

// Traverse bookmarks
function traverseBookmarks(node, category, callback) {
  if (node.children) {
    node.children.forEach((child) => traverseBookmarks(child, category, callback));
  } else if (node.parentId) {
    chrome.bookmarks.get(node.parentId, (parentNode) => {
      if (
        (category === 'toolbar' && parentNode[0].title === 'Bookmarks Toolbar') ||
        (category === 'menu' && parentNode[0].title === 'Bookmarks Menu')
      ) {
        callback(node);
      }
    });
  }
}

// Remove all bookmarks
function removeAllBookmarks() {
  chrome.bookmarks.getTree((nodes) => {
    nodes.forEach((node) => {
      deleteBookmarks(node);
    });
  });
}

function deleteBookmarks(node) {
  if (node.children) {
    node.children.forEach(deleteBookmarks);
  } else {
    chrome.bookmarks.remove(node.id, () => {
      console.log(`Deleted: ${node.title}`);
    });
  }
}
