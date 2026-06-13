function OrderStatus({ orderStatus }) {
  if (!orderStatus) {
    return null;
  }

  return (
    <section>
      <h2>Order Status</h2>
      <p>{orderStatus}</p>
    </section>
  );
}

export default OrderStatus;
