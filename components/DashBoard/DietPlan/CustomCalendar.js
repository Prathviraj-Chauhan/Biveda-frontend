import React, { useEffect, useState } from "react";
import styles from "./calendar.module.scss";
import { useSelector } from "react-redux";

const CustomCalendar = () => {
  const defaultDate = new Date(); // Use the default date you want
  const [selectedMonth, setSelectedMonth] = useState(
    defaultDate.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(defaultDate.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [currentDate, setCurrentDate] = useState(defaultDate);

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  // Function to generate an array of days for the selected month and year
  const generateDays = () => {
    if (!selectedMonth || !selectedYear) {
      return [];
    }

    const numberOfDays = getDaysInMonth(selectedYear, selectedMonth);
    return Array.from({ length: numberOfDays }, (_, index) => index + 1);
  };

  // Function to generate an array of years (including past and future)
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    const pastYears = 50; // Number of past years to include
    const futureYears = 50; // Number of future years to include

    for (let i = currentYear - pastYears; i <= currentYear + futureYears; i++) {
      years.push(i);
    }

    return years;
  };

  // Function to generate an array of months
  const generateMonths = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months;
  };

  // Function to generate weekdays based on the selected month and year
  const generateWeekdays = () => {
    const date = new Date(selectedYear, selectedMonth - 1, 1);
    const weekdays = new Array(7).fill(0).map((_, index) => {
      const currentDay = new Date(date);
      currentDay.setDate(date.getDate() + index);
      return currentDay.toLocaleDateString("en-US", { weekday: "short" });
    });
    return weekdays;
  };

  // Function to handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Function to handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleDayClick = (day) => {
    // Do something with the selected day, e.g., set it as the current date
    const newDate = new Date(selectedYear, selectedMonth - 1, day);
    setCurrentDate(newDate);
    // Add any other logic you want to perform on day click
  };

  // Update days and weekdays when month or year changes
  useEffect(() => {
    setDaysInMonth(generateDays());
    setWeekdays(generateWeekdays());
  }, [selectedMonth, selectedYear]);
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["calendar_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <div className={styles.calendar_header}>
        <h3>Select Date</h3>
        <div className={styles.calendar_select_month}>
          <select onChange={handleMonthChange} value={selectedMonth}>
            <option value="" hidden>
              Select Month
            </option>
            {generateMonths().map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select onChange={handleYearChange} value={selectedYear}>
            <option value="" hidden>
              Select Year
            </option>
            {generateYears().map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.calendar_body}>
        <ul className={styles.calendar_body_header}>
          {weekdays.map((weekday, index) => (
            <li key={index}>{weekday}</li>
          ))}
        </ul>
        <ul className={styles.calendar_body_dates}>
          {daysInMonth.map((day, index) => (
            <li
              key={index}
              onClick={() => handleDayClick(day)} // Add this line
              className={currentDate.getDate() === day ? styles.currentDay : ""}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomCalendar;
