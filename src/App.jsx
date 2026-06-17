import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import RestaurantSection from "./components/RestaurantSection.jsx";
import MenuSection from "./components/MenuSection.jsx";
import Cart from "./components/Cart.jsx";
import OrderForm from "./components/OrderForm.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
import OrderStatus from "./components/OrderStatus.jsx";
import Footer from "./components/Footer.jsx";
import AdminOrders from "./components/AdminOrders.jsx";
import OrderLookup from "./components/OrderLookup.jsx";

const API_URL = "https://foodify-backend-qkax.onrender.com";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("foodifyCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderType, setOrderType] = useState("Delivery");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("foodifyCart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(food) {
    const itemExists = cartItems.find((item) => item.id === food.id);

    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  }

  function increaseQuantity(foodId) {
    setCartItems(
      cartItems.map((item) =>
        item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(foodId) {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === foodId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(foodId) {
    setCartItems(cartItems.filter((item) => item.id !== foodId));
  }

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === "FOODIFY10") {
      setDiscountPercent(10);
      setCouponMessage("Coupon applied! You got 10% off.");
    } else {
      setDiscountPercent(0);
      setCouponMessage("Invalid coupon code.");
    }
  }

  async function placeOrder() {
    if (cartItems.length === 0) {
      setCheckoutMessage("Please add food to your cart.");
      setOrderStatus("");
      return;
    }

    if (customerName.trim() === "") {
      setCheckoutMessage("Please enter your name.");
      setOrderStatus("");
      return;
    }

    if (customerPhone.trim() === "") {
      setCheckoutMessage("Please enter your phone number.");
      setOrderStatus("");
      return;
    }

    if (orderType === "Delivery" && customerAddress.trim() === "") {
      setCheckoutMessage("Please enter your delivery address.");
      setOrderStatus("");
      return;
    }

    try {
      setCheckoutMessage("Placing your order...");

      const orderData = {
        customerName,
        customerPhone,
        customerAddress,
        orderType,
        items: cartItems,
        total: finalTotal,
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        setCheckoutMessage("Something went wrong. Please try again.");
        setOrderStatus("");
        return;
      }

      setCheckoutMessage(data.message);
      setOrderStatus(data.order.status);
      setCartItems([]);
    } catch (error) {
      setCheckoutMessage("Backend is waking up. Please try again in 30 seconds.");
      setOrderStatus("");
    }
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = cartTotal * (discountPercent / 100);
  const finalTotal = cartTotal - discountAmount;

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />
      <Hero />
      <RestaurantSection />
      <MenuSection addToCart={addToCart} />

      <Cart
        cartItems={cartItems}
        cartTotal={cartTotal}
        discountAmount={discountAmount}
        finalTotal={finalTotal}
        couponCode={couponCode}
        couponMessage={couponMessage}
        setCouponCode={setCouponCode}
        applyCoupon={applyCoupon}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      <OrderForm
        orderType={orderType}
        setOrderType={setOrderType}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        customerAddress={customerAddress}
        setCustomerAddress={setCustomerAddress}
        placeOrder={placeOrder}
        checkoutMessage={checkoutMessage}
      />

      <OrderSummary
        orderType={orderType}
        customerName={customerName}
        customerPhone={customerPhone}
        customerAddress={customerAddress}
        cartItems={cartItems}
        finalTotal={finalTotal}
      />

               <OrderStatus orderStatus={orderStatus} />

      <OrderLookup />

      <AdminOrders />

      <Footer />
    </div>
  );
}

export default App;