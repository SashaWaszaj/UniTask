import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventsCalendar.css";
import { Link } from 'react-router-dom';
import FrasesAleatoria from '../components/FraseAleatoria'; 

const localizer = momentLocalizer(moment);

const EventsCalendar = ({ events }) => {

  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color, 
        borderRadius: '5px',
        color: 'black',
        marginTop: '6px',
        fontSize: '17px',
        fontWeight: 'bold',
        border: '0px',
        display: 'flex',              
        alignItems: 'center',         
        justifyContent: 'center',    
        textAlign: 'center'  
      }
    };
  };

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
    <div className="bigCalendar-container">

      
      <h2 className="calendar-title">Activities Calendar</h2>
      <FrasesAleatoria></FrasesAleatoria>
      

      <div className="contenido">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 850, width: 1350, margin: "20px"}}
        eventPropGetter={eventPropGetter} 
        messages={{
          next: "Next",
          previous: "Previous",
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
      />
      </div>
    </div></div>
  );
};

export default EventsCalendar;