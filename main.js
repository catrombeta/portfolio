import './src/script/3DScene'

const imgCards = [
    '/img/cards/card-1.jpg',
    '/img/cards/card-2.jpg',
    '/img/cards/card-3.jpg',
    '/img/cards/card-4.jpg',
    '/img/cards/card-5.jpg',
    '/img/cards/card-6.jpg'
];

const descriptionCards = [
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
    'Card 6'    
]

const linksCards = [
    'https://www.google.com',
    'https://www.google.com',
    'https://www.google.com',
    'https://www.google.com',
    'https://www.google.com',
    'https://www.google.com'
]

for (let i = 0; i < imgCards.length; i++) {
    const card = document.createElement('div');
    const description = document.createElement('h4');
    const link = document.createElement('a');

    card.classList.add(`project-${i + 1}`);
    card.classList.add(`grow-on-hover`);
    card.style.backgroundImage = `url(${imgCards[i]})`;
    card.style.backgroundSize = 'cover';
    document.querySelector('.content-projects').appendChild(card);

    description.classList.add(`description-card`);
    description.innerHTML = descriptionCards[i];
    document.querySelector(`.project-${i + 1}`).appendChild(description);

    link.classList.add(`link-card`);
    link.setAttribute('href', linksCards[i]);
    link.innerHTML = 'View';
    document.querySelector(`.project-${i + 1}`).appendChild(link);
}

