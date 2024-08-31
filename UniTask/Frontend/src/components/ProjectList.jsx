import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const URL = "http://localhost:8080/project";
        const respuesta = await axios.get(URL);
        setProjects(respuesta.data);
      } catch (error) {
        console.log("Error getting projects", error);
        setError(error.response?.statusText);
      }
    };

    getAllProjects();
  }, []);

  const deleteProjects = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/project/delete/${id}`);
      setProjects(projects.filter(project => project._id !== id));
      navigate('/project');
    } catch (error) {
      console.log("Error delete project", error);
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
          onClick={() => navigate(`/project/new`)} 
          className="button-21" role="button">
          Add Project
          </button>
      </div>
      <div className="list">
        <div className="grid">
          {projects.map((project) => (
            <div key={project._id} className="box">
              <h2 className="titulo">{project.title}</h2>
              <p><strong>Subject:</strong> {project.subject}</p>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Due Date:</strong> {new Date(project.dueDate).toLocaleDateString()}</p>
              <button 
                  onClick={() => navigate(`/project/${project._id}/edit`)} 
                  className="button-21" role="button">
                  Edit 
                </button>
                <button 
                  onClick={() => deleteProjects(project._id)}
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

export default ProjectList;