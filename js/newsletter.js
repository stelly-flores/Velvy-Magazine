// Configuración de EmailJS
const EMAILJS_USER_ID = 'Ql_Ue6Hs0Ry_Hy7Ot'; // Tu User ID de EmailJS
const EMAILJS_SERVICE_ID = 'service_velvy'; // Tu Service ID de EmailJS
const EMAILJS_TEMPLATE_ID = 'template_velvy'; // Tu Template ID de EmailJS

// Inicializar EmailJS
emailjs.init(EMAILJS_USER_ID);

class NewsletterSubscription {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.emailInput = this.form.querySelector('input[type="email"]');
        this.subscribeButton = this.form.querySelector('button[type="submit"]');
        this.messageContainer = null;
        
        this.initialize();
    }

    initialize() {
        // Crear contenedor para mensajes
        this.messageContainer = document.createElement('div');
        this.messageContainer.className = 'subscription-message';
        this.form.appendChild(this.messageContainer);

        // Agregar event listener al formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email = this.emailInput.value.trim();

        if (!this.validateEmail(email)) {
            this.showMessage('Por favor, ingresa un correo electrónico válido', 'error');
            return;
        }

        this.showMessage('Enviando...', 'sending');
        this.subscribeButton.disabled = true;

        try {
            // Enviar correo de confirmación usando EmailJS
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                subscriber_email: email,
                to_email: email,
                subscription_date: new Date().toLocaleDateString()
            });

            // Guardar suscriptor en localStorage (como ejemplo)
            this.saveSubscriber(email);
            
            this.showMessage('¡Gracias por suscribirte! Te hemos enviado un correo de confirmación.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Error al procesar la suscripción:', error);
            this.showMessage('Hubo un error al procesar tu suscripción. Por favor, intenta nuevamente.', 'error');
        } finally {
            this.subscribeButton.disabled = false;
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        this.messageContainer.textContent = message;
        this.messageContainer.className = `subscription-message ${type}`;
        
        // Remover mensaje después de 5 segundos si es éxito o error
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                this.messageContainer.classList.add('fade-out');
                setTimeout(() => {
                    this.messageContainer.textContent = '';
                    this.messageContainer.className = 'subscription-message';
                }, 500);
            }, 5000);
        }
    }

    saveSubscriber(email) {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        }
    }
}

// Inicializar la funcionalidad del newsletter cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new NewsletterSubscription();
});