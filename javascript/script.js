// ==========================================================================
// OGYAFADUM CAR IMPORTS - INVENTORY ENGINE (RESPONSIVE & TOUCH-OPTIMIZED)
// ==========================================================================

// 1. Core Vehicle Database Array (20 Premium Fleet)
// ==========================================================================
const carData = [
    {
        id: "car-028",
        badge: "Hybrid SUV",
        title: "Toyota RAV4 2.5 Plug-in Hybrid AWDi (306hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 6 036 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-028-img-01.jpg",
            interior: "assets/car-028-img-02.jpg",
            cockpit: "assets/car-028-img-03.jpg",
            engine: "assets/car-028-img-04.jpg",
            all: [
                "assets/car-028-img-01.jpg",
            "assets/car-028-img-02.jpg",
            "assets/car-028-img-03.jpg",
            "assets/car-028-img-04.jpg",
            "assets/car-028-img-05.jpg",
            "assets/car-028-img-06.jpg",
            "assets/car-028-img-07.jpg",
            "assets/car-028-img-08.jpg",
            "assets/car-028-img-09.jpg",
            "assets/car-028-img-10.jpg",
            "assets/car-028-img-11.jpg",
            "assets/car-028-img-12.jpg",
            "assets/car-028-img-13.jpg",
            "assets/car-028-img-14.jpg",
            "assets/car-028-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2023", mileage: "6 036 mil", status: "Available", hp: "185 hp", transmission: "Automatic", plate: "KVD-344" },
        basePriceGHS: 400000
    },
    {
        id: "car-027",
        badge: "Hybrid SUV",
        title: "2019 Toyota C-HR 1.8 HSD (122hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 88,870 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-027-exterior.jpg",
            interior: "assets/car-027-interior.jpg",
            cockpit: "assets/car-027-cockpit.jpg",
            engine: "assets/car-027-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2019", mileage: "88,870 km", status: "Available", hp: "98 hp", transmission: "Automatic", plate: "KVD-590" },
        basePriceGHS: 265000
    },
    {
        id: "car-026",
        badge: "Hybrid Crossover",
        title: "2022 Toyota Yaris Cross 1.5 Hybrid AWD (116hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 19,870 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-026-exterior.jpg",
            interior: "assets/car-026-interior.jpg",
            cockpit: "assets/car-026-cockpit.jpg",
            engine: "assets/car-026-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2022", mileage: "19,870 km", status: "Available", hp: "92 hp", transmission: "Automatic", plate: "KVD-408" },
        basePriceGHS: 355000
    },
    {
        id: "car-025",
        badge: "Hybrid SUV",
        title: "2024 Toyota RAV4 2.5 HSD AWD (222hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 44,540 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-025-exterior.jpg",
            interior: "assets/car-025-interior.jpg",
            cockpit: "assets/car-025-cockpit.jpg",
            engine: "assets/car-025-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2024", mileage: "44,540 km", status: "Available", hp: "178 hp", transmission: "Automatic", plate: "KVD-913" },
        basePriceGHS: 610000
    },
    {
        id: "car-024",
        badge: "Hybrid Hatchback",
        title: "2008 Toyota Prius 1.5 Hybrid (78hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 148,030 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-024-exterior.jpg",
            interior: "assets/car-024-interior.jpg",
            cockpit: "assets/car-024-cockpit.jpg",
            engine: "assets/car-024-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2008", mileage: "148,030 km", status: "Available", hp: "78 hp", transmission: "Automatic", plate: "KVD-198" },
        basePriceGHS: 35000
    },
    {
        id: "car-023",
        badge: "Hybrid Hatchback",
        title: "2022 Toyota Yaris 1.5 Hybrid 5dr (116hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 83,190 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-023-exterior.jpg",
            interior: "assets/car-023-interior.jpg",
            cockpit: "assets/car-023-cockpit.jpg",
            engine: "assets/car-023-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2022", mileage: "83,190 km", status: "Available", hp: "92 hp", transmission: "Automatic", plate: "KVD-636" },
        basePriceGHS: 255000
    },
    {
        id: "car-022",
        badge: "Hybrid Estate",
        title: "2020 Toyota Corolla 1.8 Hybrid Touring Sports (122hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 132,720 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-022-exterior.jpg",
            interior: "assets/car-022-interior.jpg",
            cockpit: "assets/car-022-cockpit.jpg",
            engine: "assets/car-022-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2020", mileage: "132,720 km", status: "Available", hp: "98 hp", transmission: "Automatic", plate: "KVD-895" },
        basePriceGHS: 170000
    },
    {
        id: "car-001",
        badge: "Compact Hatchback",
        title: "2010 Toyota Yaris 1.33 5dr (100hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 113,790 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-001-exterior.jpg",
            interior: "assets/car-001-interior.jpg",
            cockpit: "assets/car-001-cockpit.jpg",
            engine: "assets/car-001-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2010", mileage: "113,790 km", status: "Available", hp: "101 hp", transmission: "Automatic", plate: "SXC-901" },
        basePriceGHS: 100000
    },
    {
        id: "car-040",
        badge: "Premium SUV",
        title: "2015 BMW X3 xDrive20d, F25 (190hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained BMW with a fully documented 117,540 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-040-exterior.jpg",
            interior: "assets/car-040-interior.jpg",
            cockpit: "assets/car-040-cockpit.jpg",
            engine: "assets/car-040-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", mileage: "117,540 km", status: "Available", hp: "190 hp", transmission: "Automatic", plate: "KVD-215" },
        basePriceGHS: 255000
    },
    {
        id: "car-039",
        badge: "Premium Wagon",
        title: "2014 BMW 530d xDrive Touring, F11 (258hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained BMW with a fully documented 165,920 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-039-exterior.jpg",
            interior: "assets/car-039-interior.jpg",
            cockpit: "assets/car-039-cockpit.jpg",
            engine: "assets/car-039-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2014", mileage: "165,920 km", status: "Available", hp: "258 hp", transmission: "Automatic", plate: "KVD-177" },
        basePriceGHS: 175000
    },
    {
        id: "car-038",
        badge: "Premium Gran Turismo",
        title: "2015 BMW 330d GT xDrive, F34 (258hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained BMW with a fully documented 179,910 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-038-exterior.jpg",
            interior: "assets/car-038-interior.jpg",
            cockpit: "assets/car-038-cockpit.jpg",
            engine: "assets/car-038-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", mileage: "179,910 km", status: "Available", hp: "258 hp", transmission: "Automatic", plate: "KVD-293" },
        basePriceGHS: 190000
    },
    {
        id: "car-037",
        badge: "Premium SUV",
        title: "2014 Honda CR-V 1.6i-DTEC 2WD (120hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Honda with a fully documented 107,340 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-037-exterior.jpg",
            interior: "assets/car-037-interior.jpg",
            cockpit: "assets/car-037-cockpit.jpg",
            engine: "assets/car-037-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2014", mileage: "107,340 km", status: "Available", hp: "120 hp", transmission: "Manual", plate: "KVD-415" },
        basePriceGHS: 145000
    },
    {
        id: "car-036",
        badge: "Premium Wagon",
        title: "2023 Audi A4 Avant 40 TDI quattro (204hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 124,580 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-036-exterior.jpg",
            interior: "assets/car-036-interior.jpg",
            cockpit: "assets/car-036-cockpit.jpg",
            engine: "assets/car-036-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2023", mileage: "124,580 km", status: "Available", hp: "204 hp", transmission: "Automatic", plate: "KVD-625" },
        basePriceGHS: 230000
    },
    {
        id: "car-035",
        badge: "Executive Sportback",
        title: "2021 Audi A5 Sportback 45 TFSI quattro (265hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 118,520 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-035-exterior.jpg",
            interior: "assets/car-035-interior.jpg",
            cockpit: "assets/car-035-cockpit.jpg",
            engine: "assets/car-035-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2021", mileage: "118,520 km", status: "Available", hp: "265 hp", transmission: "Automatic", plate: "KVD-895" },
        basePriceGHS: 255000
    },
    {
        id: "car-034",
        badge: "Premium Compact SUV",
        title: "2021 Audi Q3 40 TDI quattro (200hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 86,350 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-034-exterior.jpg",
            interior: "assets/car-034-interior.jpg",
            cockpit: "assets/car-034-cockpit.jpg",
            engine: "assets/car-034-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2021", mileage: "86,350 km", status: "Available", hp: "200 hp", transmission: "Automatic", plate: "KVD-460" },
        basePriceGHS: 255000
    },
    {
        id: "car-033",
        badge: "Electric Luxury SUV",
        title: "2021 Audi e-tron 55 quattro 95kWh (360hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 185,240 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-033-exterior.jpg",
            interior: "assets/car-033-interior.jpg",
            cockpit: "assets/car-033-cockpit.jpg",
            engine: "assets/car-033-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2021", mileage: "185,240 km", status: "Available", hp: "408 hp", transmission: "Automatic", plate: "KVD-949" },
        basePriceGHS: 215000
    },
    {
        id: "car-032",
        badge: "Electric Hatchback",
        title: "2023 Nissan LEAF 5dr 59kWh (214hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 32,410 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-032-exterior.jpg",
            interior: "assets/car-032-interior.jpg",
            cockpit: "assets/car-032-cockpit.jpg",
            engine: "assets/car-032-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2023", mileage: "32,410 km", status: "Available", hp: "218 hp", transmission: "Automatic", plate: "KVD-948" },
        basePriceGHS: 205000
    },
    {
        id: "car-031",
        badge: "Electric Crossover",
        title: "2023 Nissan Ariya 87kWh e-4orce (306hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 51,750 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-031-exterior.jpg",
            interior: "assets/car-031-interior.jpg",
            cockpit: "assets/car-031-cockpit.jpg",
            engine: "assets/car-031-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2023", mileage: "51,750 km", status: "Available", hp: "306 hp", transmission: "Automatic", plate: "KVD-552" },
        basePriceGHS: 450000
    },
    {
        id: "car-030",
        badge: "Premium SUV",
        title: "2023 Nissan X-Trail e-Power (204hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 41,640 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-030-exterior.jpg",
            interior: "assets/car-030-interior.jpg",
            cockpit: "assets/car-030-cockpit.jpg",
            engine: "assets/car-030-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2023", mileage: "41,640 km", status: "Available", hp: "158 hp", transmission: "Automatic", plate: "KVD-379" },
        basePriceGHS: 360000
    },
    {
        id: "car-029",
        badge: "Compact Crossover",
        title: "2017 Nissan Qashqai 1.2 (115hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 84,150 km odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-029-exterior.jpg",
            interior: "assets/car-029-interior.jpg",
            cockpit: "assets/car-029-cockpit.jpg",
            engine: "assets/car-029-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2017", mileage: "84,150 km", status: "Available", hp: "116 hp", transmission: "Automatic", plate: "KVD-493" },
        basePriceGHS: 255000
    }
];

