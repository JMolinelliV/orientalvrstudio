// Scroll suave al contacto
function scrollToContact() {
    scrollToSection('contacto');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Manejo del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContacto');
    const formNote = document.getElementById('formNote');
    const diferencialVideo = document.querySelector('.diferencial-video');
    const navLinks = document.querySelectorAll('[data-scroll="center"]');
    const statusModal = document.getElementById('statusModal');
    const closeStatusModalBtn = document.getElementById('closeStatusModal');

    const openStatusModal = () => {
        if (statusModal) {
            statusModal.hidden = false;
            document.body.style.overflow = 'hidden';
        }
    };

    const closeStatusModal = () => {
        if (statusModal) {
            statusModal.hidden = true;
            document.body.style.overflow = '';
        }
    };

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(form);

            try {
                // Enviando a través de FormSubmit.co (sin necesidad de registro)
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    formNote.textContent = '✓ Gracias por tu interés.';
                    formNote.className = 'form-note success';
                    form.reset();
                    openStatusModal();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                console.error('Error:', error);
                formNote.textContent = '✗ Hubo un error. Intenta de nuevo o contacta directamente.';
                formNote.className = 'form-note error';
            }
        });
    }

    if (statusModal) {
        statusModal.addEventListener('click', (event) => {
            const target = event.target;
            if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
                closeStatusModal();
            }
        });
    }

    if (closeStatusModalBtn) {
        closeStatusModalBtn.addEventListener('click', closeStatusModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeStatusModal();
        }
    });

    if (diferencialVideo) {
        diferencialVideo.muted = true;
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const playPromise = diferencialVideo.play();
                    if (playPromise) {
                        playPromise.catch(() => {});
                    }
                } else {
                    diferencialVideo.pause();
                }
            });
        }, { threshold: 0.4 });

        videoObserver.observe(diferencialVideo);
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href')?.replace('#', '');
            if (targetId) {
                event.preventDefault();
                scrollToSection(targetId);
            }
        });
    });
});

// Animar elementos al scroll (opcional)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tech-card, .servicio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
