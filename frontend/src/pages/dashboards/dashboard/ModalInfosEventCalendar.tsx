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
  const [treatment, setTreatment] = useState<string>('');
  const [cardColor, setCardColor] = useState<ICardColor>({
    backgroundColor: '#039be5',
    textColor: '#ffffff',
  });
  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfos?.event?.title);
      setTreatment(eventInfos?.event?._def?.extendedProps?.treatment);
      setCardColor({
        backgroundColor: eventInfos?.event?.backgroundColor,
        textColor: eventInfos?.event?.textColor,
      });
    } else {
      setTitle('');
      setTreatment('');
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
      });
      calendarApi.addEvent({
        id: eventCalendar._id,
        title: eventCalendar.title,
        treatment: eventCalendar.treatment,
        start: eventCalendar.start,
        end: eventCalendar.endStr,
        backgroundColor: cardColor.backgroundColor,
        textColor: cardColor.textColor,
      });
    } catch (err) {
      toast.error('There was an error adding the event');
    } finally {
      setTitle('');
      setTreatment('');
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
      };
      console.log(eventInfos)
      const currentEvent = calendarApi.getEventById(eventInfos.event._def.extendedProps._id);
      if (currentEvent) {
        currentEvent.setProp('title', title !== '' ? title : 'Untitled');
        currentEvent.setProp('treatment', eventInfos.event._def.extendedProps.treatment !== '' ? eventInfos.event._def.extendedProps.treatment : 'Untitled');
        currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
        currentEvent.setProp('textColor', cardColor.textColor);
      }
      await editAppointment(eventInfos.event._def.extendedProps._id,eventCalendarUpdated);
      window.location.reload();
    } catch (error) {
      // toast.error('There was an error updating the event');
    } finally {
      setTitle('');
      setTreatment('');
      handleClose();
    }
  };

  return (
    <Modal visible={open} onCancel={handleClose} className="appoimtment-modal">
      <Card>
        <div className='form-group'>
          <Input placeholder='Patient Name' value={title} onChange={(e) => setTitle(e.target.value)}  />
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
            {isEditCard ? 'Update' : 'Add'}
          </Button>

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