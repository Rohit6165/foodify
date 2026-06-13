function Navbar({ cartCount }) {
  return (
    <nav>
      <h2>Foodify</h2>

      <div>
        <a href="#home">Home</a>
        <a href="#restaurants">Restaurants</a>
        <a href="#cart">Cart ({cartCount})</a>
      </div>
    </nav>
  );
}

export default Navbar;