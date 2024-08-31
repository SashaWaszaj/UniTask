import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllExams = async () => {
      try {
        const URL = "http://localhost:8080/exam";
        const respuesta = await axios.get(URL);
        setExams(respuesta.data);
      } catch (error) {
        console.log("Error getting exam", error);
        setError(error.response?.statusText);
      }
    };

    getAllExams();
  }, []);

  const deleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/exam/delete/${id}`);
      setExams(exams.filter(exam => exam._id !== id));
      navigate('/exam');
    } catch (error) {
      console.log("Error delete exam", error);
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
          onClick={() => navigate(`/exam/new`)} 
          className="button-21" role="button">
          Add Exam
          </button>
      </div>
      <div className="list">
        <div className="grid">
          {exams.map((exam) => (
            <div key={exam._id} className="box">
              <h2 className="titulo">{exam.title}</h2>
              <p><strong>Subject:</strong> {exam.subject}</p>
              <p><strong>Description:</strong> {exam.description}</p>
              <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {exam.time}</p>
              <button 
                  onClick={() => navigate(`/exam/${exam._id}/edit`)} 
                  className="button-21" role="button">
                  Edit 
                </button>
                <button 
                  onClick={() => deleteExam(exam._id)}
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

export default ExamList;