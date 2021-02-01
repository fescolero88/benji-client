import { Map } from 'immutable';
import _ from 'lodash';
import moment from 'moment';
import { openWeather } from '@iso/config/env';

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function showServerError(error) {
  if (!error) return;

  if (_.isError(error)) {
    return error.message
  }

  if (_.isObject(error)) {
    const errorTypes = Object.keys(error);

    if (errorTypes.length === 0) return null;

    if (errorTypes.length > 0) {
      const firstError = error[errorTypes[0]];

      if (_.isString(firstError)) {
        return firstError
      } else if (_.isArray(firstError)) {
        return firstError.join(',')
      } else {
        return 'Unknown error happened';
      }
    }

  }

  return error;
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => (num > 9 ? '' + num : '0' + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }
  return defValue;
}
export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}

export const stringToDate = (dateString, format = 'YYYY-MM-DD') => {
  return dateString ? moment(dateString, format) : '';
};

export const stringToTime = (timeString, format = 'hh:mm A') => {
  return timeString ? moment(timeString, format) : '';
};

export const formatDateString = (dateString, format = 'YYYY-MM-DD') => {
  return dateString ? moment(dateString).format(format) : '';
};

export const formatDateRange = (startDate, endDate) => {
  const sDate = moment(startDate);
  const eDate = moment(endDate);
  if (!sDate.isValid() || !eDate.isValid()) {
    return null;
  }

  const sYear = sDate.format('YYYY');
  const sMonth = sDate.format('MMM');
  const sDay = sDate.format('Do');

  const eYear = eDate.format('YYYY');
  const eMonth = eDate.format('MMM');
  const eDay = eDate.format('Do');

  // Check if month and year are the same
  if (sYear === eYear && sMonth === eMonth) {
    return `${sMonth} ${sDay} - ${eMonth} ${eDay}, ${eYear}`;
  }

  // Check if year is the same
  if (sYear === eYear) {
    return `${sMonth} ${sDay} - ${eMonth} ${eDay}, ${eYear}`;
  }

  return `${sMonth} ${sDay}, ${sYear} - ${eMonth} ${eDay}, ${eYear}`;
};

export const formatTimeString = (timeString, format = 'hh:mm A') => {
  return timeString ? moment(timeString, 'HH:mm:ss').format(format) : '';
};

export const formatNumber = (number = 0) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

export const formatCurrency = (unit, number = 0) => {
  return `${unit}${formatNumber(number)}`
};

export const splitFullName = (fullName) => {
  if (!fullName) return {};
  const chunks = fullName.split(' ');

  return { firstName: chunks[0], lastName: chunks[1] || '' };
};

export const isSequenceDates = (dates) => {
  const minDate = _.min(dates);
  const maxDate = _.max(dates);
  const diffDays = moment(maxDate).diff(moment(minDate), 'days') + 1

  return dates.length === diffDays ? true : false;
};

export const convertTZ = (date, timeZone) => {
  return new Date((typeof date === "number" || typeof date === "string" ? new Date(date) : date)).toLocaleString("en-US", { timeZone }).split(',')[1];
}

export const getWeather = (lat, lng) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  return fetch(`${openWeather.url}/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${openWeather.key}`, requestOptions)
    .then(response => response.text())
}

export const base64Image = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}?timestamp=${Date.now()}`);
    xhr.responseType = 'blob';
    xhr.send();

    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
  });
};

export const getWeatherData = (data) => {
  const { current, timezone } = data;
  const { sunrise, sunset, temp, wind_speed } = current;
  const sunRiseWithTimeZone = convertTZ(sunrise * 1000, timezone);
  const sunSetWithTimeZone = convertTZ(sunset * 1000, timezone);
  const date = formatDateString(current.dt * 1000, 'dddd, MMMM D, YYYY');
  return { sunRiseWithTimeZone, sunSetWithTimeZone, temp, wind_speed, date };
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
