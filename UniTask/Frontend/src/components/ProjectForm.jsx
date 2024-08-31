import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from 'axios';

const ProjectForm = () => {
    const [project, setProject] = useState({
        title: '',  
        subject: '',
        description: '',
        dueDate: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:8080/project/create', project);
            console.log(response);
            setProject({
                title: '',
                subject: '',
                description: '',
                dueDate: '',
            });
            navigate("/project");
        } catch (error) {
            console.error(error);
            setError("Error adding the project. Please try again.");
        }
    };

    useEffect(() => {
        console.log(project);
    }, [project]);

    const handleCancel = () => {
        navigate("/project");
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
        
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className="titulo-secundario">New Project</h2>
                <div>
                    <label htmlFor="title">Title:</label> 
                    <input 
                        type="text"
                        id="title"  
                        name="title"  
                        value={project.title}
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
                        value={project.subject}
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
                        value={project.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="dueDate"> Due Date:</label>
                    <input 
                        type="date"
                        id="date"
                        name="dueDate"
                        value={project.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button className="button-21" role="button" type="submit">Add Project</button>
                <button className="button-22" role="button" type="button" onClick={handleCancel}>Cancel</button>

                <div>{error}</div>
            </form>
        </div></div>
    );
};

export default ProjectForm;