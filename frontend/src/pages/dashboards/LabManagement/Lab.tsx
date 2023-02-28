import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { IPageData } from '../../../interfaces/page';
import { usePageData } from '../../../hooks/usePage';
const pageData: IPageData = {
    title: 'Lab',
    fulFilled: true,
    breadcrumbs: [
      {
        title: 'Medicine',
        route: 'default-dashboard'
      },
      {
        title: 'Lab'
      }
    ]
  };
interface Item {
  key: string;
  jobwork: string;
  description: string;
  status: string;
  labname: string;
  billing: string;
  patientname: string;
  fees: number;
}

const originData: Item[] = [];
for (let i = 0; i < 9; i++) {
  originData.push({
    key: i.toString(),
    jobwork: 'Ceramic Crown',
    status:'pending',
    billing:'',
    fees: 500,
    labname: 'Dencare',
    patientname:'',
    description: `PFM -A2 Shade`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Lab: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ jobwork: '', fees: '', status: '',billing:'',description:'', labname:'',patientname:'', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Jobwork',
      dataIndex: 'jobwork',
    //   width: '25%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    //   width: '15%',
      editable: true,
    },
    {
      title: 'Lab Name',
      dataIndex: 'labname',
    //   width: '40%',
      editable: true,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientname',
    //   width: '40%',
      editable: true,
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
    //   width: '40%',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    //   width: '40%',
      editable: true,
    },
    {
      title: 'Billing',
      dataIndex: 'billing',
    //   width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default Lab;