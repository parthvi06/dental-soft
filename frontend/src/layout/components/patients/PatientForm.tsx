import React from 'react';

import { Button, Select, Input, DatePicker, Tabs, Tag } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import ImageLoader from './ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IPatient } from '../../../interfaces/patient';
import { Label } from 'recharts';

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(
    <Option value={i.toString(36) + i} key={i.toString(36) + i}>
      {i.toString(36) + i}
    </Option>);
}

const { TextArea } = Input;
type Props = {
  onSubmit: (patient: IPatient) => void;
  onCancel: () => void;
  patient?: IPatient;
  submitText?: string;
};

const defaultSubmitText = 'Add patient';
const emptyPatient = {
  name: null,
  house_no: null,
  street: null,
  city: null,
  state: null,
  pincode: null,
  number: null,
  gender: null,
  img: null,
  email: null,
  birthDate: null,
  prescription: null,
  totalprice:null,
  am:null,
};

const patientScheme = Yup.object({
  // name: Yup.string().required('Name Required').nullable(),
  // house_no: Yup.string().required(),
  // street: Yup.string().required(),
  // city: Yup.string().required(),
  // state: Yup.string().required(),
  // pincode: Yup.string().required(),
  // number: Yup.string().required(),
  // gender: Yup.string().required(),
  // img: Yup.string().required(),
  // birthDate: Yup.string().required(),
  // email: Yup.string().email('Invalid email').required('Email Required').nullable(),
});
const { TabPane } = Tabs;

const onChange = (key) => {
};

