/* =========================================================
   RK TILES WORKS
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. SERVICES
   ========================================================= */

const services = [
    [
        "▦",
        "Floor Tiles",
        "Accurate floor tile fitting with straight lines, level surfaces and a clean durable finish."
    ],

    [
        "◫",
        "Wall Tiles",
        "Neat wall tile installation for modern rooms, feature walls and practical spaces."
    ],

    [
        "◇",
        "Bathroom Tiles",
        "Complete bathroom fitting with attention to corners, slopes and detailed finishing."
    ],

    [
        "▤",
        "Kitchen Tiles",
        "Stylish kitchen wall and floor work designed for everyday use and easy maintenance."
    ],

    [
        "▱",
        "Parking Tiles",
        "Strong tile solutions for parking areas, entrances and outdoor spaces."
    ],

    [
        "▣",
        "And More",
        "wash areas, balconies, staircases, swimming pools, and other custom tile work."
    ]
];

const servicesGrid = document.querySelector("#servicesGrid");

servicesGrid.innerHTML = services
    .map((service, index) => {
        return `
            <article class="service reveal">

                <small>0${index + 1}</small>

                <div class="icon">
                    ${service[0]}
                </div>

                <h3>
                    ${service[1]}
                </h3>

                <p>
                    ${service[2]}
                </p>

                <a href="#contact">
                    ↗
                </a>

            </article>
        `;
    })
    .join("");


/* =========================================================
   2. RATES
   ========================================================= */

const prices = [
    [
        "2 × 2 or small sizes",
        "₹18 / sq.ft"
    ],

    [
        "2 × 4 size",
        "₹22 / sq.ft"
    ],

    [
        "4 × 4 or 5 × 5 size",
        "₹30 / sq.ft"
    ],

    [
        "Epoxy grout",
        "₹500 / kg"
    ],

    [
        "Material mopping",
        "Based on material"
    ]
];

const rateList = document.querySelector("#rateList");

rateList.innerHTML =
    prices
        .map((price) => {
            return `
                <div class="rate">

                    <span>
                        ${price[0]}
                    </span>

                    <b>
                        ${price[1]}
                    </b>

                </div>
            `;
        })
        .join("") +

    `
        <p class="note">
            * Indicative rates only.
            Final quotation may vary by material,
            size, design, surface and location.
        </p>
    `;


/* =========================================================
   3. GALLERY DATA
   ========================================================= */

const gallery = [
    [
        "gallery/floor-1.jpg",
        "Floor",
        "Modern Floor"
    ],

    [
        "gallery/floor-2.jpg",
        "Floor",
        "Premium Flooring"
    ],

    [
        "gallery/wall-1.jpg",
        "Wall",
        "Feature Wall"
    ],

    [
        "gallery/bathroom-1.jpg",
        "Bathroom",
        "Bathroom Finish"
    ],

    [
        "gallery/bathroom-2.jpg",
        "Bathroom",
        "Bathroom Detail"
    ],

    [
        "gallery/kitchen-1.jpg",
        "Kitchen",
        "Kitchen Work"
    ],

    [
        "gallery/kitchen-2.jpg",
        "Kitchen",
        "Kitchen Finish"
    ],

    [
        "gallery/outdoor-1.jpg",
        "Outdoor",
        "Outdoor Tiles"
    ],

    [
        "gallery/outdoor-2.jpg",
        "Outdoor",
        "Parking Area"
    ],

    [
        "gallery/wall-2.jpg",
        "Wall",
        "Wall Finish"
    ]
];


/* =========================================================
   4. GALLERY FILTERS
   ========================================================= */

const filters = [
    "All",
    "Floor",
    "Wall",
    "Bathroom",
    "Kitchen",
    "Outdoor"
];

const filtersElement = document.querySelector("#filters");

filtersElement.innerHTML = filters
    .map((filter, index) => {
        return `
            <button
                class="filter ${index === 0 ? "active" : ""}"
                data-filter="${filter.toLowerCase()}"
            >
                ${filter}
            </button>
        `;
    })
    .join("");


/* =========================================================
   5. GALLERY STATE
   ========================================================= */

let displayedGallery = [...gallery];

let currentImageIndex = 0;


/* =========================================================
   6. RENDER GALLERY
   ========================================================= */

