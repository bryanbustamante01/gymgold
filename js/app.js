document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hamburguesa y Navegación Móvil ---
    const hamburguesa = document.querySelector('.hamburguesa');
    const navegacion = document.querySelector('.navegacion');
    const body = document.body; // Referencia al body para no-scroll

    hamburguesa.addEventListener('click', () => {
        navegacion.classList.toggle('is-open'); // Usa 'is-open'
        hamburguesa.classList.toggle('is-active'); // Usa 'is-active'
        body.classList.toggle('no-scroll'); // Activa/desactiva el no-scroll en el body
    });

    // Cierra la navegación cuando se hace clic en un enlace (solo en móvil)
    navegacion.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Asegura que solo se cierre en vista móvil
                navegacion.classList.remove('is-open');
                hamburguesa.classList.remove('is-active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // --- 2. Slider de Encabezado ---
    const slides = document.querySelectorAll('.slider-encabezado .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Cambia de slide cada 5 segundos (puedes ajustar el tiempo)
    setInterval(nextSlide, 5000);

    // Inicializa el primer slide
    showSlide(currentSlide);

    // --- 3. Modal de Imágenes de Categorias ---
    const Categorias = document.querySelectorAll('.icono-categoria');
    const modalImagen = document.getElementById('modal-imagen');
    const modalContenidoImg = modalImagen.querySelector('.modal-contenido img');
    const cerrarModalBtn = modalImagen.querySelector('.cerrar-modal');

    Categorias.forEach(categoria => {
        categoria.addEventListener('click', () => {
            const imgSrc = categoria.getAttribute('src');
            modalContenidoImg.setAttribute('src', imgSrc);
            modalImagen.classList.add('visible'); // Usa 'visible'
            body.classList.add('no-scroll'); // Evita el scroll del body
        });
    });

    cerrarModalBtn.addEventListener('click', () => {
        modalImagen.classList.remove('visible'); // Usa 'visible'
        body.classList.remove('no-scroll'); // Habilita el scroll del body
    });

    // Cierra el modal si se hace clic fuera de la imagen
    modalImagen.addEventListener('click', (e) => {
        if (e.target === modalImagen) {
            modalImagen.classList.remove('visible'); // Usa 'visible'
            body.classList.remove('no-scroll');
        }
    });

    // --- 4. Resaltar Enlaces de Navegación al Hacer Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navegacion a');
    // Obtenemos la altura de la navegación para un cálculo más preciso
    const headerOffset = document.querySelector('.contenido-navegacion').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';

        // Si el scroll está casi al inicio de la página, activa solo el enlace "Inicio"
        // He ajustado el umbral a 100px para que funcione bien incluso con un scroll mínimo
        if (window.scrollY < 100) {
            current = 'inicio';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Ajustamos el offset para que la sección se active correctamente
                // al pasar por la parte superior de la navegación fija
                if (window.scrollY >= sectionTop - headerOffset - 50) { // Un ajuste de 50px extra puede ayudar con el "timing"
                    current = section.getAttribute('id');
                }
            });
        }

        // Siempre remueve la clase 'activo' de todos los enlaces primero
        navLinks.forEach(link => {
            link.classList.remove('activo');
        });

        // Luego, añade la clase 'activo' al enlace correcto basado en la sección actual
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('activo');
            }
        });
    });
});

// --- Manejo del redimensionamiento de ventana (para evitar transiciones) ---
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 400); // 400ms es un buen tiempo para que termine el redimensionamiento
});