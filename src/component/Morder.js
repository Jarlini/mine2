'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge, Pagination, Spinner, Alert } from 'react-bootstrap'
import api from './Api' // Adjust the path as necessary

export default function MOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(4)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/bookings/orders') // Adjust the endpoint as necessary
        setOrders(response.data)
      } catch (err) {
        console.error('Error fetching orders:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error fetching orders: {error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: 'warning' }}>Manage Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <>
          <Row xs={1} md={2} className="g-4">
            {currentOrders.map(order => (
              <Col key={order._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title style={{ color: '#ff6f00' }}>Order ID: {order._id}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {order.email}<br />
                      <strong>Address:</strong> {order.address}<br />
                      <strong>Phone:</strong> {order.phone}<br />
                      <strong>Payment Method:</strong> {order.paymentMethod}<br />
                      <strong>Total Amount:</strong> ${order.totalAmount}
                    </Card.Text>
                    <h6 className="mt-3 mb-2">Passengers:</h6>
                    {order.passengers.length > 0 ? (
                      <ul className="list-unstyled">
                        {order.passengers.map((passenger, index) => (
                          <li key={index}>
                            <Badge bg="info" className="me-2">{passenger.name}</Badge>
                            Age: {passenger.age}, Email: {passenger.email}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No passengers listed.</p>
                    )}
                    <h6 className="mt-3 mb-2">Packages:</h6>
                    {order.packages.length > 0 ? (
                      <ul className="list-unstyled">
                        {order.packages.map((pkg, index) => (
                          <li key={index}>
                            <Badge bg="info" className="me-2">{pkg.packageName}</Badge>
                            Price: ${pkg.packagePrice}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No packages listed.</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {[...Array(Math.ceil(orders.length / ordersPerPage))].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </>
      )}
    </Container>
  )
}