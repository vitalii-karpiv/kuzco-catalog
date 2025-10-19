# Kuzco Laptop Catalog

A modern, responsive laptop catalog application built with React, Vite, and Tailwind CSS. Features an Apple-inspired liquid glass design with mobile-first responsive layout.

## Features

- **Product List Page**: Browse laptops with advanced filtering capabilities
- **Product Detail Page**: Detailed view with image gallery and specifications
- **Mobile-First Design**: Responsive layout that works beautifully on all devices
- **Apple Liquid Glass Aesthetic**: Modern frosted glass effects and smooth animations
- **Advanced Filtering**: Filter by price, brand, RAM, storage, and processor
- **Search Functionality**: Search across product names, brands, and descriptions

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom glass effects
- **React Router** for navigation
- **Responsive Design** with mobile-first approach

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── FilterSidebar.tsx    # Mobile slide-in filter panel
│   ├── ProductCard.tsx      # Product card component
│   └── ProductGallery.tsx   # Image gallery for product details
├── pages/
│   ├── ProductList.tsx      # Main catalog page
│   └── ProductDetail.tsx    # Individual product page
├── data/
│   └── mockProducts.ts      # Mock laptop data
├── types/
│   └── product.ts           # TypeScript interfaces
├── App.tsx                  # Main app with routing
└── main.tsx                 # Entry point
```

## Design Features

- **Liquid Glass Effects**: Frosted glass backgrounds with backdrop blur
- **Smooth Animations**: Hover effects and transitions throughout
- **Mobile-First**: Responsive grid layout (2 cols mobile, 3-4 cols desktop)
- **Filter Sidebar**: Slide-in overlay on mobile, persistent on desktop
- **Product Gallery**: Image carousel with thumbnails
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## Mock Data

The application includes 10 realistic laptop products with:
- High-quality placeholder images from Unsplash
- Detailed technical specifications
- Realistic pricing and descriptions
- Various brands (Apple, Dell, Microsoft, Lenovo, etc.)

## Future Enhancements

- Backend integration for real product data
- Shopping cart functionality
- User authentication
- Product comparison feature
- Wishlist functionality
- Advanced search with filters