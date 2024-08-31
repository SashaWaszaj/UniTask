import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [averageGrade, setAverageGrade] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllGrades = async () => {
      try {
        const URL = "http://localhost:8080/grade/";
        const respuesta = await axios.get(URL);
        setGrades(respuesta.data);

        const totalGrades = respuesta.data.reduce((acc, grade) => acc + grade.grade, 0);
        const avg = respuesta.data.length > 0 ? totalGrades / respuesta.data.length : 0;

        setAverageGrade(avg.toFixed(2)); 
      } catch (error) {
        console.log("Error getting grades", error);
        setError(error.response?.statusText);
      }
    };

    getAllGrades();
  }, []);

  const deleteGrade = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/grade/delete/${id}`);
      setGrades(grades.filter(grade => grade._id !== id));

      const updatedGrades = grades.filter(grade => grade._id !== id);
      const totalGrades = updatedGrades.reduce((acc, grade) => acc + grade.grade, 0);
      const avg = updatedGrades.length > 0 ? totalGrades / updatedGrades.length : 0;
      
      setAverageGrade(avg.toFixed(2));
      navigate('/grade');
    } catch (error) {
      console.log("Error delete grade", error);
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
          onClick={() => navigate(`/grade/new`)} 
          className="button-21" role="button">
          Add Grade
          </button>
      </div>
      <div>
        <h2>Average Grade: {averageGrade}</h2>
      </div>
      <div className="list" >
        <div className="grid">
          {grades.map((grade) => (
            <div key={grade._id} className="box">
              <div className='grade'>
              <div>
                <h2 className="titulo">{grade.title}</h2>
                <p><strong>Subject:</strong> {grade.subject}</p>
                <p><strong>Description:</strong> {grade.description}</p>
              </div>
              <div>
                <p className='grade-circle'>{grade.grade}</p>
              </div>
              </div>
              <button 
                  onClick={() => navigate(`/grade/${grade._id}/edit`)} 
                  className="button-21" role="button">
                  Edit 
                </button>
                <button 
                  onClick={() => deleteGrade(grade._id)}
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

export default GradeList;