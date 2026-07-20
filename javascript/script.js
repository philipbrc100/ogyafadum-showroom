// ==========================================================================
// OGYAFADUM CAR IMPORTS - INVENTORY ENGINE (RESPONSIVE & TOUCH-OPTIMIZED)
// ==========================================================================

// 1. Core Vehicle Database Array (20 Premium Fleet)
// ==========================================================================
const carData = [
    {
        id: "car-028",
        badge: "Premium Sedan",
        title: "Toyota Hilux 2.4 D 4WD (150hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 19 587 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-028-exterior.jpg",
            interior: "assets/car-028-interior.jpg",
            cockpit: "assets/car-028-cockpit.jpg",
            engine: "assets/car-028-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2016", status: "Available", hp: "150 hp", transmission: "Automatic", plate: "KVD-344" },
        basePriceGHS: 270000
    },
    {
        id: "car-027",
        badge: "Hybrid SUV",
        title: "Toyota C-HR 1.8 HSD (122hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 8 887 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-027-exterior.jpg",
            interior: "assets/car-027-interior.jpg",
            cockpit: "assets/car-027-cockpit.jpg",
            engine: "assets/car-027-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2019", status: "Available", hp: "98 hp", transmission: "Automatic", plate: "KVD-590" },
        basePriceGHS: 265000
    },
    {
        id: "car-026",
        badge: "Hybrid Sedan",
        title: "Toyota Yaris Cross 1.5 Hybrid AWD (116hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 1 987 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-026-exterior.jpg",
            interior: "assets/car-026-interior.jpg",
            cockpit: "assets/car-026-cockpit.jpg",
            engine: "assets/car-026-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2022", status: "Available", hp: "92 hp", transmission: "Automatic", plate: "KVD-408" },
        basePriceGHS: 355000
    },
    {
        id: "car-025",
        badge: "Hybrid SUV",
        title: "Toyota RAV4 2.5 HSD AWD (222hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 4 454 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-025-exterior.jpg",
            interior: "assets/car-025-interior.jpg",
            cockpit: "assets/car-025-cockpit.jpg",
            engine: "assets/car-025-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2024", status: "Available", hp: "178 hp", transmission: "Automatic", plate: "KVD-913" },
        basePriceGHS: 610000
    },
    {
        id: "car-024",
        badge: "Hybrid Sedan",
        title: "Toyota Prius 1.5 Hybrid (78hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 14 803 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-024-exterior.jpg",
            interior: "assets/car-024-interior.jpg",
            cockpit: "assets/car-024-cockpit.jpg",
            engine: "assets/car-024-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2008", status: "Available", hp: "78 hp", transmission: "Automatic", plate: "KVD-198" },
        basePriceGHS: 35000
    },
    {
        id: "car-023",
        badge: "Hybrid Sedan",
        title: "Toyota Yaris 1.5 Hybrid 5dr (116hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 8 319 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-023-exterior.jpg",
            interior: "assets/car-023-interior.jpg",
            cockpit: "assets/car-023-cockpit.jpg",
            engine: "assets/car-023-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2022", status: "Available", hp: "92 hp", transmission: "Automatic", plate: "KVD-636" },
        basePriceGHS: 255000
    },
    {
        id: "car-022",
        badge: "Hybrid Estate",
        title: "Toyota Corolla 1.8 Hybrid Touring Sports (122hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 13 272 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-022-exterior.jpg",
            interior: "assets/car-022-interior.jpg",
            cockpit: "assets/car-022-cockpit.jpg",
            engine: "assets/car-022-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2020", status: "Available", hp: "98 hp", transmission: "Automatic", plate: "KVD-895" },
        basePriceGHS: 170000
    },
    {
        id: "car-001",
        badge: "Premium Sedan",
        title: "Toyota Yaris 1.33 5dr (100hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 11 379 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-001-exterior.jpg",
            interior: "assets/car-001-interior.jpg",
            cockpit: "assets/car-001-cockpit.jpg",
            engine: "assets/car-001-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2010", status: "Available", hp: "101 hp", transmission: "Automatic", plate: "SXC-901" },
        basePriceGHS: 100000
    },
    {
        id: "car-040",
        badge: "Premium SUV",
        title: "BMW X3 xDrive20d, F25 (190hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained BMW with a fully documented 11 754 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-040-exterior.jpg",
            interior: "assets/car-040-interior.jpg",
            cockpit: "assets/car-040-cockpit.jpg",
            engine: "assets/car-040-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", status: "Available", hp: "190 hp", transmission: "Automatic", plate: "KVD-215" },
        basePriceGHS: 255000
    },
    {
        id: "car-039",
        badge: "Premium Wagon",
        title: "BMW 530d xDrive Touring, F11 (258hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained BMW with a fully documented 16 592 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-039-exterior.jpg",
            interior: "assets/car-039-interior.jpg",
            cockpit: "assets/car-039-cockpit.jpg",
            engine: "assets/car-039-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2014", status: "Available", hp: "258 hp", transmission: "Automatic", plate: "KVD-177" },
        basePriceGHS: 175000
    },
    {
        id: "car-038",
        badge: "Premium Sedan",
        title: "BMW 330d GT xDrive, F34 (258hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained BMW with a fully documented 17 991 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-038-exterior.jpg",
            interior: "assets/car-038-interior.jpg",
            cockpit: "assets/car-038-cockpit.jpg",
            engine: "assets/car-038-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", status: "Available", hp: "258 hp", transmission: "Automatic", plate: "KVD-293" },
        basePriceGHS: 190000
    },
    {
        id: "car-037",
        badge: "Premium SUV",
        title: "Honda CR-V 1 6i-DTEC 2WD (120hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Honda with a fully documented 10 734 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-037-exterior.jpg",
            interior: "assets/car-037-interior.jpg",
            cockpit: "assets/car-037-cockpit.jpg",
            engine: "assets/car-037-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2014", status: "Available", hp: "120 hp", transmission: "Manual", plate: "KVD-415" },
        basePriceGHS: 145000
    },
    {
        id: "car-036",
        badge: "Premium Wagon",
        title: "Audi A4 Avant 40 TDI quattro (204hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 12 458 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-036-exterior.jpg",
            interior: "assets/car-036-interior.jpg",
            cockpit: "assets/car-036-cockpit.jpg",
            engine: "assets/car-036-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2023", status: "Available", hp: "204 hp", transmission: "Automatic", plate: "KVD-625" },
        basePriceGHS: 230000
    },
    {
        id: "car-035",
        badge: "Premium Sedan",
        title: "Audi A5 Sportback 45 TFSI quattro (265hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 11 852 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-035-exterior.jpg",
            interior: "assets/car-035-interior.jpg",
            cockpit: "assets/car-035-cockpit.jpg",
            engine: "assets/car-035-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2021", status: "Available", hp: "265 hp", transmission: "Automatic", plate: "KVD-895" },
        basePriceGHS: 255000
    },
    {
        id: "car-034",
        badge: "Premium SUV",
        title: "Audi Q3 40 TDI quattro (200hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 8 635 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-034-exterior.jpg",
            interior: "assets/car-034-interior.jpg",
            cockpit: "assets/car-034-cockpit.jpg",
            engine: "assets/car-034-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2021", status: "Available", hp: "200 hp", transmission: "Automatic", plate: "KVD-460" },
        basePriceGHS: 255000
    },
    {
        id: "car-033",
        badge: "Electric SUV",
        title: "Audi e-tron 55 quattro 95kWh (360hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Audi with a fully documented 18 524 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-033-exterior.jpg",
            interior: "assets/car-033-interior.jpg",
            cockpit: "assets/car-033-cockpit.jpg",
            engine: "assets/car-033-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2021", status: "Available", hp: "408 hp", transmission: "Automatic", plate: "KVD-949" },
        basePriceGHS: 215000
    },
    {
        id: "car-032",
        badge: "Electric Compact",
        title: "Nissan LEAF 5dr 59kWh (214hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 3 241 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-032-exterior.jpg",
            interior: "assets/car-032-interior.jpg",
            cockpit: "assets/car-032-cockpit.jpg",
            engine: "assets/car-032-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2023", status: "Available", hp: "218 hp", transmission: "Automatic", plate: "KVD-948" },
        basePriceGHS: 205000
    },
    {
        id: "car-031",
        badge: "Electric SUV",
        title: "Nissan Ariya 87kWh e-4orce (306hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 5 175 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-031-exterior.jpg",
            interior: "assets/car-031-interior.jpg",
            cockpit: "assets/car-031-cockpit.jpg",
            engine: "assets/car-031-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2023", status: "Available", hp: "306 hp", transmission: "Automatic", plate: "KVD-552" },
        basePriceGHS: 450000
    },
    {
        id: "car-030",
        badge: "Premium SUV",
        title: "Nissan X-Trail e-Power (204hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 4 164 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-030-exterior.jpg",
            interior: "assets/car-030-interior.jpg",
            cockpit: "assets/car-030-cockpit.jpg",
            engine: "assets/car-030-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2023", status: "Available", hp: "158 hp", transmission: "Automatic", plate: "KVD-379" },
        basePriceGHS: 360000
    },
    {
        id: "car-029",
        badge: "Premium SUV",
        title: "Nissan Qashqai 1.2 (115hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 8 415 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-029-exterior.jpg",
            interior: "assets/car-029-interior.jpg",
            cockpit: "assets/car-029-cockpit.jpg",
            engine: "assets/car-029-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2017", status: "Available", hp: "116 hp", transmission: "Automatic", plate: "KVD-493" },
        basePriceGHS: 255000
    },
    
];

