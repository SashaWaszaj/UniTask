import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const CourseEdit = () => {
  const [course, setCourse] = useState({
    name: '',
    description: '',
    duration: '',
    instructor: '',
    date: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };
  
  useEffect(() => {
    const allCourse = async () => {
      try {
        const response = await Axios.get(`http://localhost:8080/course/${id}`);
        const courseData = response.data;
        setCourse({
          ...courseData,
          date: formatDate(courseData.date)
        });
      } catch (error) {
        console.error('Error fetching course', error);
        setError('Error fetching subject details.');
      }
    };
  
    allCourse();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8080/course/${id}/edit`, course);
      setError(null);
      navigate('/course'); 
    } catch (error) {
      console.error('Error updating course', error);
      setError('Error updating course. Please try again.');
    }
  };
  
  const handleCancel = () => {
    navigate('/course'); 
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
      <form onSubmit={updateCourse}>
      <h2 className="titulo-secundario">Edit Course</h2>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={course.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description (optional):</label>
          <input type="text" name="description" value={course.description} onChange={handleChange} />
        </div>
        <div>
          <label>Duration (hs):</label>
          <input type="text" name="duration" value={course.duration} onChange={handleChange} required />
        </div>
        <div>
          <label>Instructor:</label>
          <input type="text" name="instructor" value={course.instructor} onChange={handleChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={course.date} onChange={handleChange} />
        </div>
        <button className="button-21" role="button" type="submit">Update Course</button>
        <button className="button-22" role="button" type="button" onClick={handleCancel}>Cancel</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default CourseEdit;