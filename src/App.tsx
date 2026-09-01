import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

// Layouts & Guards
import AuthLayout from './components/auth/layout'
import ShopLayout from './components/shop/layout'
import StudentLayout from './components/shop/StudentLayout'
import AdminLayout from './components/admin/AdminLayout'
import RoleGuard from './guards/RoleGuard'

// Auth Pages
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Otp from './pages/auth/Otp'
import Profile from './pages/auth/profile'

// Student / Shop Pages
import Home from './pages/shop/home'
import Cart from './pages/shop/cart'
import AllProducts from './pages/shop/products'
import Checkout from './pages/shop/Checkout'
import StudentDashboard from './pages/shop/StudentDashboard'
import TestEngine from './pages/shop/TestEngine'
import Subscriptions from './pages/shop/subscriptionPackages'
import ExploreExams from './pages/shop/ExploreExam'
import AttemptHistory from './pages/shop/AttemptHistory'
import PurchaseHistory from './pages/shop/PurchaseHistory'
import LiveLeaderboard from './pages/shop/LiveLeaderboard'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import Products from './pages/admin/products'
import NewExam from './pages/admin/newExam'
import UserProfile from './pages/shop/UserProfile'
import CollectionDetails from './pages/shop/CollectionDetails'
import TestInstructions from './pages/shop/TestInstructions'
import Scoreboard from './pages/shop/Scoreboard';
import CreatorOnboardingWizard from './pages/creator/CreatorOnboardingWizard'
import CreatorLandingPage from './pages/creator/CreatorLanding'

function App() {
  return (
    <Routes>
      {/* ==========================================
          1. AUTH ROUTES
          ========================================== */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/auth/otp" element={<Otp />} />
{/* ==========================================
          1. DEMO TEST ROUTES
          ========================================== */}

<Route path="/creator/onboarding" element={<CreatorOnboardingWizard />} />
<Route path="/creator" element={<CreatorLandingPage />} />

      {/* ==========================================
          2. STUDENT ROUTES (Mixed Public & Protected)
          ========================================== */}

      <Route element={<RoleGuard allowedRoles={["STUDENT", "user"]} />}>
      <Route path="/test/instruction/:testId" element={<TestInstructions />} />
        <Route path="/test/attempt/:testId" element={<TestEngine />} />
        <Route path="/test/result/:attemptId" element={<Scoreboard />} />
      </Route>
      <Route element={<StudentLayout />}>

        {/* PUBLIC: Anyone can see the dashboard and explore exams */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/explore-exams" element={<ExploreExams />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/collection/:id" element={<CollectionDetails />} />
        {/* PROTECTED: You must be logged in to actually take a test or see history */}
        <Route element={<RoleGuard allowedRoles={["STUDENT", "user"]} />}>
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/attempt-history" element={<AttemptHistory />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/liveleaderboard" element={<LiveLeaderboard />} />
        </Route>

      </Route>

      {/* ==========================================
          4. ADMIN ROUTES (Protected)
          ========================================== */}
      <Route element={<RoleGuard allowedRoles={["ADMIN", "CONTENT_CREATOR", "SUPERADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="new-exam" element={<NewExam />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Route>


      {/* ==========================================
          5. CATCH-ALL (404 Not Found)
          ========================================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App