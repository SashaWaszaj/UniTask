import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allSubjects = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/subject');
        console.log(response.data);
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allSubjects();
  }, []);

  const deleteSubject = async (id) => {
    try {
      await Axios.delete(`http://localhost:8080/subject/delete/${id}`);
      setSubjects(subjects.filter(subject => subject._id !== id));
      navigate('/subject');
    } catch (error) {
      console.log("Error delete subjects", error);
      setError(error.response?.data?.message);
    }
  };

  const filteredSubjects = subjects.filter(subject => subject.day);

  const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
    if (!acc[subject.day]) {
      acc[subject.day] = [];
    }
    acc[subject.day].push(subject);
    return acc;
  }, {});

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
    <div className="subject-list-container">
      <div>
        <button 
          onClick={() => navigate(`/subject/new`)} 
          className="button-21" role="button">
          Add Subject
        </button>
      </div>
      <div className="subject-list">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
          <div key={day} className="day-column">
            <h2>{day}</h2>
            {groupedSubjects[day] && groupedSubjects[day].length > 0 ? (
              groupedSubjects[day].map(subject => (
                <div key={subject._id} className="subject-item">
                  <h3>{subject.name}</h3>
                  <p><strong>Professor:</strong> {subject.professor}</p>
                  <p><strong>Semester:</strong> {subject.semester}</p>
                  <p><strong>Start Time:</strong> {subject.startTime}</p>
                  <p><strong>End Time:</strong> {subject.endTime}</p>
                  <button 
                  onClick={() => navigate(`/subject/${subject._id}/edit`)} 
                  className="button-21" role="button">
                  Edit
                </button>
                <button 
                  onClick={() => deleteSubject(subject._id)}
                  className="button-22">
                  Delete
              </button>
                </div>
              ))
            ) : (
              <p>No subjects</p>
            )}
          </div>
        ))}
      </div>
    </div></div>
  );
};

export default SubjectList;