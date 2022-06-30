import React,{ useState } from 'react';

import { usePageData } from '../../../hooks/usePage';
import { usePayments } from '../../../hooks/usePayments';
import PageAction from '../../../layout/components/page-action/PageAction';
import PaysTable from './PaysTable';
import AddPayment from './AddPayment';

import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Payments',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Payments'
    }
  ]
};

const PaysPage = () => {
  const { payments, addPayment, editPayment, deletePayment } = usePayments();
  usePageData(pageData);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addingModalVisibility, setAddingModalVisibility] = useState(false);
  const closeAddingModal = () => setAddingModalVisibility(false);
  const openAddingModal = () => setAddingModalVisibility(true);


  return (
    <>
      <PaysTable
        onDeletePayment={deletePayment}
        onEditPayment={editPayment}
        payments={payments}
      />
      <PageAction onClick={openAddingModal} icon='icofont-plus' type={'primary'} />
      <AddPayment
        onClose={closeAddingModal}
        visible={addingModalVisibility}
        onSubmit={addPayment}
      />
    </>
  );
};

export default PaysPage;