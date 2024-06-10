import React from 'react';
import classnames from 'classnames';
import "../styles/Page__RecordCalendar.css";
import * as calendar from './calendar';

export default class Calendar extends React.Component {
    static defaultProps = {
        date: new Date(),
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    get day() {
        return this.state.date.getDate();
    }

    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1);
        this.setState({ date });
    };

    handleNextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1);
        this.setState({ date });
    };

    handleDayClick = date => {
        const { currentDate } = this.state;
        if (date.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0)) {
            this.setState({ selectedDate: date });
            this.props.onChange(date);
        }
    };

    render() {
        const { monthNames, weekDayNames } = this.props;
        const { currentDate, selectedDate } = this.state;

        const monthData = calendar.getMonthData(this.year, this.month);

        return (
            <div className="calendar">
                <header>
                    <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
                    <div className="month-name">{monthNames[this.month]}</div>
                    <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                </header>

                <table>
                    <thead>
                        <tr>
                            {weekDayNames.map(name =>
                                <th key={name}>{name}</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {monthData.map((week, index) =>
                            <tr key={index} className="week">
                                {week.map((date, index) => date ?
                                    <td
                                        key={index}
                                        className={classnames('day', {
                                            'today': calendar.areEqual(date, currentDate),
                                            'selected': calendar.areEqual(date, selectedDate),
                                            'disabled': date.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
                                        })}
                                        onClick={() => this.handleDayClick(date)}
                                    >{date.getDate()}</td>
                                    :
                                    <td key={index} />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
