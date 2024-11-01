import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import image1 from '/home/uki-student/mine/freshmyf-main/src/component/photos/Screenshot from 2024-09-09 11-25-42.png';
import image2 from '/home/uki-student/mine/freshmyf-main/src/component/photos/jali.jpg';
import image3 from '/home/uki-student/mine/freshmyf-main/src/component/photos/jali2.jpg';
import image4 from '/home/uki-student/mine/freshmyf-main/src/component/photos/jali3.jpg';
import image5 from '/home/uki-student/mine/freshmyf-main/src/component/photos/jali9.jpg';
import image6 from '/home/uki-student/mine/freshmyf-main/src/component/photos/kali2.jpg';

export default function CuteHappyCustomerPage() {
  const [hoveredImage, setHoveredImage] = useState(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  const imageData = [
    { src: image1, title: 'our service', content: 'Discover the beauty of this place!', size: 'col-lg-4 col-md-2' },
    { src: image2, title: 'my goal', content: 'An adventure awaits you here!', size: 'col-lg-3 col-md-3' },
    { src: image3, title: 'for you ', content: 'Experience the thrill and culture!', size: 'col-lg-5 col-md-3' },
    { src: image4, title: 'voyago mean', content: 'Uncover hidden gems!', size: 'col-lg-5 col-md-4' },
    { src: image5, title: 'our way', content: 'Relax in paradise!', size: 'col-lg-4 col-md-4' },
    { src: image6 , title: 'start journey', content: 'Embark on a journey of a lifetime!', size: 'col-lg-3 col-md-4' },
     ];

  return (
    <animated.div style={fadeIn} className="container-fluid bg-light py-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-center mb-5" style={{ color: '#008080' }}>
          Your Happy Adventure Starts Here!
        </h1>

      
        <h6 className="display-6" style={{ color: '#008080' }}>Explore  exciting destinations and create unforgettable memories.</h6><br/>
         <div className="row g-4 mb-5">
          {imageData.map((image, index) => (
            <div key={index} className={`${image.size} mb-4`}>
              <div
                className="position-relative overflow-hidden rounded shadow-sm h-100"
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{ cursor: 'pointer', minHeight: '30px' }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="img-fluid w-100 h-1000 object-fit-cover"
                  style={{
                    transform: hoveredImage === index ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
                {hoveredImage === index && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-10 d-flex align-items-center justify-content-center text-center p-3"
                    style={{ backgroundColor: 'rgba(0, 128, 128, 0.7)', color: '#fff' }}
                  >
                    <div>
                      <h5 className="fw-bold mb-2">{image.title}</h5>
                      <p className="mb-0">{image.content}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        
        </div>
      
    </animated.div>
  );
}