const PatientForm = ({
  submitText = defaultSubmitText,
  patient = emptyPatient,
  onSubmit,
  onCancel
}: Props) => {
  const {
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    resetForm,
    touched,
    values,
    errors,
    isValid
  } = useFormik<IPatient>({
    validationSchema: patientScheme,
    initialValues: patient,
    onSubmit: (values) => {
      onSubmit(values);
      onCancel();
    }
  });

  const handleGenderSelect = (value) => setFieldValue('gender', value);
  const handleSurfaceSelect = (value) => setFieldValue('surface', value);
  const handlePopSelect = (value) => setFieldValue('pop', value);
  const handleTopSelect = (value) => setFieldValue('top', value);
  const handleSensitivitySelect = (value) => setFieldValue('sensitivity', value);
  const handleConclusionSelect = (value) => setFieldValue('conclusion', value);
  const handleTreatmentSelect = (value) => setFieldValue('treatment', value);
  const handleDrugSelect = (value) => setFieldValue('drug', value);
  const handleFoodSelect = (value) => setFieldValue('food', value);
  const hasError = hasErrorFactory(touched, errors);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleImageLoad = (img) => {
    setValues({ ...values, img });
  };  
  const handleChangedate = (date, birthDate) => {
    setValues({ ...values, birthDate });
  };
  const handleChangeDiagnosis = (diagnosis) => {
    setValues({...values, diagnosis})
  };
  const handleChangeComplaint = (complaint) => {
    setValues({...values, complaint})
  };
  const handleChangeFindings = (findings) => {
    setValues({...values, findings})
  };
  const handleChangeInvestigation = (investigation) => {
    setValues({...values, investigation})
  };
  const handleChangeNotes = (notes) => {
    setValues({...values, notes})
  };
  const handleChangeTotalPrice = (totalprice) => {
    totalprice= 
    setValues({...values, totalprice})
  };
  const printDiv=()=>{
    var divContents = document.getElementById("GFG").innerHTML;
            var a = window.open('', '', 'height=10000, width=1000');
            a.document.write('<html>');
            a.document.write('<body ><br>');
            a.document.write(divContents);
            a.document.write('</body></html>');
            a.document.close();
            a.print();

  }

  return (
    <>
      
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="General Info" key="1">
          <form onSubmit={handleSubmit}>
            {/* <div className='form-group'>
              <ImageLoader onLoad={handleImageLoad} src={values.img as string} />
            </div> */}

            <div className='form-group'>
              <Input
                placeholder='Name'
                name='name'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.name}
                className={hasError('name')}
              />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </div>
            <div className='row'>  
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input
                    placeholder='House/Apartment No'
                    name='house_no'
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values.house_no}
                    className={hasError('house_no')}
                  />
                </div>
              </div>  
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input
                      placeholder='Street'
                      name='street'
                      type='text'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={values.street}
                      className={hasError('street')}
                    />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input
                    placeholder='City'
                    name='city'
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values.city}
                    className={hasError('city')}
                  />
                </div>
              </div>

              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input
                    placeholder='State'
                    name='state'
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values.state}
                    className={hasError('state')}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input
                    placeholder='Pincode'
                    name='pincode'
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values.pincode}
                    className={hasError('pincode')}
                  />
                </div>
              </div>

              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input
                    placeholder='Phone'
                    name='number'
                    type='phone'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values.number}
                    className={hasError('number')}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <DatePicker name="birtDate" 
                    placeholder='Birthdate'
                    onChange={handleChangedate}
                    onBlur={handleBlur}
                    defaultValue={values.birthDate ? moment(values.birthDate) : null }
                    className={hasError('birthDate')}
                  />
                </div>
              </div>

              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Select
                    placeholder='Gender'
                    defaultValue={values.gender}
                    onChange={handleGenderSelect}
                    className={hasError('gender')}
                    onBlur={() => setFieldTouched('gender')}
                  >
                    <Select.Option value='Male'>Male</Select.Option>
                    <Select.Option value='Female'>Female</Select.Option>
                  </Select>
                </div>
              </div>
            </div>

            <div className='form-group'>
            <Input
                placeholder='Email'
                name='email'
                type='email'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.email}
                className={hasError('email')}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className='d-flex justify-content-between buttons-list settings-actions'>
              <Button danger onClick={handleCancel}>
                Cancel
              </Button>

              <Button type='primary' htmlType='submit'>
                {submitText}
              </Button>
            </div>
          </form>
        </TabPane>
        <TabPane tab="Clinical Note" key="2">
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <Select
                placeholder='Select Surface'
                defaultValue={values.surface}
                onChange={handleSurfaceSelect}
              >
                <Select.Option value='Mesial'>Mesial</Select.Option>
                <Select.Option value='Distal'>Distal</Select.Option>
                <Select.Option value='Buccal'>Buccal</Select.Option>
                <Select.Option value='Lingual'>Lingual</Select.Option>
                <Select.Option value='Occusal'>Occusal</Select.Option>
                <Select.Option value='Root'>Root</Select.Option>
                <Select.Option value='Mesial Occusal'>Mesial Occusal</Select.Option>
                <Select.Option value='Distal Occusal'>Distal Occusal</Select.Option>
                <Select.Option value='All'>All</Select.Option>
                <Select.Option value='MOD'>MOD</Select.Option>
                <Select.Option value='Complex'>Complex</Select.Option>
              </Select>
            </div>
            <div className='row'>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Select
                    placeholder='Pop'
                    defaultValue={values.pop}
                    onChange={handlePopSelect}
                  >
                    <Select.Option value='Yes'>Yes</Select.Option>
                    <Select.Option value='No'>No</Select.Option>
                  </Select>
                </div>
              </div>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Select
                    placeholder='Top'
                    defaultValue={values.top}
                    onChange={handleTopSelect}
                  >
                    <Select.Option value='Yes'>Yes</Select.Option>
                    <Select.Option value='No'>No</Select.Option>
                  </Select>
                </div>
              </div>
            </div>  
            <div className='row'>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Select
                    placeholder='Pulp Sensitivity'
                    defaultValue={values.sensitivity}
                    onChange={handleSensitivitySelect}
                  >
                    <Select.Option value='Hot +'>Hot +</Select.Option>
                    <Select.Option value='Hot -'>Hot -</Select.Option>
                    <Select.Option value='Cold +'>Cold +</Select.Option>
                    <Select.Option value='Cold +'>Cold +</Select.Option>
                    <Select.Option value='EPT -'>EPT -</Select.Option>
                    <Select.Option value='EPT +'>EPT +</Select.Option>
                    <Select.Option value='Hot -, Cold -'>Hot -, Cold -</Select.Option>
                    <Select.Option value='Hot -, Cold +'>Hot -, Cold +</Select.Option>
                    <Select.Option value='Hot +, Cold +'>Hot +, Cold +</Select.Option>
                    <Select.Option value='Hot +, Cold -'>Hot +, Cold -</Select.Option>
                  </Select>
                </div>
              </div>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Select
                    placeholder='conclusion'
                    defaultValue={values.conclusion}
                    onChange={handleConclusionSelect}
                  >
                    <Select.Option value='Vital'>Vital</Select.Option>
                    <Select.Option value='Non Vital'>Non Vital</Select.Option>
                    <Select.Option value='Hyperaemic'>Hyperaemic</Select.Option>
                  </Select>
                </div>
              </div>
            </div>  
            <div className='form-group'>
              <label>Chief Complaint</label>
              <Select
                mode="tags"
                style={{
                   width: '100%',
                }}
                placeholder=""
                defaultValue={values.complaint}
                onChange={handleChangeComplaint}
              >
               <Option value='Bleeding Gums'>Bleeding Gums</Option>
               <Option value='Burning Tounge'>Burning Tounge</Option>
               <Option value='Discolouration'>Discolouration</Option>
               <Option value='Pain'>Pain</Option>
               <Option value='Sensitivity'>Sensitivity</Option>
               <Option value='Swelling'>Swelling</Option>
              </Select>
            </div>
            <div className='form-group'>
              <label>Findings</label>
              <Select
                mode="tags"
                style={{
                   width: '100%',
                }}
                placeholder=""
                defaultValue={values.findings}
                onChange={handleChangeFindings}
              >
               <Option value='Bleeding Gums'>Deep Cavity</Option>
              </Select>
            </div>
            <div className='form-group'>
              <label>Investigation</label>
              <Select
                mode="tags"
                style={{
                   width: '100%',
                }}
                placeholder=""
                defaultValue={values.investigation}
                onChange={handleChangeInvestigation}
              >
               <Option value='Bite wing xray'>Bite wing xray</Option>
               <Option value='IOPA X-ray'>IOPA X-ray</Option>
               <Option value='OPG'>OPG</Option>
              </Select>
            </div>
            <div className='form-group'>
              <label>Diagnosis</label>
              <Select
                mode="tags"
                style={{
                   width: '100%',
                }}
                placeholder=""
                defaultValue={values.diagnosis}
                onChange={handleChangeDiagnosis}
              >
               <Option value='Aphthous Ulcer'>Aphthous Ulcer</Option>
               <Option value='Cracked tooth Syndrome'>Cracked tooth Syndrome</Option>
               <Option value='Dental Caries'>Dental Caries</Option>
               <Option value='Gingivitis'>Gingivitis</Option>
               <Option value='Irreversible Pulpities'>Irreversible Pulpities</Option>
               <Option value='Missing Tooth'>Missing Tooth</Option>
               <Option value='Non Vital Teeth'>Non Vital Teeth</Option>
               <Option value='Peri Apical Abcess'>Peri Apical Abcess</Option>
               <Option value='Periodontitis'>Periodontitis</Option>
               <Option value='Reversible Pulpities'>Reversible Pulpities</Option>
               <Option value='Traumatic Ulcer'>Traumatic Ulcer</Option>
              </Select>
            </div>
            <div className='form-group'>
              <label>Notes</label>
              <Select
                mode="tags"
                style={{
                   width: '100%',
                }}
                placeholder=""
                defaultValue={values.notes}
                onChange={handleChangeNotes}
              >
               <Option value='xyz'>xyz</Option>
              </Select>
            </div>
            <div className='d-flex justify-content-between buttons-list settings-actions'>
                <Button danger onClick={handleCancel}>
                  Cancel
                </Button>

                <Button type='primary' htmlType='submit'>
                  {submitText}
                </Button>
            </div>
          </form>
        </TabPane>
        <TabPane tab="Treatment Done" key="3">
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <Select
              placeholder='Select Treatment'
              defaultValue={values.treatment}
              onChange={handleTreatmentSelect}
            >
              <Select.Option value='Composite Filling'>Composite Filling+</Select.Option>
              <Select.Option value='Obturation'>Obturation</Select.Option>
              <Select.Option value='Check Up '>Check Up</Select.Option>
              <Select.Option value='Pulpectomy'>Pulpectomy</Select.Option>
              <Select.Option value='Abcess Drainage'>Abcess Drainage</Select.Option>
              <Select.Option value='Abutment PFM Type 1'>Abutment PFM Type 1</Select.Option>
              <Select.Option value='Abutment- E-max'>Abutment- E-max</Select.Option>
              <Select.Option value='Abutment-Composite'>Abutment-Composite</Select.Option>
              <Select.Option value='Abutment-Metal'>Abutment-Metal</Select.Option>
              <Select.Option value='Abutment-Metal Type1'>Abutment-Metal Type1</Select.Option>
              <Select.Option value='Abutment-MLS'>Abutment-MLS</Select.Option>
              <Select.Option value='Abutment-PFM 3D Vita'>Abutment-PFM 3D Vita</Select.Option>
              <Select.Option value='Abutment-PFM Regular'>Abutment-PFM Regular</Select.Option>
              <Select.Option value='Abutment-PFM Type 1'>Abutment-PFM Type 1</Select.Option>
              <Select.Option value='Abutment-Temporary'>Abutment-Temporary</Select.Option>
              <Select.Option value='Alveogyl Dressing'>Alveogyl Dressing</Select.Option>
              <Select.Option value='Alveoloplasty'>Alveoloplasty</Select.Option>
              <Select.Option value='Anterior Bite Plane'>Anterior Bite Plane</Select.Option>
              <Select.Option value='Anti-Snore Appliance'>Anti-Snore Appliance</Select.Option>
              <Select.Option value='Antiseptic Base/Vitremer'>Antiseptic Base/Vitremer</Select.Option>
              <Select.Option value='Apisectomy'>Apisectomy</Select.Option>
              <Select.Option value='Bleaching'>Bleaching</Select.Option>
              <Select.Option value='Bone Graft and Membrane'>Bone Graft and Membrane</Select.Option>
              <Select.Option value='Cast Core'>Cast Core</Select.Option>
              <Select.Option value='Cast Partial Frame'>Cast Partial Frame</Select.Option>
              <Select.Option value='Cavity Liner'>Cavity Liner</Select.Option>
              <Select.Option value='Cephalogram'>Cephalogram</Select.Option>
              <Select.Option value='Chat Consultation'>Chat Consultation</Select.Option>
              <Select.Option value='Class II'>Class II</Select.Option>
              <Select.Option value='Clear Path Aligners'>Clear Path Aligners</Select.Option>
              <Select.Option value='Complete Denture - Lower'>Complete Denture - Lower</Select.Option>
              <Select.Option value='Complete Denture - Upper'>Complete Denture - Upper</Select.Option>
              <Select.Option value='Complete Denture - Upper and Lower'>Complete Denture - Upper and Lower</Select.Option>
              <Select.Option value='Complete Denture BPS - Lower'>Complete Denture BPS - Lower</Select.Option>
              <Select.Option value='Complete Denture BPS - Upper'>Complete Denture BPS - Upper</Select.Option>
              <Select.Option value='Complete Denture BPS - Upper and Lower'>Complete Denture BPS - Upper and Lower</Select.Option>
              <Select.Option value='Componeers'>Componeers</Select.Option>
              <Select.Option value='Composite Laminate'>Composite Laminate</Select.Option>
              <Select.Option value='Composite Onlay'>Composite Onlay</Select.Option>
              <Select.Option value='Consultation'>Consultation</Select.Option>
              <Select.Option value='Consultation Comprehensive'>Consultation Comprehensive</Select.Option>
              <Select.Option value='Core Buildup'>Core Buildup</Select.Option>
              <Select.Option value='Crown and Bridge'>Crown abd Bridge</Select.Option>
              <Select.Option value='Crown Cementation'>Crown Cementation</Select.Option>
              <Select.Option value='Crown Lengthening'>Crown Lengthening</Select.Option>
              <Select.Option value='Crown- E-max'>Crown- E-max</Select.Option>
              <Select.Option value='Crown-Composite'>Crown-Composite</Select.Option>
              <Select.Option value='Crown-Emax Type1'>Crown-Emax Type1</Select.Option>
              <Select.Option value='Crown-Metal'>Crown-Metal</Select.Option>
              <Select.Option value='Crown-Metal Type1'>Crown-Metal Type1</Select.Option>
              <Select.Option value='Crown-MLS'>Crown-MLS</Select.Option>
              <Select.Option value='Crown-PFM 3D Vita'>Crown-PFM 3D Vita</Select.Option>
              <Select.Option value='Crown-PFM Regular'>Crown-PFM Regular</Select.Option>
              <Select.Option value='Crown-PFM Type 1'>Crown-PFM Type 1</Select.Option>
              <Select.Option value='Crown-Recementation'>Crown-Recementation</Select.Option>
              <Select.Option value='Crown-Temporary'>Crown-Temporary</Select.Option>
              <Select.Option value='Crown-Temporary Type1'>Crown-Temporary Type1</Select.Option>
              <Select.Option value='Crown-Zirconium'>Crown-Zirconium</Select.Option>
              <Select.Option value='Crown-Zirconium Type1'>Crown-Zirconium Type1</Select.Option>
              <Select.Option value='Cyst Removal'>Cyst Removal</Select.Option>
              <Select.Option value='Dental Implant'>Dental Implant</Select.Option>
              <Select.Option value='Dental Implant Type2'>Dental Implant Type2</Select.Option>
              <Select.Option value='Denture Repair(chair Side)'>Denture Repair(chair Side)</Select.Option>
              <Select.Option value='Denture Soft Relining Permanent U/l'>Denture Soft Relining Permanent U/l</Select.Option>
              <Select.Option value='Denture Soft Relining Temporary U/l'>Denture Soft Relining Temporary U/l</Select.Option>
              <Select.Option value='Denture-Acryrock per Tooth'>Denture-Acryrock per Tooth</Select.Option>
              <Select.Option value='Denture-BPS:Type 1 Per Tooth'>Denture-BPS:Type 1 Per Tooth</Select.Option>
              <Select.Option value='Denture-Regular Per Tooth'>Denture-Regular Per Tooth</Select.Option>
              <Select.Option value='Diagnostic Wax Up'>Diagnostic Wax Up</Select.Option>
              <Select.Option value='Diastema Closure'>Diastema Closure</Select.Option>
              <Select.Option value='Diestema Closure (Composite)'>Diestema Closure (Composite)</Select.Option>
              <Select.Option value='Emergency Extripation Of Pulp'>Emergency Extripation Of Pulp</Select.Option>
              <Select.Option value='Enamel Abrasion'>Enamel Abrasion</Select.Option>
              <Select.Option value='Extraction Surgical Lower 3rd Molar'>Extraction Surgical Lower 3rd Molar</Select.Option>
              <Select.Option value='Extraction-Normal Tooth'>Extraction-Normal Tooth</Select.Option>
              <Select.Option value='Extraction-Surgical'>Extraction-Surgical</Select.Option>
              <Select.Option value='Extraction-Upper Wisdom'>Extraction-Upper Wisdom</Select.Option>
              <Select.Option value='Fixed Appliance Regular (Orthodontic)'>Fixed Appliance Regular (Orthodontic)</Select.Option>
              <Select.Option value='Fixed Appliance Type 1'>Fixed Appliance Type 1</Select.Option>
              <Select.Option value='Flouride Gel'>Flouride Gel</Select.Option>
              <Select.Option value='Flouride Varnish'>Flouride Varnish</Select.Option>
              <Select.Option value='Gingival Plate'>Gingival Plate</Select.Option>
              <Select.Option value='Gingivectomy'>Gingivectomy</Select.Option>
              <Select.Option value='Glass Fibre Post'>Glass Fibre Post</Select.Option>
              <Select.Option value='Gum Depigmentation Per Arch'>Gum Depigmentation Per Arch</Select.Option>
              <Select.Option value='Interdental Brushes'>Interdental Brushes</Select.Option>
              <Select.Option value='IP Appliance'>IP Appliance</Select.Option>
              <Select.Option value='Laser Curettage'>Laser Curettage </Select.Option>
              <Select.Option value='Miscellaneous'>Miscellaneous</Select.Option>
              <Select.Option value='Mouthguard'>Mouthguard</Select.Option>
              <Select.Option value='Myofunctional Appliance'>Myofunctional Appliance</Select.Option>
              <Select.Option value='Myofunctional Appliance-type1'>Myofunctional Appliance-type1</Select.Option>
              <Select.Option value='Odontoplasty Per Tooth'>Odontoplasty Per Tooth</Select.Option>
              <Select.Option value='Operculectomy'>Operculectomy</Select.Option>
              <Select.Option value='Ortho Implants'>Ortho Implants</Select.Option>
              <Select.Option value='Ortho Retainers'>Ortho Retainers</Select.Option>
              <Select.Option value='Panoramic/OPG'>Panoramic/OPG</Select.Option>
              <Select.Option value='Partial Denture BPS per tooth'>Partial Denture BPS per tooth</Select.Option>
              <Select.Option value='Periodontal-Oral Examination'>Periodontal-Oral Examination</Select.Option>
              <Select.Option value='Polishing'>Polishing</Select.Option>
              <Select.Option value='Pontic Composite'>Pontic Composite</Select.Option>
              <Select.Option value='Pontic E-max'>Pontic E-max</Select.Option>
              <Select.Option value='Pontic Metal'>Pontic Metal</Select.Option>
              <Select.Option value='Pontic MLS'>Pontic MLS</Select.Option>
              <Select.Option value='Pontic PFM 3D Vita'>Pontic PFM 3D Vita</Select.Option>
              <Select.Option value='Pontic PFM Regular'>Pontic PFM Regular</Select.Option>
              <Select.Option value='Pontic PFM Type 1'>Pontic PFM Type 1</Select.Option>
              <Select.Option value='Pontic Temporary'>Pontic Temporary</Select.Option>
              <Select.Option value='Pontic Temporary Type 1'>Pontic Temporary Type 1</Select.Option>
              <Select.Option value='Pontic Zirconium'>Pontic Zirconium</Select.Option>
              <Select.Option value='Pontic Zirconium type 1'>Pontic Zirconium type 1</Select.Option>
              <Select.Option value='Porcelain Veneers'>Porcelain Veneers</Select.Option>
              <Select.Option value='Pulpotomy'>Pulpotomy</Select.Option>
              <Select.Option value='Relining-Direct'>Relining-Direct</Select.Option>
              <Select.Option value='Relining-Indirect'>Relining-Indirect</Select.Option>
              <Select.Option value='Removable Appliance'>Removable Appliance</Select.Option>
              <Select.Option value='Removal Of Crown'>Removal Of Crown</Select.Option>
              <Select.Option value='Resin Bonded Bridge'>Resin Bonded Bridge</Select.Option>
              <Select.Option value='Restoration-Amalgam-1'>Restoration-Amalgam-1</Select.Option>
              <Select.Option value='Restoration-Amalgam-2'>Restoration-Amalgam-2</Select.Option>
              <Select.Option value='Restoration-Amalgam-3'>Restoration-Amalgam-3</Select.Option>
              <Select.Option value='Restoration-Amalgam-4'>Restoration-Amalgam-4</Select.Option>
              <Select.Option value='Restoration-Amalgam-5'>Restoration-Amalgam-5</Select.Option>
              <Select.Option value='Restoration-Composite-1'>Restoration-Composite-1</Select.Option>
              <Select.Option value='Restoration-Composite-2'>Restoration-Composite-2</Select.Option>
              <Select.Option value='Restoration-Composite-3'>Restoration-Composite-3</Select.Option>
              <Select.Option value='Restoration-Composite-4'>Restoration-Composite-4</Select.Option>
              <Select.Option value='Restoration-Composite-5'>Restoration-Composite-5</Select.Option>
              <Select.Option value='Restoration-GIC'>Restoration-GIC</Select.Option>
              <Select.Option value='Restoration-GIC Type 1'>Restoration-GIC Type 1</Select.Option>
              <Select.Option value='Restoration-Pit and Fissure'>Restoration-Pit and Fissure</Select.Option>
              <Select.Option value='Restoration-Resin Modified GIC'>Restoration-Resin Modified GIC</Select.Option>
              <Select.Option value='Restoration-Temporary'>Restoration-Temporary</Select.Option>
              <Select.Option value='Root Canal Type-1'>Root Canal Type-1</Select.Option>
              <Select.Option value='Root Canal- Posterior'>Root Canal- Posterior</Select.Option>
              <Select.Option value='Root Canal-Anterior'>Root Canal-Anterior</Select.Option>
              <Select.Option value='Scaling'>Scaling</Select.Option>
              <Select.Option value='Sensitivity Treatment'>Sensitivity Treatment</Select.Option>
              <Select.Option value='Shield Force'>Shield Force</Select.Option>
              <Select.Option value='Smile Design'>Smile Design</Select.Option>
              <Select.Option value='Space Maintainer'>Space Maintainer</Select.Option>
              <Select.Option value='Splint Therapy'>Splint Therapy</Select.Option>
              <Select.Option value='Splinting'>Splinting</Select.Option>
              <Select.Option value='Sub Gingival Curettage Per Tooth'>Sub Gingival Curettage Per Tooth</Select.Option>
              <Select.Option value='Subgingival Curettage Per Arch'>Subgingival Curettage Per Arch</Select.Option>
              <Select.Option value='Tele Consultation'>Tele Consultation</Select.Option>
              <Select.Option value='Temporary Filling'>Temporary Filling</Select.Option>
              <Select.Option value='Tooth Color Abutment'>Tooth Color Abutment</Select.Option>
              <Select.Option value='Video Consultation'>Video Consultation</Select.Option>
              <Select.Option value='X-ray'>X-ray</Select.Option>
            </Select>
          </div>       
          <div className='form-group'>
              <Input
                placeholder='Price'
                name='price'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.price}
               />
          </div>
          <div className='form-group'>
              <Input
                placeholder='Discount'
                name='discount'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.discount}
               />
          </div>
          <div className='form-group'>
              <Input
                placeholder='Total Price'
                name='totalprice'
                type='text'
                onBlur={handleBlur}
                onChange={handleChangeTotalPrice}
                value={values.price-(values.price*values.discount/100) || '0'}
               />
          </div>
          
          <div className='d-flex justify-content-between buttons-list settings-actions'>
              <Button danger onClick={handleCancel}>
                Cancel
              </Button>

              <Button type='primary' htmlType='submit'>
                 {submitText}
              </Button>
          </div>
        </form>
        </TabPane>
        <TabPane tab="Prescription" key="4">
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-sm-12 col-12'>
                <div className='form-group'>
                  <Select
                    placeholder='Select drug'
                    defaultValue={values.drug}
                    onChange={handleDrugSelect}
                  >
                    <Select.Option value=' Fol-5 5 mg'> Fol-5 5 mg</Select.Option>
                    <Select.Option value='Tablets Novaclox 250 mg'>Tablets Novaclox 250 mg</Select.Option>
                    <Select.Option value='Tablets Novaclox 125 mg'>Tablets Novaclox 125 mg</Select.Option>
                    <Select.Option value='Tablets Novamox 250 mg'>Tablets Novamox 250 mg</Select.Option>
                    <Select.Option value='Tablets Novamox 125 mg'>Tablets Novamox 125 mg</Select.Option>
                    <Select.Option value='Gargle Betadine Gargle 2 % w/v'>Gargle Betadine Gargle 2 % w/v</Select.Option>
                    <Select.Option value='Injection Flumazenil 0.1 mg'>Injection Flumazenil 0.1 mg</Select.Option>
                    <Select.Option value='Tablets Amoxicillin 250mg*'>Tablets Amoxicillin 250mg*</Select.Option>
                    <Select.Option value='Tablets Amoxicillin 500mg*'>Tablets Amoxicillin 500mg*</Select.Option>
                    <Select.Option value='Tablets Metrogyl 200 mg'>Tablets Metrogyl 200 mg</Select.Option>
                    <Select.Option value='Tablets Metrogyl 400 mg'>Tablets Metrogyl 400 mg</Select.Option>
                    <Select.Option value='Tablets Flagyl 200 mg'>Tablets Flagyl 200 mg</Select.Option>
                    <Select.Option value='Tablets Flagyl 400 mg'>Tablets Flagyl 400 mg</Select.Option>
                    <Select.Option value='Tablets Crocin 250 mg'>Tablets Crocin 250 mg</Select.Option>
                    <Select.Option value='Tablets Cetrizin 150 mg'>Tablets Cetrizin 150 mg</Select.Option>
                    <Select.Option value='Tablets Cetrizin 25 mg'>Tablets Cetrizin 25 mg</Select.Option>
                    <Select.Option value='Celcox 100mg'> Celcox 100mg</Select.Option>
                    <Select.Option value='Tablets Campicilin 250 mg'>Tablets Campicilin 250 mg</Select.Option>
                    <Select.Option value='Tablets Geeox 100 mg'>Tablets Geeox 100 mg</Select.Option>
                    <Select.Option value='Gargle Candid Mouth Paint Solution'>Gargle Candid Mouth Paint Solution</Select.Option>
                    <Select.Option value='Tablets Voveran 75 mg'>Tablets Voveran 75 mg</Select.Option>
                    <Select.Option value='Tablets Novomax 500 mg'>Tablets Novomax 500 mg</Select.Option>
                    <Select.Option value='Instructions'>Instructions</Select.Option>
                    <Select.Option value='Lab Investigations'>Lab Investigations</Select.Option>
                  </Select>
                </div>
              </div>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <label>Dosage</label>
                  <div className='row medic-dosage-row'>
                    <div className='col-sm-4'>
                      <Input
                        placeholder='am'
                        name='am'
                        type='text'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={values.am}
                        className='medic-dosage'
                      />
                    </div>
                    <div className='col-sm-4'>
                      <Input
                          placeholder='noon'
                          name='noon'
                          type='text'
                          onChange={handleChange}
                          defaultValue={values.noon}
                          onBlur={handleBlur}
                          className='medic-dosage'
                        />
                    </div>
                    <div className='col-sm-4'>
                      <Input
                          placeholder='pm'
                          name='pm'
                          type='text'
                          defaultValue={values.pm}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className='medic-dosage'
                        />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <label>Total Qty</label>
                    <Input
                      placeholder=''
                      name='totalqty'
                      defaultValue={values.totalqty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className='medic-dosage'
                    />
                </div>
              </div>
              <div className='col-sm-6 col-12' >
                <div className='form-group'>
                  <Select
                    placeholder='Food'
                    defaultValue={values.food}
                    onChange={handleFoodSelect}
                  >
                    <Select.Option value='Before Food'>Before Food</Select.Option>
                    <Select.Option value='After Food'>After Food</Select.Option>
                    <Select.Option value='without Food'>without Food</Select.Option>
                    <Select.Option value='None'>None</Select.Option>
                  </Select>
                </div>
              </div>
              <div className='col-sm-6 col-12'>
                <div className='form-group'>
                  <Input placeholder='Instruction'
                    name='instruction'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue={values.instruction} />
                </div>
              </div>
            </div>  
            <div className='col-sm-6 col-12'>
            <div id="GFG" >
                <div className='row'>
                  <div className='col-sm-6 col-12'>
                    <div><p><b>Patient Name</b> : {values.name}</p></div>
                    <div><p>Prescription</p></div>
                    <div><p>{values.drug} {values.am} {values.noon} {values.pm} {values.food} {values.instruction} - {values.totalqty}</p></div>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <Input type="button" className='prs-button' value="Print" onClick={printDiv}/>
              </div>
            </div>
            <div className='d-flex justify-content-between buttons-list settings-actions'>
                <Button danger onClick={handleCancel}>
                  Cancel
                </Button>

                <Button type='primary' htmlType='submit'>
                  {submitText}
                </Button>
            </div>
          </form>
        </TabPane>
        <TabPane tab="Images" key="5">
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <ImageLoader onLoad={handleImageLoad} src={values.img as string}  />
            </div>
            <div className='d-flex justify-content-between buttons-list settings-actions'>
                <Button danger onClick={handleCancel}>
                  Cancel
                </Button>

                <Button type='primary' htmlType='submit'>
                  {submitText}
                </Button>
            </div>
          </form>
        </TabPane>
      </Tabs>
    </>
  );
};

export default PatientForm;