import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SubjectForm = () => {
  const [subject, setSubject] = useState({
    name: '',
    professor: '',
    semester: '',
    day: '',
    startTime: '',
    endTime: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8080/subject/new", subject);
      console.log('Server response:', response);
      setSubject({
        name: '',
        professor: '',
        semester: '',
        day: '',
        startTime: '',
        endTime: ''
    });
      navigate("/subject");
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error adding subject. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate("/subject");
  };

  return (
    <div><div className='bar'>
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
      <h2 className="titulo-secundario">New Subject</h2>
      <div>
        <label>Name:</label>
        <input 
        type="text" 
        name="name" 
        value={subject.name} 
        onChange={handleChange} 
        required 
        />
      </div>
      <div>
        <label>Professor:</label>
        <input 
        type="text" 
        name="professor" 
        alue={subject.professor} 
        onChange={handleChange} 
        required 
        />
      </div>
      <div>
        <label>Semester:</label>
        <input 
        type="text" 
        name="semester" 
        value={subject.semester} 
        onChange={handleChange} 
        required 
        />
      </div>
      <div>
        <label>Day:</label>
        <input 
        type="text" 
        name="day" 
        value={subject.day} 
        onChange={handleChange} 
        required />
      </div>
      <div>
        <label>Start Time:</label>
        <input 
        type="time" 
        name="startTime" 
        value={subject.startTime} 
        onChange={handleChange} 
        required 
        />
      </div>
      <div>
        <label>End Time:</label>
        <input 
        type="time" 
        name="endTime" 
        value={subject.endTime} 
        onChange={handleChange} 
        required 
        />
      </div>
      <button className="button-21" role="button" type="submit">Add Subject</button>
      <button className="button-22" type="button" onClick={handleCancel}>Cancel</button>
    </form></div>
  );
};

export default SubjectForm;