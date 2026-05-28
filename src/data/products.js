export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Fitness & Outdoors"
];

export const products = [
  {
    id: "p1",
    title: "AuraSound ANC Wireless Headphones",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 1420,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Experience premium sound with AuraSound Active Noise Cancelling headphones. Featuring 40 hours of battery life, fast charging, and plush memory foam earcups for ultimate all-day comfort.",
    specifications: {
      "Brand": "AuraSound",
      "Model": "Aura-ANC1",
      "Color": "Matte Black",
      "Connectivity": "Bluetooth 5.2, 3.5mm Aux",
      "Battery Life": "Up to 40 Hours"
    },
    stock: 12,
    bestSeller: true,
    featured: true
  },
  {
    id: "p2",
    title: "Chronos Active Smartwatch v4",
    price: 129.50,
    originalPrice: 199.99,
    rating: 4.5,
    reviewCount: 890,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Track your workouts, heart rate, sleep patterns, and receive real-time notifications with the Chronos Active Smartwatch. Styled with a premium anodized aluminum casing and customizable vibrant AMOLED display.",
    specifications: {
      "Brand": "Chronos",
      "Water Resistance": "5ATM (Up to 50m)",
      "Display": "1.43\" AMOLED Touchscreen",
      "Sensors": "Heart Rate, SpO2, Accelerometer, GPS",
      "Compatibility": "iOS & Android"
    },
    stock: 8,
    bestSeller: false,
    featured: true
  },
  {
    id: "p3",
    title: "Veloce Mechanical Gaming Keyboard",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 654,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Elevate your gaming and typing precision. The Veloce mechanical keyboard features hot-swappable tactile switches, dynamic per-key RGB backlighting, and a premium brushed aluminum top frame.",
    specifications: {
      "Brand": "Veloce",
      "Switch Type": "Tactile Brown Switches",
      "Backlighting": "16.8M Color RGB",
      "Interface": "Detachable USB-C",
      "Layout": "Tenkeyless (TKL)"
    },
    stock: 5,
    bestSeller: true,
    featured: false
  },
  {
    id: "p4",
    title: "Apex Carbon Fiber Road Bike Helmet",
    price: 74.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 312,
    category: "Fitness & Outdoors",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Ride with total peace of mind. Engineered with a lightweight carbon-reinforced shell and Multi-directional Impact Protection System (MIPS) technology, the Apex helmet ensures elite safety and superior ventilation.",
    specifications: {
      "Brand": "Apex Sports",
      "Safety Cert": "CPSC & CE EN1078",
      "Material": "EPS Foam + Carbon Fiber Shell",
      "Weight": "240g",
      "Vents": "21 Wind-Tunnel Vents"
    },
    stock: 15,
    bestSeller: false,
    featured: false
  },
  {
    id: "p5",
    title: "UrbanExplorer Waterproof Backpack",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 489,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Perfect for daily commutes or weekend travels, this minimal and lightweight backpack features a high-density waterproof nylon shell, a padded 16\" laptop sleeve, and smart anti-theft compartments.",
    specifications: {
      "Brand": "UrbanExplorer",
      "Capacity": "25 Liters",
      "Material": "Waterproof Ballistic Nylon",
      "Laptop Sleeve": "Padded (Fits up to 16\" MacBook Pro)",
      "Pockets": "6 External, 4 Internal"
    },
    stock: 25,
    bestSeller: false,
    featured: true
  },
  {
    id: "p6",
    title: "AuraFit High-Density Yoga Mat",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewCount: 2012,
    category: "Fitness & Outdoors",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Practice with premium support. The AuraFit Yoga Mat is 6mm thick, dual-textured for non-slip traction, eco-friendly, and comes with a carrying strap. Designed to cushion knees, spine, and joints perfectly.",
    specifications: {
      "Brand": "AuraFit",
      "Thickness": "6mm",
      "Material": "Eco-friendly TPE (Latex-free)",
      "Dimensions": "72\" x 24\" (183cm x 61cm)",
      "Weight": "1.8 lbs"
    },
    stock: 45,
    bestSeller: true,
    featured: true
  },
  {
    id: "p7",
    title: "Solstice Polarized Sunglasses",
    price: 45.00,
    originalPrice: 65.00,
    rating: 4.3,
    reviewCount: 240,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Protect your eyes with style. The Solstice sunglasses feature high-definition polarized lenses with 100% UV400 protection and a classic lightweight acetate frame that fits comfortably all day.",
    specifications: {
      "Brand": "Solstice Eyewear",
      "UV Protection": "100% UV400 (UVA & UVB)",
      "Lens Material": "Tri-Acetate Cellulose (TAC) Polarized",
      "Frame Type": "Full Rim Acetate",
      "Warranty": "1-Year Manufacturer Warranty"
    },
    stock: 2,
    bestSeller: false,
    featured: false
  },
  {
    id: "p8",
    title: "AeroBrew Digital Drip Coffee Maker",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviewCount: 920,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Start your morning with barista-quality drip coffee. The AeroBrew features a fully programmable 24-hour timer, precision temperature controls, a dynamic showerhead for even extraction, and a 12-cup glass carafe.",
    specifications: {
      "Brand": "AeroBrew",
      "Capacity": "12 Cups (60 oz)",
      "Power": "1000 Watts",
      "Filters": "Reusable Gold-tone mesh filter",
      "Keep Warm Time": "Up to 2 Hours (Adjustable)"
    },
    stock: 14,
    bestSeller: true,
    featured: true
  },
  {
    id: "p9",
    title: "AeroPurify HEPA Air Purifier H13",
    price: 119.00,
    originalPrice: 169.99,
    rating: 4.7,
    reviewCount: 1530,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Breathe cleaner air in minutes. Utilizing a true H13 HEPA filter alongside a high-grade activated carbon filter, the AeroPurify captures 99.97% of airborne particles (0.3 microns) including dust, pet dander, smoke, and odors.",
    specifications: {
      "Brand": "AeroPurify",
      "Filter Class": "H13 True HEPA Filter",
      "CADR": "140 CFM / 240 m³/h",
      "Coverage": "Up to 300 sq ft (28 m²)",
      "Noise Level": "22dB - 50dB"
    },
    stock: 3,
    bestSeller: false,
    featured: true
  },
  {
    id: "p10",
    title: "AuraForm Leather Jacket",
    price: 149.99,
    originalPrice: 220.00,
    rating: 4.5,
    reviewCount: 172,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Crafted from buttery-soft premium synthetic leather, the AuraForm jacket features a classic asymmetrical zipper closure, sleek metal hardware, and comfortable viscose lining. A timeless style statement.",
    specifications: {
      "Brand": "AuraForm",
      "Material": "Eco-friendly PU Leather",
      "Lining": "Viscose Lining",
      "Fit": "Slim Fit / Biker Style",
      "Closure": "YKK Zippers"
    },
    stock: 0, // Out of stock to test out of stock state!
    bestSeller: false,
    featured: false
  }
];
