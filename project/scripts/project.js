document.documentElement.classList.add('js');

const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    currentYearElement.textContent = `${new Date().getFullYear()}`;
}

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('primary-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', `${isOpen}`);
        hamburger.textContent = isOpen ? '✕' : '☰';
    });
}

function getMembers() {
    try {
        const raw = localStorage.getItem('members');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function setMembers(members) {
    localStorage.setItem('members', JSON.stringify(members));
}

function updateWelcomeMessage() {
    const welcomeDiv = document.getElementById('welcome-message');
    if (!welcomeDiv) return;

    const members = getMembers();
    if (members.length > 0) {
        welcomeDiv.innerHTML = `<p>Welcome back! Total members: ${members.length}</p>`;
        return;
    }

    welcomeDiv.innerHTML = `<p>New here? Join the community for local tips and seed swaps.</p>`;
}

updateWelcomeMessage();

const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', () => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const interestSelect = document.getElementById('interest');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const interest = interestSelect ? interestSelect.value : '';

        const member = { name, email, interest, date: new Date().toISOString() };
        const members = getMembers();
        setMembers([...members, member]);
    });
}

const thankYouMessage = document.getElementById('thankyou-message');
if (thankYouMessage) {
    const params = new URLSearchParams(window.location.search);
    const name = (params.get('name') || '').trim();
    const members = getMembers();
    const safeName = name ? name : 'gardening friend';

    thankYouMessage.innerHTML = `
		<p>Thanks for joining, ${safeName}.</p>
		<p>You are member number ${members.length}.</p>
	`;
}

const filterSelect = document.getElementById('season-filter');
const resourcesGrid = document.querySelector('.resources-grid');

if (filterSelect && resourcesGrid) {
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
            description: 'Aromatic herb that pairs perfectly with tomatoes. Easy to grow in pots.',
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
            description: 'Fragrant perennial that loves sun and well-drained soil. Bee-friendly!',
            image: 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ];

    function displayPlants(plantList) {
        resourcesGrid.innerHTML = plantList
            .map(
                (plant) => `
					<div class="card">
						<img src="${plant.image}" alt="${plant.name}" loading="lazy" width="400" height="180">
						<div class="card-content">
							<h3>${plant.name}</h3>
							<p><strong>Type:</strong> ${plant.type} | <strong>Season:</strong> ${plant.season}</p>
							<p>${plant.description}</p>
						</div>
					</div>
				`
            )
            .join('');
    }

    filterSelect.addEventListener('change', (e) => {
        const season = e.target.value;
        const list = season === 'all' ? plants : plants.filter((plant) => plant.season.includes(season));
        displayPlants(list);
    });

    displayPlants(plants);
}
