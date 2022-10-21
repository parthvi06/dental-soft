import React from 'react';
import { IPageData } from '../../../interfaces/page';
import { usePageData } from '../../../hooks/usePage';
const pageData: IPageData = {
    title: 'Schedule',
    fulFilled: true,
    breadcrumbs: [
      {
        title: 'Medicine',
        route: 'default-dashboard'
      },
      {
        title: 'Schedule'
      }
    ]
  };
const SeatReservation = () => {
    usePageData(pageData);

  return (
    <div>
        <div className="seat-alot">
            <div className="seat-side">
                <h3 className="select-text">Please select a seat</h3>
            </div>
            <ol className="cabin">
            <li className="row row--1">
                <ol className="seats" type="A">
                <li className="seat">
                    <input type="checkbox" id="1A" />
                    <label htmlFor="1A">Chair 1</label>
                </li>
                <li className="seat">
                    <input type="checkbox" id="1B" />
                    <label htmlFor="1B">Chair 2</label>
                    </li>
                    <li className="seat">
                    <input type="checkbox" id="1C" />
                    <label htmlFor="1C">Chair 3</label>
                    </li>
                    <li className="seat">
                    <input type="checkbox" id="1D" />
                    <label htmlFor="1D">Chair 4</label>
                    </li>
                    <li className="seat">
                    <input type="checkbox" id="1E" />
                    <label htmlFor="1E">Chair 5</label>
                    </li>
                    <li className="seat">
                    <input type="checkbox" id="1F" />
                    <label htmlFor="1F">Chair 6</label>
                    </li>
                </ol>
                </li>
            </ol>
        </div>
    </div>
  )
}

export default SeatReservation