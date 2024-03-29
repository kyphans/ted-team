import { Tag } from 'antd';
export interface PrimaryTagProps {
  variant?: Variant | string;
}
type Variant = 'MB' | 'PRD' | 'DD' | 'PD' | 'Collaborator';

export default function PrimaryTag(props: PrimaryTagProps) {
  const { variant } = props;
  switch (variant) {
    case 'MB':
      return <Tag color="red">MB</Tag>;
    case 'PRD':
      return <Tag color="green">PrD</Tag>;
    case 'DD':
      return <Tag color="cyan">DD</Tag>;
    case 'PD':
      return <Tag color="purple">PD</Tag>;
    case 'Collaborator':
      return <Tag color="lime">Collaborator</Tag>;
    case 'Teddy':
      return <Tag color="lime">Teddy</Tag>;
    default:
      return <Tag color="blue">{variant}</Tag>;
  }
}
