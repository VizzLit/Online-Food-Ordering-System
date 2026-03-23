import foodData from "../data/foodData";

function Menu({ setCart }) {
  return (
    <div className="menu-container">

      {foodData.map((restaurant) => (
        <div key={restaurant.id} className="restaurant">

          <h2>{restaurant.name}</h2>

          <div className="menu-grid">
            {restaurant.items.map((item) => (
              <div className="menu-card" key={item.id}>

                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <button
                  onClick={() => setCart(prev => [...prev, item])}
                >
                  Add to Cart
                </button>

              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}

export default Menu;