import { fetchProperties, fetchTestimonials, submitInquiry } from "./api.js";

let currentFilter = "all";
let allProperties = [];

document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initSmoothScroll();
  loadProperties();
  loadTestimonials();
  initContactForm();
  initPropertyFilters();
});

function initNavbar() {
  const navbar = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateActiveNavLink();
  });

  updateActiveNavLink();
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });
}

async function loadProperties(filter = "all") {
  const propertiesGrid = document.getElementById("propertiesGrid");

  try {
    propertiesGrid.innerHTML =
      '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

    const properties = await fetchProperties(filter);
    allProperties = properties;

    if (properties.length === 0) {
      propertiesGrid.innerHTML =
        '<div class="col-12 text-center"><p class="text-muted">No properties found.</p></div>';
      return;
    }

    propertiesGrid.innerHTML = properties
      .map((property) => createPropertyCard(property))
      .join("");

    populatePropertySelect(properties);
  } catch (error) {
    console.error("Error loading properties:", error);
    propertiesGrid.innerHTML =
      '<div class="col-12 text-center"><p class="text-danger">Error loading properties. Please try again later.</p></div>';
  }
}

function createPropertyCard(property) {
  const statusBadge = property.featured
    ? '<span class="property-badge">Featured</span>'
    : property.status === "sold"
    ? '<span class="property-badge sold">Sold</span>'
    : property.status === "under_construction"
    ? '<span class="property-badge construction">Under Construction</span>'
    : "";

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });

  return `
    <div class="col-lg-4 col-md-6 property-item" data-type="${
      property.property_type
    }">
      <div class="property-card">
        <div class="property-image">
          ${statusBadge}
          <img src="${
            property.image_url ||
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
          }" alt="${property.title}">
        </div>
        <div class="property-content">
          <div class="property-price">${formatter.format(property.price)}</div>
          <h3 class="property-title">${property.title}</h3>
          <div class="property-location">
            <i class="bi bi-geo-alt-fill"></i>
            <span>${property.location}</span>
          </div>
          <p class="property-description">${truncateText(
            property.description,
            100
          )}</p>
          <div class="property-features">
            <div class="property-feature">
              <i class="bi bi-house-door"></i>
              <span>${property.property_type}</span>
            </div>
            <div class="property-feature">
              <i class="bi bi-door-closed"></i>
              <span>${property.bedrooms} Beds</span>
            </div>
            <div class="property-feature">
              <i class="bi bi-droplet"></i>
              <span>${property.bathrooms} Baths</span>
            </div>
            <div class="property-feature">
              <i class="bi bi-arrows-angle-expand"></i>
              <span>${property.area.toLocaleString()} sqft</span>
            </div>
          </div>
          <div class="property-footer">
            <button class="btn-view" onclick="viewProperty('${
              property.id
            }')">View Details</button>
            <button class="btn-contact" onclick="scrollToContact('${
              property.id
            }')">Contact</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
}

window.viewProperty = function (propertyId) {
  const property = allProperties.find((p) => p.id === propertyId);
  if (property) {
    alert(
      `Property Details:\n\n${property.title}\n${
        property.location
      }\n\nPrice: ₹${property.price.toLocaleString("en-IN")}\n\n${
        property.description
      }\n\nBedrooms: ${property.bedrooms}\nBathrooms: ${
        property.bathrooms
      }\nArea: ${property.area} sqft\nType: ${
        property.property_type
      }\nStatus: ${property.status}`
    );
  }
};

window.scrollToContact = function (propertyId) {
  const property = allProperties.find((p) => p.id === propertyId);
  if (property) {
    document.getElementById("propertyInterest").value = propertyId;
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  }
};

function populatePropertySelect(properties) {
  const select = document.getElementById("propertyInterest");
  const currentValue = select.value;

  select.innerHTML = '<option value="">Select a Property (Optional)</option>';

  properties.forEach((property) => {
    const option = document.createElement("option");
    option.value = property.id;
    option.textContent = `${property.title} - ${property.location}`;
    select.appendChild(option);
  });

  if (currentValue) {
    select.value = currentValue;
  }
}

function initPropertyFilters() {
  const filterButtons = document.querySelectorAll(".btn-filter");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      currentFilter = filter;
      loadProperties(filter);
    });
  });
}

async function loadTestimonials() {
  const testimonialsContainer = document.getElementById("testimonialsCarousel");

  try {
    const testimonials = await fetchTestimonials();

    if (testimonials.length === 0) {
      testimonialsContainer.innerHTML =
        '<div class="col-12 text-center"><p class="text-muted">No testimonials available.</p></div>';
      return;
    }

    testimonialsContainer.innerHTML = testimonials
      .map((testimonial) => createTestimonialCard(testimonial))
      .join("");
  } catch (error) {
    console.error("Error loading testimonials:", error);
    testimonialsContainer.innerHTML =
      '<div class="col-12 text-center"><p class="text-danger">Error loading testimonials.</p></div>';
  }
}

function createTestimonialCard(testimonial) {
  const stars =
    "★".repeat(testimonial.rating) + "☆".repeat(5 - testimonial.rating);
  const initials = testimonial.client_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return `
    <div class="col-lg-4 col-md-6">
      <div class="testimonial-card">
        <div class="testimonial-quote">"</div>
        <div class="testimonial-text">${testimonial.testimonial}</div>
        <div class="testimonial-rating">${stars}</div>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${initials}</div>
          <div class="testimonial-info">
            <h5>${testimonial.client_name}</h5>
            <p>${testimonial.client_role}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = submitBtn.querySelector(".submit-text");
  const submitLoading = submitBtn.querySelector(".submit-loading");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    formAlert.classList.add("d-none");
    submitBtn.disabled = true;
    submitText.classList.add("d-none");
    submitLoading.classList.remove("d-none");

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      property_id: document.getElementById("propertyInterest").value || null,
      message: document.getElementById("message").value,
    };

    try {
      await submitInquiry(formData);

      formAlert.className = "alert alert-success mt-3";
      formAlert.textContent =
        "Thank you for your inquiry! We will get back to you soon.";
      formAlert.classList.remove("d-none");

      form.reset();

      setTimeout(() => {
        formAlert.classList.add("d-none");
      }, 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);

      formAlert.className = "alert alert-danger mt-3";
      formAlert.textContent =
        "Sorry, there was an error submitting your inquiry. Please try again.";
      formAlert.classList.remove("d-none");
    } finally {
      submitBtn.disabled = false;
      submitText.classList.remove("d-none");
      submitLoading.classList.add("d-none");
    }
  });
}
