// --- Sidebar Menu Functionality ---
const menuIcon = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    menuIcon.classList.toggle('active');
    sideMenu.classList.toggle('open');
    overlay.classList.toggle('show');
}

menuIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu on navigation link click (optional, but good UX)
document.querySelectorAll('.side-menu a').forEach(item => {
    item.addEventListener('click', () => {
        if (sideMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// --- Book Data ---
// IMPORTANT: Ensure all 'id' values across ALL these arrays are UNIQUE.
// I've updated them to be clearly distinct (100s, 200s, 300s).
const recommendedBooks = [
    { id: 101, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/id/8379256-L.jpg", buyLink: "https://www.amazon.com/Silent-Patient-Alex-Michaelides/dp/1250301696/" },
    { id: 102, title: "Where the Crawdads Sing", author: "Delia Owens", cover: "https://covers.openlibrary.org/b/id/11140162-L.jpg", buyLink: "https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219109/" },
    { id: 103, title: "Becoming", author: "Michelle Obama", cover: "https://covers.openlibrary.org/b/id/8228696-L.jpg", buyLink: "https://www.amazon.com/Becoming-Michelle-Obama/dp/1524763136/" },
    { id: 104, title: "Educated", author: "Tara Westover", cover: "https://covers.openlibrary.org/b/id/9226693-L.jpg", buyLink: "https://www.amazon.com/Educated-Memoir-Tara-Westover/dp/0399590501/" },
    { id: 105, title: "Normal People", author: "Sally Rooney", cover: "https://covers.openlibrary.org/b/id/11044148-L.jpg", buyLink: "https://www.amazon.com/Normal-People-Sally-Rooney/dp/0571334656/" },
    { id: 106, title: "The Midnight Library", author: "Matt Haig", cover: "https://covers.openlibrary.org/b/id/12560835-L.jpg", buyLink: "https://www.amazon.com/Midnight-Library-Matt-Haig/dp/0525559477/"},
    { id: 107, title: "Project Hail Mary", author: "Andy Weir", cover: "https://covers.openlibrary.org/b/id/12662057-L.jpg", buyLink: "https://www.amazon.com/Project-Hail-Mary-Andy-Weir/dp/0593135202/"}
];

const booksRead = [
    { id: 201, title: "1984", author: "George Orwell", cover: "https://covers.openlibrary.org/b/id/153541-L.jpg", buyLink: "https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934/" },
    { id: 202, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg", buyLink: "https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0060935464/" },
    { id: 203, title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg", buyLink: "https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567/" },
    { id: 204, title: "Pride and Prejudice", author: "Jane Austen", cover: "https://covers.openlibrary.org/b/id/6653896-L.jpg", buyLink: "https://www.amazon.com/Pride-Prejudice-Jane-Austen/dp/0141439513/"}
];

const booksSaved = [
    { id: 301, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", cover: "https://covers.openlibrary.org/b/id/8445583-L.jpg", buyLink: "https://www.amazon.com/Sapiens-Humankind-Yuval-Noah-Harari/dp/0062316095/" },
    { id: 302, title: "Atomic Habits", author: "James Clear", cover: "https://covers.openlibrary.org/b/id/10510502-L.jpg", buyLink: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/" },
    { id: 303, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", cover: "https://covers.openlibrary.org/b/id/9256543-L.jpg", buyLink: "https://www.amazon.com/Subtle-Art-Not-Giving-Counterintuitive/dp/0062457713/" },
    { id: 304, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "https://covers.openlibrary.org/b/id/7361734-L.jpg", buyLink: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555/" },
    { id: 305, title: "Pride and Prejudice" , author: "caed addede", cover: "https://m.media-amazon.com/images/I/513CryDdUdL._SY522_.jpg", buyLink: "https://www.amazon.com/Subtle-Art-Not-Giving-Counterintuitive/dp/0062457713/" },
];

// Combine all books for search filtering. This array must be comprehensive.
const allBooks = [...recommendedBooks, ...booksRead, ...booksSaved];
console.log("All books combined:", allBooks); // Check if all books are here

// --- DOM Elements ---
const carouselTrack = document.getElementById('carouselTrack');
const carouselDotsContainer = document.getElementById('carouselDots');
const booksReadRow = document.getElementById('booksReadRow');
const booksSavedRow = document.getElementById('booksSavedRow');
const suggestedBooksRow = document.getElementById('suggestedBooksRow'); // This will also display recommended books

const searchInput = document.getElementById('searchInput');

// Modal Elements
const bookModal = document.getElementById('bookModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalAuthor = document.getElementById('modalAuthor');
const modalBookImage = document.getElementById('modalBookImage');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const btnReadNow = document.getElementById('btnReadNow');
const btnReadLater = document.getElementById('btnReadLater');
const btnWishlist = document.getElementById('btnWishlist');
const btnBuyNow = document.getElementById('btnBuyNow');

let currentBook = null; // Stores the book object currently displayed in the modal

// --- Carousel Functionality ---
let carouselIndex = 0;
let carouselInterval;
const carouselSpeed = 5000; // milliseconds

function createCarouselSlide(book) {
    const slide = document.createElement('a');
    slide.className = 'carousel-card';
    slide.href = '#';
    slide.setAttribute('data-id', book.id);
    slide.setAttribute('aria-label', `Featured Book: ${book.title} by ${book.author}`);

    console.log(`[Carousel] Creating slide for: "${book.title}", ID: ${book.id}`); // Debug log
    slide.innerHTML = `
        <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy" />
        <div class="carousel-info">${book.title}</div>
    `;

    slide.addEventListener('click', e => {
        e.preventDefault();
        const clickedId = parseInt(e.currentTarget.dataset.id);
        console.log(`[Carousel Click] Retrieved data-id: ${clickedId}, Type: ${typeof clickedId}`); // Debug log
        openModal(clickedId);
    });
    return slide;
}

function createCarouselDots() {
    carouselDotsContainer.innerHTML = ''; // Clear existing dots
    // Ensure dots are created only for actual slides present in the DOM after filtering/rendering
    const currentCarouselSlides = carouselTrack.querySelectorAll('.carousel-card');
    currentCarouselSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetCarouselInterval();
        });
        carouselDotsContainer.appendChild(dot);
    });
}

function updateCarouselDots() {
    document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
        if (index === carouselIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    const numSlides = carouselTrack.querySelectorAll('.carousel-card').length;
    if (numSlides === 0) return; // No slides to go to

    if (index < 0) {
        carouselIndex = numSlides - 1;
    } else if (index >= numSlides) {
        carouselIndex = 0;
    } else {
        carouselIndex = index;
    }
    carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
    updateCarouselDots();
}

function nextSlide() {
    goToSlide(carouselIndex + 1);
}

function startCarousel() {
    clearInterval(carouselInterval); // Clear any existing interval
    const numSlides = carouselTrack.querySelectorAll('.carousel-card').length;
    if (numSlides > 1) { // Only start if there's more than one slide
        carouselInterval = setInterval(nextSlide, carouselSpeed);
    }
}

function resetCarouselInterval() {
    startCarousel(); // Restart the interval
}

// --- Book Card Creation ---
function createBookCard(book) {
    const card = document.createElement('a');
    card.className = 'book-card';
    card.href = '#';
    card.setAttribute('data-id', book.id);
    card.setAttribute('aria-label', `${book.title} by ${book.author}`);

    console.log(`[Book Card] Creating card for: "${book.title}", ID: ${book.id}`); // Debug log

    card.innerHTML = `
        <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy" />
        <div class="info">
            <h5>${book.title}</h5>
            <p>${book.author}</p>
        </div>
    `;

    card.addEventListener('click', e => {
        e.preventDefault();
        const clickedId = parseInt(e.currentTarget.dataset.id);
        console.log(`[Book Card Click] Retrieved data-id: ${clickedId}, Type: ${typeof clickedId}`); // Debug log
        openModal(clickedId);
    });

    return card;
}

// --- Rendering Books ---
function renderBooks(booksToRender, containerElement) {
    containerElement.innerHTML = ''; // Clear existing cards
    if (booksToRender.length === 0) {
        // Display message only for non-carousel sections if no books found
        if (containerElement.id !== 'carouselTrack') {
             containerElement.innerHTML = '<p style="color:#aaa; text-align: center; width: 100%; margin-top: 20px; flex-shrink: 0;">No books found matching your criteria.</p>';
        } else {
            // For carousel, stop auto-play and hide dots if no slides
            clearInterval(carouselInterval);
            carouselDotsContainer.innerHTML = '';
            containerElement.innerHTML = '<p style="color:#aaa; text-align: center; width: 100%; margin-top: 20px; flex-shrink: 0;">No recommended books found.</p>';
        }
    } else {
        booksToRender.forEach(book => {
            const card = (containerElement.id === 'carouselTrack') ? createCarouselSlide(book) : createBookCard(book);
            containerElement.appendChild(card);
        });
    }
}

function initializePageBooks() {
    renderBooks(recommendedBooks, carouselTrack);
    createCarouselDots(); // Create dots after carousel slides are rendered
    renderBooks(booksRead, booksReadRow);
    renderBooks(booksSaved, booksSavedRow);
    renderBooks(recommendedBooks, suggestedBooksRow); // Suggested books are also recommended for now
    startCarousel(); // Start carousel after initial render
}

// --- Search Functionality ---
function filterAndRenderAllSections() {
    const query = searchInput.value.toLowerCase();

    // Filter and render Carousel (Recommended Books)
    const filteredRecommended = recommendedBooks.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    renderBooks(filteredRecommended, carouselTrack);
    // Re-initialize carousel if the recommended books change due to search
    if (filteredRecommended.length > 0) {
        carouselIndex = 0; // Reset carousel to first slide
        goToSlide(0); // Manually set to first slide and update transform/dots
        createCarouselDots(); // Recreate dots based on filtered slides
        startCarousel(); // Restart carousel
    } else {
        clearInterval(carouselInterval); // Stop carousel if no recommended books
        carouselDotsContainer.innerHTML = ''; // Clear dots
    }


    // Filter and render Books Read
    const filteredRead = booksRead.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    renderBooks(filteredRead, booksReadRow);

    // Filter and render Books Saved
    const filteredSaved = booksSaved.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    renderBooks(filteredSaved, booksSavedRow);

    // Filter and render Suggested Books (using recommended for now)
    const filteredSuggested = recommendedBooks.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    renderBooks(filteredSuggested, suggestedBooksRow);
}

searchInput.addEventListener('input', filterAndRenderAllSections);

// --- Modal Functionality ---
function openModal(bookId) {
    console.log(`[Modal] openModal called with bookId: ${bookId}, Type: ${typeof bookId}`); // Debug log

    // Ensure bookId is treated as a number for strict comparison
    const book = allBooks.find(b => b.id === parseInt(bookId));

    if (!book) {
        console.error(`[Modal Error] Book with ID ${bookId} not found in allBooks array!`); // Debug log
        return; // Exit if book is not found
    }

    console.log('[Modal] Book found:', book); // Debug log

    currentBook = book;

    modalTitle.textContent = book.title;
    modalAuthor.textContent = `by ${book.author}`;
    modalBookImage.src = book.cover;
    modalBookImage.alt = `Cover of ${book.title}`;
    btnBuyNow.dataset.buyLink = book.buyLink || '#';

    bookModal.classList.add('show');
    modalOverlay.classList.add('show');
    modalCloseBtn.focus(); // Focus close button for accessibility
}

function closeModal() {
    bookModal.classList.remove('show');
    modalOverlay.classList.remove('show');
    currentBook = null; // Clear current book
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// --- Modal Button Actions ---
btnReadNow.addEventListener('click', () => {
    if (currentBook) {
        alert(`You chose to Read Now: "${currentBook.title}"`);
        // In a real application, you'd navigate to a reader page or show the book content
    }
    closeModal();
});

btnReadLater.addEventListener('click', () => {
    if (currentBook) {
        alert(`Added to Read Later: "${currentBook.title}"`);
        // In a real application, add to user's "Read Later" list (e.g., local storage, backend)
    }
    closeModal();
});

btnWishlist.addEventListener('click', () => {
    if (currentBook) {
        alert(`Added to Wishlist: "${currentBook.title}"`);
        // In a real application, add to user's "Wishlist"
    }
    closeModal();
});

btnBuyNow.addEventListener('click', () => {
    if (currentBook && btnBuyNow.dataset.buyLink && btnBuyNow.dataset.buyLink !== '#') {
        window.open(btnBuyNow.dataset.buyLink, '_blank');
    } else {
        alert("Buy link not available for this book.");
    }
    closeModal();
});

// --- Keyboard Accessibility ---
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        if (sideMenu.classList.contains('open')) {
            toggleMenu();
        }
        if (bookModal.classList.contains('show')) {
            closeModal();
        }
    }
});

menuIcon.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// --- Initialize the Page ---
// This runs once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePageBooks);