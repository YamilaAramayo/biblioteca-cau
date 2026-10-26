// Base de datos de prueba para el Catálogo en Línea (con categorías del documento)
const booksDatabase = [
    { id: 1, title: "Martín Fierro", author: "José Hernández", category: "literatura", status: "disponible" },
    { id: 2, title: "Historia del Valle de Punilla", author: "Investigadores Locales", category: "historia", status: "disponible" },
    { id: 3, title: "Cuentos de la Selva", author: "Horacio Quiroga", category: "infantil", status: "prestado" },
    { id: 4, title: "Sociología de las Bibliotecas Populares", author: "Ana Gómez", category: "sociales", status: "disponible" },
    { id: 5, title: "Ficciones", author: "Jorge Luis Borges", category: "literatura", status: "disponible" },
    { id: 6, title: "Cosquín: Raíces y Tradición", author: "Comisión Histórica", category: "historia", status: "prestado" },
    { id: 7, title: "Leyendas Argentinas para Niños", author: "Varios Autores", category: "infantil", status: "disponible" },
    { id: 8, title: "Educación y Comunidad", author: "Carlos Freire", category: "sociales", status: "disponible" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Menú hamburguesa responsive
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    // Renderizar catálogo de libros
    const booksGrid = document.getElementById("booksGrid");
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function renderBooks(booksToRender) {
        if (!booksGrid) return;
        booksGrid.innerHTML = "";

        if (booksToRender.length === 0) {
            booksGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No se encontraron libros con esos criterios.</p>`;
            return;
        }

        booksToRender.forEach(book => {
            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <div class="book-info">
                    <span class="book-category">${book.category.toUpperCase()}</span>
                    <h4 class="book-title">${book.title}</h4>
                    <p class="book-author">Autor: ${book.author}</p>
                    <span class="book-status status-${book.status}">
                        ${book.status === 'disponible' ? 'Disponible' : 'Prestado'}
                    </span>
                </div>
            `;
            booksGrid.appendChild(card);
        });
    }

    // Inicializar catálogo completo
    renderBooks(booksDatabase);

    // Filtrar por barra de búsqueda
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = booksDatabase.filter(book => 
                book.title.toLowerCase().includes(term) || 
                book.author.toLowerCase().includes(term)
            );
            renderBooks(filtered);
        });
    }

    // Filtrar por categoría (botones)
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            if (filter === "todos") {
                renderBooks(booksDatabase);
            } else {
                const filtered = booksDatabase.filter(book => book.category === filter);
                renderBooks(filtered);
            }
        });
    });

    // Funcionalidad de Acordeón para FAQ
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            item.classList.toggle("active");
        });
    });

    // Simulación formulario suscripción
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Gracias por suscribirte al boletín digital de la biblioteca!");
            newsletterForm.reset();
        });
    }
});
