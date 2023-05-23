import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space, Typography, Image } from 'antd';
import PrimaryButton from '../__common/custom/PrimaryButton';
import { tw } from '../../common/utils/classUtil';

interface MemberFormProps {
  onSaveMemberForm?: () => void;
  onCancelMemberForm?: () => void;
}

export default function MemberForm({ onSaveMemberForm, onCancelMemberForm }: MemberFormProps) {
  const form = Form.useFormInstance();
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
          <Input placeholder="enter MSSV" />
        </Form.Item>
        <Form.Item label="First name" name="firstName">
          <Input placeholder="enter first name" />
        </Form.Item>
        <Form.Item label="Last name" name="lastName">
          <Input placeholder="enter last name" />
        </Form.Item>
        <Form.Item label="Gender" name="gender" initialValue="male">
          <Select placeholder="select gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="enter email" />
        </Form.Item>
        <Form.Item label="Phone number" name="phone">
          <Input placeholder="enter phone number" />
        </Form.Item>
      </Col>
      <Col xs={24} lg={12}>
        <Form.Item label="Generation" name="generation" initialValue="9">
          <InputNumber className="w-full" min={1} max={10} />
        </Form.Item>
        <Form.Item label="Join date" name="joinDate">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item label="Leave date" name="leaveDate">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item label="Status" name="isActive" initialValue="active">
          <Select placeholder="select status" className="w-full">
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Deactivate</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Avatar" name="img">
          <Input addonBefore="URL" placeholder="enter URL avatar" />
        </Form.Item>
        <div className="flex justify-center">
          <Image width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 0]}>
          <Space className="w-full justify-end">
            <PrimaryButton className="bg-slate-200" variant="cancel" onClick={onCancelMemberForm}>
              Cancel
            </PrimaryButton>
            <PrimaryButton className="bg-blue-600" variant="primary" onClick={onSaveMemberForm}>
              Add
            </PrimaryButton>
          </Space>
        </Row>
      </Col>
    </Row>
  );
}
