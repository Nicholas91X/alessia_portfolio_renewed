document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio page loaded successfully!");
});

// Seleziona i tab e gli elementi della galleria
const tabs = document.querySelectorAll(".tab");
const workItems = document.querySelectorAll(".work-item");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Rimuove la classe 'active' da tutti i tab
        tabs.forEach((t) => t.classList.remove("active"));
        // Aggiunge la classe 'active' al tab selezionato
        tab.classList.add("active");

        // Filtra gli elementi della galleria
        const filter = tab.dataset.filter;
        workItems.forEach((item) => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "block"; // Mostra l'elemento
            } else {
                item.style.display = "none"; // Nasconde l'elemento
            }
        });
    });
});

// Mostra tutti gli elementi all'avvio
document.querySelector('.tab[data-filter="all"]').click();

document.addEventListener("scroll", () => {
    const parallaxImage = document.querySelector(".parallax-image");
    const offset = window.scrollY * 0.5;
    parallaxImage.style.backgroundPositionY = `${offset}px`;
});

document.addEventListener("DOMContentLoaded", () => {
    const blogCards = document.querySelectorAll(".blog-card");
    const itemsPerPage = 3;
    let currentPage = 0;

    const showPage = (page) => {
        blogCards.forEach((card, index) => {
            card.style.display =
                index >= page * itemsPerPage && index < (page + 1) * itemsPerPage
                    ? "block"
                    : "none";
        });
    };

    document.querySelector(".pagination-btn:nth-child(1)").addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.querySelector(".pagination-btn:nth-child(2)").addEventListener("click", () => {
        if ((currentPage + 1) * itemsPerPage < blogCards.length) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage); // Show the first page
});

document.querySelector(".contact-form form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenire il comportamento predefinito
    alert("Your message has been sent successfully!");
});

// Seleziona gli elementi
const hamburger = document.getElementById("hamburger"); // Hamburger per aprire il menu
const hamburgerClose = document.getElementById("hamburger-close"); // "X" per chiudere il menu
const menuOverlay = document.getElementById("menu-overlay"); // Overlay del menu

// Funzione per aprire il menu (clic sull'hamburger)
hamburger.addEventListener("click", () => {
    menuOverlay.classList.add("open"); // Aggiunge la classe per mostrare l'overlay
});

// Funzione per chiudere il menu (clic sulla "X")
hamburgerClose.addEventListener("click", () => {
    menuOverlay.classList.remove("open"); // Rimuove la classe per nascondere l'overlay
});

// Facoltativo: Chiudi il menu se l'utente clicca su un elemento del menu
document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", () => {
        menuOverlay.classList.remove("open"); // Rimuove l'overlay
    });
});

// Funzione per lo scroll fluido
document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault(); // Previene il comportamento predefinito del link

        const targetId = item.getAttribute("href").substring(1); // Ottiene l'ID della sezione (senza il '#')
        const targetSection = document.getElementById(targetId); // Seleziona la sezione corrispondente

        if (targetSection) {
            // Scrolla verso la sezione in modo fluido
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Chiudi il menu dopo aver cliccato su un item
            document.getElementById("menu-overlay").classList.remove("open");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Funzione per inizializzare il canvas con effetto onda
    function initializeRippleCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");

        // Configura le dimensioni del canvas
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas(); // Imposta le dimensioni iniziali
        window.addEventListener("resize", resizeCanvas); // Aggiorna al ridimensionamento

        // Variabili per gestire le onde
        const ripples = [];
        const damping = 0.96; // Riduzione dell'effetto
        const rippleSpeed = 2; // Velocità di propagazione

        // Funzione per aggiungere un'onda
        function createRipple(x, y) {
            ripples.push({
                x,
                y,
                radius: 0,
                opacity: 1,
            });
        }

        // Funzione per aggiornare e disegnare le onde
        function drawRipples() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ripples.forEach((ripple, index) => {
                // Disegna l'onda
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Aggiorna le proprietà dell'onda
                ripple.radius += rippleSpeed;
                ripple.opacity *= damping;

                // Rimuove l'onda se troppo trasparente
                if (ripple.opacity < 0.01) {
                    ripples.splice(index, 1);
                }
            });

            requestAnimationFrame(drawRipples);
        }

        // Avvia l'animazione delle onde
        drawRipples();

        // Aggiungi un'onda al movimento del mouse
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createRipple(x, y);
        });
    }

    // Inizializza entrambi i canvas
    initializeRippleCanvas("ripple-canvas");
    initializeRippleCanvas("ripple-canvas-right");
});

// Seleziona la sezione di sinistra
const leftSection = document.querySelector('.left-section');

// Variabili per il controllo del ridimensionamento
let shrinkingInterval; // Per il loop continuo
const minScale = 0.6; // Soglia minima di rimpicciolimento
const scaleStep = 0.01; // Passo di riduzione per ogni intervallo
let currentScale = 1; // Scala iniziale (100%)

// Funzione per ridimensionare progressivamente
function startShrinking() {
    // Avvia un intervallo che riduce progressivamente la scala
    shrinkingInterval = setInterval(() => {
        if (currentScale > minScale) {
            currentScale -= scaleStep; // Riduci la scala
            leftSection.style.transform = `scale(${currentScale})`; // Applica la trasformazione
            leftSection.style.opacity = currentScale; // Riduci l'opacità proporzionalmente
        } else {
            clearInterval(shrinkingInterval); // Ferma il loop se si raggiunge il minimo
        }
    }, 20); // Intervallo rapido per un effetto fluido
}

// Funzione per riportare l'immagine alla dimensione originale
function stopShrinking() {
    clearInterval(shrinkingInterval); // Ferma il loop
    currentScale = 1; // Reset scala
    leftSection.style.transform = `scale(${currentScale})`; // Torna alla dimensione originale
    leftSection.style.opacity = 1; // Reset opacità
    leftSection.classList.remove('minimized'); // Rimuovi eventuali classi aggiuntive
}

// Aggiungi l'evento mousedown (pulsante premuto)
leftSection.addEventListener('mousedown', () => {
    startShrinking();
});

// Aggiungi l'evento mouseup (pulsante rilasciato)
document.addEventListener('mouseup', () => {
    stopShrinking();
});

