import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MenuSection from "./components/MenuSection.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import OrderForm from "./components/OrderForm.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderType, setOrderType] = useState("Delivery");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

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

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === "FOODIFY10") {
      setDiscountPercent(10);
      setCouponMessage("Coupon applied! You got 10% off.");
    } else {
      setDiscountPercent(0);
      setCouponMessage("Invalid coupon code.");
    }
  }

  function placeOrder() {
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

    setCheckoutMessage("Order placed successfully!");
    setOrderStatus("Preparing your order");
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = cartTotal * (discountPercent / 100);
  const finalTotal = cartTotal - discountAmount;

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <Hero />
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

      <section>
        <h2>Order Summary</h2>
        <p>Order Type: {orderType}</p>
        <p>Name: {customerName || "Not entered"}</p>
        <p>Phone: {customerPhone || "Not entered"}</p>

        {orderType === "Delivery" && (
          <p>Address: {customerAddress || "Not entered"}</p>
        )}

        <h3>Items</h3>

        {cartItems.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          cartItems.map((item) => (
            <p key={item.id}>
              {item.name} x {item.quantity}
            </p>
          ))
        )}

        <h3>Total: ${finalTotal.toFixed(2)}</h3>
      </section>

      {orderStatus && (
        <section>
          <h2>Order Status</h2>
          <p>{orderStatus}</p>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default App;