import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Upload
} from 'antd';
import PrimaryButton from '../__common/custom/PrimaryButton';
import { tw } from '../../common/utils/classUtil';

import DepartmentServices from '../../services/department.service';
import useDepartmentStore from '../../store/department';
import { UploadOutlined } from '@ant-design/icons';
import { Handle } from 'reactflow';

interface MemberFormProps {
  isEdit: boolean;
}

export default function MemberForm({isEdit }: MemberFormProps) {
  const form = Form.useFormInstance();
  const avt = form.getFieldValue('avatar');
  const setDepartments = useDepartmentStore((state) => state.setDepartments);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['department'],
    queryFn: () => DepartmentServices.getAllDepartment<any>(),
    staleTime: 60 * 60 * 1000, // 60 minute,
    onSuccess: (data) => {
      setDepartments(data?.data?.results);
    },
  });

  const handleUpload = (file: any, fileList: any) => {
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   console.log('You can only upload JPG file!');
    // }
    return false;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Row
      className={tw(`
        p-5
        [&_.ant-input]:h-[35px]
        [&_.ant-input-number-input]:h-[35px]
        [&_.ant-select-selector]:h-[35px]
        [&_.ant-picker]:h-[35px]
      `)}
      gutter={[24, 16]}
    >
      <Col xs={24} lg={12}>
        <Form.Item label="ID" name="mssv">
          <Input placeholder="Enter MSSV" />
        </Form.Item>
        <Form.Item label="Full name" name="fullName">
          <Input placeholder="Enter full name" />
        </Form.Item>
        <Form.Item label="Gender" name="gender" initialValue="M">
          <Select placeholder="Select gender">
            <Select.Option value="M">Male</Select.Option>
            <Select.Option value="F">Female</Select.Option>
            <Select.Option value="N">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Phone number" name="phone">
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </Col>
      <Col xs={24} lg={12}>
        <Form.Item label="Generation" name="generation" initialValue="9">
          <InputNumber className="w-full" min={1} max={10} />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Select placeholder="Select department" className="w-full" loading={isFetching}>
            {data?.data?.results.map((department: any) => {
              return (
                <Select.Option key={department.id} value={department.id}>
                  {department.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Join date" name="joinDate">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item label="Leave date" name="leaveDate">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item label="Status" name="isActive" initialValue="Active">
          <Select placeholder="Select status" className="w-full">
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Deactivate</Select.Option>
          </Select>
        </Form.Item>
        {!isEdit ? (
          <Form.Item label="Avatar" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload
              listType="picture"
              beforeUpload={handleUpload}
              maxCount={1}
              multiple={false}
              onPreview={() => false}
            >
              <Button className='leading-[0] [&_span]:inline-flex' icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        ) : (
          <div className="flex justify-center">
            <Image
              width={200}
              src={avt ?? 'https://cdn-amz.woka.io/images/I/71qtAiNUCpL.jpg'}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}
