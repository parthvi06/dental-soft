import React,{ useState } from 'react';

import { Calendar, Card, Button, Modal,Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { CalendarApi } from '@fullcalendar/react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import AddAppointment from '../appointment/AddAppointment';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';
// import { useAppointments } from '../../../hooks/useAppointments';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { IAppointment } from '../../../interfaces/patient';
// import { IEventCalendar } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
// import { appointmentsReducer } from '../../../redux/appointments/reducer';
// import { fetchAppointment } from '../../../api';
// import { setConstantValue } from 'typescript';
import { ModalInfosEventCalendar } from "./ModalInfosEventCalendar";
import {toast} from 'react-toastify';
import { editAppointment } from '../../../redux/appointments/actions';
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
type CalendarSchedulerProps = {
  eventsCalendar: IAppointment[];
}
const DashboardPage = ({eventsCalendar}: CalendarSchedulerProps) => {
  const [appointments] = useFetchPageData<IAppointment[]>('http://localhost:7000/appointments', []);
  usePageData(pageData);
  // const { addAppointment, editAppointment, deleteAppointment } = useAppointments();
  const [eventInfos, setEventInfos] = useState();
  const [isEditCard, setIsEditCard] = useState<boolean>(false);

  const weekends = {
    weekendsVisible: true,
    currentEvents: [],
  };

  const modalInfosEvent = useDisclosure(false);

  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    setIsEditCard(false);
    setEventInfos(selectInfo);
    modalInfosEvent.handleOpen();
  };

  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setIsEditCard(true);
    setEventInfos(clickInfo);
    modalInfosEvent.handleOpen();
  };

  const handleUpdateEventSelect = async (changeInfo: any) => {
    try {
      const calendarApi: CalendarApi = changeInfo.view.calendar;
      const eventCalendarUpdated = {
        _id: changeInfo.event.id,
        title: changeInfo.event.title,
        treatment: changeInfo.event.treatment,
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        backgroundColor: changeInfo.event.backgroundColor,
        textColor: changeInfo.event.textColor,
        email: changeInfo.event._def.extendedProps.email
      };
      const currentEvent = calendarApi.getEventById(changeInfo.event._def.extendedProps._id);
      if (currentEvent) {
        currentEvent.setProp('title', changeInfo.event.title);
        currentEvent.setProp('treatment', changeInfo.event.treatment);
        currentEvent.setProp('backgroundColor', changeInfo.event.backgroundColor);
        currentEvent.setProp('textColor', changeInfo.event.textColor);
        currentEvent.setProp('email',changeInfo.event._def.extendedProps.email);
      }
      await editAppointment(changeInfo.event.id,eventCalendarUpdated);
    } catch (err) {
      toast.error('There was an error updating the event');
    }
  };
  
  return (
    <>
      <div className='row'>
        {/* <div className='col-12 col-md-6 col-xl-3'>
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
        </div> */}
      </div>
      <Card className='mb-0'>
        <div>
          <h4>Add Appointment</h4>
        </div>
        <ModalInfosEventCalendar
          open={modalInfosEvent.isOpen}
          handleClose={modalInfosEvent.handleClose}
          eventInfos={eventInfos}
          isEditCard={isEditCard}
        />
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          weekends={weekends.weekendsVisible}
          select={handleAddEventSelectAndOpenModal}
          eventClick={handleEditEventSelectAndOpenModal}
          eventChange={handleUpdateEventSelect}
          events={appointments} 
          longPressDelay={1000}
          eventLongPressDelay={1000}
          selectLongPressDelay={1000}
          selectable={true}
          dayMaxEvents={true}
          allDaySlot={false}
          editable={true}
          height="700px"
        />
      </Card>
    </>
  );
};

export default DashboardPage;




