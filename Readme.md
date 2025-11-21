# Real Estate Website

A modern, responsive real estate platform that showcases properties, client testimonials, and allows users to submit inquiries. Built with vanilla JavaScript, HTML5, and CSS3, with optional Supabase integration for dynamic data handling.

---

## 🚀 Features

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Dynamic Property Listings:** Supports Villas, Houses, Flats, Plots, Farms, and Penthouses.
- **Property Filters:** Filter properties by type for easy browsing.
- **Property Details:** View price, location, type, bedrooms, bathrooms, area, and status (Featured, Sold, Under Construction).
- **Contact Form:** Users can submit inquiries; optionally stored in Supabase.
- **Client Testimonials:** Display user feedback with ratings and avatars.
- **Smooth Scrolling Navigation:** Enhanced UX with smooth anchor scrolling.
- **Loading States:** Spinner animations while fetching data.

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (Bootstrap 5), Vanilla JavaScript (ES6)
- **Backend (Optional):** [Supabase](https://supabase.com/) for storing inquiries and fetching properties/testimonials
- **Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Hosting:** Can be deployed on GitHub Pages or any static hosting provider

---

## 📂 Project Structure

real-estate-website/
│
├── index.html # Main HTML page
├── app.js # Handles UI, properties, filters, testimonials, and form submissions
├── api.js # Fetches properties/testimonials and submits inquiries (Supabase integration)
├── supabaseClient.js # Supabase client configuration (optional)
│
├── assets/
│ ├── css/
│ │ └── style.css # Custom styling
│ ├── images/
│ │ ├── villa1.jpg
│ │ ├── villa2.jpg
│ │ ├── house1.jpg
│ │ ├── flat1.jpg
│ │ ├── plot1.jpg
│ │ ├── farm1.jpg
│ │ ├── penthouse1.jpg
│ │ └── testimonials/
│ │ ├── avatar1.jpg
│ │ ├── avatar2.jpg
│ │ └── avatar3.jpg
│
└── README.md # Project documentation
