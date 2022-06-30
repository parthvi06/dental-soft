import React,{ useState } from 'react';

import { usePageData } from '../../../hooks/usePage';
import { useAppointments } from '../../../hooks/useAppointments';
import PageAction from '../../../layout/components/page-action/PageAction';
import ApposTable from './ApposTable';
import AddAppointment from './AddAppointment';

import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Appointments',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Appointments'
    }
  ]
};

const ApposPage = () => {
  const { appointments, addAppointment, editAppointment, deleteAppointment } = useAppointments();
  usePageData(pageData);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [addingModalVisibility, setAddingModalVisibility] = useState(false);
  const closeAddingModal = () => setAddingModalVisibility(false);
  const openAddingModal = () => setAddingModalVisibility(true);


  return (
    <>
      <ApposTable
        onDeleteAppointment={deleteAppointment}
        onEditAppointment={editAppointment}
        appointments={appointments}
      />
      <PageAction onClick={openAddingModal} icon='icofont-stethoscope-alt' type={'primary'} />
      <AddAppointment
        onClose={closeAddingModal}
        visible={addingModalVisibility}
        onSubmit={addAppointment}
      />
    </>
  );
};

export default ApposPage;
