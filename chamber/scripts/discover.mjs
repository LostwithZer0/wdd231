import { attractions } from "../data/attractions.mjs";

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label",
        expanded ? "Open navigation" : "Close navigation");

    nav.classList.toggle("open", !expanded);
});

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("discover-last-visit");
const now = Date.now();
const millisecondsPerDay = 86400000;

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor(
        (now - Number(lastVisit)) / millisecondsPerDay
    );

    if (days < 1) {
        visitMessage.textContent =
            "Back so soon! Awesome!";
    } else {
        visitMessage.textContent =
            `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}

localStorage.setItem("discover-last-visit", now);

const container = document.querySelector("#attractions");

attractions.forEach((attraction, index) => {
    const card = document.createElement("article");

    card.className = "discover-card";
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
        <h2>${attraction.name}</h2>

        <figure>
            <img src="images/${attraction.image}"
                alt="${attraction.name}"
                width="300"
                height="200"
                loading="lazy">
        </figure>

        <address>${attraction.address}</address>

        <p>${attraction.description}</p>

        <button type="button"
            aria-label="Learn more about ${attraction.name}">
            Learn More
        </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(
                attraction.name + " Idaho Falls"
            )}`,
            "_blank",
            "noopener,noreferrer"
        );
    });

    container.append(card);
});