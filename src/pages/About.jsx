import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const tutors = [
  {
    name: 'David Kressin González',
    subjects: ['Matemáticas'],
    photo: 'https://avatar.iran.liara.run/public/41', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Ingeniero Comercial Aplicada con más de 5 años de experiencia enseñando matemáticas avanzadas y física a estudiantes de secundaria y universitarios.',
  },
  {
    name: 'Cristian Colima',
    subjects: ['Matemáticas', 'Física'],
    photo: 'https://avatar.iran.liara.run/public/40', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Ingeniero Civil Industrial con más de 5 años de experiencia enseñando matemáticas avanzadas y física a estudiantes de secundaria y universitarios.',
  },
  {
    name: 'Konstanza',
    subjects: ['Química', 'Biología'],
    photo: 'https://avatar.iran.liara.run/public/79', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Licenciada en Ciencias Químicas y Biológicas con una gran pasión por enseñar y más de 3 años ayudando a estudiantes a comprender conceptos complejos de química y biología.',
  },
  // {
  //   name: 'Esteban Neira',
  //   subjects: ['Lenguaje'],
  //   photo: 'https://avatar.iran.liara.run/public/33', // Cambia esta URL por las fotos reales de los tutores
  //   experience: 'Profesor de Lenguaje y Comunicación con experiencia en preparar estudiantes para exámenes estandarizados y mejorar sus habilidades de escritura y lectura crítica.',
  // },
  // {
  //   name: 'Alejandro Rodriguez',
  //   subjects: ['Historia'],
  //   photo: 'https://avatar.iran.liara.run/public/16', // Cambia esta URL por las fotos reales de los tutores
  //   experience: 'Historiador con un enfoque en la enseñanza de historia universal y nacional. Más de 4 años de experiencia creando métodos interactivos para aprender historia.',
  // },
];


const About = () => {
  return (
    <div className="container py-5">
      {/* <h1 className="text-center mb-5">Conoce a Nuestros Tutores</h1> */}
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
