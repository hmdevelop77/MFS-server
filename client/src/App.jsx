import "./App.css";
import { Routes, Route } from "react-router-dom";


import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage"






import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import PodcastPage from "./pages/PodcastPage/PodcastPage";
import Sidebar from "./components/SideBar/SideBar";



function App() {
  return (
    <div className="App"> 

 <Sidebar/>
      <Routes>
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="budget"
          element={
            <IsPrivate>
              <BudgetPage />
            </IsPrivate>
          }
        />
        <Route
          path="Podcasts"
          element={
            <IsPrivate>
              <PodcastPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
