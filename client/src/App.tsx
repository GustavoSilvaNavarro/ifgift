import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Profile from './Components/Profile/Profile';
import { ProfileForm } from './Components/Profile/ProfileForm/ProfileForm';
import Search from './Components/Search/Search';
import MyLists from './Components/MyLists/MyLists';
import LogIn from './Components/LogIn/LogIn';

function App() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <div className="body-container">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/editprofile" element={<ProfileForm />} />
              <Route path="/search" element={<Search />} />
              <Route path="/mylists" element={<MyLists />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  } else {
    return <BrowserRouter>{<LogIn />}</BrowserRouter>;
  }
}

export default App;
