# Location Website

## Overview
This project is a location-based web application that displays the locations of various devices on a visual map. Users can interact with the map to adjust their area of interest and view detailed specifications of the devices.

## Features
- Interactive map displaying device locations
- Adjustable radius for area of interest
- Detailed specifications and resources for each device
- User-friendly interface with filtering options

## Project Structure
```
location-website
├── public
│   ├── index.html          # Main HTML document
│   └── favicon.ico         # Favicon for the website
├── src
│   ├── components          # React components for the application
│   │   ├── Map             # Components related to the map
│   │   │   ├── MapContainer.tsx  # Renders the map and manages device markers
│   │   │   ├── DeviceMarker.tsx   # Represents individual device markers
│   │   │   └── RadiusControl.tsx   # Allows users to adjust the radius
│   │   ├── DeviceList      # Components for displaying device information
│   │   │   ├── DeviceCard.tsx      # Summary of device information
│   │   │   └── DeviceSpecs.tsx     # Detailed specifications of a device
│   │   ├── Controls        # Components for user controls
│   │   │   ├── RadiusSlider.tsx     # Slider for adjusting location radius
│   │   │   └── FilterPanel.tsx      # Filtering options for devices
│   │   └── Layout          # Layout components
│   │       ├── Header.tsx  # Header of the application
│   │       ├── Sidebar.tsx  # Sidebar for navigation
│   │       └── Footer.tsx   # Footer of the application
│   ├── hooks               # Custom hooks for managing state
│   │   ├── useDevices.ts   # Logic related to devices
│   │   └── useMap.ts       # Logic related to the map
│   ├── services            # Services for API calls and map functionalities
│   │   ├── api.ts          # API functions for fetching device data
│   │   └── mapService.ts   # Functions for handling map-related tasks
│   ├── types               # TypeScript interfaces and types
│   │   ├── device.ts       # Types related to device data
│   │   └── location.ts      # Types related to location data
│   ├── utils               # Utility functions
│   │   ├── locationUtils.ts # Location-related calculations
│   │   └── constants.ts    # Constant values used throughout the application
│   ├── styles              # Styles for the application
│   │   ├── globals.css     # Global styles
│   │   └── components.css   # Component-specific styles
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point for the React application
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Documentation for the project
```

## Getting Started
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.