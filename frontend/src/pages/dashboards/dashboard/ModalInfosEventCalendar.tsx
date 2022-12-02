import { Button, Modal, Input, Card } from 'antd';
import { CalendarApi } from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
} from '../../../redux/appointments/actions';
import { BackgroundColorRounded, SelectColors, ColorsCard, ListColorsCard } from './styles';
import emailjs from 'emailjs-com';
interface ICardColor {
  backgroundColor: string;
  textColor: string;
}

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfos: any;
  isEditCard: boolean;
}

export const ModalInfosEventCalendar = ({
  handleClose,
  open,
  eventInfos,
  isEditCard,
}: IModalInfosEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [treatment, setTreatment] = useState<string>('');
  const [cardColor, setCardColor] = useState<ICardColor>({
    backgroundColor: '#039be5',
    textColor: '#ffffff',
  });
  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfos?.event?.title);
      setEmail(eventInfos?.event?._def?.extendedProps?.email);
      setTreatment(eventInfos?.event?._def?.extendedProps?.treatment);
      setCardColor({
        backgroundColor: eventInfos?.event?.backgroundColor,
        textColor: eventInfos?.event?.textColor,
      });
    } else {
      setTitle('');
      setTreatment('');
      setEmail('');
      setCardColor({backgroundColor: '#039be5', textColor: '#ffffff'});
    }
  }, [eventInfos, isEditCard]);
  
  const handleSelectCardColor = (color: ColorsCard) => {
    setCardColor({
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    });
  };

  const handleAddedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;

      const eventCalendar = await addAppointment({
          title: title === '' ? 'Untitled' : title,
          treatment: treatment === '' ? 'Untitled' : treatment,
          start: eventInfos.startStr,
          end: eventInfos.endStr,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
          email: email === '' ? 'Untitled' : email
      });
      calendarApi.addEvent({
        id: eventCalendar._id,
        title: eventCalendar.title,
        treatment: eventCalendar.treatment,
        start: eventCalendar.start,
        end: eventCalendar.endStr,
        backgroundColor: cardColor.backgroundColor,
        textColor: cardColor.textColor,
        email: eventCalendar.email
      });
      const sendEmail = () =>{
        var templateParams = {
          email: email,
          title: title,
          date: eventCalendar.start.slice(0, -15),
          start: eventCalendar.start.substring(11, 19) 
          };
        emailjs.send('service_3cgd93a','template_8fx5mh7', templateParams,'user_85McB6BS84C9WdDmfL0pV')
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function(err) {
            console.log('FAILED...', err);
          });
      };
    } catch (err) {
      toast.error('There was an error adding the event');
    } finally {
      setTitle('');
      setTreatment('');
      setEmail('');
      handleClose();
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteAppointment(eventInfos.event._def.extendedProps._id);
      eventInfos.event.remove();
    } catch (error) {
      // toast.error('There was an error deleting the event ');
    } finally {
      setTitle('');
      setTreatment('');
      handleClose();
    }
  };

  const handleUpdatedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;
      const eventCalendarUpdated = {
        _id: eventInfos.event._def.extendedProps._id,
        title: title !== '' ? title : 'Untitled',
        treatment: eventInfos.event._def.extendedProps.treatment !== '' ? eventInfos.event._def.extendedProps.treatment : 'Untitled',
        start: eventInfos.event.startStr,
        end: eventInfos.event.endStr,
        backgroundColor: cardColor.backgroundColor,
        textColor: cardColor.textColor,
        email: eventInfos.event._def.extendedProps.email !== '' ? eventInfos.event._def.extendedProps.email : 'Untitled'
      };
      const currentEvent = calendarApi.getEventById(eventInfos.event._def.extendedProps._id);
      if (currentEvent) {
        currentEvent.setProp('title', title !== '' ? title : 'Untitled');
        currentEvent.setProp('treatment', eventInfos.event._def.extendedProps.treatment !== '' ? eventInfos.event._def.extendedProps.treatment : 'Untitled');
        currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
        currentEvent.setProp('textColor', cardColor.textColor);
        currentEvent.setProp('email', eventInfos.event._def.extendedProps.email !== '' ? eventInfos.event._def.extendedProps.email : 'Untitled');
      }
      await editAppointment(eventInfos.event._def.extendedProps._id,eventCalendarUpdated );
      window.location.reload();
    } catch (error) {
      // toast.error('There was an error updating the event');
    } finally {
      setTitle('');
      setTreatment('');
      setEmail('');
      handleClose();
    }
  };

  const sendEmail = () =>{
    const calendarApi: CalendarApi = eventInfos.view.calendar;
    var templateParams = {
      email: email,
      title: title,
      date: eventInfos.startStr ? eventInfos.startStr.slice(0, -15) : eventInfos.event.startStr.slice(0, -15) ,
      start:eventInfos.startStr ? eventInfos.startStr.substring(11, 19): eventInfos.event.startStr.substring(11, 19) 
      };
    console.log(templateParams)
    emailjs.send('service_3cgd93a','template_8fx5mh7', templateParams,'user_85McB6BS84C9WdDmfL0pV')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(err) {
        console.log('FAILED...', err);
      });
  };

  return (
    <Modal visible={open} onCancel={handleClose} className="appoimtment-modal">
      <Card>
        <div className='form-group'>
          <Input placeholder='Patient Name' value={title} onChange={(e) => setTitle(e.target.value)}  />
        </div>
        <div className='form-group'>
          <Input placeholder='Patient Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
        </div>
        <div className='form-group'>
          <Input placeholder='Treatment Category' value={treatment} onChange={(e) => setTreatment(e.target.value)}  />
        </div>
        <div className='form-group'>
          <SelectColors>
            {ListColorsCard.map((color, index) => (
              <BackgroundColorRounded
                key={index}
                selected={false}
                color={color.backgroundColor}
                onClick={() => handleSelectCardColor(color)}
              >
                <input
                  type="radio"
                  name="cardColor"
                  checked={color.backgroundColor === cardColor.backgroundColor}
                />
              </BackgroundColorRounded>
            ))}
          </SelectColors>
        </div>
        <div className='form-group'>
              
        </div>
        <div className='appointment-button'>    
          <Button
            type='primary'
            onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
          >
            {isEditCard ? 'Update' : 'Add' }
          </Button>
          <Button type='primary' onClick={sendEmail}> Send email </Button>    
          {isEditCard && (
            <Button type='primary' onClick={handleDeleteEvent}>
              Delete
            </Button>
          )}
        </div>
      </Card>
    </Modal>
  );
};