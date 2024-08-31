import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";
import './Styles.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await Axios.post("http://localhost:8080/project/login", formData);
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");
      console.log(response.data);
      setError(null);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError("Failed to log in.");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="contenedor">
      
        <form onSubmit={handleSubmit}>
            <h1 className="titulo-principal">UniTask</h1>
            <h2 className="titulo">Login</h2>
            <div>
                <label htmlFor="email">Gmail: </label>
                <input
                value={formData.email}
                type="email"
                name="email"
                onChange={handleChange}
            />
           </div>

           <div>
                <label htmlFor="password">Password: </label>
                <input
                value={formData.password}
                type="password"
                name="password"
                onChange={handleChange}
            />
            </div>

            <div className="link-registrarse">
                <Link to="/register" className="link">Don't have an account yet? Register here</Link>
           </div>
           
           <button className="button-21" role="button" type="submit">Access</button>
           <div className="mensaje-error">{error}</div>
        </form>
    </div>
  );
};

export default Login;