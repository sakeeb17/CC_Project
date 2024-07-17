let oldValue = null; 

// Retrieves the current value for a key (replace with your backend interaction)
async function getCurrentValueForKey(key) {
    const response = await fetch('http://localhost:5000/get?key=' + key);
    if (response.ok) {
        const data = await response.json();
        return data.value;
    } else {
        throw new Error('Could not fetch the current value');
    }
}

// Sends an update request to the backend and displays messages 
async function performUpdate() {
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;

    try {
        oldValue = await getCurrentValueForKey(key); 

        const response = await fetch('http://localhost:5000/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value, oldValue }) 
        });

        if (response.ok) {
            const data = await response.json(); 
            animateMessage('.disp', 'success', data.message); 
        } else {
            const data = await response.json(); 
            animateMessage('.disp', 'error', data.error);
        }

    } catch(error) {
        animateMessage('.disp', 'error', 'Error: ' + error.message);
    }
}

async function performAdd() {
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;

    try {
        const response = await fetch('http://localhost:5000/put', { // Update for 'add' route
            method: 'POST', // Likely a POST request for adding 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value }) 
        });

        if (response.ok) {
            const data = await response.json(); 
            animateMessage('.disp', 'success', data.message); 
        } else {
            const data = await response.json(); 
            animateMessage('.disp', 'error', data.error);
        }

    } catch(error) {
        animateMessage('.disp', 'error', 'Error: ' + error.message);
    }
}


async function performGetAll() {
    try {
        const response = await fetch('http://localhost:5000/getall');
        if (response.ok) {
            const data = await response.json(); 
            displayKeyList(data); 
        } else {
            const data = await response.json(); 
            animateMessage('.disp', 'error', data.error || 'Error fetching keys');
        }    
    } catch(error) {
        animateMessage('.disp', 'error', 'Error: ' + error.message);
    }
}

async function performGet() {
    const key = document.getElementById('key').value;

    try {
        const response = await fetch('http://localhost:5000/get?key=' + key);
        if (response.ok) {
            const data = await response.json(); 
            animateMessage('.disp', 'success', `${key} : ${data.value}`); 
        } else {
            const data = await response.json(); 
            animateMessage('.disp', 'error', data.error || 'Key not found');
        }    
    } catch(error) {
        animateMessage('.disp', 'error', 'Error: ' + error.message);
    }
}

async function performDelete() {
    const key = document.getElementById('key').value;

    try {
        const response = await fetch(`http://localhost:5000/delete?key=${key}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            animateMessage('.disp', 'success', 'Key deleted successfully');
        } else {
            const data = await response.json();
            animateMessage('.disp', 'error', data.error || 'Key not found'); 
        }
    } catch (error) {
        animateMessage('.disp', 'error', 'Error: ' + error.message);
    }
}


function displayKeyList(keyList) {
    const listContainer = document.querySelector('.disp');
    listContainer.innerHTML = ''; // Clear previous contents

    if (keyList.length === 0) {
        animateMessage(listContainer, 'info', 'No keys found'); // A more tailored message
        return; 
    }

    const listItems = keyList.map(item => `<div class="list-item">${item.key} : ${item.value}</div>`);

    // Add each item to the container with animation
    listItems.forEach(itemHtml => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = itemHtml;
        listContainer.appendChild(itemElement);

        anime({
            targets: itemElement,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(50) // Slight delay between items
        });
    });
}


function animateMessage(messageSelector, type, message) {
    const messageContainer = document.querySelector(messageSelector + ' .message-area');
    messageContainer.innerText = message; 
    messageContainer.classList.add(type); 

    anime({
        targets: messageContainer,
        duration: 500,
        easing: 'easeOutExpo',
        opacity: [0, 1], 
        translateY: (type === 'error') ? [50, 0] : [-50, 0] 
    });
}


function animateCards() {
    const cards = document.querySelectorAll('.card');

    anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100) // Delay between card animations
    });
}
const title = document.querySelector('.title');


// Button Animation
function animateButtons() {
    anime({
        targets: '.options .button', 
        opacity: [0, 1], 
        scale: [0.9, 1],  
        delay: anime.stagger(100), // Slight delay between buttons
        easing: 'easeOutExpo'
    });
}

window.onload = animateButtons; 

window.onload = function() {
    // Target the 'body' element for the animation
    anime({
        targets: 'body',
        backgroundPositionX: '-20px', // Shift the background 20px to the left
        duration: 5000, // Animation lasts for 5 seconds
        easing: 'linear',
        loop: true // Repeat the animation infinitely
    });
}; 