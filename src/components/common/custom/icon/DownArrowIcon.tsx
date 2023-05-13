import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { tw } from '../../../../utils/classUtil';

export default function DownArrowIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 40" fill="currentColor">
          <path d="M24 30.75 12 18.75 14.15 16.6 24 26.5 33.85 16.65 36 18.8Z" />
        </svg>
      )}
    />
  );
}
