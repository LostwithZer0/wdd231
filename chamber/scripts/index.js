
"use strict";

// Navigation
const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label",
        expanded ? "Open navigation" : "Close navigation");
    nav.classList.toggle("open", !expanded);
});

// Footer
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Weather
const apiKey = "273802b0fd3d506f8865b06beb06e5e4";
const lat = 43.4917;
const lon = -112.0339;

async function loadWeather() {
    const base = "https://api.openweathermap.org/data/2.5/";

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${base}weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`),
            fetch(`${base}forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather API request failed");
        }

        const current = await currentResponse.json();
        const forecast = await forecastResponse.json();

        document.querySelector("#current-temp").textContent =
            `${Math.round(current.main.temp)}°F`;

        document.querySelector("#weather-description").textContent =
            current.weather[0].description;

        const container = document.querySelector("#forecast");
        container.replaceChildren();

        // Use Idaho Falls local dates from the API timezone.
        const offset = forecast.city.timezone;
        const localDate = (seconds) =>
            new Date((seconds + offset) * 1000)
                .toISOString().slice(0, 10);

        const today = localDate(current.dt);
        const days = [...new Set(
            forecast.list.map(item => localDate(item.dt))
                .filter(date => date > today)
        )].slice(0, 3);

        days.forEach(day => {
            const readings = forecast.list.filter(
                item => localDate(item.dt) === day
            );

            // Choose the forecast nearest local noon.
            const reading = readings.reduce((closest, item) => {
                const hour = (item.dt + offset) % 86400 / 3600;
                const closestHour =
                    (closest.dt + offset) % 86400 / 3600;

                return Math.abs(hour - 12) <
                    Math.abs(closestHour - 12) ? item : closest;
            });

            const date = new Date(`${day}T12:00:00Z`);
            const label = date.toLocaleDateString("en-US", {
                weekday: "long",
                timeZone: "UTC"
            });

            const p = document.createElement("p");
            p.textContent =
                `${label}: ${Math.round(reading.main.temp)}°F`;
            container.append(p);
        });

    } catch (error) {
        console.error("Weather error:", error);
        document.querySelector("#current-temp").textContent =
            "Unavailable";
        document.querySelector("#weather-description").textContent =
            "Unavailable";
        document.querySelector("#forecast").textContent =
            "Forecast unavailable.";
    }
}

// Member Spotlights
async function loadSpotlights() {
    const container = document.querySelector("#spotlights");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not fetch members");
        }

        const members = await response.json();

        // Only Gold (3) and Silver (2) members.
        const eligible = members.filter(
            member => member.membership === 2 ||
                member.membership === 3
        );

        // Shuffle for a new random selection on each load.
        for (let i = eligible.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
        }

        const selected = eligible.slice(0, 2);
        const fragment = document.createDocumentFragment();

        selected.forEach(member => {
            const card = document.createElement("article");
            card.className = "member-card";

            const image = document.createElement("img");
            image.src = `images/${member.image}`;
            image.alt = `${member.name} logo`;
            image.width = 600;
            image.height = 300;
            image.loading = "lazy";
            card.append(image);

            const info = document.createElement("div");
            info.className = "member-info";

            const level = document.createElement("span");
            level.className =
                `level ${member.membership === 3 ? "gold" : "silver"}`;
            level.textContent =
                member.membership === 3 ? "Gold Member" : "Silver Member";
            info.append(level);

            const name = document.createElement("h3");
            name.textContent = member.name;
            info.append(name);

            const address = document.createElement("p");
            address.textContent = member.address;
            info.append(address);

            const phone = document.createElement("p");
            phone.textContent = member.phone;
            info.append(phone);

            const link = document.createElement("a");
            link.href = member.website;
            link.textContent = "Visit website";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.setAttribute("aria-label",
                `Visit ${member.name} website`);
            info.append(link);

            card.append(info);
            fragment.append(card);
        });

        container.replaceChildren(fragment);

    } catch (error) {
        console.error("Spotlight error:", error);
        container.textContent = "Unable to load member spotlights.";
    } finally {
        container.setAttribute("aria-busy", "false");
    }
}

loadWeather();
loadSpotlights();
