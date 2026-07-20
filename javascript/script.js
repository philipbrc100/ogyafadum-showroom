// ==========================================================================
// OGYAFADUM CAR IMPORTS - INVENTORY ENGINE (RESPONSIVE & TOUCH-OPTIMIZED)
// ==========================================================================

// 1. Core Vehicle Database Array (20 Premium Fleet)
// ==========================================================================
const carData = [
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
        title: "Toyota Aygo 1.0 VVT-i 5dr (68hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Toyota with a fully documented 11 116 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-001-exterior.jpg",
            interior: "assets/car-001-interior.jpg",
            cockpit: "assets/car-001-cockpit.jpg",
            engine: "assets/car-001-engine.jpg"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2010", status: "Available", hp: "68 hp", transmission: "Manual", plate: "SXC-901" },
        basePriceGHS: 55000
    },
    {
        id: "car-002",
        badge: "Luxury Sedan",
        title: "BMW 530e iPerformance",
        desc: "Executive saloon with premium leather interior and advanced driver assistance systems.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Plug-in Hybrid", year: "2021", status: "Available", hp: "252 hp", transmission: "8-Speed Automatic", plate: "BDE-530" },
        basePriceGHS: 360000
    },
    {
        id: "car-003",
        badge: "Electric Compact",
        title: "Tesla Model 3 Long Range",
        desc: "Pure electric power with long-range dual motor capability. Ultra-clean import.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2021", status: "Sold", hp: "346 hp", transmission: "Single Speed", plate: "TSL-301" },
        basePriceGHS: 385000
    },
    {
        id: "car-004",
        badge: "Family SUV",
        title: "Audi Q5 40 TDI Quattro",
        desc: "Highly efficient diesel cruiser with matrix LED headlights and spacious cargo layout.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Turbo", year: "2020", status: "Available", hp: "190 hp", transmission: "7-Speed S-Tronic", plate: "AQD-040" },
        basePriceGHS: 310000
    },
    {
        id: "car-005",
        badge: "Compact SUV",
        title: "Volvo XC40 D4 AWD",
        desc: "Smart urban design combined with Sweden's industry-leading safety tech suites.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2019", status: "Available", hp: "190 hp", transmission: "8-Speed Automatic", plate: "VXC-404" },
        basePriceGHS: 275000
    },
    {
        id: "car-006",
        badge: "Executive Estate",
        title: "Mercedes-Benz E220d Wagon",
        desc: "The ultimate long-distance hauler, sourced from careful ownership in Gothenburg.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2021", status: "In Transit", hp: "194 hp", transmission: "9-Speed G-Tronic", plate: "MBE-220" },
        basePriceGHS: 345000
    },
    {
        id: "car-007",
        badge: "Sports Sedan",
        title: "BMW 320i M Sport",
        desc: "Aggressive styling accents with sharp, dynamic handling. Exceptionally low mileage.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Turbo", year: "2020", status: "Available", hp: "184 hp", transmission: "8-Speed Automatic", plate: "BMS-320" },
        basePriceGHS: 290000
    },
    {
        id: "car-008",
        badge: "Electric SUV",
        title: "Volkswagen ID.4 Pro",
        desc: "Next-generation green mobility with massive central infotainment and panoramic roof.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Electric", year: "2022", status: "Available", hp: "204 hp", transmission: "Single Speed", plate: "VID-400" },
        basePriceGHS: 350000
    },
    {
        id: "car-009",
        badge: "Premium Hatch",
        title: "Audi A3 Sportback TFSIe",
        desc: "Compact premium plug-in hybrid tailored for nimble city commuting profiles.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Plug-in Hybrid", year: "2021", status: "Available", hp: "204 hp", transmission: "6-Speed S-Tronic", plate: "ATF-021" },
        basePriceGHS: 260000
    },
    {
        id: "car-010",
        badge: "Coupe SUV",
        title: "BMW X4 xDrive30i",
        desc: "Sporty fastback silhouette lines featuring custom premium alloy wheel upgrades.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Turbo", year: "2020", status: "Sold", hp: "252 hp", transmission: "8-Speed Automatic", plate: "BXW-430" },
        basePriceGHS: 340000
    },
    {
        id: "car-011",
        badge: "Luxury SUV",
        title: "Range Rover Velar D300",
        desc: "Striking avant-garde aesthetics paired with powerful twin-turbo pull performance.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Twin-Turbo", year: "2019", status: "Available", hp: "300 hp", transmission: "8-Speed Automatic", plate: "RRV-300" },
        basePriceGHS: 395000
    },
    {
        id: "car-012",
        badge: "Luxury Sedan",
        title: "Volvo S90 D4 Inscription",
        desc: "Top-tier Scandinavian luxury trim tier with fine wooden inlays and crystal gear selector.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2020", status: "Available", hp: "190 hp", transmission: "8-Speed Automatic", plate: "VSI-904" },
        basePriceGHS: 295000
    },
    {
        id: "car-013",
        badge: "Electric Crossover",
        title: "Kia EV6 GT-Line",
        desc: "Ultra-fast charging architecture with futuristic cockpit design layouts.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2022", status: "In Transit", hp: "325 hp", transmission: "Single Speed", plate: "KEV-602" },
        basePriceGHS: 355000
    },
    {
        id: "car-014",
        badge: "Premium SUV",
        title: "Mercedes-Benz GLC 300de",
        desc: "Intelligent plug-in diesel hybrid engineering delivering unparalleled fuel efficiency metrics.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Hybrid", year: "2021", status: "Available", hp: "306 hp", transmission: "9-Speed G-Tronic", plate: "MGL-300" },
        basePriceGHS: 370000
    },
    {
        id: "car-015",
        badge: "Performance Hatch",
        title: "Volkswagen Golf GTI Clubsport",
        desc: "Track-focused performance hot-hatch directly imported from premium German enthusiasts.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Turbo", year: "2021", status: "Available", hp: "300 hp", transmission: "7-Speed DSG", plate: "VGT-015" },
        basePriceGHS: 280000
    },
    {
        id: "car-016",
        badge: "Rugged Cross",
        title: "Volvo V60 Cross Country",
        desc: "Raised ride clearance height with robust protection panel borders for rougher road terrains.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol AWD", year: "2020", status: "Available", hp: "250 hp", transmission: "8-Speed Automatic", plate: "VCC-602" },
        basePriceGHS: 290000
    },
    {
        id: "car-017",
        badge: "Compact Premium",
        title: "Mini Cooper S 5-Door",
        desc: "Classic go-kart driving dynamics optimized inside a practical five-door chassis format.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Petrol Sport Turbo", year: "2019", status: "Available", hp: "192 hp", transmission: "7-Speed DCT", plate: "MCS-500" },
        basePriceGHS: 195000
    },
    {
        id: "car-018",
        badge: "Luxury SUV",
        title: "Porsche Macan S",
        desc: "The sports car of compact luxury SUVs, featuring an immaculate twin-turbo V6 engine.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Petrol V6 Twin-Turbo", year: "2020", status: "Sold", hp: "354 hp", transmission: "7-Speed PDK", plate: "PMS-480" },
        basePriceGHS: 430000
    },
    {
        id: "car-019",
        badge: "Flagship Luxury",
        title: "Audi A8 L 50 TDI",
        desc: "Long wheelbase variant offering rear executive lounge seating and elite sound insulation.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Germany 🇩🇪", type: "Diesel Quattro", year: "2021", status: "Available", hp: "286 hp", transmission: "8-Speed Tiptronic", plate: "AQL-850" },
        basePriceGHS: 460000
    },
    {
        id: "car-020",
        badge: "Electric Fastback",
        title: "Polestar 2 Long Range",
        desc: "Premium electric performance fastback from Sweden, offering minimal minimalist design and high output.",
        images: { 
            exterior: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80", 
            interior: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            cockpit: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
            engine: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
        },
        specs: { origin: "Sweden 🇸🇪", type: "Electric", year: "2022", status: "Available", hp: "408 hp", transmission: "Single Speed", plate: "PST-202" },
        basePriceGHS: 390000
    }
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
