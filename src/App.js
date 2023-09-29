import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import PrivateRoutes from './Routes/PrivateRoutes';
import NotFound from './Component/NotFound';
import Login from './Component/Login';
import SignUp from './Component/SignUp';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [userData, setUserData] = useState([]); // State to store user data
  const [user, setUser] = useState(null);


  const handleLogin = (userData) => {
    // Assuming your user data contains the name property
    setUser({ name: userData.username }); // Here, you're using 'name' as the key
  };


  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleSignUp = (newUserData) => {
    setUserData([...userData, newUserData]);
    setUser(newUserData); // Set the user state with the new user's data
    // You can save userData to local storage or send it to a server
  }

  return (
    <Router basename="/eyesome">
      <Routes>
        <Route path="/login" element={<Login userData={userData} onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />

        {/* Route where the Header component is displayed */}


        {/* Note: Common Layout: You can use the catch-all route to define a common layout or template for your application, which includes components like headers, footers, navigation menus, or sidebars. This layout will be shared across multiple routes, ensuring a consistent look and feel for your app. */}
        <Route path="/*" element={
          <>
            <Header
              onFilterChange={handleFilterChange}
              selectedProducts={selectedProducts}
              selectedCartItems={selectedCartItems}
              user={user}
            />
            <PrivateRoutes
              filterValue={filterValue}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              selectedCartItems={selectedCartItems}
              setSelectedCartItems={setSelectedCartItems}
              cartDetails={cartDetails}
              setCartDetails={setCartDetails}
              notFound={NotFound}
              user={user}
            />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
