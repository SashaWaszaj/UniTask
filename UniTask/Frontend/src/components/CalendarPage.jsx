import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import EventsCalendar from './EventsCalendar';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const coursesResponse = await Axios.get('http://localhost:8080/course');
      const courses = coursesResponse.data.map(course => ({
        title: course.name,
        start: new Date(course.date),
        end: new Date(course.date),
        allDay: true,
        color: '#ff6347' 
      }));

      const examsResponse = await Axios.get('http://localhost:8080/exam');
      const exams = examsResponse.data.map(exam => ({
        title: exam.title,
        start: new Date(exam.date),
        end: new Date(exam.date),
        allDay: true,
        color: '#4682b4' 
      }));
      const projectsResponse = await Axios.get('http://localhost:8080/project');
      const projects = projectsResponse.data.map(project => ({
        title: project.title,
        start: new Date(project.dueDate),
        end: new Date(project.dueDate),
        allDay: true,
        color: 'yellow' 
      }));

      setEvents([...courses, ...exams, ...projects]);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <EventsCalendar events={events} />
    </div>
  );
};

export default CalendarPage;