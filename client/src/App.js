import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Search from './Components/Search/Search';
import MyLists from './Components/MyLists/MyLists';
import FriendsList from './Components/FriendsList/FriendsList';
import ChatList from './Components/ChatList/ChatList';
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
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/mylists" element={<MyLists />} />
                <Route path="/chat" element={<ChatList />} />
                <Route path="/friends" element={<FriendsList />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
    );

  } else {
    return (
      <BrowserRouter>
        {<LogIn />}
      </BrowserRouter>
    )
  }
}

export default App;
