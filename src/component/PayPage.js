import React from 'react';
import { FaHeart, FaComments, FaCamera, FaPaw, FaStar, FaUmbrella, FaIceCream, FaGift, FaMagic } from 'react-icons/fa';
import travelersImg from '/home/uki-student/mine/freshmyf-main/src/component/photos/an.jpg';
export default function CuteAboutPage() {
  const fadeIn = {
    opacity: 1,
    transition: 'opacity 1s ease-in'
  };

  const reasons = [
    { icon: FaHeart, title: "Heartfelt Service", description: "We pour love into every detail of your journey!" },
    { icon: FaComments, title: "Always Listening", description: "Your feedback shapes our service, making it better every day!" },
    { icon: FaCamera, title: "Memory Makers", description: "We help create picture-perfect moments you'll cherish forever!" },
    { icon: FaPaw, title: "Pet Friendly", description: "Your furry friends are welcome on our adventures!" },
    { icon: FaStar, title: "Star Treatment", description: "Every customer is our VIP, receiving stellar care!" },
    { icon: FaUmbrella, title: "Rain or Shine", description: "We've got you covered in all weather conditions!" }
  ];

  const funFacts = [
    { icon: FaIceCream, fact: "We've served over 10,000 ice creams to happy travelers!" },
    { icon: FaGift, fact: "Every 100th customer gets a surprise gift on their journey!" },
    { icon: FaMagic, fact: "Our team includes a real magician for entertainment!" }
  ];

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#E0F2F1' }}><br/>
      <div className="container" style={fadeIn}>
        <h1 className="display-4 text-center mb-5" style={{ color: '#00897B', fontWeight: 'bold' }}>
          Welcome to Our Whimsical World of Travel! 
        </h1>

        <div className="row mb-5">
      <div className="col-md-6">
        <img 
          src={travelersImg} 
          alt="Happy travelers" 
          className="img-fluid rounded-circle shadow-lg" 
          style={{ height: '400px', width: '600px' }}
        />
      </div>
    

      
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <p className="lead" style={{ color: '#FF5722', fontSize: '1.5rem' }}>
              At CuteTravel, we believe every journey should be filled with smiles, laughter, and unforgettable moments!
            </p>
            <p className="mt-3" style={{ fontSize: '1.2rem' }}>
              Our team of adventure enthusiasts is dedicated to crafting the most adorable and exciting travel experiences just for you!
            </p>
          </div>
        </div>

        <h2 className="text-center mb-4" style={{ color: '#00897B' }}>Why Choose Our Cuddly Company? 🐨</h2>
        <div className="row g-4 mb-5">
          {reasons.map((reason, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: index % 2 === 0 ? '#B2DFDB' : '#FFCCBC' }}>
                <div className="card-body text-center">
                  <reason.icon className="mb-3" size={50} color={index % 2 === 0 ? '#00897B' : '#FF5722'} />
                  <h3 className="card-title h4" style={{ color: index % 2 === 0 ? '#00897B' : '#FF5722' }}>{reason.title}</h3>
                  <p className="card-text">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5 mb-5">
          <h2 className="text-center mb-4" style={{ color: '#FF5722' }}>Fun Facts About Us! </h2>
          <div className="row">
            {funFacts.map((fact, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="d-flex align-items-center">
                  <fact.icon size={30} className="me-3" style={{ color: '#00897B' }} />
                  <p className="mb-0" style={{ fontSize: '1.1rem' }}>{fact.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-4" style={{ color: '#00897B' }}>Ready to Start Your Cute Adventure?</h2>
       <br/><br/><br/>
        </div>
      </div>
      </div>
  );
}