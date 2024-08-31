import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/project/register', formData);
      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Error registering. Try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
};

  
  return (
    <div className="contenedor">
      <form onSubmit={handleSubmit}>
        <h1 className="titulo-principal">UniTask</h1>
        <h2 className="titulo">Create user</h2>
        <div>
          <label htmlFor="firstName">FirstName: </label>
          <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">LastName: </label>
          <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          />
        </div>

        <div>
        <label htmlFor="email">Gmail: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
         />
        </div>

        <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
         />
        </div>

        <div>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
         />
        </div>

        <button className="button-21" role="button" type="submit">Register</button>
        <button className="button-22" role="button" type="button" onClick={handleCancel}>Cancel</button>
        <div className="mensaje-error">{error}</div>
      </form>
    </div>
  );
};

export default Register;