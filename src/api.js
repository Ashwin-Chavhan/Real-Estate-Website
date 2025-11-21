// api.js - Mock Data for Bolt/Static setup

export async function fetchProperties(filter = "all") {
  const properties = [
    {
      id: "1",
      title: "Elegant Villa in Delhi",
      location: "Delhi",
      price: 45000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 5500,
      property_type: "villa",
      status: "available",
      featured: true,
      description:
        "A luxurious villa with modern amenities and a beautiful garden.",
      image_url:
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      title: "Cozy House in Bangalore",
      location: "Bangalore",
      price: 22000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3500,
      property_type: "house",
      status: "available",
      featured: false,
      description: "A cozy family house in a peaceful neighborhood.",
      image_url:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      title: "Modern Flat in Mumbai",
      location: "Mumbai",
      price: 18000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      property_type: "flat",
      status: "under_construction",
      featured: false,
      description: "A stylish modern flat with city view.",
      image_url:
        "https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "4",
      title: "Luxury Penthouse in Pune",
      location: "Pune",
      price: 75000000,
      bedrooms: 6,
      bathrooms: 5,
      area: 7000,
      property_type: "penthouse",
      status: "available",
      featured: true,
      description:
        "A luxurious penthouse with rooftop terrace and city skyline views.",
      image_url:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "5",
      title: "Farm Land in Punjab",
      location: "Punjab",
      price: 12000000,
      bedrooms: 0,
      bathrooms: 0,
      area: 20000,
      property_type: "farm",
      status: "available",
      featured: false,
      description: "Fertile farm land ideal for agriculture.",
      image_url:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "6",
      title: "Commercial Building in Hyderabad",
      location: "Hyderabad",
      price: 95000000,
      bedrooms: 0,
      bathrooms: 8,
      area: 10000,
      property_type: "building",
      status: "sold",
      featured: false,
      description: "A commercial building with multiple office spaces.",
      image_url:
        "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "7",
      title: "Residential Plot in Chennai",
      location: "Chennai",
      price: 8000000,
      bedrooms: 0,
      bathrooms: 0,
      area: 3000,
      property_type: "plot",
      status: "available",
      featured: false,
      description: "A prime plot for residential construction.",
      image_url:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  if (filter === "all") return properties;
  return properties.filter((p) => p.property_type === filter);
}

export async function fetchTestimonials() {
  return [
    {
      id: "1",
      client_name: "Rohit Sharma",
      client_role: "Business Owner",
      testimonial: "Excellent service! Found my dream home effortlessly.",
      rating: 5,
      avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      client_name: "Anjali Mehta",
      client_role: "Software Engineer",
      testimonial: "Very professional and prompt support. Highly recommend!",
      rating: 4,
      avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "3",
      client_name: "Vikram Singh",
      client_role: "Entrepreneur",
      testimonial: "Smooth buying process. Happy with the property.",
      rating: 5,
      avatar_url: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    // {
    //   id: "4",
    //   client_name: "Priya Sharma",
    //   client_role: "Teacher",
    //   testimonial: "Friendly staff and excellent guidance. Thank you!",
    //   rating: 4,
    //   avatar_url: "https://randomuser.me/api/portraits/women/55.jpg",
    // },
    // {
    //   id: "5",
    //   client_name: "Arjun Reddy",
    //   client_role: "Doctor",
    //   testimonial: "Very satisfied with the service and property options.",
    //   rating: 5,
    //   avatar_url: "https://randomuser.me/api/portraits/men/75.jpg",
    // },
  ];
}

export async function submitInquiry(inquiryData) {
  console.log("Inquiry submitted:", inquiryData);
  return { success: true };
}
