# Frontend-Backend Integration Guide

## Overview
This guide explains how to integrate your Next.js frontend with your Express.js backend to replace localStorage with server-side data storage.

## What's Been Done

### 1. API Service Layer (`src/services/api.ts`)
- Created a centralized API service to handle all backend communication
- Includes authentication, cart, wishlist, products, and orders APIs
- Handles JWT token management automatically

### 2. Authentication Context (`src/contexts/AuthContext.tsx`)
- Manages user authentication state across the application
- Provides login, register, and logout functionality
- Automatically handles token storage and user data

### 3. Updated Components
- **Login Page**: Now uses backend authentication instead of mock login
- **Product Details Page**: Uses API calls instead of localStorage for cart/wishlist

## What You Need to Do

### 1. Start Your Backend Server
```bash
cd ../BlackCompany_backend
npm start
```
Your backend should be running on `http://localhost:5000`

### 2. Update Remaining Pages
You need to update these pages to use the API instead of localStorage:

#### A. MyCart Page (`src/app/pages/MyCart/page.tsx`)
Replace localStorage calls with:
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { cartAPI } from "@/services/api";

// Replace localStorage.getItem("cart") with:
const { user } = useAuth();
const cartItems = user?.cart || [];

// Replace localStorage.setItem("cart", ...) with:
await cartAPI.updateCart(updatedCart);
```

#### B. Checkout Page (`src/app/pages/Checkout/page.tsx`)
Replace localStorage calls with:
```typescript
import { useAuth } from "@/contexts/AuthContext";

// Replace localStorage.getItem("cart") with:
const { user } = useAuth();
const cartItems = user?.cart || [];
```

#### C. Wishlist Component (`src/app/pages/ProfileDashboard/components/Wishlist.tsx`)
Replace localStorage calls with:
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { wishlistAPI } from "@/services/api";

// Replace localStorage calls with API calls
const { user, updateUser } = useAuth();
const wishlist = user?.wishlist || [];
```

#### D. OurProducts Page (`src/app/pages/OurProducts/page.tsx`)
Replace localStorage calls with:
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { cartAPI } from "@/services/api";

// Replace localStorage calls with API calls
const { user, updateUser } = useAuth();
```

### 3. Add Authentication Guards
For pages that require authentication, add this check:
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/pages/Login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  // Your page content here
}
```

### 4. Update Navigation
Update your Navbar to show user status:
```typescript
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, signout } = useAuth();
  
  return (
    <nav>
      {user ? (
        <div>
          <span>Welcome, {user.firstname}</span>
          <button onClick={signout}>Logout</button>
        </div>
      ) : (
        <Link href="/pages/Login">Login</Link>
      )}
    </nav>
  );
};
```

## Key Benefits

1. **Persistent Data**: Cart and wishlist data is now stored on the server and persists across devices
2. **User Authentication**: Real user accounts with secure authentication
3. **Data Consistency**: All users see the same data across sessions
4. **Scalability**: Can handle multiple users and complex data relationships

## Testing the Integration

1. **Start both servers**:
   - Frontend: `npm run dev` (port 3000)
   - Backend: `npm start` (port 5000)

2. **Test user registration and login**
3. **Test adding items to cart** - data should persist after page refresh
4. **Test wishlist functionality** - should work across sessions
5. **Test checkout process** - should use server-side cart data

## Troubleshooting

### CORS Issues
If you get CORS errors, make sure your backend has the correct CORS configuration:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Authentication Issues
- Check that JWT tokens are being sent in request headers
- Verify backend authentication middleware is working
- Check browser console for API errors

### Data Not Persisting
- Verify API calls are successful (check Network tab)
- Check backend database connection
- Ensure user authentication is working properly

## Next Steps

1. Complete updating all remaining pages
2. Add error handling and loading states
3. Implement order processing
4. Add admin functionality
5. Add payment integration
6. Add email notifications

## File Structure After Integration

```
src/
├── services/
│   └── api.ts              # API service layer
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── app/
│   ├── layout.tsx          # Updated with AuthProvider
│   └── pages/
│       ├── Login/          # Updated with API calls
│       ├── Prod/[slug]/    # Updated with API calls
│       ├── MyCart/         # Needs updating
│       ├── Checkout/       # Needs updating
│       └── ProfileDashboard/ # Needs updating
```

This integration transforms your app from a client-side only application to a full-stack application with persistent data and user authentication. 