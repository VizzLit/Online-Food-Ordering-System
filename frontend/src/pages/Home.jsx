import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
  Discover the <span className="gradient-text">Best Food</span> Near You
</h1>

          <p>
  From burgers to pizzas, we bring your favorite meals right to your door.
  Fast delivery. Fresh taste. No compromises.
</p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/menu")} className="btn-primary">
              Order Now 🚀
            </button>

            <button className="btn-secondary">
              Track Order
            </button>
          </div>

          <div className="stats">
            <div>
              <h3>4.9 ⭐</h3>
              <p>2k+ Reviews</p>
            </div>

            <div>
              <h3>30 min</h3>
              <p>Avg Delivery</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1601924582975-7e0c6f1e5c5f"
            alt="food"
          />
        </div>
      </section>

    </div>
  );
}

export default Home;