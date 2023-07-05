import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space, Typography, Image } from 'antd';
import PrimaryButton from '../__common/custom/PrimaryButton';
import { tw } from '../../common/utils/classUtil';
import { useQuery } from '@tanstack/react-query';

import DepartmentServices from '../../services/department.service';
import { useState } from 'react';

interface MemberFormProps {
  onSaveMemberForm?: () => void;
  onCancelMemberForm?: () => void;
}

export default function MemberForm({ onSaveMemberForm, onCancelMemberForm }: MemberFormProps) {
  const form = Form.useFormInstance();
  const avt = form.getFieldValue('avatar');

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['department'],
    queryFn: () => DepartmentServices.getAllDepartment<any>(),
  });
  
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
            {data?.data?.results.map((department: any)=>{
              return <Select.Option key={department.id} value={department.id}>{department.name}</Select.Option>
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
        <Form.Item label="Avatar" name="img">
          <Input addonBefore="URL" placeholder="Enter URL avatar" />
        </Form.Item>
        <div className="flex justify-center">
          <Image width={200} src={avt ?? "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} />
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 0]}>
          <Space className="w-full justify-end">
            <PrimaryButton disabled={false} className="bg-slate-200" variant="cancel" onClick={onCancelMemberForm}>
              Cancel
            </PrimaryButton>
            <PrimaryButton disabled={false} className="bg-blue-600" variant="primary" onClick={onSaveMemberForm}>
              Add
            </PrimaryButton>
          </Space>
        </Row>
      </Col>
    </Row>
  );
}
