"use client";
import Home from "@/component/sample";
import axios from "axios";
import { useEffect, useState } from "react";

export default function () {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/orders/").then((response) => {
      setOrders(response.data);
    });
  }, []);

console.log(orders);

  

  return (
    <Home>
      <h1>orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.payment_status === "paid" ? "text-green-600" : "text-red-600"}>
                  {order.payment_status === "paid" ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Home>
  );
}