// Active vehicle state
let activeCar = null;
let currentActiveImageIndex = 0;
let thumbStartIndex = 0;
let activeCarImages = [];

// Helper to extract clean array of image URLs from car object
function getCarImageList(car) {
    if (!car || !car.images) return [];
    if (Array.isArray(car.images)) return car.images.filter(Boolean);
    if (Array.isArray(car.images.all) && car.images.all.length > 0) return car.images.all.filter(Boolean);

    const list = [];
    if (car.images.exterior) list.push(car.images.exterior);
    if (car.images.interior) list.push(car.images.interior);
    if (car.images.cockpit) list.push(car.images.cockpit);
    if (car.images.engine) list.push(car.images.engine);

    Object.values(car.images).forEach(val => {
        if (typeof val === 'string' && val && !list.includes(val)) {
            list.push(val);
        }
    });
    return list;
}

// Helper to format title with model year attached
function getFormattedTitle(car) {
    if (!car) return "";
    if (car.title.startsWith(car.specs.year)) {
        return car.title;
    }
    return `${car.specs.year} ${car.title}`;
}

// ==========================================================================
// 2. Initialization & Boot Event Registers
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderShowroom();
    setupMobileNavigation();
    setupShowroomClickHandlers();
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

        const carImagesList = getCarImageList(car);
        const cardImage = carImagesList.length > 0 ? carImagesList[0] : '';
        const fullTitle = getFormattedTitle(car);
        
        return `
            <div class="car-card ${isSoldOut ? 'is-sold-out' : ''}" data-id="${car.id}">
                <div class="car-img-wrapper">
                    <img src="${cardImage}" alt="${fullTitle}" loading="lazy">
                    <span class="status-tag ${statusClass}">
                        ${car.specs.status}
                    </span>
                    <span class="full-picture-indicator" title="Wholly visible image format">
                        🔍 Full Picture
                    </span>
                </div>
                <div class="car-info">
                    <div class="card-badge-row">
                        <span class="car-badge">${car.badge}</span>
                    </div>
                    <h3>${fullTitle}</h3>
                    <p>${car.desc}</p>

                    <div class="car-footer-meta">
                        <span>🛣️ ${car.specs.mileage}</span>
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
// 5. Setup Showroom Card Clicking (Bypasses old modal, launches details page!)
// ==========================================================================
function setupShowroomClickHandlers() {
    const galleryGrid = document.getElementById('gallery');
    if (!galleryGrid) return;

    galleryGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.car-card');
        if (!card) return;

        const carId = card.getAttribute('data-id');
        showDetailsView(carId);
    });
}

// ==========================================================================
// 6. Immersive Sourcing Details Page View
// ==========================================================================
function showDetailsView(carId) {
    const car = carData.find(c => c.id === carId);
    if (!car) return;

    activeCar = car;

    // 1. Show the Modal instead of hiding the Home Showroom
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    // Reset modal scroll height back to top
    const scrollArea = document.querySelector('.modal-scroll-area');
    if (scrollArea) {
        scrollArea.scrollTop = 0;
    }

    // 2. Populate Title with Year Attached & Header Info
    const fullTitle = getFormattedTitle(car);

    const breadcrumbTitle = document.getElementById('detailsBreadcrumbTitle');
    if (breadcrumbTitle) breadcrumbTitle.innerText = fullTitle;
    
    document.getElementById('detailsTitle').innerText = fullTitle;
    document.getElementById('detailsBadge').innerText = car.badge;
    document.getElementById('detailsDesc').innerText = car.desc;

    // Header Badges for Year & Mileage
    const detailsYearBadge = document.getElementById('detailsYearBadge');
    if (detailsYearBadge) detailsYearBadge.innerText = car.specs.year;

    const detailsMileageBadge = document.getElementById('detailsMileageBadge');
    if (detailsMileageBadge) detailsMileageBadge.innerText = `🛣️ ${car.specs.mileage}`;

    // 3. Populating Verification tag classes
    const statusTag = document.getElementById('detailsStatusTag');
    statusTag.innerText = car.specs.status;
    
    const isSold = car.specs.status.toLowerCase() === 'sold';
    const isInTransit = car.specs.status.toLowerCase() === 'in transit';
    statusTag.className = 'gallery-tag'; // reset
    if (isSold) {
        statusTag.classList.add('tag-sold');
    } else if (isInTransit) {
        statusTag.classList.add('tag-transit');
    } else {
        statusTag.classList.add('tag-available');
    }

    // 4. Reset & Render gallery thumbnails for all available images
    activeCarImages = getCarImageList(car);
    currentActiveImageIndex = 0;
    thumbStartIndex = 0;

    const activeImg = document.getElementById('activeGalleryImg');
    if (activeImg) {
        activeImg.src = activeCarImages[0] || '';
    }

    renderThumbnailStrip();
    setTimeout(() => {
        renderThumbnailStrip();
    }, 100);

    // 5. Populate Technical Specifications Table
    document.getElementById('specOriginField').innerText = car.specs.origin;
    document.getElementById('specOutputField').innerText = car.specs.hp;
    document.getElementById('specFuelField').innerText = car.specs.type;
    document.getElementById('specTransmissionField').innerText = car.specs.transmission;
    document.getElementById('specPlateField').innerText = car.specs.plate;
    document.getElementById('specYearField').innerText = car.specs.year;
    
    const specMileageField = document.getElementById('specMileageField');
    if (specMileageField) specMileageField.innerText = car.specs.mileage;

    document.getElementById('specAwdField').innerText = car.title.includes('AWD') || car.title.includes('Quattro') || car.title.includes('4WD') ? 'Yes' : 'No';

    // 6. Dynamic Sweden inspection data variations
    const batHealth = document.getElementById('batteryHealthVal');
    if (batHealth) {
        if (car.specs.type.toLowerCase().includes('hybrid') || car.specs.type.toLowerCase().includes('electric')) {
            batHealth.parentElement.style.display = 'flex';
            batHealth.innerText = car.specs.type.toLowerCase().includes('hybrid') ? '92% cell capacity' : '96% nominal pack health';
        } else {
            batHealth.parentElement.style.display = 'none';
        }
    }

    // Reset checkboxes to false initially on load if they exist
    const addCeramic = document.getElementById('addCeramic');
    if (addCeramic) addCeramic.checked = false;
    const addPartsKit = document.getElementById('addPartsKit');
    if (addPartsKit) addPartsKit.checked = false;
    const addLeather = document.getElementById('addLeather');
    if (addLeather) addLeather.checked = false;

    // 7. Base price assignments
    calculateDynamicPricing();

    // 8. Update window deep-linking URL parameter without jumping layout
    const shareUrl = `${window.location.origin}${window.location.pathname}?car=${car.id}`;
    window.history.pushState({ carId: car.id }, '', shareUrl);
}

// Render only as many thumbnails as can fit on a single row without horizontal overflow
function renderThumbnailStrip() {
    const strip = document.getElementById('galleryThumbnails');
    if (!strip || !activeCarImages || activeCarImages.length === 0) return;

    const thumbItemWidth = 85;
    const thumbGap = 8;
    
    let containerWidth = strip.clientWidth;
    if (containerWidth <= 0) {
        const showcase = strip.closest('.gallery-showcase');
        if (showcase && showcase.clientWidth > 0) {
            containerWidth = showcase.clientWidth;
        } else {
            containerWidth = 460;
        }
    }

    // Number of thumbnail items that mathematically fit on one line
    const visibleCount = Math.max(1, Math.floor((containerWidth + thumbGap) / (thumbItemWidth + thumbGap)));

    const maxStartIndex = Math.max(0, activeCarImages.length - visibleCount);
    if (thumbStartIndex > maxStartIndex) {
        thumbStartIndex = maxStartIndex;
    }
    if (thumbStartIndex < 0) {
        thumbStartIndex = 0;
    }

    const visibleSlice = activeCarImages.slice(thumbStartIndex, thumbStartIndex + visibleCount);

    strip.innerHTML = visibleSlice.map((src, i) => {
        const realIndex = thumbStartIndex + i;
        const isActive = realIndex === currentActiveImageIndex;
        return `
            <div class="thumb-item ${isActive ? 'active' : ''}" data-index="${realIndex}" onclick="changeActiveImageIndex(${realIndex})">
                <img src="${src}" alt="Photo ${realIndex + 1}" loading="lazy">
            </div>
        `;
    }).join('');

    // Update nav buttons disabled state
    const prevBtn = document.getElementById('thumbScrollPrev');
    const nextBtn = document.getElementById('thumbScrollNext');

    if (prevBtn) {
        if (thumbStartIndex <= 0) {
            prevBtn.classList.add('disabled');
            prevBtn.setAttribute('disabled', 'true');
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.removeAttribute('disabled');
        }
    }

    if (nextBtn) {
        if (thumbStartIndex + visibleCount >= activeCarImages.length) {
            nextBtn.classList.add('disabled');
            nextBtn.setAttribute('disabled', 'true');
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.removeAttribute('disabled');
        }
    }
}

// Change active image by index in activeCarImages
function changeActiveImageIndex(index) {
    if (!activeCar) return;
    if (!activeCarImages || activeCarImages.length === 0) {
        activeCarImages = getCarImageList(activeCar);
    }
    if (activeCarImages.length === 0) return;

    if (index < 0) index = activeCarImages.length - 1;
    if (index >= activeCarImages.length) index = 0;

    currentActiveImageIndex = index;
    const src = activeCarImages[index];

    // Update main active showcase image
    const activeImg = document.getElementById('activeGalleryImg');
    if (activeImg) {
        activeImg.src = src;
    }

    // Auto-adjust thumbStartIndex if selected image is outside visible thumbnail slice
    const strip = document.getElementById('galleryThumbnails');
    let containerWidth = strip ? strip.clientWidth : 380;
    if (containerWidth <= 0) containerWidth = 380;

    const visibleCount = Math.max(1, Math.floor((containerWidth + 8) / (85 + 8)));

    if (index < thumbStartIndex) {
        thumbStartIndex = index;
    } else if (index >= thumbStartIndex + visibleCount) {
        thumbStartIndex = index - visibleCount + 1;
    }

    renderThumbnailStrip();

    // Update Lightbox image & caption if open
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal && lightboxModal.classList.contains('active')) {
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');
        if (lightboxImg) lightboxImg.src = src;
        if (lightboxCaption) {
            lightboxCaption.innerText = getFormattedTitle(activeCar);
        }
    }
}

// Select category view fallback helper
function selectGalleryView(viewKey) {
    if (!activeCar) return;
    const carImages = getCarImageList(activeCar);
    let index = 0;
    if (viewKey === 'exterior') index = 0;
    else if (viewKey === 'interior') index = 1 % carImages.length;
    else if (viewKey === 'cockpit') index = 2 % carImages.length;
    else if (viewKey === 'engine') index = 3 % carImages.length;
    changeActiveImageIndex(index);
}

// Gallery thumbnail trigger legacy helper
function changeActiveImage(element, src, viewKey) {
    if (element && element.hasAttribute('data-index')) {
        changeActiveImageIndex(parseInt(element.getAttribute('data-index'), 10));
    } else if (activeCarImages && src) {
        const idx = activeCarImages.indexOf(src);
        if (idx !== -1) changeActiveImageIndex(idx);
    }
}

// Scroll thumbnail strip horizontally with arrow buttons
function scrollThumbnails(direction) {
    if (!activeCarImages || activeCarImages.length === 0) return;

    const strip = document.getElementById('galleryThumbnails');
    let containerWidth = strip ? strip.clientWidth : 380;
    if (containerWidth <= 0) containerWidth = 380;

    const visibleCount = Math.max(1, Math.floor((containerWidth + 8) / (85 + 8)));
    const maxStartIndex = Math.max(0, activeCarImages.length - visibleCount);

    if (direction === -1) {
        thumbStartIndex = Math.max(0, thumbStartIndex - 1);
    } else if (direction === 1) {
        thumbStartIndex = Math.min(maxStartIndex, thumbStartIndex + 1);
    }

    renderThumbnailStrip();
}

window.addEventListener('resize', () => {
    if (activeCar && document.getElementById('carModal')?.classList.contains('active')) {
        renderThumbnailStrip();
    }
});

// Navigate images forward (+1) or backward (-1)
function navigateImage(direction) {
    if (!activeCar) return;
    if (!activeCarImages || activeCarImages.length === 0) {
        activeCarImages = getCarImageList(activeCar);
    }
    if (activeCarImages.length === 0) return;

    const nextIndex = (currentActiveImageIndex + direction + activeCarImages.length) % activeCarImages.length;
    changeActiveImageIndex(nextIndex);
}

// Global keyboard arrow key navigation
document.addEventListener('keydown', (e) => {
    const carModal = document.getElementById('carModal');
    const lightboxModal = document.getElementById('lightboxModal');

    const isCarModalOpen = carModal && carModal.style.display === 'flex';
    const isLightboxOpen = lightboxModal && lightboxModal.classList.contains('active');

    if (isCarModalOpen || isLightboxOpen) {
        if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        } else if (e.key === 'Escape') {
            if (isLightboxOpen) {
                closeLightbox();
            } else if (isCarModalOpen) {
                closeModal();
            }
        }
    }
});

// Open Lightbox for full uncropped picture inspection
function openLightbox() {
    if (!activeCar) return;
    const activeImg = document.getElementById('activeGalleryImg');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (lightboxModal && lightboxImg && activeImg) {
        lightboxImg.src = activeImg.src;
        
        if (lightboxCaption) {
            lightboxCaption.innerText = getFormattedTitle(activeCar);
        }
        
        lightboxModal.classList.add('active');
    }
}

// Close Lightbox modal
function closeLightbox(event) {
    if (event && event.target && event.target.tagName === 'IMG') {
        return; // Don't close if user clicks directly on the image inside lightbox
    }
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.classList.remove('active');
    }
}

// Sourcing Details Dynamic Pricing Calculator (Sweden-Tema cost breakdown)
function calculateDynamicPricing() {
    if (!activeCar) return;

    const basePrice = activeCar.basePriceGHS;
    const freightPrice = 35000; // Flat Ogyafadum shipping/freight slip

    // Check customizer add-on pricing inputs
    let customizerSum = 0;
    const ceramicOpt = document.getElementById('addCeramic');
    if (ceramicOpt && ceramicOpt.checked) customizerSum += 4500;
    const partsOpt = document.getElementById('addPartsKit');
    if (partsOpt && partsOpt.checked) customizerSum += 3200;
    const leatherOpt = document.getElementById('addLeather');
    if (leatherOpt && leatherOpt.checked) customizerSum += 1800;

    const totalLanding = basePrice + freightPrice + customizerSum;

    // Populate Pricing breakdown labels if they exist in the DOM
    const sidebarBasePrice = document.getElementById('sidebarBasePrice');
    if (sidebarBasePrice) sidebarBasePrice.innerText = `GH₵ ${basePrice.toLocaleString()}`;
    const breakdownBase = document.getElementById('breakdownBase');
    if (breakdownBase) breakdownBase.innerText = `GH₵ ${basePrice.toLocaleString()}`;
    const breakdownFreight = document.getElementById('breakdownFreight');
    if (breakdownFreight) breakdownFreight.innerText = `GH₵ ${freightPrice.toLocaleString()}`;
    const breakdownCustomizer = document.getElementById('breakdownCustomizer');
    if (breakdownCustomizer) breakdownCustomizer.innerText = `GH₵ ${customizerSum.toLocaleString()}`;
    const totalLandingPrice = document.getElementById('totalLandingPrice');
    if (totalLandingPrice) totalLandingPrice.innerText = `GH₵ ${totalLanding.toLocaleString()}`;

    // Prefill custom WhatsApp action anchor
    const isSold = activeCar.specs.status.toLowerCase() === 'sold';
    let waText = "";
    if (isSold) {
        waText = `Hello Ogyafadum Car Imports, I see your Sweden-sourced "${activeCar.title}" is currently marked sold. Can you help me source and import a matching unit from Gothenburg auctions?`;
    } else {
        waText = `Hello Ogyafadum Car Imports, I am highly interested in securing a sourcing slot for the "${activeCar.title}" (ID: ${activeCar.id}). Please advise on the sourcing and logistics process.`;
    }

    const waLink = document.getElementById('sidebarWhatsappBtn');
    if (waLink) {
        waLink.href = `https://wa.me/233540677510?text=${encodeURIComponent(waText)}`;
    }
}