function renderGallery(filter = "all") {

    displayedGallery = gallery.filter((item) => {

        if (filter === "all") {
            return true;
        }

        return item[1].toLowerCase() === filter;
    });


    const galleryGrid = document.querySelector("#galleryGrid");


    galleryGrid.innerHTML = displayedGallery
        .map((item, index) => {

            return `
                <article
                    class="tile reveal"
                    data-index="${index}"
                >

                    <img
                        src="${item[0]}"
                        loading="lazy"
                        alt="${item[2]}"
                    >

                    <div>

                        <small>
                            ${item[1]}
                        </small>

                        <b>
                            ${item[2]}
                        </b>

                    </div>

                </article>
            `;
        })
        .join("");


    /* Add click event to gallery images */

    document
        .querySelectorAll(".tile")
        .forEach((tile) => {

            tile.addEventListener("click", () => {

                const index = Number(
                    tile.dataset.index
                );

                openLightbox(index);
            });

        });


    observeRevealAnimations();
}


/* Initial gallery */

renderGallery();


/* =========================================================
   7. GALLERY FILTER EVENTS
   ========================================================= */

filtersElement.addEventListener("click", (event) => {

    const button = event.target.closest(".filter");

    if (!button) {
        return;
    }


    /* Remove active class */

    document
        .querySelectorAll(".filter")
        .forEach((item) => {
            item.classList.remove("active");
        });


    /* Add active class */

    button.classList.add("active");


    /* Render selected category */

    renderGallery(
        button.dataset.filter
    );
});


/* =========================================================
   8. LIGHTBOX
   ========================================================= */

const lightbox = document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lbImg");

const lightboxCategory =
    document.querySelector("#lbCat");

const lightboxTitle =
    document.querySelector("#lbTitle");


/* Open lightbox */

function openLightbox(index) {

    currentImageIndex = index;

    const image =
        displayedGallery[index];


    lightboxImage.src = image[0];

    lightboxCategory.textContent =
        image[1];

    lightboxTitle.textContent =
        image[2];


    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";
}


/* Close lightbox */

function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow = "";
}


/* Previous / next image */

function changeLightboxImage(direction) {

    currentImageIndex =
        (
            currentImageIndex +
            direction +
            displayedGallery.length
        ) %
        displayedGallery.length;


    openLightbox(currentImageIndex);
}


/* Buttons */

document
    .querySelector("#close")
    .addEventListener(
        "click",
        closeLightbox
    );


document
    .querySelector("#prev")
    .addEventListener(
        "click",
        () => changeLightboxImage(-1)
    );


document
    .querySelector("#next")
    .addEventListener(
        "click",
        () => changeLightboxImage(1)
    );


/* Close by clicking outside image */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================================================
   9. KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeLightbox();
    }


    if (event.key === "ArrowLeft") {
        changeLightboxImage(-1);
    }


    if (event.key === "ArrowRight") {
        changeLightboxImage(1);
    }

});


/* =========================================================
   10. AREA CALCULATOR
   ========================================================= */

const lengthInput =
    document.querySelector("#length");

const widthInput =
    document.querySelector("#width");

const areaOutput =
    document.querySelector("#area");

const quoteButton =
    document.querySelector("#quote");


function calculateArea() {

    const length =
        Number(lengthInput.value) || 0;

    const width =
        Number(widthInput.value) || 0;


    const area =
        length * width;


    areaOutput.textContent =
        area % 1
            ? area.toFixed(2)
            : area;


    quoteButton.href =
        `https://wa.me/919581996651?text=` +
        `Hello%20RK%20Tiles%20Works,%20` +
        `my%20approximate%20area%20is%20` +
        `${area}%20sq.ft.%20` +
        `Please%20give%20me%20a%20quote.`;
}


/* Calculator events */

lengthInput.addEventListener(
    "input",
    calculateArea
);

widthInput.addEventListener(
    "input",
    calculateArea
);


/* Initial calculation */

calculateArea();


/* =========================================================
   11. MOBILE NAVIGATION
   ========================================================= */

const header =
    document.querySelector("header");

const menuButton =
    document.querySelector("#menu");

const navigation =
    document.querySelector("nav");


/* Open / close mobile menu */

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


/* Close menu after clicking a link */

document
    .querySelectorAll("nav a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

        });

    });


/* =========================================================
   12. HEADER SCROLL EFFECT
   ========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   13. SCROLL REVEAL ANIMATION
   ========================================================= */

function observeRevealAnimations() {

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    document
        .querySelectorAll(
            ".reveal:not(.show)"
        )
        .forEach((element) => {

            observer.observe(element);

        });
}


/* Start animations */

observeRevealAnimations();


/* =========================================================
   14. PAGE LOADER
   ========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .querySelector("#loader")
            .classList.add("hide");

    }, 450);

});


/* =========================================================
   15. CURRENT YEAR
   ========================================================= */

document.querySelector("#year").textContent =
    new Date().getFullYear();