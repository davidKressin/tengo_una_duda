import React from 'react';
import { tutors } from "../db/tutors.json";
import { AppLayout } from '../layouts/AppLayout';

const About = () => {
  return (
    <AppLayout>
      <div className='section-padding min-vh-100 position-relative overflow-hidden'>
        <div className="hero-glow"></div>
        <div className="container mt-5">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-white mb-3">Conoce a nuestros <span className="text-gradient">expertos</span></h1>
            <p className="lead text-white mx-auto" style={{ maxWidth: '600px' }}>
              Un equipo de tutores altamente calificados y apasionados por la educación, listos para ayudarte a superar la PAES.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {tutors.map((tutor, index) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                <div className="glass-card h-100 p-4 text-center transition-hover">
                  <div className="position-relative d-inline-block mb-4">
                    <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle opacity-20" style={{ background: 'var(--primary)', filter: 'blur(15px)', zIndex: 0 }}></div>
                    <img
                      src={tutor.photo}
                      alt={`${tutor.name}`}
                      className="rounded-circle position-relative"
                      style={{ width: '130px', height: '130px', objectFit: 'cover', border: '3px solid var(--glass-border)', zIndex: 1 }}
                    />
                  </div>
                  <h4 className="text-white mb-2">{tutor.name}</h4>
                  <div className="mb-3">
                    {tutor.subjects.map((sub, i) => (
                      <span key={i} className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 me-1 small">
                        {sub}
                      </span>
                    ))}
                  </div>
                  <p className="text-white small mb-0">{tutor.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
