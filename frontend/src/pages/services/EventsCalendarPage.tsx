import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';

import { IPageData } from '../../interfaces/page';

import FullCalendar from '@fullcalendar/react';
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useFetchPageData,usePageData } from '../../hooks/usePage';
import { IAppointment } from '../../interfaces/patient';
import { appointmentsReducer } from '../../redux/appointments/reducer';
import { fetchAppointment } from '../../api';

const headerOptions = {
  left: 'prev,next today',
  center: 'title',
  right: 'dayGridMonth,dayGridWeek,dayGridDay'
};

const pageData: IPageData = {
  title: 'Events calendar',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Apps',
      route: 'default-dashboard'
    },
    {
      title: 'Service pages',
      route: 'default-dashboard'
    },
    {
      title: 'Events calendar'
    }
  ]
};

const EventsCalendarPage = () => {
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

  if (event) {
    modalBody = (
      <div className='d-flex flex-column'>
        <div className='event-time flex-column mb-4'>
          <h5 className='event-title m-0'>Event time</h5>
          <span>
            From: {event.start.toDateString()} - to: {event.end.toDateString()}
          </span>
        </div>

        <div className='event-desc flex-column'>
          <h5 className='event-title m-0'>Event description</h5>
          <span>{event.extendedProps.desc}</span>
        </div>
      </div>
    );

    modalTitle = (
      <div className='title-block p-0 m-0'>
        <h3 style={{ color: event.backgroundColor }} className='modal-title m-0'>
          {event.title}
        </h3>
      </div>
    );

    modalFooter = (
      <div className='d-flex justify-content-between modal-footer'>
        <Button onClick={closeModal} danger>
          Close
        </Button>
        <Button type='primary'>Change event</Button>
      </div>
    );
  }

  return (
    <>
      <Card className='mb-0'>
      <FullCalendar
          events={appointments}
          initialView='dayGridMonth'
          plugins={[ dayGridPlugin]}
          dayMaxEvents={true}
          weekends
        />
      </Card>

      <Modal
        title={modalTitle}
        footer={modalFooter}
        visible={modalVisibility}
        onCancel={closeModal}
      >
        {modalBody}
      </Modal>
    </>
  );
};

export default EventsCalendarPage;
