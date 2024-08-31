import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const allCourses = async () => {
      try {
        const URL = "http://localhost:8080/course";
        const respuesta = await axios.get(URL);
        setCourses(respuesta.data);
      } catch (error) {
        console.log("Error getting course", error);
        setError(error.response?.statusText);
      }
    };

    allCourses();
  }, []);

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/course/delete/${id}`);
      setCourses(courses.filter(course => course._id !== id));
      navigate('/course');
    } catch (error) {
      console.log("Error delete course", error);
      setError(error.response?.data?.message);
    }
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
      <div>
      <button 
          onClick={() => navigate(`/course/new`)} 
          className="button-21" role="button">
          Add Course
          </button>
      </div>
      <div className="list">
        <div className="grid">
          {courses.map((course) => (
            <div key={course._id} className="box">
              <h2 className="titulo">{course.name}</h2>
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Duration (hs):</strong> {course.duration}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Date:</strong> {new Date(course.date).toLocaleDateString()}</p>
              <button 
                  onClick={() => navigate(`/course/${course._id}/edit`)} 
                  className="button-21" role="button">
                  Edit
                </button>
                <button 
                  onClick={() => deleteCourse(course._id)}
                  className="button-22" role="button">
                  Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div> {error}</div>
    </div>
  );
};

export default CourseList;