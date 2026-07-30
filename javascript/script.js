// ==========================================================================
// OGYAFADUM CAR IMPORTS - INVENTORY ENGINE (RESPONSIVE & TOUCH-OPTIMIZED)
// ==========================================================================

// 1. Core Vehicle Database Array (20 Premium Fleet)
// ==========================================================================
const carData = [
    {
        id: "car-047",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 20 672 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-047-img-01.jpg",
            interior: "assets/car-047-img-02.jpg",
            cockpit: "assets/car-047-img-03.jpg",
            engine: "assets/car-047-img-04.jpg",
            all: [
                "assets/car-047-img-01.jpg",
                "assets/car-047-img-02.jpg",
                "assets/car-047-img-03.jpg",
                "assets/car-047-img-04.jpg",
                "assets/car-047-img-05.jpg",
                "assets/car-047-img-06.jpg",
                "assets/car-047-img-07.jpg",
                "assets/car-047-img-08.jpg",
                "assets/car-047-img-09.jpg",
                "assets/car-047-img-10.jpg",
                "assets/car-047-img-11.jpg",
                "assets/car-047-img-12.jpg",
                "assets/car-047-img-13.jpg",
                "assets/car-047-img-14.jpg",
                "assets/car-047-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", mileage: "20 672 mil", status: "Available", hp: "160 Hk", transmission: "Manual", plate: "SWE-667" },
        equipment: ["ABS brakes","Airbag driver","Airbag passenger front","Anti-cable","AUX input","Dazzling inner-back mirror","Shutdownable airbag passenger","Backstart help","Children's lock","Brake assistance","CD-Stereo","Central lock (districted)","Divisible rear seat","Fog light up front","Electrical lifts (front and rear)","Electrically heated side mirrors","Euro 6","Euro NCAP 5","Speed limiter","Cruise control","Folding rear seats","Road computer","ISOFIX mounts rear","Cooled glove compartment","Light sensor","Reading lamp","Parking sensor front","Rails","Rain sensor","Power steering","Side airbags","Side impact curtains","Makeup mirror","Start/stop function","Starting barrier","USB socket","Touch/Touchscreen","ACC 2 climate zones","Seat heating (front)","Light metal rims","Central lock","Reversing camera","Airbag rear","Towbar","fixed","Carpets (rubber)","ACC","Outer temperature gauge","LED Headlights","Hands-free connection","Transparency protection","Towbar","removable/turnable","Spare wheel","Clothing (fabric)","Four-wheel drive"]
    },
    {
        id: "car-046",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 13 477 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-046-img-01.jpg",
            interior: "assets/car-046-img-02.jpg",
            cockpit: "assets/car-046-img-03.jpg",
            engine: "assets/car-046-img-04.jpg",
            all: [
                "assets/car-046-img-01.jpg",
                "assets/car-046-img-02.jpg",
                "assets/car-046-img-03.jpg",
                "assets/car-046-img-04.jpg",
                "assets/car-046-img-05.jpg",
                "assets/car-046-img-06.jpg",
                "assets/car-046-img-07.jpg",
                "assets/car-046-img-08.jpg",
                "assets/car-046-img-09.jpg",
                "assets/car-046-img-10.jpg",
                "assets/car-046-img-11.jpg",
                "assets/car-046-img-12.jpg",
                "assets/car-046-img-13.jpg",
                "assets/car-046-img-14.jpg",
                "assets/car-046-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2020", mileage: "13 477 mil", status: "Available", hp: "215 Hk", transmission: "Automatic", plate: "SWE-432" },
        equipment: ["ABS brakes","Four-wheel drive","Anti-cable/Anti-spins","ACC/Climate plant","Airbag driver/Passenger front","Side airbags/Sidock Rock Curtains","Airbag rear","Shutdownable airbag passenger","Keyless/Key-Free Start","Touch/Touchscreen","Bluetooth Hands-free/Music streaming","GPS/Navination","Apple CarPlay/Android Auto","Reversing camera","Front/rear parking sensors","Adaptive cruise control","Clothing (fabric)","Seat heating (front)","Auto brake","AUX input","Dazzling inner-back mirror","Backstart help","Children's lock","Brake assistance","Central lock (districted)","Divisible rear seat","Digital meter house","Elin retractable side mirrors","Electrically heated side mirrors","Euro 6","Euro NCAP 5","Folding rear seats","ISOFIX mounts rear","Cooled glove compartment","Driver Assistance","Multifunction steering wheel","Starting barrier","Heated windscreen wipers","USB socket","Outer temperature gauge","Electrical lifts (front and rear)","Handbrake (electronic)","LED Headlights","Full-light assistance","Fog light up front","Flat cargo space","Rain sensor","Start/stop function","Tinted squares","Switchboard paddles","18\" Light alloy wheels"]
    },
    {
        id: "car-045",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 7 612 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-045-img-01.jpg",
            interior: "assets/car-045-img-02.jpg",
            cockpit: "assets/car-045-img-03.jpg",
            engine: "assets/car-045-img-04.jpg",
            all: [
                "assets/car-045-img-01.jpg",
                "assets/car-045-img-02.jpg",
                "assets/car-045-img-03.jpg",
                "assets/car-045-img-04.jpg",
                "assets/car-045-img-05.jpg",
                "assets/car-045-img-06.jpg",
                "assets/car-045-img-07.jpg",
                "assets/car-045-img-08.jpg",
                "assets/car-045-img-09.jpg",
                "assets/car-045-img-10.jpg",
                "assets/car-045-img-11.jpg",
                "assets/car-045-img-12.jpg",
                "assets/car-045-img-13.jpg",
                "assets/car-045-img-14.jpg",
                "assets/car-045-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2020", mileage: "7 612 mil", status: "Available", hp: "215 Hk", transmission: "Automatic", plate: "SWE-287" },
        equipment: ["Towbar","fixed","ABS brakes","ACC","Airbag driver","Airbag passenger front","Anti-cable","Auto brake","AUX input","Dazzling inner-back mirror","Shutdownable airbag passenger","Backstart help","Children's lock","Hands-free connection","Brake assistance","Central lock (districted)","Divisible rear seat","Digital meter house","Elin retractable side mirrors","Electrically heated side mirrors","Euro 6","Euro NCAP 5","Speed limiter","Folding rear seats","Road computer","ISOFIX mounts rear","Keyless Keyless Start","Cooled glove compartment","Driver Assistance","Light sensor","Reading lamp","Multifunction steering wheel","Flat cargo space","Spare wheel","Power steering","Side airbags","Side impact curtains","Makeup mirror","Starting barrier","Swedish sold","Heated windscreen wipers","USB socket","Outer temperature gauge"]
    },
    {
        id: "car-044",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 5 820 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-044-img-01.jpg",
            interior: "assets/car-044-img-02.jpg",
            cockpit: "assets/car-044-img-03.jpg",
            engine: "assets/car-044-img-04.jpg",
            all: [
                "assets/car-044-img-01.jpg",
                "assets/car-044-img-02.jpg",
                "assets/car-044-img-03.jpg",
                "assets/car-044-img-04.jpg",
                "assets/car-044-img-05.jpg",
                "assets/car-044-img-06.jpg",
                "assets/car-044-img-07.jpg",
                "assets/car-044-img-08.jpg",
                "assets/car-044-img-09.jpg",
                "assets/car-044-img-10.jpg",
                "assets/car-044-img-11.jpg",
                "assets/car-044-img-12.jpg",
                "assets/car-044-img-13.jpg",
                "assets/car-044-img-14.jpg",
                "assets/car-044-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2024", mileage: "5 820 mil", status: "Available", hp: "184 Hk", transmission: "Automatic", plate: "SWE-359" },
        equipment: ["e-HEV Hybrid","E-CVT Aut. transmission","Panoramic glass ceiling","Navigation","Reversing camera","Front & rear parking sensors","Leather steering with heat","Wireless charger","Wireless Apple Carplay","Wireless Andoir Auto","Honda Connect","Tinted squares","Leather upholstery","Adaptive cruise control","Hands-free tailgate","Honda Sensing","LED headlights","Electric chair driver","Keyless Go","Electrically operated tailgate","8 speakers","ABS brakes","ACC","ACC 2 climate zones","Airbag driver","Airbag passenger front","Auto brake","Dazzling inner-back mirror","Shutdownable airbag passenger","Backstart help","Children's lock","Hands-free connection","Brake assistance","Central lock (districted)","Divisible rear seat","Digital Radio (DAB)","Digital meter house","Electrical lifts (front and rear)","Elstol passenger","Electrically heated side mirrors","Euro 6","Euro NCAP 5","Speed limiter","Folding rear seats","Road computer","GPS","ISOFIX mounts rear","Driver Assistance","Light sensor","Flat cargo space","Rails","Power steering","Side airbags","Side impact curtains","Sign recognition","Start/stop function","Starting barrier","Theft alarm","Seat heating (front)","Touch/Touchscreen","Fatigue Alerts","USB socket","Outer temperature gauge"]
    },
    {
        id: "car-043",
        badge: "SUV",
        title: "Honda HR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained HR-V with a fully documented 6 600 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-043-img-01.jpg",
            interior: "assets/car-043-img-02.jpg",
            cockpit: "assets/car-043-img-03.jpg",
            engine: "assets/car-043-img-04.jpg",
            all: [
                "assets/car-043-img-01.jpg",
                "assets/car-043-img-02.jpg",
                "assets/car-043-img-03.jpg",
                "assets/car-043-img-04.jpg",
                "assets/car-043-img-05.jpg",
                "assets/car-043-img-06.jpg",
                "assets/car-043-img-07.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2022", mileage: "6 600 mil", status: "Available", hp: "131 Hk", transmission: "Automatic", plate: "SWE-363" },
        equipment: ["ABS brakes","ACC air conditioning","Airbag driver","Airbag passenger front (closingable)","Android Auto","Anti-cable system","Antispin","Apple CarPlay","Auto brake","AUX input","Reversing camera","Bluetooth hands-free","Central lock (districted)","Divisible rear seat","Electric window lifts (rears)","Electric window lifts (front)","Elinable Side Mirrors","Adaptive cruise control","File change warning","Road computer","GPS","Handbrake (electronic)","Full-light assistance","Isofix mounts at the rear","Touchscreen","Keyless system (Keyless)","Multifunction steering wheel","Magic Seats Seats Seats","Light metal rims","Clothing (fabric)","Rain sensor","Power steering","Side airbags","Sign Scanning","Seat heating front","Winter Wheel Friction"]
    },
    {
        id: "car-042",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 4 100 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-042-img-01.jpg",
            interior: "assets/car-042-img-02.jpg",
            cockpit: "assets/car-042-img-03.jpg",
            engine: "assets/car-042-img-04.jpg",
            all: [
                "assets/car-042-img-01.jpg",
                "assets/car-042-img-02.jpg",
                "assets/car-042-img-03.jpg",
                "assets/car-042-img-04.jpg",
                "assets/car-042-img-05.jpg",
                "assets/car-042-img-06.jpg",
                "assets/car-042-img-07.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2024", mileage: "4 100 mil", status: "Available", hp: "184 Hk", transmission: "Automatic", plate: "SWE-333" },
        equipment: ["ABS brakes","ACC air conditioning","Airbag driver","Airbag passenger front (closingable)","Android Auto","Anti-cable system","Antispin","Apple CarPlay","Auto brake","AUX input","Reversing camera","Luggage hatch (electric)","Bluetooth hands-free","Central lock (districted)","Divisible rear seat","Dead Angle Warning","Electric window lifts (rears)","Electric window lifts (front)","Elinable Side Mirrors","Electrically operated driver's seat","Adaptive cruise control","File change warning","Road computer","GPS","Handbrake (electronic)","Full-light assistance","Isofix mounts at the rear","Touchscreen","Panorama glass ceiling (Invisible)","Front parking sensors front + rear","Keyless system (Keyless)","Multifunction steering wheel","Light metal rims","LED Headlights","Fully dressed leather seats","Steering wheel heating","Rain sensor","Power steering","Side airbags","Sign Scanning","Theft alarm","Swedish sold","Seat heating front","Winter wheels alloy wheels"]
    },
    {
        id: "car-041",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 21 415 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-041-img-01.jpg",
            interior: "assets/car-041-img-02.jpg",
            cockpit: "assets/car-041-img-03.jpg",
            engine: "assets/car-041-img-04.jpg",
            all: [
                "assets/car-041-img-01.jpg",
                "assets/car-041-img-02.jpg",
                "assets/car-041-img-03.jpg",
                "assets/car-041-img-04.jpg",
                "assets/car-041-img-05.jpg",
                "assets/car-041-img-06.jpg",
                "assets/car-041-img-07.jpg",
                "assets/car-041-img-08.jpg",
                "assets/car-041-img-09.jpg",
                "assets/car-041-img-10.jpg",
                "assets/car-041-img-11.jpg",
                "assets/car-041-img-12.jpg",
                "assets/car-041-img-13.jpg",
                "assets/car-041-img-14.jpg",
                "assets/car-041-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2014", mileage: "21 415 mil", status: "Available", hp: "150 Hk", transmission: "Automatic", plate: "SWE-539" },
        equipment: ["Summer wheels","Winter tyres on rim","Towbar","fixed","Half-skin","Reversing camera","Electrically retractable side mirrors","ACC/Climate plant","Elhissar front and back","Cruise control","Road computer","Multifunction steering wheel","Chair heat front","Bluetooth","Rails","Rain sensor","Airbag driver","Airbag passenger","Isofix"]
    },
    {
        id: "car-040",
        badge: "SUV",
        title: "Honda CR-V",
        desc: "Sourced directly from Sweden. Exceptionally maintained CR-V with a fully documented 20 704 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-040-img-01.jpg",
            interior: "assets/car-040-img-02.jpg",
            cockpit: "assets/car-040-img-03.jpg",
            engine: "assets/car-040-img-04.jpg",
            all: [
                "assets/car-040-img-01.jpg",
                "assets/car-040-img-02.jpg",
                "assets/car-040-img-03.jpg",
                "assets/car-040-img-04.jpg",
                "assets/car-040-img-05.jpg",
                "assets/car-040-img-06.jpg",
                "assets/car-040-img-07.jpg",
                "assets/car-040-img-08.jpg",
                "assets/car-040-img-09.jpg",
                "assets/car-040-img-10.jpg",
                "assets/car-040-img-11.jpg",
                "assets/car-040-img-12.jpg",
                "assets/car-040-img-13.jpg",
                "assets/car-040-img-14.jpg",
                "assets/car-040-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2015", mileage: "20 704 mil", status: "Available", hp: "155 Hk", transmission: "Automatic", plate: "SWE-789" },
        equipment: ["Panoramic glass ceiling","Towbar","fixed","Reversing camera","GPS","Cruise control","Speed limiter","Luggage hatch (district)","Elstol driver with memory","Cooled glove compartment","Electrically heated side mirrors","ISOFIX mounts rear","ABS brakes","Airbag driver","Airbag passenger front","Anti-cable","AUX input","Dazzling inner-back mirror","Shutdownable airbag passenger","Backstart help","Children's lock","Brake assistance","CD-Stereo","Central lock (districted)","Divisible rear seat","Electrical lifts (front and rear)","Euro 6","Cam chain","Folding rear seats","Road computer","Reading lamp","Rails","Power steering","Side airbags","Side impact curtains","Makeup mirror","Start/stop function","Starting barrier","Swedish sold","USB socket"]
    },
    {
        id: "car-039",
        badge: "Sedan",
        title: "Toyota Camry",
        desc: "Sourced directly from Sweden. Exceptionally maintained Camry with a fully documented 20 990 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-039-img-01.jpg",
            interior: "assets/car-039-img-02.jpg",
            cockpit: "assets/car-039-img-03.jpg",
            engine: "assets/car-039-img-04.jpg",
            all: [
                "assets/car-039-img-01.jpg",
                "assets/car-039-img-02.jpg",
                "assets/car-039-img-03.jpg",
                "assets/car-039-img-04.jpg",
                "assets/car-039-img-05.jpg",
                "assets/car-039-img-06.jpg",
                "assets/car-039-img-07.jpg",
                "assets/car-039-img-08.jpg",
                "assets/car-039-img-09.jpg",
                "assets/car-039-img-10.jpg",
                "assets/car-039-img-11.jpg",
                "assets/car-039-img-12.jpg",
                "assets/car-039-img-13.jpg",
                "assets/car-039-img-14.jpg",
                "assets/car-039-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2024", mileage: "20 990 mil", status: "Available", hp: "218 Hk", transmission: "Automatic", plate: "SWE-126" },
        equipment: ["ABS brakes","ACC","ACC 2 climate zones","Airbag driver","Airbag passenger front","Android Auto","Anti-cable","Apple CarPlay","Auto brake","Dazzling inner-back mirror","Shutdownable airbag passenger","Reversing camera","Backstart help","Luggage room mat","Children's lock","Hands-free connection","Brake assistance","Central lock (districted)","Divisible rear seat","Digital Radio (DAB)","Fog light up front","Electrical lifts (front and rear)","Elin retractable side mirrors","Electric chair driver","Elstol passenger","Electrically heated windshield","Electrically heated side mirrors","Euro 6","Speed limiter","Adaptive cruise control","Folding rear seats","Road computer","GPS","Full-light assistance","ISOFIX mounts rear","Keyless","Fully dressed leather seats","Cooled glove compartment","Driver Assistance","LED Headlights","Light sensor","Reading lamp","Multifunction steering wheel","Parking sensor front","Rain sensor","Spare wheel","Power steering","Side airbags","Side impact curtains","Sign recognition","Makeup mirror","Start/stop function","Starting barrier","Theft alarm","Seat heating (front)","Touch/Touchscreen","USB socket","Outer temperature gauge"]
    },
    {
        id: "car-038",
        badge: "Kombi",
        title: "Toyota Corolla",
        desc: "Sourced directly from Sweden. Exceptionally maintained Corolla with a fully documented 7 100 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-038-img-01.jpg",
            interior: "assets/car-038-img-02.jpg",
            cockpit: "assets/car-038-img-03.jpg",
            engine: "assets/car-038-img-04.jpg",
            all: [
                "assets/car-038-img-01.jpg",
                "assets/car-038-img-02.jpg",
                "assets/car-038-img-03.jpg",
                "assets/car-038-img-04.jpg",
                "assets/car-038-img-05.jpg",
                "assets/car-038-img-06.jpg",
                "assets/car-038-img-07.jpg",
                "assets/car-038-img-08.jpg",
                "assets/car-038-img-09.jpg",
                "assets/car-038-img-10.jpg",
                "assets/car-038-img-11.jpg",
                "assets/car-038-img-12.jpg",
                "assets/car-038-img-13.jpg",
                "assets/car-038-img-14.jpg",
                "assets/car-038-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2021", mileage: "7 100 mil", status: "Available", hp: "122 Hk", transmission: "Automatic", plate: "SWE-285" },
        equipment: ["12V socket","Adaptive cruise control","Airbag front","Aircondition","Antispin","Automatic start/stop","Reversing camera","Bluetooth","Central lock","Dead-Angle Warner","Electric windows","Electric side mirrors","Electric side mirrors","etc. heat","ESC","Cruise control","Filekeeping Assistant","Folding rear seat","Road computer","Full-light assistant","Isofix","Adjustable lumbar support","LED light","Light sensor","Multifunction steering wheel","Keyless start","Radio DAB+","Rain sensor","Side airbags","Sports seats","Takrails","Fatigue Alerts","Heated seats","front","Road sign recognition","Summer tyres on alufälg","Winter tyres on alufälv","Armrest in the middle","Coupé heater","Engine heater","Steering wheel heating","Parking sensor rear","Parking sensor front","Tracking system","Wheel in leather","Apple CarPlay","Android Auto","AUX input","Music streaming","Radio FM","Electric luggage hatch","Partial leather-clad seats"]
    },
    {
        id: "car-037",
        badge: "Pickup",
        title: "Toyota HiLux",
        desc: "Sourced directly from Sweden. Exceptionally maintained HiLux with a fully documented 26 200 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-037-img-01.jpg",
            interior: "assets/car-037-img-02.jpg",
            cockpit: "assets/car-037-img-03.jpg",
            engine: "assets/car-037-img-04.jpg",
            all: [
                "assets/car-037-img-01.jpg",
                "assets/car-037-img-02.jpg",
                "assets/car-037-img-03.jpg",
                "assets/car-037-img-04.jpg",
                "assets/car-037-img-05.jpg",
                "assets/car-037-img-06.jpg",
                "assets/car-037-img-07.jpg",
                "assets/car-037-img-08.jpg",
                "assets/car-037-img-09.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2019", mileage: "26 200 mil", status: "Available", hp: "150 Hk", transmission: "Automatic", plate: "SWE-782" },
        equipment: ["Multifunction steering wheel","ABS","Side airbags","Keyless start","Electric side mirrors","etc. heat","Antispin","ESC","Electric seats without memory","Bluetooth","Power steering","Rain sensor","Dark toneed squares","Starting barrier","Airbag front","Isofix","Filekeeping Assistant","Road computer","Aircondition","Cruise control","Heated seats","front","Central lock","Road sign recognition","12V socket","LED light","Air conditioning","Reversing camera","AUX input","CD player","Electric windows"]
    },
    {
        id: "car-036",
        badge: "Halvkombi 5-dörrar",
        title: "Toyota Yaris",
        desc: "Sourced directly from Sweden. Exceptionally maintained Yaris with a fully documented 10 178 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-036-img-01.jpg",
            interior: "assets/car-036-img-02.jpg",
            cockpit: "assets/car-036-img-03.jpg",
            engine: "assets/car-036-img-04.jpg",
            all: [
                "assets/car-036-img-01.jpg",
                "assets/car-036-img-02.jpg",
                "assets/car-036-img-03.jpg",
                "assets/car-036-img-04.jpg",
                "assets/car-036-img-05.jpg",
                "assets/car-036-img-06.jpg",
                "assets/car-036-img-07.jpg",
                "assets/car-036-img-08.jpg",
                "assets/car-036-img-09.jpg",
                "assets/car-036-img-10.jpg",
                "assets/car-036-img-11.jpg",
                "assets/car-036-img-12.jpg",
                "assets/car-036-img-13.jpg",
                "assets/car-036-img-14.jpg",
                "assets/car-036-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2020", mileage: "10 178 mil", status: "Available", hp: "116 Hk", transmission: "Automatic", plate: "SWE-488" },
        equipment: ["Miracast","ABS brakes","ACC","ACC 2 climate zones","Airbag driver","Airbag passenger front","Acoustic boxes","Anti-cable","Auto brake","Shutdownable airbag passenger","Reversing camera","Backstart help","Children's lock","Brake assistance","Central lock (districted)","Divisible rear seat","Digital Radio (DAB)","Digital meter house","Fog light up front","Electrical lifts (front)","Euro 6","Euro NCAP 5","Cruise control","Folding rear seats","Road computer","Full-light assistance","ISOFIX mounts rear","Cooled glove compartment","Driver Assistance","Reading lamp","Carpets (textile)","Multifunction steering wheel","Emergency call","Steering wheel heating","Rain sensor","Side airbags","Side impact curtains","Sign recognition","Makeup mirror","Starting barrier","Swedish sold","Seat heating (front)","Tinted squares","Fatigue Alerts","USB socket","Outer temperature gauge","Electrical lifts (Front and Rear)","Handbrake (electronic)","Adaptive cruise control","Bluetooth"]
    },
    {
        id: "car-035",
        badge: "SUV",
        title: "Toyota RAV4",
        desc: "Sourced directly from Sweden. Exceptionally maintained RAV4 with a fully documented 12 200 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-035-img-01.jpg",
            interior: "assets/car-035-img-02.jpg",
            cockpit: "assets/car-035-img-03.jpg",
            engine: "assets/car-035-img-04.jpg",
            all: [
                "assets/car-035-img-01.jpg",
                "assets/car-035-img-02.jpg",
                "assets/car-035-img-03.jpg",
                "assets/car-035-img-04.jpg",
                "assets/car-035-img-05.jpg",
                "assets/car-035-img-06.jpg",
                "assets/car-035-img-07.jpg",
                "assets/car-035-img-08.jpg",
                "assets/car-035-img-09.jpg",
                "assets/car-035-img-10.jpg",
                "assets/car-035-img-11.jpg",
                "assets/car-035-img-12.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2018", mileage: "12 200 mil", status: "Available", hp: "197 Hk", transmission: "Automatic", plate: "SWE-804" },
        equipment: ["Multifunction steering wheel","ABS","Side airbags","Keyless start","Electric side mirrors","etc. heat","Antispin","ESC","Takrails","Electric seats without memory","Bluetooth","Power steering","Rain sensor","Dark toneed squares","Starting barrier","Airbag front","Isofix","Filekeeping Assistant","Road computer","Parking sensor front","Parking sensor rear","Aircondition","Cruise control","Adaptive cruise control","Steering wheel heating","Radio DAB+","Heated seats","front","Folding rear seat","Central lock","Sports seats","Road sign recognition","12V socket","LED light","Self-blinding inner-back mirror","Electric side mirrors","Adjustable lumbar support","Full-light assistant","Air conditioning","Reversing camera","CD player","Electric windows"]
    },
    {
        id: "car-034",
        badge: "SUV",
        title: "Kia Sportage",
        desc: "Sourced directly from Sweden. Exceptionally maintained Sportage with a fully documented 13 671 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-034-img-01.jpg",
            interior: "assets/car-034-img-02.jpg",
            cockpit: "assets/car-034-img-03.jpg",
            engine: "assets/car-034-img-04.jpg",
            all: [
                "assets/car-034-img-01.jpg",
                "assets/car-034-img-02.jpg",
                "assets/car-034-img-03.jpg",
                "assets/car-034-img-04.jpg",
                "assets/car-034-img-05.jpg",
                "assets/car-034-img-06.jpg",
                "assets/car-034-img-07.jpg",
                "assets/car-034-img-08.jpg",
                "assets/car-034-img-09.jpg",
                "assets/car-034-img-10.jpg",
                "assets/car-034-img-11.jpg",
                "assets/car-034-img-12.jpg",
                "assets/car-034-img-13.jpg",
                "assets/car-034-img-14.jpg",
                "assets/car-034-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2016", mileage: "13 671 mil", status: "Available", hp: "185 Hk", transmission: "Automatic", plate: "SWE-911" },
        equipment: ["Complete Service Book","Navigator (GPS)","Reversing camera","Media Stereo","JBL Surround Sound","AUX input","USB","BT-Audio","Mobile phone Bluetooth","ACC Climate Anl. 2 zone","Panorama roof Glass","AWD/4WD Four-wheel drive","Sports/Comfort chairs","Armrest","Leather upholstery","Elstol Driver","Elstol Passenger","Isofix Attachment","Seat Heat Front","Seat Heat Rear","Steering wheel heating","Elhissar Front and Back","Electric Mirrors Elinable","Aut Bybl.Backs Mirror","Electric luggage hatch","Airbag Driver","Airbag Pass.Key wrestle.","Side airbags","ABS Brakes","Panic brakeAssist","Antispin","Lane Assist","File-holding assistance","Collision warning","Dead Angle Warning","Traffic sign info","Power steering","Multi-ratt Leather","RattPaddlar","Aluminum panels","Decoration panel","Road computer","Outer temperature gauge","Cruise control","Remote-controlled C-Lock","Key-Less Entry","Key-Less Start","Rain sensor","Xenon headlights","Fog light","P-Light LED","PDC Park.help Fr/Bak","Tinted Squares"]
    },
    {
        id: "car-033",
        badge: "SUV",
        title: "Kia Sorento",
        desc: "Sourced directly from Sweden. Exceptionally maintained Sorento with a fully documented 24 520 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-033-img-01.jpg",
            interior: "assets/car-033-img-02.jpg",
            cockpit: "assets/car-033-img-03.jpg",
            engine: "assets/car-033-img-04.jpg",
            all: [
                "assets/car-033-img-01.jpg",
                "assets/car-033-img-02.jpg",
                "assets/car-033-img-03.jpg",
                "assets/car-033-img-04.jpg",
                "assets/car-033-img-05.jpg",
                "assets/car-033-img-06.jpg",
                "assets/car-033-img-07.jpg",
                "assets/car-033-img-08.jpg",
                "assets/car-033-img-09.jpg",
                "assets/car-033-img-10.jpg",
                "assets/car-033-img-11.jpg",
                "assets/car-033-img-12.jpg",
                "assets/car-033-img-13.jpg",
                "assets/car-033-img-14.jpg",
                "assets/car-033-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", mileage: "24 520 mil", status: "Available", hp: "200 Hk", transmission: "Automatic", plate: "SWE-305" },
        equipment: ["Navigation","7-seat","Towbar","fixed","Leather upholstery","ABS brakes","ACC","ACC 2 climate zones","Airbag driver","Airbag passenger front","Anti-cable","AUX input","Dazzling inner-back mirror","Shutdownable airbag passenger","Backstart help","Luggage room mat","Children's lock","Hands-free connection","Brake assistance","CD-Stereo","Central lock (districted)","Divisible rear seat","Digital Radio (DAB)","Fog light up front","Electrical lifts (front and rear)","Elin retractable side mirrors","Electric chair driver","Electrically heated side mirrors","Euro 6","Euro NCAP 5","Speed limiter","Cruise control","Folding rear seats","Road computer","GPS","ISOFIX mounts rear","Fully dressed leather seats","Reading lamp","Carpets (textile)","Multifunction steering wheel","Parking sensor front","Flat cargo space","Rails","Steering wheel heating","Rain sensor","Spare wheel","Power steering","Side impact curtains","Start/stop function","Starting barrier","Swedish sold","Seat heating (rear)","Seat heating (front)","Tinted squares","Touch/Touchscreen","Heated windscreen wipers","USB socket","Xenon (sip will)","Outer temperature gauge"]
    },
    {
        id: "car-032",
        badge: "Halvkombi 5-dörrar",
        title: "Kia Picanto",
        desc: "Sourced directly from Sweden. Exceptionally maintained Picanto with a fully documented 2 600 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-032-img-01.jpg",
            interior: "assets/car-032-img-02.jpg",
            cockpit: "assets/car-032-img-03.jpg",
            engine: "assets/car-032-img-04.jpg",
            all: [
                "assets/car-032-img-01.jpg",
                "assets/car-032-img-02.jpg",
                "assets/car-032-img-03.jpg",
                "assets/car-032-img-04.jpg",
                "assets/car-032-img-05.jpg",
                "assets/car-032-img-06.jpg",
                "assets/car-032-img-07.jpg",
                "assets/car-032-img-08.jpg",
                "assets/car-032-img-09.jpg",
                "assets/car-032-img-10.jpg",
                "assets/car-032-img-11.jpg",
                "assets/car-032-img-12.jpg",
                "assets/car-032-img-13.jpg",
                "assets/car-032-img-14.jpg",
                "assets/car-032-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2020", mileage: "2 600 mil", status: "Available", hp: "67 Hk", transmission: "Manual", plate: "SWE-182" },
        equipment: ["ABS brakes","Aircondition","Airbag driver","Airbag passenger front","Anti-cable","Auto brake","AUX input","Shutdownable airbag passenger","Reversing camera","Backstart help","Brake assistance","Central lock","Divisible rear seat","Electrical lifts (front and rear)","Electrically heated side mirrors","Euro 6","Folding rear seats","Road computer","ISOFIX mounts rear","Reading lamp","Light metal rims","Carpets (textile)","Multifunction steering wheel","Spare wheel","Power steering","Side impact curtains","Makeup mirror","Start/stop function","Starting barrier","Theft alarm","Swedish sold","Seat heating (front)","Tinted squares","USB socket","Outer temperature gauge"]
    },
    {
        id: "car-031",
        badge: "Kombi",
        title: "Hyundai i40",
        desc: "Sourced directly from Sweden. Exceptionally maintained i40 with a fully documented 22 720 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-031-img-01.jpg",
            interior: "assets/car-031-img-02.jpg",
            cockpit: "assets/car-031-img-03.jpg",
            engine: "assets/car-031-img-04.jpg",
            all: [
                "assets/car-031-img-01.jpg",
                "assets/car-031-img-02.jpg",
                "assets/car-031-img-03.jpg",
                "assets/car-031-img-04.jpg",
                "assets/car-031-img-05.jpg",
                "assets/car-031-img-06.jpg",
                "assets/car-031-img-07.jpg",
                "assets/car-031-img-08.jpg",
                "assets/car-031-img-09.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2016", mileage: "22 720 mil", status: "Available", hp: "141 Hk", transmission: "Manual", plate: "SWE-572" },
        equipment: ["Multifunction steering wheel","ABS","Side airbags","Navigation","Antispin","ESC","Takrails","Electric seats without memory","Automatic start/stop","Bluetooth","Alarm","Rain sensor","Dark toneed squares","Starting barrier","Airbag front","Isofix","Road computer","Parking sensor front","Parking sensor rear","Aircondition","Cruise control","Steering wheel heating","Heated seats","front","Folding rear seat","Central lock","Self-blinding inner-back mirror","Electric side mirrors","Adjustable lumbar support","Air conditioning","Reversing camera","AUX input","Electric windows"]
    },
    {
        id: "car-030",
        badge: "Familjebuss",
        title: "Hyundai H-1",
        desc: "Sourced directly from Sweden. Exceptionally maintained H-1 with a fully documented 20 790 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-030-img-01.jpg",
            interior: "assets/car-030-img-02.jpg",
            cockpit: "assets/car-030-img-03.jpg",
            engine: "assets/car-030-img-04.jpg",
            all: [
                "assets/car-030-img-01.jpg",
                "assets/car-030-img-02.jpg",
                "assets/car-030-img-03.jpg",
                "assets/car-030-img-04.jpg",
                "assets/car-030-img-05.jpg",
                "assets/car-030-img-06.jpg",
                "assets/car-030-img-07.jpg",
                "assets/car-030-img-08.jpg",
                "assets/car-030-img-09.jpg",
                "assets/car-030-img-10.jpg",
                "assets/car-030-img-11.jpg",
                "assets/car-030-img-12.jpg",
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2016", mileage: "20 790 mil", status: "Available", hp: "170 Hk", transmission: "Automatic", plate: "SWE-493" },
        equipment: ["ABS","Electric side mirrors","etc. heat","ESC","Bluetooth","Power steering","Alarm","Starting barrier","Airbag front","Isofix","Road computer","Aircondition","Cruise control","Steering wheel heating","Heated seats","front","Folding rear seat","Central lock","Dark toneed squares","Electric side mirrors","Air conditioning","AUX input","Electric windows"]
    },
    {
        id: "car-029",
        badge: "Skåpbil",
        title: "Mercedes-Benz Maxi Sprinter",
        desc: "Sourced directly from Sweden. Exceptionally maintained Maxi with a fully documented 17 800 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-029-img-01.jpg",
            interior: "assets/car-029-img-02.jpg",
            cockpit: "assets/car-029-img-03.jpg",
            engine: "assets/car-029-img-04.jpg",
            all: [
                "assets/car-029-img-01.jpg",
                "assets/car-029-img-02.jpg",
                "assets/car-029-img-03.jpg",
                "assets/car-029-img-04.jpg",
                "assets/car-029-img-05.jpg",
                "assets/car-029-img-06.jpg",
                "assets/car-029-img-07.jpg",
                "assets/car-029-img-08.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2022", mileage: "17 800 mil", status: "Available", hp: "150 Hk", transmission: "Manual", plate: "SWE-125" },
        equipment: ["ABS brakes","Airbag driver","Anti-cable","Dazzling inner-back mirror","Backstart help","Children's lock","Central lock (districted)","Electrical lifts (front)","Euro 6","Road computer","Keyless","Keyless Start","Driver Assistance","Reading lamp","Emergency call","Power steering","Starting barrier","Outer temperature gauge"]
    },
    {
        id: "car-028",
        badge: "Halvkombi 5-dörrar",
        title: "Mazda CX-3",
        desc: "Sourced directly from Sweden. Exceptionally maintained CX-3 with a fully documented 10 610 mil odometer reading and premium Swedish executive specifications.",
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
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2017", mileage: "10 610 mil", status: "Available", hp: "150 Hk", transmission: "Automatic", plate: "SWE-295" },
        equipment: ["Sound system (BOSE)","Reversing camera","Parking sensor rear","Steering wheel heating","Fully dressed leather seats","ACC 2 climate zones","Auto brake","Hands-free connection","Divisible rear seat","Digital Radio (DAB)","Dead Angle Warning","Electrical lifts (front and rear)","Elin retractable side mirrors","Adaptive cruise control","Folding rear seats","ISOFIX mounts rear","Keyless","Driver Assistance","Multifunction steering wheel","Start/stop function","Seat heating (front)","Tinted squares","Touch/Touchscreen","USB socket"]
    },
    {
        id: "car-027",
        badge: "Halvkombi 5-dörrar",
        title: "Toyota Aygo",
        desc: "Sourced directly from Sweden. Exceptionally maintained Aygo with a fully documented 12 800 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-027-img-01.jpg",
            interior: "assets/car-027-img-02.jpg",
            cockpit: "assets/car-027-img-03.jpg",
            engine: "assets/car-027-img-04.jpg",
            all: [
                "assets/car-027-img-01.jpg",
                "assets/car-027-img-02.jpg",
                "assets/car-027-img-03.jpg",
                "assets/car-027-img-04.jpg",
                "assets/car-027-img-05.jpg",
                "assets/car-027-img-06.jpg",
                "assets/car-027-img-07.jpg",
                "assets/car-027-img-08.jpg",
                "assets/car-027-img-09.jpg",
                "assets/car-027-img-10.jpg",
                "assets/car-027-img-11.jpg",
                "assets/car-027-img-12.jpg",
                "assets/car-027-img-13.jpg",
                "assets/car-027-img-14.jpg",
                "assets/car-027-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2014", mileage: "12 800 mil", status: "Available", hp: "68 Hk", transmission: "Manual", plate: "SWE-361" },
        equipment: ["ABS","Antispin","ESC","Bluetooth","Power steering","Dark toneed squares","Starting barrier","Airbag front","Isofix","Road computer","Aircondition","Folding rear seat","Central lock","12V socket","Adaptive headlights","Air conditioning","CD player","Electric windows"]
    },
    {
        id: "car-026",
        badge: "Halvkombi 5-dörrar",
        title: "Toyota Aygo",
        desc: "Sourced directly from Sweden. Exceptionally maintained Aygo with a fully documented 5 790 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-026-img-01.jpg",
            interior: "assets/car-026-img-02.jpg",
            cockpit: "assets/car-026-img-03.jpg",
            engine: "assets/car-026-img-04.jpg",
            all: [
                "assets/car-026-img-01.jpg",
                "assets/car-026-img-02.jpg",
                "assets/car-026-img-03.jpg",
                "assets/car-026-img-04.jpg",
                "assets/car-026-img-05.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2020", mileage: "5 790 mil", status: "Available", hp: "72 Hk", transmission: "Manual", plate: "SWE-232" },
        equipment: ["Multifunction steering wheel","ABS","Side airbags","Electric side mirrors","Antispin","ESC","Bluetooth","Power steering","Starting barrier","Airbag front","Isofix","Filekeeping Assistant","Road computer","Aircondition","Heated seats front","Folding rear seat","Central lock","12V socket","Air conditioning","Reversing camera","AUX input","Electric windows"]
    },
    {
        id: "car-025",
        badge: "Halvkombi 5-dörrar",
        title: "Nissan Micra",
        desc: "Sourced directly from Sweden. Exceptionally maintained Micra with a fully documented 5 200 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-025-img-01.jpg",
            interior: "assets/car-025-img-02.jpg",
            cockpit: "assets/car-025-img-03.jpg",
            engine: "assets/car-025-img-04.jpg",
            all: [
                "assets/car-025-img-01.jpg",
                "assets/car-025-img-02.jpg",
                "assets/car-025-img-03.jpg",
                "assets/car-025-img-04.jpg",
                "assets/car-025-img-05.jpg",
                "assets/car-025-img-06.jpg",
                "assets/car-025-img-07.jpg",
                "assets/car-025-img-08.jpg",
                "assets/car-025-img-09.jpg",
                "assets/car-025-img-10.jpg",
                "assets/car-025-img-11.jpg",
                "assets/car-025-img-12.jpg",
                "assets/car-025-img-13.jpg",
                "assets/car-025-img-14.jpg",
                "assets/car-025-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2017", mileage: "5 200 mil", status: "Available", hp: "90 Hk", transmission: "Manual", plate: "SWE-693" },
        equipment: ["Summer tyres on rims","12V socket","Airbag front","Aircondition","Acoustic rear windows","Antispin","Apple CarPlay","AUX input","Bluetooth","Central lock","Digital instrument cluster","Tyre pressure monitoring","Electric windows","Electric side mirrors","ESC","Cruise control","Filekeeping Assistant","Folding rear seat","Road computer","Hands-free connection","Head-up display","Isofix","Air conditioning","Coupé heater","Multifunction steering wheel","Music streaming","Radio FM","Power steering","Side airbags","Heated seats","front","USB-A","Road sign recognition","Rain sensor","Automatic start/stop"]
    },
    {
        id: "car-024",
        badge: "SUV",
        title: "Nissan X-Trail",
        desc: "Sourced directly from Sweden. Exceptionally maintained X-Trail with a fully documented 6 990 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-024-img-01.jpg",
            interior: "assets/car-024-img-02.jpg",
            cockpit: "assets/car-024-img-03.jpg",
            engine: "assets/car-024-img-04.jpg",
            all: [
                "assets/car-024-img-01.jpg",
                "assets/car-024-img-02.jpg",
                "assets/car-024-img-03.jpg",
                "assets/car-024-img-04.jpg",
                "assets/car-024-img-05.jpg",
                "assets/car-024-img-06.jpg",
                "assets/car-024-img-07.jpg",
                "assets/car-024-img-08.jpg",
                "assets/car-024-img-09.jpg",
                "assets/car-024-img-10.jpg",
                "assets/car-024-img-11.jpg",
                "assets/car-024-img-12.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2019", mileage: "6 990 mil", status: "Available", hp: "150 Hk", transmission: "Manual", plate: "SWE-571" },
        equipment: ["Multifunction steering wheel","ABS","Side airbags","Electric side mirrors","Fatigue Alerts","Antispin","ESC","Takrails","Automatic start/stop","Bluetooth","Power steering","Alarm","Rain sensor","Starting barrier","Airbag front","Isofix","Road computer","Parking sensor front","Parking sensor rear","Aircondition","Cruise control","Radio DAB+","Folding rear seat","Coolable glove compartment","Voice Assistant","Central lock","Light sensor","12V socket","Self-blinding inner-back mirror","Adjustable lumbar support","Air conditioning","AUX input","CD player","Electric windows"]
    },
    {
        id: "car-023",
        badge: "SUV",
        title: "Nissan X-Trail",
        desc: "Sourced directly from Sweden. Exceptionally maintained X-Trail with a fully documented 18 486 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-023-img-01.jpg",
            interior: "assets/car-023-img-02.jpg",
            cockpit: "assets/car-023-img-03.jpg",
            engine: "assets/car-023-img-04.jpg",
            all: [
                "assets/car-023-img-01.jpg",
                "assets/car-023-img-02.jpg",
                "assets/car-023-img-03.jpg",
                "assets/car-023-img-04.jpg",
                "assets/car-023-img-05.jpg",
                "assets/car-023-img-06.jpg",
                "assets/car-023-img-07.jpg",
                "assets/car-023-img-08.jpg",
                "assets/car-023-img-09.jpg",
                "assets/car-023-img-10.jpg",
                "assets/car-023-img-11.jpg",
                "assets/car-023-img-12.jpg",
                "assets/car-023-img-13.jpg",
                "assets/car-023-img-14.jpg",
                "assets/car-023-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Diesel Turbo", year: "2015", mileage: "18 486 mil", status: "Available", hp: "131 Hk", transmission: "Automatic", plate: "SWE-160" },
        equipment: ["7-seat","Towbar fixed","360° camera","Reversing camera","Panoramic glass ceiling","Cruise control","Keyless","AUX input","Hands-free connection","Central lock (districted)","Electrical lifts (front and rear)","Electric chair driver","Fully dressed leather seats","Navigation","LED Headlights","Parking sensor front","Seat heating (front)"]
    },
    {
        id: "car-022",
        badge: "SUV",
        title: "Nissan Juke",
        desc: "Sourced directly from Sweden. Exceptionally maintained Juke with a fully documented 13 000 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-022-img-01.jpg",
            interior: "assets/car-022-img-02.jpg",
            cockpit: "assets/car-022-img-03.jpg",
            engine: "assets/car-022-img-04.jpg",
            all: [
                "assets/car-022-img-01.jpg",
                "assets/car-022-img-02.jpg",
                "assets/car-022-img-03.jpg",
                "assets/car-022-img-04.jpg",
                "assets/car-022-img-05.jpg",
                "assets/car-022-img-06.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2010", mileage: "13 000 mil", status: "Available", hp: "117 Hk", transmission: "Manual", plate: "SWE-432" },
        equipment: ["Front wheel drive","ABS","Side airbags","ESC","Power steering","Starting barrier","Airbag front","Isofix","Road computer","Aircondition","Folding rear seat","Heated front window","Central lock","12V socket","Self-blinding inner-back mirror","Air conditioning","AUX input","CD player","Electric windows"]
    },
    {
        id: "car-021",
        badge: "Premium SUV",
        title: "Nissan Qashqai 1.2 (115hk)",
        desc: "Sourced directly from Sweden. Exceptionally maintained Nissan with a fully documented 8 415 mil odometer reading and premium Swedish executive specifications.",
        images: {
            exterior: "assets/car-021-img-01.jpg",
            interior: "assets/car-021-img-02.jpg",
            cockpit: "assets/car-021-img-03.jpg",
            engine: "assets/car-021-img-04.jpg",
            all: [
                "assets/car-021-img-01.jpg",
            "assets/car-021-img-02.jpg",
            "assets/car-021-img-03.jpg",
            "assets/car-021-img-04.jpg",
            "assets/car-021-img-05.jpg",
            "assets/car-021-img-06.jpg",
            "assets/car-021-img-07.jpg",
            "assets/car-021-img-08.jpg",
            "assets/car-021-img-09.jpg",
            "assets/car-021-img-10.jpg",
            "assets/car-021-img-11.jpg",
            "assets/car-021-img-12.jpg",
            "assets/car-021-img-13.jpg",
            "assets/car-021-img-14.jpg",
            "assets/car-021-img-15.jpg"
            ]
        },
        specs: { origin: "Sweden 🇸🇪", type: "Petrol Turbo", year: "2017", mileage: "8 415 mil", status: "Available", hp: "116 hp", transmission: "Automatic", plate: "KVD-838" },
        equipment: ["Steering wheel heating","Reversing camera","Keyless","Airbag driver","Airbag passenger front","Anti-cable","Auto brake","Shutdownable airbag passenger","Children's lock","Bluetooth (Sound streaming)","Hands-free connection","Wireless mobile charger","Driver Mode","Electric mirrors (Retractable)","Cruise control","Digital radio","Brake assistance","Central lock (districted)","Digital meter house","Electrically heated side mirrors","Euro 6","Euro NCAP 5","Speed limiter","Folding rear seats","Road computer","ISOFIX mounts rear","Driver Assistance","Light sensor","Reading lamp","ABS brakes","Multifunction steering wheel","Flat cargo space","Rain sensor","Power steering","Side airbags","Side impact curtains","Makeup mirror","Start/stop function","Starting barrier","Theft alarm","Swedish sold","Touch/Touchscreen","Fatigue Alerts","Outer temperature gauge"]
    }
]

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
    document.getElementById('specYearField').innerText = car.specs.year;
    
    const specMileageField = document.getElementById('specMileageField');
    if (specMileageField) specMileageField.innerText = car.specs.mileage;

    // document.getElementById('specAwdField').innerText = car.title.includes('AWD') || car.title.includes('Quattro') || car.title.includes('4WD') ? 'Yes' : 'No';

    const specEquipmentField = document.getElementById('specEquipmentField');
    if (specEquipmentField) {
        if (car.equipment && Array.isArray(car.equipment) && car.equipment.length > 0) {
            specEquipmentField.innerHTML = car.equipment.map(item => `<li>${item}</li>`).join('');
        } else {
            specEquipmentField.innerHTML = '<li>Data unavailable</li>';
        }
    }

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

    // 7. Update Whatsapp Link
    updateWhatsappLink();

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

// Expose functions to global scope for inline HTML handlers
window.closeLightbox = closeLightbox;
window.closeModal = closeModal;
window.navigateImage = navigateImage;
window.openLightbox = openLightbox;
window.scrollThumbnails = scrollThumbnails;

function updateWhatsappLink() {
    if (!activeCar) return;
    const isSold = activeCar.specs && activeCar.specs.status === 'Sold';
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
