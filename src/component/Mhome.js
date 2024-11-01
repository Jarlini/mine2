'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table, Image, Alert, Spinner } from 'react-bootstrap'
import api from './Api'

export default function MHome() {
  const [trips, setTrips] = useState([])
  const [editingTrip, setEditingTrip] = useState(null)
  const [addForm, setAddForm] = useState({
    title: '',
    location: '',
    days: '',
    schedule: '',
    photos: []
  })
  const [editForm, setEditForm] = useState({
    title: '',
    location: '',
    days: '',
    schedule: '',
    photos: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get('/trips')
        setTrips(res.data)
      } catch (err) {
        console.error("Error fetching trips:", err)
        setError("Failed to load trips. Please try again.")
      }
    }
    fetchTrips()
  }, [])

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`)
      setTrips(trips.filter(trip => trip._id !== tripId))
      setSuccessMessage("Trip deleted successfully!")
    } catch (err) {
      console.error("Error deleting trip:", err)
      setError("Failed to delete trip. Please try again.")
    }
  }

  const handleEditTrip = (trip) => {
    setEditingTrip(trip._id)
    setEditForm({
      title: trip.title,
      location: trip.location,
      days: trip.days,
      schedule: trip.schedule,
      photos: trip.photos
    })
  }

  const handleFormChange = (e, formSetter) => {
    const { name, value } = e.target
    formSetter(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e, formSetter) => {
    const files = Array.from(e.target.files)
    formSetter(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }))
    e.target.value = ''
  }

  const handleSaveEdit = async (tripId) => {
    if (!editForm.title || !editForm.location || !editForm.days || !editForm.schedule) {
      setError("All fields are required.")
      return
    }

    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      Object.keys(editForm).forEach(key => {
        if (key === 'photos') {
          editForm.photos.forEach(photo => formData.append('photos', photo))
        } else {
          formData.append(key, editForm[key])
        }
      })

      const res = await api.put(`/trips/${tripId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.data && res.data.updatedTrip) {
        setTrips(trips.map(trip => trip._id === tripId ? { ...trip, ...res.data.updatedTrip } : trip))
        setEditingTrip(null)
        setEditForm({ title: '', location: '', days: '', schedule: '', photos: [] })
        setSuccessMessage("Trip updated successfully!")
      } else {
        setError("Error updating trip.")
      }
    } catch (err) {
      console.error('Error updating trip:', err)
      setError("Error updating trip.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAdd = async () => {
    if (!addForm.title || !addForm.location || !addForm.days || !addForm.schedule) {
      setError("All fields are required.")
      return
    }

    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      Object.keys(addForm).forEach(key => {
        if (key === 'photos') {
          addForm.photos.forEach(photo => formData.append('photos', photo))
        } else {
          formData.append(key, addForm[key])
        }
      })

      const res = await api.post('/trips', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.data && res.data.newTrip) {
        setTrips([...trips, res.data.newTrip])
        setAddForm({ title: '', location: '', days: '', schedule: '', photos: [] })
        setSuccessMessage("Trip added successfully!")
      } else {
        setError("Error adding trip.")
      }
    } catch (err) {
      console.error('Error adding trip:', err)
      setError("Error adding trip.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#004d40' }}>Manage Trips</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Add New Trip</Card.Title>
          <Form onSubmit={(e) => { e.preventDefault(); handleSaveAdd(); }}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={addForm.title} onChange={(e) => handleFormChange(e, setAddForm)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" value={addForm.location} onChange={(e) => handleFormChange(e, setAddForm)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Days</Form.Label>
                  <Form.Control type="number" name="days" value={addForm.days} onChange={(e) => handleFormChange(e, setAddForm)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Photos</Form.Label>
                  <Form.Control type="file" multiple onChange={(e) => handleFileChange(e, setAddForm)} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Schedule</Form.Label>
              <Form.Control as="textarea" rows={3} name="schedule" value={addForm.schedule} onChange={(e) => handleFormChange(e, setAddForm)} />
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: '#ff6f00', borderColor: '#ff6f00' }} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Add Trip'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Table responsive hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Days</th>
            <th>Schedule</th>
            <th>Photos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.title}</td>
              <td>{trip.location}</td>
              <td>{trip.days}</td>
              <td>{trip.schedule}</td>
              <td>
                {trip.photos.map((photo, index) => (
                  <Image key={index} src={photo} alt={`Trip photo ${index + 1}`} thumbnail className="me-2" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                ))}
              </td>
              <td>
                <div className="d-flex">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditTrip(trip)}
                    style={{ borderColor: '#004d40', color: '#004d40' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteTrip(trip._id)}
                    style={{ borderColor: '#ff6f00', color: '#ff6f00' }}
                  >
                    Delete
                  </Button>
                </div>
                {editingTrip === trip._id && (
                  <Card className="mt-3">
                    <Card.Body>
                      <Card.Title>Edit Trip</Card.Title>
                      <Form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(trip._id); }}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Title</Form.Label>
                              <Form.Control type="text" name="title" value={editForm.title} onChange={(e) => handleFormChange(e, setEditForm)} />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Location</Form.Label>
                              <Form.Control type="text" name="location" value={editForm.location} onChange={(e) => handleFormChange(e, setEditForm)} />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Days</Form.Label>
                              <Form.Control type="number" name="days" value={editForm.days} onChange={(e) => handleFormChange(e, setEditForm)} />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Photos (upload new photos)</Form.Label>
                              <Form.Control type="file" multiple onChange={(e) => handleFileChange(e, setEditForm)} />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Schedule</Form.Label>
                          <Form.Control as="textarea" rows={3} name="schedule" value={editForm.schedule} onChange={(e) => handleFormChange(e, setEditForm)} />
                        </Form.Group>
                        <Button type="submit" style={{ backgroundColor: '#004d40', borderColor: '#004d40' }} disabled={loading}>
                          {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}