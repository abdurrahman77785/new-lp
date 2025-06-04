document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sample car data
    const cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Avanza Veloz',
            year: 2022,
            price: '250.000.000',
            type: 'MPV',
            transmission: 'Automatic',
            fuel: 'Petrol',
            mileage: '5.000 km',
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'CR-V Turbo',
            year: 2021,
            price: '550.000.000',
            type: 'SUV',
            transmission: 'Automatic',
            fuel: 'Petrol',
            mileage: '10.000 km',
            image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 3,
            brand: 'Suzuki',
            model: 'Ertiga Hybrid',
            year: 2023,
            price: '280.000.000',
            type: 'MPV',
            transmission: 'Automatic',
            fuel: 'Hybrid',
            mileage: '2.000 km',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 4,
            brand: 'Toyota',
            model: 'Raize',
            year: 2022,
            price: '230.000.000',
            type: 'SUV',
            transmission: 'Automatic',
            fuel: 'Petrol',
            mileage: '8.000 km',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 5,
            brand: 'Mitsubishi',
            model: 'Xpander',
            year: 2021,
            price: '270.000.000',
            type: 'MPV',
            transmission: 'Manual',
            fuel: 'Petrol',
            mileage: '15.000 km',
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 6,
            brand: 'Honda',
            model: 'Civic Turbo',
            year: 2023,
            price: '520.000.000',
            type: 'Sedan',
            transmission: 'Automatic',
            fuel: 'Petrol',
            mileage: '1.000 km',
            image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ];

    // Display all cars initially
    displayCars(cars);

    // Search form functionality
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const brand = document.getElementById('brand').value.toLowerCase();
        const type = document.getElementById('type').value.toLowerCase();
        const price = document.getElementById('price').value;
        
        let filteredCars = cars;
        
        if (brand) {
            filteredCars = filteredCars.filter(car => car.brand.toLowerCase().includes(brand));
        }
        
        if (type) {
            filteredCars = filteredCars.filter(car => car.type.toLowerCase() === type);
        }
        
        if (price) {
            switch(price) {
                case '1':
                    filteredCars = filteredCars.filter(car => parseFloat(car.price.replace(/\./g, '')) < 200000000);
                    break;
                case '2':
                    filteredCars = filteredCars.filter(car => {
                        const carPrice = parseFloat(car.price.replace(/\./g, ''));
                        return carPrice >= 200000000 && carPrice <= 400000000;
                    });
                    break;
                case '3':
                    filteredCars = filteredCars.filter(car => {
                        const carPrice = parseFloat(car.price.replace(/\./g, ''));
                        return carPrice >= 400000000 && carPrice <= 600000000;
                    });
                    break;
                case '4':
                    filteredCars = filteredCars.filter(car => parseFloat(car.price.replace(/\./g, '')) > 600000000);
                    break;
            }
        }
        
        displayCars(filteredCars);
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, phone, message });
        
        alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
        contactForm.reset();
    });

    // Function to display cars
    function displayCars(carsToDisplay) {
        const carsContainer = document.getElementById('carsContainer');
        carsContainer.innerHTML = '';
        
        if (carsToDisplay.length === 0) {
            carsContainer.innerHTML = '<p class="no-results">Tidak ada mobil yang sesuai dengan kriteria pencarian Anda.</p>';
            return;
        }
        
        carsToDisplay.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            
            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.brand} ${car.model}">
                </div>
                <div class="car-info">
                    <h3>${car.brand} ${car.model}</h3>
                    <p>Tahun: ${car.year} | ${car.transmission} | ${car.fuel}</p>
                    <div class="car-price">Rp ${car.price}</div>
                    <div class="car-features">
                        <span><i class="fas fa-tachometer-alt"></i> ${car.mileage}</span>
                        <span><i class="fas fa-car"></i> ${car.type}</span>
                    </div>
                    <button class="btn" onclick="showCarDetail(${car.id})">Detail</button>
                </div>
            `;
            
            carsContainer.appendChild(carCard);
        });
    }
});

// Function to show car details (would be expanded in a real application)
function showCarDetail(carId) {
    alert(`Detail mobil dengan ID ${carId} akan ditampilkan di sini.`);
    // In a real application, this would show a modal or redirect to a detail page
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});