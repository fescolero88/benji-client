import React from 'react';
import BookCrewItem from './CrewItem';

const BookCrewList = ({ crews }) => {
  return (
    <div className="ant-list ant-list-split">
      <ul className="ant-list-items">
        {crews.map((crew, index) => {
          return <BookCrewItem key={`crew_item_${index}`} crew={crew} />;
        })}
      </ul>
    </div>
  );
};

export default BookCrewList;
