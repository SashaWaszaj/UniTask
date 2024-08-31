import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const GradeEdit = () => {
  const [grade, setGrade] = useState({
    title: '',
    subject: '',
    description: '',
    grade: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await Axios.get(`http://localhost:8080/grade/${id}`);
        const gradeData = response.data;
        setGrade({
          ...gradeData,
        });
      } catch (error) {
        console.error('Error fetching grades', error);
        setError('Error fetching grade details.');
      }
    };

    fetchGrade();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrade({ ...grade, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8080/grade/update/${id}`, grade);
      navigate('/grade'); 
    } catch (error) {
      console.error('Error updating grade', error);
      setError('Error updating grade. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/grade'); 
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
        <h2 className="titulo-secundario">Edit Grade</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={grade.title} 
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
            value={grade.subject} 
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
            value={grade.description} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="grade">Grade:</label>
          <input 
            type="number" 
            id="grade" 
            name="grade" 
            value={grade.grade} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button className="button-21" role="button" type="submit">Update Grade</button>
        <button className="button-22" role="button" type="button" onClick={handleCancel}>Cancel</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default GradeEdit;