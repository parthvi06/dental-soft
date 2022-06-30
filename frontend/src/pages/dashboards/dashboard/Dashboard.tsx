import React,{ useState } from 'react';

import { Calendar, Card, Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import hospitalOptions from './charts/hospital-options';
import FullCalendar from '@fullcalendar/react';
import { formatDate } from '@fullcalendar/core';
import dayGrid from '@fullcalendar/daygrid';
import { incomeInWeek, incomeInMonth } from './charts/income-options';
import {
  patientsGenderOptions,
  departmentsOptions,
  patientsAgeOptions
} from './charts/patients-options';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IAppointment } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { appointmentsReducer } from '../../../redux/appointments/reducer';
import { fetchAppointment } from '../../../api';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboards',
      route: 'default-dashboard'
    },
    {
      title: 'Default'
    }
  ]
};

const DashboardPage = () => {
  const [appointments] = useFetchPageData<IAppointment[]>('http://localhost:7000/appointments', []);
  usePageData(pageData);
  const [event, setEvent] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);


  const start = formatDate('2018-09-01', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'es',
  })


  const handleEventClick = (arg: any) => {
    setEvent(arg.event);
    setModalVisibility(true);
  };
  const closeModal = () => setModalVisibility(false);
  let modalBody, modalTitle, modalFooter;
  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-first-aid-alt'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Appointments</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  213
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-wheelchair'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>New patients</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  213
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-blood'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Operations</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  23
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-dollar-true'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Earnings</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  $5238
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card className='mb-0'>
        <FullCalendar
          events={appointments}
          initialView='dayGridMonth'
          plugins={[ dayGrid]}
          dayMaxEvents={true}
          weekends
        />
      </Card>
    </>
  );
};

export default DashboardPage;




