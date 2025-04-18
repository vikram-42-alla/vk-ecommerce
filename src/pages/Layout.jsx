import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, X, Heart, User } from 'lucide-react';
import { useState,useEffect } from 'react';
const Layout = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const[cartCount,setCartCount]=useState(0)
  const[wishCount,setWishCount]=useState(0)
  const[user,setUser]=useState(null)
  useEffect(()=>{
setUser(JSON.parse(localStorage.getItem('user')))
  },[])
  console.log(user)
  const navigate = useNavigate();

//   async function account() {
//     try {
//       const res = await fetch("http://localhost:3000/user/details", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNo: user?.rollNo }),
//       });
//       if (res.ok) {
//         const data = await res.json();
//         if (user) {
//           return navigate("/account", { state: { userData: data } });
//         }
//         navigate("/");
//       } else {
//         console.error("Failed to fetch user details");
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   }

// useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);
  const searchProduct = (query) => {
    // Add your product search logic here
    console.log('Searching for', query);
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

    const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishCount(wish.length);
  }, 1000); // check every 1 second

  return () => clearInterval(interval); // cleanup
}, []);

  function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      alert(`${product.title} is already in your wishlist.`);
    }
  
    // Update wishlist count
    setWishCount(wishlist.length);
  }
  async function account() {
    try {
      const res = await fetch("http://localhost:3000/user/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo: user?.rollNo }),
      });
      if (res.ok) {
        const data = await res.json();
        if (user) {
          return navigate("/account", { state: { userData: data } });
        }
        navigate("/");
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
 
  return (
    <>
      <header>
        <div className="header bg-dark">
          <div className="left cursor-pointer">
            <h4 className="vk-store btn">VK Store <ShoppingBag size={24} /></h4>
          </div>
          <div className="middle">
            <div className="search-box-wrapper">
              <input
                type="text"
                value={search}
                placeholder="Search"
                className="search-box"
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchProduct(e.target.value);
                }}
              />
              <button className="btn-del" onClick={() => setSearch('')}>
                <X size={20} />
              </button>
            </div>
            <div className="search-btn" onClick={() => searchProduct(search)}>
              <Search size={20} />
            </div>
          </div>
          <div className="right">
            <div className="nav btn cursor-pointer" onClick={account}>
              <User size={23} /> Account
            </div>
            <div className="nav btn cursor-pointer" onClick={() => navigate('/wishlist', { state: { wishlistCount: wishCount } })}>
              <Heart size={20} /> Wishlist({wishCount})
            </div>
            <div className="nav btn cursor-pointer" onClick={() => navigate('/cart', { state: { cartCount } })}>
              <ShoppingBag size={20} /> Cart({cartCount})
            </div>
          </div>
        </div>
      </header>

      <main className="container py-3">
        <Outlet />
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-4">
        <p>&copy; 2025 VK Store. All Rights Reserved.</p>
        <p>Your one-stop destination for quality products at the best prices.</p>
        <p>
          Follow us on <a href="#" className="text-light mx-2">Facebook</a> | 
          <a href="#" className="text-light mx-2">Instagram</a> | 
          <a href="#" className="text-light mx-2">Twitter</a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
