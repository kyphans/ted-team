import { Col, Divider, Form, Input, Row, Space, Typography } from 'antd';
import PrimaryButton from '../__common/custom/PrimaryButton';

interface MemberFormProps {
  onSaveMemberForm?: () => void;
  onCancelMemberForm?: () => void;
}

export default function MemberForm({ onSaveMemberForm, onCancelMemberForm }: MemberFormProps) {
  // const form = Form.useFormInstance();
  return (
    <Row className='p-2' gutter={[12, 12]}>
      <Col span={24}>
        Test modal
      </Col>
    </Row>
  );
}
