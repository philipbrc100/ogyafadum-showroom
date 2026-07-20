// ==========================================================================
// OGYAFADUM CAR IMPORTS - INVENTORY ENGINE (RESPONSIVE & TOUCH-OPTIMIZED)
// ==========================================================================

// 1. Core Vehicle Database Array (20 Premium Fleet)
// ==========================================================================
const carData = [
    {
        id: "car-001",
        badge: "Premium SUV",
        title: "Volvo XC90 T8 AWD",
        desc: "Luxury plug-in hybrid sourced directly from Stockholm. Impeccable service history.",
        images: { exterior: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2022", status: "Available" }
    },
    {
        id: "car-002",
        badge: "Luxury Sedan",
        title: "BMW 530e iPerformance",
        desc: "Executive saloon with premium leather interior and advanced driver assistance systems.",
        images: { exterior: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Plug-in Hybrid", year: "2021", status: "Available" }
    },
    {
        id: "car-003",
        badge: "Electric Compact",
        title: "Tesla Model 3 Long Range",
        desc: "Pure electric power with long-range dual motor capability. Ultra-clean import.",
        images: { exterior: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2021", status: "Sold" }
    },
    {
        id: "car-004",
        badge: "Family SUV",
        title: "Audi Q5 40 TDI Quattro",
        desc: "Highly efficient diesel cruiser with matrix LED headlights and spacious cargo layout.",
        images: { exterior: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Turbo", year: "2020", status: "Available" }
    },
    {
        id: "car-005",
        badge: "Compact SUV",
        title: "Volvo XC40 D4 AWD",
        desc: "Smart urban design combined with Sweden's industry-leading safety tech suites.",
        images: { exterior: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel", year: "2019", status: "Available" }
    },
    {
        id: "car-006",
        badge: "Executive Estate",
        title: "Mercedes-Benz E220d Wagon",
        desc: "The ultimate long-distance hauler, sourced from careful ownership in Gothenburg.",
        images: { exterior: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2021", status: "In Transit" }
    },
    {
        id: "car-007",
        badge: "Sports Sedan",
        title: "BMW 320i M Sport",
        desc: "Aggressive styling accents with sharp, dynamic handling. Exceptionally low mileage.",
        images: { exterior: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Turbo", year: "2020", status: "Available" }
    },
    {
        id: "car-008",
        badge: "Electric SUV",
        title: "Volkswagen ID.4 Pro",
        desc: "Next-generation green mobility with massive central infotainment and panoramic roof.",
        images: { exterior: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Electric", year: "2022", status: "Available" }
    },
    {
        id: "car-009",
        badge: "Premium Hatch",
        title: "Audi A3 Sportback TFSIe",
        desc: "Compact premium plug-in hybrid tailored for nimble city commuting profiles.",
        images: { exterior: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2021", status: "Available" }
    },
    {
        id: "car-010",
        badge: "Coupe SUV",
        title: "BMW X4 xDrive30i",
        desc: "Sporty fastback silhouette lines featuring custom premium alloy wheel upgrades.",
        images: { exterior: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Turbo", year: "2020", status: "Sold" }
    },
    {
        id: "car-011",
        badge: "Luxury SUV",
        title: "Range Rover Velar D300",
        desc: "Striking avant-garde aesthetics paired with powerful twin-turbo pull performance.",
        images: { exterior: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Twin-Turbo", year: "2019", status: "Available" }
    },
    {
        id: "car-012",
        badge: "Luxury Sedan",
        title: "Volvo S90 D4 Inscription",
        desc: "Top-tier Scandinavian luxury trim tier with fine wooden inlays and crystal gear selector.",
        images: { exterior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2020", status: "Available" }
    },
    {
        id: "car-013",
        badge: "Electric Crossover",
        title: "Kia EV6 GT-Line",
        desc: "Ultra-fast charging architecture with futuristic cockpit design layouts.",
        images: { exterior: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2022", status: "In Transit" }
    },
    {
        id: "car-014",
        badge: "Premium SUV",
        title: "Mercedes-Benz GLC 300de",
        desc: "Intelligent plug-in diesel hybrid engineering delivering unparalleled fuel efficiency metrics.",
        images: { exterior: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Hybrid", year: "2021", status: "Available" }
    },
    {
        id: "car-015",
        badge: "Performance Hatch",
        title: "Volkswagen Golf GTI Clubsport",
        desc: "Track-focused performance hot-hatch directly imported from premium German enthusiasts.",
        images: { exterior: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Turbo", year: "2021", status: "Available" }
    },
    {
        id: "car-016",
        badge: "Rugged Cross",
        title: "Volvo V60 Cross Country",
        desc: "Raised ride clearance height with robust protection panel borders for rougher road terrains.",
        images: { exterior: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol AWD", year: "2020", status: "Available" }
    },
    {
        id: "car-017",
        badge: "Compact Premium",
        title: "Mini Cooper S 5-Door",
        desc: "Classic go-kart driving dynamics optimized inside a practical five-door chassis format.",
        images: { exterior: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Sport Turbo", year: "2019", status: "Available" }
    },
    {
        id: "car-018",
        badge: "Luxury SUV",
        title: "Porsche Macan S",
        desc: "The sports car of compact luxury SUVs, featuring an immaculate twin-turbo V6 engine.",
        images: { exterior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Petrol V6 Twin-Turbo", year: "2020", status: "Sold" }
    },
    {
        id: "car-019",
        badge: "Flagship Luxury",
        title: "Audi A8 L 50 TDI",
        desc: "Long wheelbase variant offering rear executive lounge seating and elite sound insulation.",
        images: { exterior: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Quattro", year: "2021", status: "Available" }
    },
    {
        id: "car-020",
        badge: "Electric Fastback",
        title: "Polestar 2 Long Range",
        desc: "Premium electric performance fastback from Sweden, offering minimal minimalist design and high output.",
        images: { exterior: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80", interior: "" },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2022", status: "Available" }
    }
];

// Current targeted vehicle for link sharing actions
let activeCarForShare = null;

// ==========================================================================
// 2. Initialization & Boot Event Registers
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderShowroom();
    setupMobileNavigation();
    setupModalListeners();
    setupShareButton();
    setupDeepLinking();
});

// ==========================================================================
// 3. Dynamic Showroom Card Rendering Engine
// ==========================================================================
function renderShowroom() {
    const countLabel = document.getElementById('count-label');
    if (countLabel) countLabel.innerText = carData.length;

    const galleryGrid = document.getElementById('gallery'); 
    if (!galleryGrid) return;

    galleryGrid.innerHTML = carData.map(car => {
        const isSoldOut = car.specs.status.toLowerCase() === 'sold';
        const isInTransit = car.specs.status.toLowerCase() === 'in transit';
        
        let statusClass = 'tag-available';
        if (isSoldOut) {
            statusClass = 'tag-sold';
        } else if (isInTransit) {
            statusClass = 'tag-transit';
        }

        const cardImage = car.images && car.images.exterior ? car.images.exterior : '';
        
        return `
            <div class="car-card ${isSoldOut ? 'is-sold-out' : ''}" data-id="${car.id}">
                <div class="car-img-wrapper">
                    <img src="${cardImage}" alt="${car.title}" loading="lazy">
                    <span class="status-tag ${statusClass}">
                        ${car.specs.status}
                    </span>
                </div>
                <div class="car-info">
                    <span class="car-badge">${car.badge}</span>
                    <h3>${car.title}</h3>
                    <p>${car.desc}</p>
                    <div class="car-footer-meta">
                        <span>🗓️ ${car.specs.year}</span>
                        <span>📍 ${car.specs.origin}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// 4. Mobile Collapsible Navigation Drawer Handles
// ==========================================================================
function setupMobileNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const premiumNav = document.querySelector('.premium-nav');
    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

    if (!menuToggle || !mobileDrawer || !premiumNav) return;

    const toggleMenu = () => {
        const isOpen = mobileDrawer.classList.toggle('active');
        premiumNav.classList.toggle('menu-open', isOpen);
        
        // Block document scrolling behind active drawer
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when tapping any internal links
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            premiumNav.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });

    // Tap outside to close drawer
    document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('active') && 
            !mobileDrawer.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileDrawer.classList.remove('active');
            premiumNav.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================================================
// 5. Setup Lightbox Modal Pop-up Control Systems
// ==========================================================================
function setupModalListeners() {
    const galleryGrid = document.getElementById('gallery'); 
    const modal = document.getElementById('carModal');

    if (!galleryGrid || !modal) return;

    galleryGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.car-card');
        if (!card) return;

        const carId = card.getAttribute('data-id');
        const car = carData.find(c => c.id === carId);
        if (car) populateModal(car, modal);
    });
}

// ==========================================================================
// 6. Populate Modal Content and Dynamic Actions
// ==========================================================================
function populateModal(car, modal) {
    activeCarForShare = car;

    const isSold = car.specs.status.toLowerCase() === 'sold';
    const isInTransit = car.specs.status.toLowerCase() === 'in transit';
    
    // Create pre-filled touch friendly WhatsApp action path
    const waBase = "https://wa.me/233540677510?text=";
    const messageText = isSold 
        ? `Hello Ogyafadum Car Imports, I saw that your "${car.title}" from Sweden is sold out. Can you help me source and import a similar vehicle?`
        : `Hello Ogyafadum Car Imports, I am highly interested in buying the "${car.title}" (ID: ${car.id}) currently available in your showroom.`;
    const messageEncoded = encodeURIComponent(messageText);

    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.src = car.images && car.images.exterior ? car.images.exterior : ''; 
    }
    
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) modalTitle.innerText = car.title;

    const modalBadge = document.getElementById('modalBadge');
    if (modalBadge) modalBadge.innerText = car.badge;

    const modalDesc = document.getElementById('modalDesc');
    if (modalDesc) modalDesc.innerText = car.desc;
    
    const specOrigin = document.getElementById('specOrigin');
    if (specOrigin) specOrigin.innerText = car.specs.origin;

    const specType = document.getElementById('specType');
    if (specType) specType.innerText = car.specs.type;

    const specYear = document.getElementById('specYear');
    if (specYear) specYear.innerText = car.specs.year;

    const specStatus = document.getElementById('specStatus');
    if (specStatus) {
        specStatus.innerText = car.specs.status;
        
        let statusStyle = 'modal-status status-available';
        if (isSold) {
            statusStyle = 'modal-status status-sold';
        } else if (isInTransit) {
            statusStyle = 'modal-status status-transit';
        }
        specStatus.className = statusStyle;
    }

    const waLink = document.getElementById('whatsappBtn');
    if (waLink) {
        waLink.href = waBase + messageEncoded;
    }

    // Set share direct URL parameter history block
    const shareUrl = `${window.location.origin}${window.location.pathname}?car=${car.id}`;
    window.history.pushState({ carId: car.id }, '', shareUrl);

    // Open active model with body locking
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove deep link path parameter gracefully
        window.history.pushState(null, '', window.location.pathname);
    }
}

// ==========================================================================
// 7. Direct Share Link Copier Engine (with tactile UI feedback)
// ==========================================================================
function setupShareButton() {
    const shareBtn = document.getElementById('shareBtn');
    const shareBtnText = document.getElementById('shareBtnText');
    
    if (!shareBtn || !shareBtnText) return;

    shareBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!activeCarForShare) return;

        const shareUrl = `${window.location.origin}${window.location.pathname}?car=${activeCarForShare.id}`;
        
        try {
            await navigator.clipboard.writeText(shareUrl);
            
            // Toggle copy visual icons
            const copyIcon = shareBtn.querySelector('.copy-icon');
            const checkIcon = shareBtn.querySelector('.check-icon');
            
            if (copyIcon && checkIcon) {
                copyIcon.classList.add('hidden');
                checkIcon.classList.remove('hidden');
            }

            // Change direct feedback texts
            shareBtnText.innerText = "Link Copied!";
            shareBtn.style.borderColor = "#10b981";
            shareBtn.style.color = "#10b981";
            shareBtn.style.backgroundColor = "rgba(16, 185, 129, 0.05)";

            // Revert state delay
            setTimeout(() => {
                if (copyIcon && checkIcon) {
                    copyIcon.classList.remove('hidden');
                    checkIcon.classList.add('hidden');
                }
                shareBtnText.innerText = "Copy Share Link";
                shareBtn.style.borderColor = "";
                shareBtn.style.color = "";
                shareBtn.style.backgroundColor = "";
            }, 2500);

        } catch (err) {
            console.error('Failed to copy active share link path.', err);
        }
    });
}

// ==========================================================================
// 8. Deep Linking Launcher (Loads specific details on URL match query)
// ==========================================================================
function setupDeepLinking() {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('car');
    
    if (carId) {
        const car = carData.find(c => c.id === carId);
        const modal = document.getElementById('carModal');
        if (car && modal) {
            // Short delay to ensure browser rendering complete before trigger popups
            setTimeout(() => {
                populateModal(car, modal);
            }, 300);
        }
    }
}
