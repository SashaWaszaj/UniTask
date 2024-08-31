import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ExamEdit = () => {
  const [exam, setExam] = useState({
    title: '',
    subject: '',
    description: '',
    date: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await Axios.get(`http://localhost:8080/exam/${id}`);
        const examData = response.data;
        setExam({
          ...examData,
          date: formatDate(examData.date), 
        });
      } catch (error) {
        console.error('Error fetching exam', error);
        setError('Error fetching exam details.');
      }
    };

    fetchExam();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8080/exam/${id}/edit`, exam);
      navigate('/exam'); 
    } catch (error) {
      console.error('Error updating exam', error);
      setError('Error updating exam. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/exam'); 
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
        <h2 className="titulo-secundario">Edit Exam</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={exam.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            value={exam.subject} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="description">Description (optional):</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            value={exam.description} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={exam.date} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input 
            type="text" 
            id="time" 
            name="time" 
            value={exam.time} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button className="button-21" role="button" type="submit">Update Exam</button>
        <button className="button-22" role="button" type="button" onClick={handleCancel}>Cancel</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default ExamEdit;