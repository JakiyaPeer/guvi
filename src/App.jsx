
import React, { useState, useEffect } from "react";
import { Button, Modal, Navbar, Nav } from "react-bootstrap";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

 
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

 
  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert("Item already added to the cart");
      return;
    }
    setCart([...cart, product]);
  };

  
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

 
  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
    
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Fake Store</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleModal}>
            Cart ({cart.length})
          </Nav.Link>
        </Nav>
      </Navbar>

 
      <div className="container my-4">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "300px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <Button onClick={() => addToCart(product)} variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className="list-group">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.title} - ${item.price}
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;

