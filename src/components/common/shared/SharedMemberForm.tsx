import { Col, Divider, Form, Row, Space, Typography } from 'antd';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryInput from '../custom/input/PrimaryInput';
import PrimaryDatePicker from '../custom/picker/PrimaryDatePicker';

interface SharedMemberFormProps {
  onSaveMemberForm?: () => void;
  onCancelMemberForm?: () => void;
}

export default function SharedMemberForm({ onSaveMemberForm, onCancelMemberForm }: SharedMemberFormProps) {
  const form = Form.useFormInstance();
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              className="mb-2"
              label={<Typography className="text-sm font-medium">Họ và tên</Typography>}
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Trường họ và tên không được để trống',
                },
              ]}
            >
              <PrimaryInput placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="mb-2"
              label={<Typography className="text-sm font-medium">Ngày sinh</Typography>}
              name="dayOfBirth"
              rules={[
                {
                  required: true,
                  message: 'Trường họ và tên không được để trống',
                },
              ]}
            >
              <PrimaryDatePicker placeholder="Chọn ngày sinh" format={'DD/MM/YYYY'} allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              className="mb-2"
              label={<Typography className="text-sm font-medium">Số điện thoại</Typography>}
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Trường số điện thoại không được để trống',
                },
              ]}
            >
              <PrimaryInput placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="mb-2"
              label={<Typography className="text-sm font-medium">Email</Typography>}
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Trường email không được để trống',
                },
              ]}
            >
              <PrimaryInput placeholder="Nhập email" />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 0]}>
          <Col span={24}>
            <Form.Item
              required={false}
              className="mb-2"
              label={<Typography className="text-sm font-medium">Nickname</Typography>}
              name="nickname"
            >
              <PrimaryInput placeholder="Nhập nickname" />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Divider className="my-2 " />
      <Col span={24}>
        <Row gutter={[12, 0]}>
          <Space className="w-full justify-end">
            <PrimaryButton variant="cancel" onClick={onCancelMemberForm}>
              Hủy
            </PrimaryButton>
            <PrimaryButton variant="primary" onClick={onSaveMemberForm}>
              Xác nhận
            </PrimaryButton>
          </Space>
        </Row>
      </Col>
    </Row>
  );
}
