import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {tutors} from "../db/tutors.json";

const About = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center font-bold fs-4 mb-4">Conoce a Nuestros Tutores</h1>

      <div className="row justify-content-center">
        {tutors.map((tutor, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={tutor.photo}
                alt={`${tutor.name} photo`}
                className="card-img-top rounded-circle mx-auto mt-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{tutor.name}</h5>
                <p className="card-text">
                  <strong>Materias:</strong> {tutor.subjects.join(', ')}
                </p>
                <p className="card-text text-muted">{tutor.experience}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
