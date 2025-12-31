# Santa's Workshop - React SPA

A festive React Single Page Application for managing Santa's workshop operations, featuring toy inventory management, elf profiles with task, and gift order tracking.

## 🎄 Features Implemented

### ✅ Home Page
- **Countdown to Christmas** - Real-time timer showing days, hours, minutes and seconds until next Christmas
- **Workshop Notice Board** - Carousel component (react-slick) displaying 5 rotating static notices
- **Status Summary Cards**:
  - Total Toys count
  - Pending Orders count (Orders with `Pending` status only)
  - Active Elves count (excluding elves with 0% energy)

![Home](https://github.com/user-attachments/assets/0811c9ea-087b-4380-89b9-30b2bc89c1b6)

### ✅ Toys Module (`/toys`)
- **Toys List**
  - Table view with toy details (name, category, difficulty, in-stock status)
  - **Filter by Category** - Dropdown filter with "All" option
  - **Filter by In-Stock Status** - Checkbox toggle for stock availability
  - **Sort Functionality** - Sort by name or difficulty with ascending/descending order
  - Details button for each toy linking to toy details page
  - Skeleton loading state while fetching data
  - **Pagination** - Previous/Next buttons with 5 items per page

- **Toy Details** (`/toys/:toyId`)
  - Full toy information display
  - Stock status badge (In Stock / Out of Stock)
  - **Toggle Stock Button** - Updates toy availability
  - Smooth animations and transitions
  - Back to Inventory navigation link

### ✅ Orders Module (`/orders`)
- **Orders List**
  - Table showing:
    - Child name (who made the order)
    - Gift name (toy ordered)
    - Country (child's location)
    - Order status
  - Status mapping from priority (Low → Pending, Normal → Packed, High → Shipped)
  - Responsive table layout
  - Skeleton loading state
  - **Pagination** - Previous/Next buttons with 5 items per page

- **Create Order** (`/orders/new`)
  - Form with fields:
    - Child Name (min 2 characters)
    - Country (required)
    - Toy ID (dropdown select from available toys)
    - Priority (Low/Normal/High)
  - Real-time form validation
  - Validation error messages with react-toastify
  - Submit creates order and redirects to `/orders`

### ✅ Elves Module (`/elves`)
- **Elves List**
  - Grid display of all elves showing:
    - Name
    - Role
    - Energy level (0-100%)
  - Clickable cards to view elf profile

- **Elf Profile** (`/elves/:elfId`)
  - Full elf information and details
  - Energy level visualization/bar
  - **Boost Energy Button**:
    - Increases energy by +10 (max 100)
    - Disabled when energy reaches 100%
    - Uses local state management
  - **View Tasks Button** - Opens nested route to view assigned orders
  - Back to Elves list navigation

- **Elf Tasks** (`/elves/:elfId/tasks`)
  - List of orders/tasks assigned to the elf
  - Reuses Orders List component
  - Back button returns to elf profile (`/elves/:elfId`) with closed task list

### ✨ Additional Features
- ✅ **Pagination Component** - Simple Previous/Next navigation
  - 5 items per page on Toys List and Orders List
  - Reusable pagination component
- ✅ **Snow Overlay Effect** - Animated snowfall in the background
  - Toggle snow on/off via header controls
  - Configurable snow density
- ✅ **Skeleton Loading Components** - Better UX during data fetching
- ✅ **Custom Hooks**:
  - `useTitle` - Page title management
  - `useToys` - Toys data fetching with React Query
  - `useOrders` - Orders data fetching
  - `useElves` - Elves data fetching
  - `useCountries` - Countries data utility
  - `useDebounce` - Debounce hook for optimized searches
- ✅ **Responsive Design** - With Tailwind CSS
- ✅ **Nested Routing** - Elf tasks accessible via nested route
- ✅ **Component Reusability** - Orders list component reused in multiple contexts

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/eomayski/Santa-Workshop.git
cd Santa-Workshop
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Configuration**
The project uses Firebase Realtime Database. The base URL is configured in `src/utils/api.js`:
```
https://santa-s-workshop-sirma-2025-default-rtdb.firebaseio.com/
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

## 🛠 Tech Stack

- **Frontend Framework**: React 18+ with Vite
- **Routing**: React Router v6 (with nested routes)
- **State Management**: 
  - React Query (Server state/data fetching)
  - React Hooks (Local state)
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API with custom wrapper
- **Carousel**: react-slick
- **Icons**: Lucide React
- **Database**: Firebase Realtime Database
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── home/
│   │   ├── Home.jsx              # Main home page
│   │   ├── Hero.jsx              # Hero section with countdown
│   │   ├── NoticeBoard.jsx       # Carousel with notices
│   │   └── StatusCard.jsx        # Status summary cards
│   ├── toys/
│   │   ├── ToysList.jsx          # Toys list with filters & sorting
│   │   ├── ToyDetails.jsx        # Toy details page
│   │   └── ToysListSkeleton.jsx  # Loading skeleton
│   ├── orders/
│   │   ├── OrdersList.jsx        # Orders list
│   │   ├── Order.jsx             # Single order row component
│   │   ├── OrderCreate.jsx       # Create order form
│   │   └── OrderListSkeleton.jsx # Loading skeleton
│   ├── elves/
│   │   ├── ElvesList.jsx         # Elves grid list
│   │   ├── ElfDetails.jsx        # Elf profile with tasks
│   │   └── ElvesListSkeleton.jsx # Loading skeleton
│   ├── countdown/
│   │   ├── Countdown.jsx         # Countdown timer widget
│   │   └── TimeBox.jsx           # Individual time unit display
│   ├── snow/
│   │   └── SnowOverlay.jsx       # Animated snow effect
│   ├── pagination/
│   │   └── Pagination.jsx        # Pagination component
│   ├── header/
│   │   └── Header.jsx            # Navigation & snow toggle
│   ├── error/
│   │   └── ErrorBoundary.jsx     # Error boundary component
│   └── 404/
│       └── NotFound.jsx          # 404 page
├── hooks/
│   ├── useTitle.js               # Page title management
│   ├── useToys.js                # Toys data fetching
│   ├── useOrders.js              # Orders data fetching
│   ├── useElves.js               # Elves data fetching
│   ├── useCountries.js           # Countries utility hook
│   └── useDebounce.js            # Debounce hook
├── utils/
│   ├── api.js                    # Firebase API wrapper
│   ├── queryKeys.js              # React Query keys
│   └── getStyles.js              # Style utilities
├── App.jsx                       # Main app with routing
└── main.jsx                      # Entry point
```

## 🔗 API Endpoints

All requests are made to Firebase Realtime Database:

```
Base URL: https://santa-s-workshop-sirma-2025-default-rtdb.firebaseio.com/

GET  /toys.json              - List all toys
GET  /toys/:id.json          - Get toy details
PATCH /toys/:id.json         - Update toy (toggle stock)

GET  /orders.json            - List all orders
POST /orders.json            - For new orders creation
GET  /elves.json             - List all elves
GET  /elves/:id.json         - Get elf details
GET  /elves/:id/tasks.json   - Get elf tasks (assigned orders)
```

## 🎨 Key Features Explained

### Countdown Timer
Displays the time remaining until next Christmas with automatic date calculation and live updates.

### Notice Board Carousel
Uses react-slick to rotate through 5 static workshop notices with smooth transitions.

### React Query Integration
- Automatic caching of fetched data
- Background refetching
- Mutation handling with proper invalidation
- Loading and error state management

### Energy Boost System
Elves can boost energy by +10 points with a maximum cap of 100%. Button automatically disables when max energy is reached.

### Nested Routing for Tasks
Elf tasks are accessible via `/elves/:elfId/tasks` nested route, reusing the Orders List component.

### Snow Effects
Animated snowfall overlay that can be toggled on/off from the header, enhancing the festive atmosphere.

## 📊 State Management

- **Server State**: React Query (toys, orders, elves from Firebase)
- **Local State**: React Hooks (energy boost, modal states, form inputs)
- **UI State**: Component-level useState (loading, errors, animations)

## 🧪 Running the Application

Development:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🎓 What This Project Demonstrates

- React hooks (useState, useEffect, useContext, useMemo)
- Custom hooks creation and composition
- React Router with nested routes
- React Query for server state management
- Responsive design with Tailwind CSS
- Component composition and reusability
- API integration with Firebase

## 📄 License

Sirma Academy React Exam - December 2025