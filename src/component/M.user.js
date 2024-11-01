'use client'

import React, { useEffect, useState } from 'react'
import { Table, Button, Form, Pagination, Container, Row, Col, Card, Alert } from 'react-bootstrap'
import api from './Api'

export default function MUser() {
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await api.get('/users')
        setUsers(res.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to load users. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleEditUser = (user) => {
    setEditingUser(user._id)
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    })
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveEdit = async (userId) => {
    try {
      const updatedUser = await api.put(`/users/${userId}`, editForm)
      setUsers(users.map(user => user._id === userId ? { ...user, ...updatedUser.data } : user))
      setEditingUser(null)
    } catch (err) {
      console.error("Error updating user:", err)
      setError("Failed to update user. Please try again.")
    }
  }

  const handleDisableUser = async (userId) => {
    try {
      // Make an API call to disable the user in the backend
      await api.put(`/users/${userId}/disable`)
      setUsers(users.map(user => user._id === userId ? { ...user, active: false } : user))
      setError(null)
    } catch (err) {
      console.error("Error disabling user:", err)
      setError("Failed to disable user. Please try again.")
    }
  }

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <Container className="text-center mt-5"><Alert variant="info">Loading users...</Alert></Container>
  }

  if (error) {
    return <Container className="text-center mt-5"><Alert variant="danger">{error}</Alert></Container>
  }

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: '#004d40' }}>Manage Users</h2>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditUser(user)}
                      style={{ borderColor: '#ff6f00', color: '#ff6f00' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDisableUser(user._id)}
                      style={{ borderColor: '#004d40', color: '#004d40' }}
                    >
                      Disable
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="justify-content-center mt-4">
            {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {editingUser && (
            <Card className="mt-4">
              <Card.Body>
                <h4 className="mb-3">Edit User</h4>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      value={editForm.role}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                  <Button
                    onClick={() => handleSaveEdit(editingUser)}
                    style={{ backgroundColor: '#ff6f00', borderColor: '#ff6f00' }}
                  >
                    Save Changes
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}
