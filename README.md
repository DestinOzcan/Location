# Device Location Management System

A comprehensive full-stack web application for tracking, managing, and visualizing IoT devices across geographical locations. Built during a summer internship using React, TypeScript, and Express.js.

![Project Banner](https://img.shields.io/badge/Status-Complete-success) ![React](https://img.shields.io/badge/React-18.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## 🌟 Features

- **🗺️ Interactive Mapping** - Real-time device location visualization with Leaflet.js
- **📱 Device Registration** - Self-service device registration with automatic location detection
- **📊 System Dashboard** - Comprehensive device management and monitoring
- **📈 Analytics** - System statistics and performance metrics
- **🎨 Modern UI** - Glassmorphism design with smooth animations
- **🔄 Real-time Updates** - Live device status and performance monitoring
- **🔍 Search & Filter** - Advanced device filtering and search capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript development
- **CSS3** - Modern styling with glassmorphism effects
- **Leaflet.js** - Interactive mapping library
- **React Router** - Client-side routing

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **JSON Storage** - Lightweight data persistence

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** package manager
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/DestinOzcan/Location.git
   cd Location
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   ✅ Backend will be running on `http://localhost:3001`

3. **Frontend Setup** (Open new terminal)
   ```bash
   cd location-website
   npm install
   npm start
   ```
   ✅ Frontend will be running on `http://localhost:3002`

4. **Access the Application**
   - **Main Application**: http://localhost:3002
   - **API Endpoints**: http://localhost:3001/api
   - **Device Data**: http://localhost:3001/api/devices

### First Time Setup Verification
1. Open http://localhost:3002 in your browser
2. You should see the Device Location Management System dashboard
3. Navigate to the Map view to see sample devices
4. Try registering a new device via "Register Device" page
5. Check the device list and statistics pages

## 📡 API Documentation

| Method | Endpoint | Description | Sample Response |
|--------|----------|-------------|----------------|
| `GET` | `/api/devices` | Retrieve all devices | `[{device objects}]` |
| `POST` | `/api/devices/register` | Register new device | `{device object}` |
| `PUT` | `/api/devices/:id` | Update device info | `{updated device}` |
| `DELETE` | `/api/devices/:id` | Remove device | `{success message}` |

### Sample Device Registration
```bash
curl -X POST http://localhost:3001/api/devices/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Temperature Sensor",
    "deviceType": "Environmental Sensor",
    "model": "TEMP-2000",
    "location": "Office Building A",
    "coordinates": {"lat": 44.2312, "lng": -76.4860}
  }'
```

## 🏗️ Project Structure

```
Location/
├── 📁 backend/                    # Express.js API Server
│   ├── 📄 server.js              # Main server application
│   ├── 📄 devices.json           # Device data storage
│   ├── 📄 package.json           # Backend dependencies
│   └── 📄 package-lock.json      # Dependency lock file
│
├── 📁 location-website/           # React Frontend Application  
│   ├── 📁 src/
│   │   ├── 📁 components/        # React UI Components
│   │   │   ├── 📁 DeviceList/    # Device management components
│   │   │   ├── 📁 Map/           # Interactive mapping components
│   │   │   ├── 📁 Layout/        # Header, Sidebar, Footer
│   │   │   └── 📁 ...            # Other feature components
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📁 services/          # API communication services
│   │   ├── 📁 types/             # TypeScript type definitions
│   │   ├── 📁 utils/             # Utility functions
│   │   └── 📁 styles/            # Global CSS styling
│   ├── 📁 public/                # Static assets
│   └── 📄 package.json           # Frontend dependencies
│
├── 📄 .gitignore                  # Git ignore rules
└── 📄 README.md                  # This documentation
```

## 🎯 Application Features

### 1. Interactive Device Mapping
- **Real-time Visualization**: See all devices plotted on an interactive map
- **Device Status Indicators**: Visual markers for online/offline status
- **Click for Details**: Get device information by clicking markers
- **Smooth Navigation**: Zoom, pan, and explore device locations

### 2. Device Registration System
- **Self-Service Registration**: Devices can register themselves
- **Location Detection**: Automatic geolocation or manual coordinates
- **Specification Collection**: Comprehensive device information gathering
- **Instant Updates**: New devices appear immediately across the system

### 3. Device Management Dashboard
- **Complete Device List**: View all registered devices in a table
- **Advanced Filtering**: Filter by status, type, location, etc.
- **Search Functionality**: Quick device lookup by name or specifications
- **CRUD Operations**: Create, read, update, and delete device records
- **Performance Monitoring**: Real-time CPU, RAM, and temperature data

### 4. System Analytics
- **Overview Dashboard**: System-wide statistics and metrics
- **Device Status Summary**: Online/offline device counts
- **Performance Insights**: System health and performance data
- **Visual Charts**: Graphical representation of key metrics

### 5. Modern User Interface
- **Glassmorphism Design**: Contemporary translucent UI elements
- **Responsive Layout**: Seamless experience on all screen sizes
- **Smooth Animations**: Polished interactions and transitions
- **Professional Theme**: Clean, modern dark color scheme

## 🧩 Technical Implementation

### Device Data Model
```typescript
interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  coordinates: { lat: number; lng: number };
  systemStats: {
    cpuUsage: number;
    ramUsage: number;
    temperature: number;
    uptime: number;
  };
  deviceType: string;
  model: string;
  location: string;
  lastSeen: string;
  specifications: string[];
  resources: Array<{ name: string; link: string }>;
}
```

### Key Components Overview
- **MapContainer**: Leaflet.js integration for interactive mapping
- **DeviceList**: Comprehensive device management interface
- **SystemStatistics**: Analytics dashboard with performance metrics
- **DeviceRegistration**: Self-service device onboarding
- **API Service**: Centralized backend communication

## 🎨 UI/UX Features

### Design Philosophy
- **Modern Aesthetics**: Glassmorphism effects and contemporary styling
- **User-Centered**: Intuitive navigation and clear information hierarchy
- **Performance-Focused**: Optimized for smooth interactions
- **Accessibility**: WCAG-compliant design principles

### Responsive Design
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adaptive layout with collapsible components
- **Mobile**: Optimized touch interface with simplified navigation

## 🔧 Development Commands

### Backend Development
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server (with nodemon)
npm start            # Start production server
```

### Frontend Development  
```bash
cd location-website
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run test suite
```

## 🚀 Production Deployment

### Build for Production
```bash
# Frontend Production Build
cd location-website
npm run build

# Backend Production Start
cd backend
npm start
```

### Deployment Options
- **Vercel/Netlify**: Frontend static hosting
- **Heroku/Railway**: Full-stack application hosting  
- **AWS/Azure**: Cloud infrastructure deployment
- **Docker**: Containerized deployment

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Backend Won't Start
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Frontend Won't Load
```bash
cd location-website
rm -rf node_modules package-lock.json
npm install
npm start
```

#### Map Not Loading
- Check internet connection for map tiles
- Verify Leaflet.js is properly installed
- Clear browser cache and refresh

#### No Devices Showing
- Ensure backend server is running on port 3001
- Check `backend/devices.json` file exists
- Verify API endpoints are accessible

## 🔮 Future Enhancements

### Planned Improvements
- **Database Integration**: PostgreSQL/MongoDB for production data storage
- **User Authentication**: Secure login and role-based access control
- **Real-time WebSockets**: Live updates without page refresh
- **Mobile Application**: Native iOS/Android apps
- **Advanced Analytics**: Machine learning insights and predictions

### Scalability Considerations
- **Microservices Architecture**: Service decomposition for scale
- **Caching Layer**: Redis for improved performance
- **Load Balancing**: Handle increased traffic
- **Cloud Infrastructure**: AWS/Azure deployment

## 📊 Project Achievements

### Technical Accomplishments
✅ **Full-Stack Development**: Complete end-to-end application  
✅ **Modern Tech Stack**: React 18, TypeScript, Express.js  
✅ **Responsive Design**: Works across all device types  
✅ **Interactive Features**: Real-time mapping and device management  
✅ **Production Ready**: Optimized, documented, and deployable  

### Learning Outcomes
✅ **React/TypeScript Proficiency**: Advanced frontend development  
✅ **API Design**: RESTful service architecture  
✅ **UI/UX Design**: Modern interface design principles  
✅ **Project Management**: Full project lifecycle completion  
✅ **Problem Solving**: Debug complex full-stack issues  

## 📞 Contact & Support

**Developer**: [Your Name]  
**Email**: [your.email@example.com]  
**Project Repository**: https://github.com/DestinOzcan/Location  
**Demo**: Available upon request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Internship Supervisor**: For guidance and mentorship throughout the project
- **Open Source Community**: For excellent libraries and tools
- **React Team**: For the amazing React framework
- **Leaflet.js**: For powerful mapping capabilities

---

**🎓 Built with passion during Summer 2025 Internship**

*This project demonstrates full-stack web development capabilities using modern technologies and best practices. It serves as a comprehensive example of real-world application development suitable for IoT device management and tracking scenarios.*
