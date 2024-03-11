import { isLoggedIn, getUserName, logout } from "./auth/authSlice";
import { Auth } from "./auth/Auth";

import { Quote } from "./features/quote/Quote";

import { useSelector, useDispatch } from "react-redux";


import './App.css';

function App() {
  const logged = useSelector(isLoggedIn);
  const username = useSelector(getUserName);
  const dispatch = useDispatch();
  let loadComponent = <Auth></Auth>;
  const handleLogout = () => {
    dispatch(logout());
  }
  if (logged) {
    loadComponent = <Quote></Quote>
  }
  return (
    <div>
      <header>
        <ul>
          <li><a className="active" href="#home">Quote Machine</a></li>
          <li id="user-name">{logged && <a href="#">Welcome {username}</a>}</li>
          <li id="logout-link">{logged && <a href="#" onClick={() => handleLogout()}>Logout</a>}</li>

        </ul>
      </header>
      <section>
        <main>
          {loadComponent}

        </main>
      </section>
    </div>


  );
}

export default App;
