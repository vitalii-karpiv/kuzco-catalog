# 🖥️ Kuzco Laptop Catalog

A modern, responsive laptop catalog application built with React, Vite, and Tailwind CSS. Features an Apple-inspired liquid glass design with mobile-first responsive layout.

![Kuzco Laptop Catalog](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.10-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6)

## ✨ Features

### 🎨 **Design & UX**
- **Apple Liquid Glass Aesthetic**: Modern frosted glass effects with backdrop blur
- **Mobile-First Responsive Design**: Beautiful on all devices (2 cols mobile, 3-4 cols desktop)
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Modern Typography**: Clean, readable fonts with proper hierarchy

### 🛍️ **Product Browsing**
- **Product List Page**: Browse laptops with beautiful glass-effect cards
- **Advanced Filtering**: Filter by price range, brand, RAM, storage, and processor
- **Smart Search**: Search across product names, brands, and descriptions
- **Mobile Filter Sidebar**: Slide-in overlay on mobile, persistent on desktop

### 📱 **Product Details**
- **Image Gallery**: Hero images with thumbnail navigation
- **Comprehensive Specs**: Detailed technical specifications table
- **Product Information**: Descriptions, pricing, and availability status
- **Category Tags**: Visual categorization and filtering

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kuzco-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
kuzco-catalog/
├── public/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── FilterSidebar.tsx    # Mobile slide-in filter panel
│   │   ├── ProductCard.tsx      # Product card with glass effects
│   │   └── ProductGallery.tsx   # Image carousel component
│   ├── pages/               # Main application pages
│   │   ├── ProductList.tsx      # Catalog listing page
│   │   └── ProductDetail.tsx    # Individual product page
│   ├── data/                # Mock data and constants
│   │   └── mockProducts.ts      # 10 realistic laptop products
│   ├── types/               # TypeScript type definitions
│   │   └── product.ts           # Product and Filter interfaces
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.app.json        # TypeScript configuration
└── package.json
```

## 🎨 Design System

### **Liquid Glass Effects**
```css
.glass {
  @apply bg-white/20 backdrop-blur-md border border-white/30 shadow-xl;
}

.glass-card {
  @apply bg-white/30 backdrop-blur-sm border border-white/40 shadow-lg rounded-2xl;
}
```

### **Color Palette**
- **Background**: Gradient from slate-50 to blue-50
- **Glass Elements**: Semi-transparent white with backdrop blur
- **Text**: Gray-800 for headings, Gray-600 for body text
- **Accents**: Blue-500 for interactive elements

### **Responsive Breakpoints**
- **Mobile**: 2-column grid, slide-in filters
- **Tablet**: 2-3 column grid, persistent sidebar
- **Desktop**: 3-4 column grid, full sidebar

## 📊 Mock Data

The application includes **10 realistic laptop products** featuring:

- **Premium Brands**: Apple, Dell, Microsoft, Lenovo, ASUS, HP, Razer, LG, Framework
- **High-Quality Images**: Unsplash placeholder images
- **Detailed Specifications**: Processor, RAM, storage, display, graphics, battery, weight, OS
- **Realistic Pricing**: $1,049 - $3,499 range
- **Categories**: Professional, Business, Gaming, Consumer, 2-in-1, Productivity

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18 | UI framework with hooks |
| **TypeScript** | 5.0+ | Type safety and development experience |
| **Vite** | 7.1.10 | Fast build tool and dev server |
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework |
| **React Router** | 6.x | Client-side routing |
| **PostCSS** | Latest | CSS processing |

## 🎯 Key Features Explained

### **Filter System**
- **Price Range**: Dual-range slider for budget filtering
- **Brand Selection**: Multi-select checkboxes for brand filtering
- **Specifications**: RAM, storage, and processor filtering
- **Search**: Real-time text search across all product fields
- **Mobile UX**: Slide-in overlay with smooth animations

### **Product Cards**
- **Glass Morphism**: Frosted glass effect with backdrop blur
- **Hover Effects**: Scale and shadow animations
- **Stock Status**: Visual indicators for availability
- **Quick Specs**: Key specifications at a glance
- **Price Display**: Clear, prominent pricing

### **Product Detail Page**
- **Image Gallery**: Hero image with thumbnail navigation
- **Specifications Table**: Comprehensive technical details
- **Description**: Rich product descriptions
- **Category Tags**: Visual categorization
- **Action Buttons**: Add to cart and wishlist functionality

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🔮 Future Enhancements

### **Phase 1: Backend Integration**
- [ ] REST API integration
- [ ] Real product data
- [ ] Image upload and management
- [ ] Database integration

### **Phase 2: E-commerce Features**
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Order management
- [ ] Payment integration

### **Phase 3: Advanced Features**
- [ ] Product comparison tool
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] User reviews and ratings

### **Phase 4: Performance & UX**
- [ ] Image optimization
- [ ] Lazy loading
- [ ] PWA capabilities
- [ ] Dark mode support
- [ ] Internationalization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality placeholder images
- **Tailwind CSS** for the amazing utility-first framework
- **Apple** for design inspiration with liquid glass aesthetics
- **Vite** for the lightning-fast development experience

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**