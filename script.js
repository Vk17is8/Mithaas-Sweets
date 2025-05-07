// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');

    if (mobileMenuBtn && mobileMenu && closeBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Update cart count from localStorage
    updateCartCount();

    // Lightbox functionality for gallery page
    setupLightbox();
});

// Update cart count
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('mithaasCart')) || [];
        const totalItems = cart  {
        const cart = JSON.parse(localStorage.getItem('mithaasCart')) || [];
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCountElement.textContent = totalItems;
    }
}

// Lightbox functionality
let currentImageIndex = 0;
const galleryImages = [
    {
        src: "images/gallery1.jpg",
        alt: "Assorted Indian sweets display"
    },
    {
        src: "images/gallery2.jpg",
        alt: "Traditional sweet making process"
    },
    {
        src: "images/gallery3.jpg",
        alt: "Festive sweet box arrangement"
    },
    {
        src: "images/gallery4.jpg",
        alt: "Colorful Holi special sweets"
    },
    {
        src: "images/gallery5.jpg",
        alt: "Diwali sweet gift boxes"
    },
    {
        src: "images/gallery6.jpg",
        alt: "Chef preparing traditional sweets"
    },
    {
        src: "images/gallery7.jpg",
        alt: "Wedding sweet platter arrangement"
    },
    {
        src: "images/gallery8.jpg",
        alt: "Shop interior with sweet displays"
    }
];

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return; // Only run on gallery page
    
    // Set up event listeners for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const counter = document.getElementById('image-counter');
    
    if (!lightbox || !lightboxImg) return;
    
    currentImageIndex = index;
    
    // Update image and caption
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    
    if (caption) caption.textContent = galleryImages[index].alt;
    if (counter) counter.textContent = `${index + 1} / ${galleryImages.length}`;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard event listeners
    document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remove keyboard event listeners
    document.removeEventListener('keydown', handleLightboxKeydown);
}

function changeImage(direction) {
    const totalImages = galleryImages.length;
    
    // Calculate new index
    currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
    
    // Update lightbox with new image
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const counter = document.getElementById('image-counter');
    
    if (lightboxImg) {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
    
    if (caption) caption.textContent = galleryImages[currentImageIndex].alt;
    if (counter) counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
}

// Add to cart functionality
function addToCart(productId, name, price, image) {
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('mithaasCart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        // Increase quantity if product already in cart
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('mithaasCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation message
    alert(`${name} has been added to your cart!`);
}
