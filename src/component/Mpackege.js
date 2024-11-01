'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Table, Image, Alert, Spinner } from 'react-bootstrap'

const API_URL = '/api/packages'

async function fetchWithErrorHandling(url, options = {}) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

const getPackages = () => fetchWithErrorHandling(API_URL)

const addPackage = (formData) => fetchWithErrorHandling(API_URL, {
  method: 'POST',
  body: formData,
})

const updatePackage = (id, formData) => fetchWithErrorHandling(`${API_URL}/${id}`, {
  method: 'PUT',
  body: formData,
})

const deletePackage = (packageId) => fetchWithErrorHandling(`${API_URL}/${packageId}`, {
  method: 'DELETE',
})

export default function PackageManager() {
  const [packages, setPackages] = useState([])
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: '' })
  const [selectedPhotos, setSelectedPhotos] = useState(null)
  const [editingPackageId, setEditingPackageId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const fetchedPackages = await getPackages()
      setPackages(fetchedPackages)
    } catch (error) {
      setError('Failed to fetch packages. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePackageAction = async (e) => {
    e.preventDefault()
    if (!newPackage.name || !newPackage.description || !newPackage.price) {
      setError('Please fill in all fields.')
      return
    }

    try {
      setLoading(true)
      setError('')
      const formData = new FormData()
      formData.append('name', newPackage.name)
      formData.append('description', newPackage.description)
      formData.append('price', newPackage.price)
      if (selectedPhotos) {
        for (let i = 0; i < selectedPhotos.length; i++) {
          formData.append('photos', selectedPhotos[i])
        }
      }

      if (editingPackageId) {
        const updatedPackage = await updatePackage(editingPackageId, formData)
        setPackages(packages.map((pkg) => (pkg._id === editingPackageId ? updatedPackage : pkg)))
        setEditingPackageId(null)
        setSuccess('Package updated successfully!')
      } else {
        const addedPackage = await addPackage(formData)
        setPackages([...packages, addedPackage])
        setSuccess('Package added successfully!')
      }

      setNewPackage({ name: '', description: '', price: '' })
      setSelectedPhotos(null)
    } catch (error) {
      setError('Failed to save package. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePackage = async (id) => {
    try {
      setLoading(true)
      await deletePackage(id)
      setPackages(packages.filter((pkg) => pkg._id !== id))
      setSuccess('Package deleted successfully!')
    } catch (error) {
      setError('Failed to delete package. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (pkg) => {
    setNewPackage({ name: pkg.name, description: pkg.description, price: pkg.price })
    setEditingPackageId(pkg._id)
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" style={{ color: '#004d40' }}>Package Manager</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{editingPackageId ? 'Edit Package' : 'Add Package'}</Card.Title>
          <Form onSubmit={handlePackageAction}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Package Name"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photos</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setSelectedPhotos(e.target.files)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button type="submit" style={{ backgroundColor: '#ff6f00', borderColor: '#ff6f00' }} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : (editingPackageId ? 'Update Package' : 'Add Package')}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setNewPackage({ name: '', description: '', price: '' })
                  setEditingPackageId(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h2 className="mb-3">All Packages</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Photos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.name}</td>
                <td>{pkg.description}</td>
                <td>Rs. {pkg.price}</td>
                <td>
                  {pkg.photos && pkg.photos.length > 0 ? (
                    pkg.photos.map((photo, index) => (
                      <Image key={index} src={photo} alt={pkg.name} thumbnail className="mr-2" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    ))
                  ) : (
                    'No photos available'
                  )}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="mr-3"
                    onClick={() => handleEditClick(pkg)}
                    style={{ borderColor: '#004d40', color: '#004d40' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeletePackage(pkg._id)}
                    style={{ borderColor: '#ff6f00', color: '#ff6f00' }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No packages available</td>
            </tr>
          )}
        </tbody><br/><br/>
      </Table>
    </Container>
  )
}