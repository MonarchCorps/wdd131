document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
}

const plants = [
    {
        id: 'tomato',
        name: 'Heirloom Tomato',
        type: 'Vegetable',
        season: 'Summer',
        description: 'Rich, flavorful tomatoes perfect for salads and sauces. Requires full sun.',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 'basil',
        name: 'Sweet Basil',
        type: 'Herb',
        season: 'Summer',
        description: 'Aromatic herb that pairs perfectly with tomatoes. easy to grow in pots.',
        image: 'https://images.pexels.com/photos/1087902/pexels-photo-1087902.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 'carrot',
        name: 'Crunchy Carrots',
        type: 'Vegetable',
        season: 'Spring/Fall',
        description: 'Root vegetable that loves loose, sandy soil. Great for cool weather.',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 'sunflower',
        name: 'Giant Sunflower',
        type: 'Flower',
        season: 'Summer',
        description: 'Tall, bright flowers that attract pollinators and produce edible seeds.',
        image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 'lettuce',
        name: 'Crisp Lettuce',
        type: 'Vegetable',
        season: 'Spring',
        description: 'Fast-growing leafy green. Harvest leaves continuously for fresh salads.',
        image: 'https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 'lavender',
        name: 'English Lavender',
        type: 'Herb',
        season: 'Summer',
        description: 'Fragrant perennial that loves sun and well-drained soil. Bee friendly!',
        image: 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
];

const resourcesGrid = document.querySelector('.resources-grid');

function displayPlants(plantList) {
    if (!resourcesGrid) return;
    
    resourcesGrid.innerHTML = '';
    
    const plantCards = plantList.map(plant => `
        <div class="card">
            <img src="${plant.image}" alt="${plant.name}" loading="lazy" width="400" height="250">
            <div class="card-content">
                <h3>${plant.name}</h3>
                <p><strong>Type:</strong> ${plant.type} | <strong>Season:</strong> ${plant.season}</p>
                <p>${plant.description}</p>
            </div>
        </div>
    `).join('');
    
    resourcesGrid.innerHTML = plantCards;
}

const filterSelect = document.getElementById('season-filter');
if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
        const season = e.target.value;
        if (season === 'all') {
            displayPlants(plants);
        } else {
            const filtered = plants.filter(plant => plant.season.includes(season));
            displayPlants(filtered);
        }
    });
    
    displayPlants(plants);
}

const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const interest = document.getElementById('interest').value;
        
        const member = { name, email, interest, date: new Date().toISOString() };
        
        let members = JSON.parse(localStorage.getItem('members')) || [];
        members.push(member);
        localStorage.setItem('members', JSON.stringify(members));
        
        alert(`Thanks for joining, ${name}! We have saved your info.`);
        joinForm.reset();
        
        updateWelcomeMessage();
    });
}

function updateWelcomeMessage() {
    const welcomeDiv = document.getElementById('welcome-message');
    if (welcomeDiv) {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        if (members.length > 0) {
            const lastMember = members[members.length - 1];
            welcomeDiv.innerHTML = `<p>Welcome back, gardening friend! Total members: ${members.length}</p>`;
        } else {
            welcomeDiv.innerHTML = `<p>Join our community today!</p>`;
        }
    }
}

updateWelcomeMessage();
