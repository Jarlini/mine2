import React, { useState } from 'react'
import { FaHome, FaRoute, FaBox, FaCreditCard, FaUsers, FaHeart, FaComments, FaCamera } from 'react-icons/fa'
import { useSpring, animated } from 'react-spring'

export default function CuteHappyCustomerPage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  })

  const headingStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
    color: 'orangered',
    marginBottom: '16px',
    textAlign: 'center' ,
  }

  const steps = [
    { icon: FaHome, title: "Cozy Home", description: "Start your magical journey from our warm and welcoming homepage!", color: "#FFB3BA" },
    { icon: FaBox, title: "Surprise Packs", description: "Unwrap joy with our specially curated travel packages!", color: "#BAE1FF" },
    { icon: FaCreditCard, title: "Easy Peasy Pay", description: "Secure and swift payments to kick-start your adventure!", color: "#FFFFBA" },
    { icon: FaRoute, title: "Dream Routes", description: "Explore exciting paths to your dream destinations!", color: " #b2dfdb" },
    { icon: FaUsers, title: "Friend Fiesta", description: "Join a jolly group of fellow adventurers!", color: "#ffe5b4" }
  ]

  const reasons = [
    { icon: FaHeart, title: "Heartfelt Service", description: "We pour love into every detail of your journey!" },
    { icon: FaComments, title: "Always Listening", description: "Your feedback shapes our service, making it better every day!" },
    { icon: FaCamera, title: "Memory Makers", description: "We help create picture-perfect moments you'll cherish forever!" }
  ]

  return (
    <animated.div style={fadeIn} className="container mt-5 pb-5"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h1 style={headingStyle}>Your Happy Adventure Starts Here! 🌈✨</h1>
      
      <div className="row g-4 mb-5">
        {steps.map((step, index) => (
          <div key={index} className="col-md-4 mb-4">
            <animated.div
              className="card h-100 shadow border-0 rounded-lg overflow-hidden"
              style={{
                backgroundColor: step.color,
                transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <step.icon className="mb-3" size={50} color="#007bff" />
                <h3 className="card-title fw-bold">{step.title}</h3>
                <p className="card-text fs-5">{step.description}</p>
              </div>
            </animated.div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-light py-5 rounded-lg shadow">
        <h2 style={headingStyle}>Why We're Your Best Travel Buddies! 🌟</h2>
        <div className="row g-4">
          {reasons.map((reason, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <reason.icon className="mb-3" size={40} color="#ffc107" />
                  <h4 className="card-title fw-bold">{reason.title}</h4>
                  <p className="card-text fs-5">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-5">
  <h3 style={{ ...headingStyle, fontSize: '32px' }}>Ready for Your Next Adventure?</h3>
  <button
    className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold fs-4 shadow-lg"
    onClick={() => (window.location.href = 'http://localhost:3000')}
  >
    Join with Our Journey Now! 🚀
  </button>
</div>


      <div className="mt-5 text-center">
        <p className="fs-5">Follow us for daily doses of wanderlust! ✈️🌴🗺️</p>
        <div className="d-flex justify-content-center gap-4">
          <FaHeart size={30} color="#e25555" />
          <FaComments size={30} color="#3b5998" />
          <FaCamera size={30} color="#833AB4" />
        </div>
      </div><br/><br/><br/><br/><br/><br/>
    </animated.div>
  )
}