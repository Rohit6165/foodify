function Navbar({ cartCount }) {
  return (
    <nav>
      <h2>Foodify</h2>

      <div>
        <a href="#">Home</a>
        <a href="#">Restaurants</a>
        <a href="#">Cart ({cartCount})</a>
      </div>
    </nav>
  );
}

export default Navbar;