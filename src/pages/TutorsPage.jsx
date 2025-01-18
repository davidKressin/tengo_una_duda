import React from 'react';

const tutors = [
  {
    name: 'David Kressin González',
    subjects: ['Matemáticas', 'Física'],
    photo: 'https://via.placeholder.com/150', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Ingeniero en Física Aplicada con más de 5 años de experiencia enseñando matemáticas avanzadas y física a estudiantes de secundaria y universitarios.'
  },
  {
    name: 'Konstanza',
    subjects: ['Química', 'Biología'],
    photo: 'https://via.placeholder.com/150', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Licenciada en Ciencias Químicas y Biológicas con una gran pasión por enseñar y más de 3 años ayudando a estudiantes a comprender conceptos complejos de química y biología.'
  },
  {
    name: 'Esteban Neira',
    subjects: ['Lenguaje'],
    photo: 'https://via.placeholder.com/150', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Profesor de Lenguaje y Comunicación con experiencia en preparar estudiantes para exámenes estandarizados y mejorar sus habilidades de escritura y lectura crítica.'
  },
  {
    name: 'Alejandro Rodriguez',
    subjects: ['Historia'],
    photo: 'https://via.placeholder.com/150', // Cambia esta URL por las fotos reales de los tutores
    experience: 'Historiador con un enfoque en la enseñanza de historia universal y nacional. Más de 4 años de experiencia creando métodos interactivos para aprender historia.'
  }
];

const TutorsPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Conoce a Nuestros Tutores</h1>
      <div style={styles.tutorGrid}>
        {tutors.map((tutor, index) => (
          <div key={index} style={styles.tutorCard}>
            <img src={tutor.photo} alt={`${tutor.name} photo`} style={styles.photo} />
            <h2 style={styles.name}>{tutor.name}</h2>
            <p style={styles.subjects}>
              <strong>Materias:</strong> {tutor.subjects.join(', ')}
            </p>
            <p style={styles.experience}>{tutor.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  tutorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  tutorCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    textAlign: 'center',
  },
  photo: {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  subjects: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  experience: {
    fontSize: '14px',
    color: '#555',
  },
};

export default TutorsPage;
