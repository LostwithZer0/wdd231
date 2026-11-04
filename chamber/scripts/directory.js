
"use strict";

// Mobile Navigation

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const expanded =
    menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute(
    "aria-expanded",
    String(!expanded)
  );

  menuButton.setAttribute(
    "aria-label",
    expanded ? "Open navigation" : "Close navigation"
  );

  nav.classList.toggle("open", !expanded);
});

// Footer Information

document.querySelector("#current-year").textContent =
  new Date().getFullYear();

document.querySelector("#last-modified").textContent =
  document.lastModified;

// Directory Controls

const container = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

function setView(view) {
  const grid = view === "grid";

  container.classList.toggle("members-grid", grid);
  container.classList.toggle("members-list", !grid);

  gridButton.classList.toggle("active", grid);
  listButton.classList.toggle("active", !grid);

  gridButton.setAttribute("aria-pressed", String(grid));
  listButton.setAttribute("aria-pressed", String(!grid));
}

gridButton.addEventListener("click", () => {
  setView("grid");
});

listButton.addEventListener("click", () => {
  setView("list");
});

// Helper Function

function addText(parent, tag, text, className) {
  const element = document.createElement(tag);

  element.textContent = text;

  if (className) {
    element.className = className;
  }

  parent.append(element);

  return element;
}

// Display Chamber Members

function displayMembers(members) {
  const fragment = document.createDocumentFragment();

  members.forEach((member, index) => {
    const card = document.createElement("article");
    card.className = "member-card";

    // Business Image

    const image = document.createElement("img");

    image.src = `images/${member.image}`;
    image.alt = `${member.name} illustration`;

    image.width = 600;
    image.height = 300;

    image.decoding = "async";

    // Prioritize first-row images.
    if (index < 3) {
      image.loading = "eager";
    } else {
      image.loading = "lazy";
    }

    card.append(image);

    // Business Information

    const info = document.createElement("div");
    info.className = "member-info";

    const membershipNames = {
      1: "Member",
      2: "Silver Member",
      3: "Gold Member"
    };

    const membershipName =
      membershipNames[member.membership] || "Member";

    const level = addText(
      info,
      "span",
      membershipName,
      "level"
    );

    if (member.membership === 2) {
      level.classList.add("silver");
    }

    if (member.membership === 3) {
      level.classList.add("gold");
    }

    addText(info, "h3", member.name);
    addText(info, "p", member.address);
    addText(info, "p", member.phone);

    // Business Website

    const link = document.createElement("a");

    link.href = member.website;
    link.textContent = "Visit website";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.setAttribute(
      "aria-label",
      `Visit ${member.name} website`
    );

    info.append(link);
    card.append(info);
    fragment.append(card);
  });

  // Insert cards together.
  container.replaceChildren(fragment);

  // Remove temporary loading state.
  container.setAttribute("aria-busy", "false");
}

// Fetch JSON Member Data

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const members = await response.json();

    displayMembers(members);

  } catch (error) {
    console.error(
      "Could not load member directory:",
      error
    );

    container.textContent =
      "Unable to load the directory. Please try again later.";

    container.setAttribute("aria-busy", "false");
  }
}

// Initialize Directory

loadMembers();
