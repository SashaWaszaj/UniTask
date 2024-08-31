import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const SubjectEdit = () => {
  const [subject, setSubject] = useState({
    name: '',
    professor: '',
    semester: '',
    day: '',
    startTime: '',
    endTime: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await Axios.get(`http://localhost:8080/subject/${id}`);
        const subjectData = response.data;
        setSubject(subjectData);
      } catch (error) {
        console.error('Error fetching subject', error);
        setError('Error fetching subject details.');
      }
    };

    fetchSubject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8080/subject/${id}/edit`, subject);
      navigate('/subject');
    } catch (error) {
      console.error('Error updating subject', error);
      setError('Error updating subject. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/subject');
  };

  return (
    <div>
      <div className='bar'>
      <div >
      <nav >
        <ul >
          <div className="nav-links">
          <div>
          < li ><h1 className="titulo-principal">UniTask</h1> </li></div>
          <div> 
            <li className='link-list'><Link to="/project" >Projects</Link></li>  
            <li className='link-list'><Link to="/exam" > Exams </Link></li>  
            <li className='link-list'><Link to="/course" > Courses </Link></li>  
            <li className='link-list'><Link to="/grade"> Grades </Link></li>  
            <li className='link-list'><Link to="/subject" > Subjects </Link></li>
            <li className='link-list'><Link to="/home" > Home </Link></li>  </div></div>
        </ul>
      </nav>
      </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="titulo-secundario">Edit Subject</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={subject.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="professor">Professor:</label>
          <input 
            type="text" 
            id="professor" 
            name="professor" 
            value={subject.professor} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="semester">Semester:</label>
          <input 
            type="text" 
            id="semester" 
            name="semester" 
            value={subject.semester} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="day">Day:</label>
          <input 
            type="text" 
            id="day" 
            name="day" 
            value={subject.day} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="startTime">startTime:</label>
          <input 
            type="time" 
            id="startTime" 
            name="startTime" 
            value={subject.startTime} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="endTime">endTime:</label>
          <input 
            type="time" 
            id="endTime" 
            name="endTime" 
            value={subject.endTime} 
            onChange={handleChange} 
          />
        </div>
        <button className="button-21" role="button" type="submit">Update Subject</button>
        <button className="button-22" role="button" type="button" onClick={handleCancel}>Cancel</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SubjectEdit;