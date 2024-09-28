import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import '../../../styles/mentor_dashboard/Calendar.css'

const MentorCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [scheduledDates, setScheduledDates] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowTimePicker(true);
  };

  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleSchedule = () => {
    const newScheduledDate = new Date(date);
    const [hours, minutes] = time.split(':');
    newScheduledDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    setScheduledDates([...scheduledDates, newScheduledDate]);
    setShowTimePicker(false);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && scheduledDates.find(scheduledDate => 
      scheduledDate.getDate() === date.getDate() &&
      scheduledDate.getMonth() === date.getMonth() &&
      scheduledDate.getFullYear() === date.getFullYear()
    )) {
      return 'scheduled-date';
    }
  };

  return (
    <div className="mentor-calendar-container">
      <h2 className="calendar-title">Schedule Your Classes</h2>
      <div className="calendar-wrapper">
        <Calendar 
          onChange={handleDateChange} 
          value={date}
          minDate={new Date()}
          tileClassName={tileClassName}
          className="custom-calendar"
        />
      </div>
      {showTimePicker && (
        <div className="time-picker-container">
          <h3>Select Time for {date.toDateString()}</h3>
          <TimePicker
            onChange={handleTimeChange}
            value={time}
            className="custom-time-picker"
            disableClock={true}
            clearIcon={null}
          />
          <button className="schedule-btn" onClick={handleSchedule}>Schedule Class</button>
        </div>
      )}
      <div className="scheduled-classes">
        <h3>Upcoming Classes</h3>
        <ul>
          {scheduledDates.map((scheduledDate, index) => (
            <li key={index}>{scheduledDate.toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MentorCalendar;