// Active vehicle state
let activeCar = null;

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

    // 2. Populate Breadcrumb & Header Info
    const breadcrumbTitle = document.getElementById('detailsBreadcrumbTitle');
    if (breadcrumbTitle) breadcrumbTitle.innerText = car.title;
    
    document.getElementById('detailsTitle').innerText = car.title;
    document.getElementById('detailsBadge').innerText = car.badge;
    document.getElementById('detailsDesc').innerText = car.desc;

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

    // 4. Reset & Render gallery image switcher
    const activeImg = document.getElementById('activeGalleryImg');
    activeImg.src = car.images.exterior;

    const thumbnailStrip = document.getElementById('galleryThumbnails');
    const views = [
        { label: 'Exterior', key: 'exterior' },
        { label: 'Interior', key: 'interior' },
        { label: 'Cockpit', key: 'cockpit' },
        { label: 'Underhood', key: 'engine' }
    ];

    thumbnailStrip.innerHTML = views.map((view, i) => `
        <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="changeActiveImage(this, '${car.images[view.key]}')">
            <img src="${car.images[view.key]}" alt="${view.label} view" loading="lazy">
        </div>
    `).join('');

    // 5. Populate Tech specs tables
    document.getElementById('specOriginField').innerText = car.specs.origin;
    document.getElementById('specOutputField').innerText = car.specs.hp;
    document.getElementById('specFuelField').innerText = car.specs.type;
    document.getElementById('specTransmissionField').innerText = car.specs.transmission;
    document.getElementById('specPlateField').innerText = car.specs.plate;
    document.getElementById('specYearField').innerText = car.specs.year;
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

// Gallery thumbnail trigger helper
function changeActiveImage(element, src) {
    document.querySelectorAll('.thumb-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('activeGalleryImg').src = src;
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
