import React, { useContext, useEffect, useState } from 'react';
import "../styles/Page__RecordStyles.css";
import { addPortfolio } from "../store/portfolioSlice";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from "../components/RecordCalendar";
import { ContextUser } from '..';

const FilteredPortfolioItem = ({ portfolio }) => {
  const [date, setDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { user } = useContext(ContextUser);
  const handleDateChange = date => setDate(date);
  const handleItemClick = item => setSelectedItem(item);
  const handleTimeClick = time => setSelectedTime(time);

  const times = [
    "09:00", "10:00", "11:00", 
    "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", 
    "18:00", "19:00", "20:00"
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
  };

  const isTimeDisabled = (time) => {
    if (!date) return false;
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate.toDateString() !== currentDate.toDateString()) {
      return false;
    }

    const [selectedHour, selectedMinute] = time.split(':');
    const [currentHour, currentMinute] = getCurrentTime().split(':');

    return selectedHour < currentHour || (selectedHour === currentHour && selectedMinute <= currentMinute);
  };

  const handleBooking = async () => {
    if (!date || !selectedTime || !selectedItem) {
      alert('Пожалуйста, выберите дату, время и услугу.');
      return;
    }

    const bookingData = {
      date: date,
      time: selectedTime,
      portfolioId: portfolio._id,
      service: selectedItem
    };

    try {
      await axios.post('/api/book', bookingData);
      alert('Запись успешно создана');
    } catch (error) {
      console.error('Ошибка при создании записи:', error);
      alert('Ошибка при создании записи: selected slot is busy');
    }
  };

  return (
    <div className="record">
      <div className="portfolioItem r_item__1">
        <img src={portfolio.picture} alt="master_photo" />
      </div>
      <div className="portfolioItem r_item__2">
        {portfolio.title}
      </div>
      <div className='portfolioItem r_item__3'>
        <label className={selectedItem === 'Базовый комплекс' ? 'selected' : ''}>
          <input
            type="radio"
            name="portfolioItem"
            value="Базовый комплекс"
            onChange={() => handleItemClick('Базовый комплекс')}
          />
          Базовый комплекс
        </label>
        <label className={selectedItem === 'Наращивание' ? 'selected' : ''}>
          <input
            type="radio"
            name="portfolioItem"
            value="Наращивание"
            onChange={() => handleItemClick('Наращивание')}
          />
          Наращивание
        </label>
        <label className={selectedItem === 'Коррекция' ? 'selected' : ''}>
          <input
            type="radio"
            name="portfolioItem"
            value="Коррекция" 
            onChange={() => handleItemClick('Коррекция')}
          />
          Коррекция
        </label>
        <label className={selectedItem === 'Японский маникюр' ? 'selected' : ''}>
          <input
            type="radio"
            name="portfolioItem"
            value="Японский маникюр"
            onChange={() => handleItemClick('Японский маникюр')}
          />
          Японский маникюр
        </label>
        <label className={selectedItem === 'SPA-уход' ? 'selected' : ''}>
          <input
            type="radio"
            name="portfolioItem"
            value="SPA-уход"
            onChange={() => handleItemClick('SPA-уход')}
          />
          SPA-уход
        </label>
      </div>
      <div className='portfolioItem r_item__4'>
        <Calendar onChange={handleDateChange} />
        
        {user.isAuth && date && selectedTime && selectedItem &&  (
          <button className='record_button' onClick={handleBooking}>
            Записаться на {date.toLocaleDateString()} в {selectedTime}
          </button>
       
      )}
      {!user.isAuth && date && selectedTime && selectedItem &&  (
          <button className='record_button'>
            Авторизуйтесь для записи
          </button>
       
      )}
      </div>
      {date && (
        <div className='portfolioItem r_item__5'>
          {times.map(time => (
            <label
              key={time}
              className={`time-label ${selectedTime === time ? 'time-selected' : ''} ${isTimeDisabled(time) ? 'time-disabled' : ''}`}
            >
              <input
                type="radio"
                name="time"
                value={time}
                onChange={() => handleTimeClick(time)}
                disabled={isTimeDisabled(time)}
              />
              {time}
            </label>
          ))}
        </div>
      )}
      
    </div>
  );
};

const RecordPage = () => {
  const portfolios = useSelector(state => state.portfolios.portfolios);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/portfolios").then((result) => {
      result.data.forEach(element => {
        dispatch(addPortfolio(element));
      });
    });
  }, [dispatch]);

  return (
    <div className='record-content'>
      {portfolios.map((portfolio, index) => (
        <FilteredPortfolioItem
          portfolio={portfolio}
          key={portfolio._id}
        />
      ))}
    </div>
  );
};

export default RecordPage;