// Swedac Quality Inspection accordion toggle handler
function toggleAccordion(panelId) {
    const activePanel = document.getElementById(panelId);
    
    const isCurrentlyActive = activePanel.classList.contains('active');
    
    // Close all other panels
    document.querySelectorAll('.inspection-panel').forEach(p => p.classList.remove('active'));
    
    if (!isCurrentlyActive) {
        activePanel.classList.add('active');
    }
}

// Graceful View toggler: back to Showroom dashboard
function closeDetailsView() {
    activeCar = null;
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // restore scrolling
    }

    // Remove parameters from browser URL address bar
    window.history.pushState(null, '', window.location.pathname);
}

// Backdrop overlay clicking / click-out dismiss helper
function closeModal(event) {
    if (event && event.target !== event.currentTarget) {
        return; // ignore clicks inside modal-wrapper
    }
    closeDetailsView();
}

// ==========================================================================
// 7. Deep Linking Launcher (Loads specific details on URL match query)
// ==========================================================================
function setupDeepLinking() {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('car');
    
    if (carId) {
        const carExists = carData.some(c => c.id === carId);
        if (carExists) {
            // Soft timeout to ensure DOM structure is fully available prior routing
            setTimeout(() => {
                showDetailsView(carId);
            }, 100);
        }
    }
}
