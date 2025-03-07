document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Sample featured articles data
    const featuredArticles = [
        {
            title: 'The Future of Sustainable Fashion',
            excerpt: 'Exploring eco-friendly trends and innovations in the fashion industry',
            image: 'assets/images/article1.jpg'
        },
        {
            title: 'Art in the Digital Age',
            excerpt: 'How technology is transforming the art world',
            image: 'assets/images/article2.jpg'
        },
        {
            title: 'Cultural Renaissance',
            excerpt: 'A deep dive into the modern cultural movement',
            image: 'assets/images/article3.jpg'
        }
    ];

    // Sample volumes data
    const volumes = [
        {
            title: 'Volume 1: Spring 2024',
            cover: 'assets/images/volume1.jpg'
        },
        {
            title: 'Volume 2: Summer 2024',
            cover: 'assets/images/volume2.jpg'
        },
        {
            title: 'Volume 3: Fall 2024',
            cover: 'assets/images/volume3.jpg'
        }
    ];

    // Load featured articles
    const articlesGrid = document.querySelector('.articles-grid');
    featuredArticles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.className = 'article-card';
        articleElement.innerHTML = `
            <div class="article-image" style="background-image: url('${article.image}');"></div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
        articlesGrid.appendChild(articleElement);
    });

    // Load volumes
    const volumesGrid = document.querySelector('.volumes-grid');
    volumes.forEach(volume => {
        const volumeElement = document.createElement('div');
        volumeElement.className = 'volume-card';
        volumeElement.innerHTML = `
            <div class="volume-cover" style="background-image: url('${volume.cover}');"></div>
            <h3>${volume.title}</h3>
        `;
        volumesGrid.appendChild(volumeElement);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Newsletter subscription form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showSubscriptionMessage('Por favor, ingresa tu correo electrónico.', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showSubscriptionMessage('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Aquí normalmente enviarías el correo a tu backend o servicio de email marketing
            // Simulamos el envío con un timeout para mostrar un estado de "enviando"
            showSubscriptionMessage('Enviando...', 'sending');
            
            setTimeout(() => {
                // Almacenar el email en localStorage como ejemplo
                // En un caso real, enviarías esto a un servidor
                saveSubscriber(email);
                
                // Mostrar mensaje de éxito
                showSubscriptionMessage('¡Gracias por suscribirte! Te notificaremos cuando salga un nuevo volumen.', 'success');
                emailInput.value = '';
            }, 1500);
        });
    }
    
    // Función para mostrar mensajes de estado de la suscripción
    function showSubscriptionMessage(message, type) {
        // Buscar si ya existe un mensaje y eliminarlo
        const existingMessage = document.querySelector('.subscription-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear el elemento de mensaje
        const messageElement = document.createElement('div');
        messageElement.className = `subscription-message ${type}`;
        messageElement.textContent = message;
        
        // Insertar después del formulario
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.insertAdjacentElement('afterend', messageElement);
        
        // Si es un mensaje de éxito o error, configurar para que desaparezca después de un tiempo
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                messageElement.classList.add('fade-out');
                setTimeout(() => messageElement.remove(), 500);
            }, 5000);
        }
    }
    
    // Función para guardar suscriptores
    function saveSubscriber(email) {
        // Obtener suscriptores existentes o inicializar array vacío
        let subscribers = JSON.parse(localStorage.getItem('velvy_subscribers') || '[]');
        
        // Verificar si el email ya está registrado
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('velvy_subscribers', JSON.stringify(subscribers));
            console.log('Nuevo suscriptor guardado:', email);
        } else {
            console.log('El email ya está suscrito:', email);
        }
    }
});