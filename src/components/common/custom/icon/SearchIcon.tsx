import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { tw } from '../../../../utils/classUtil';

export default function SearchIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1303 10.2069L14.6666 13.7432L13.7429 14.6668L10.2067 11.1306L11.1303 10.2069Z"
            fill="#BFBFBF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.21151 2.63978C4.68648 2.63978 2.63953 4.68672 2.63953 7.21175C2.63953 9.73679 4.68648 11.7837 7.21151 11.7837C9.73654 11.7837 11.7835 9.73679 11.7835 7.21175C11.7835 4.68672 9.73654 2.63978 7.21151 2.63978ZM1.33325 7.21175C1.33325 3.96528 3.96504 1.3335 7.21151 1.3335C10.458 1.3335 13.0898 3.96528 13.0898 7.21175C13.0898 10.4582 10.458 13.09 7.21151 13.09C3.96504 13.09 1.33325 10.4582 1.33325 7.21175Z"
            fill="#BFBFBF"
          />
        </svg>
      )}
    />
  );
}
