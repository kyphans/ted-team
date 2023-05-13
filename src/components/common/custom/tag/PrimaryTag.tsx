import { Tag, Typography, type TagProps } from 'antd';
import _ from 'lodash';
import React from 'react';
import { tw } from '../../../../utils/classUtil';
import PrimaryTooltip, { type PrimaryTooltipProps } from '../tooltip/PrimaryTooltip';

const { Text } = Typography;

type Variant = 'more' | 'in-card';

export interface PrimaryTagProps extends TagProps {
  variant?: Variant;
  typographyClassName?: string;
  textClassName?: string;
  tooltipProps?: PrimaryTooltipProps;
}

export default React.forwardRef(function PrimaryTag(props: PrimaryTagProps, ref: React.Ref<HTMLElement> | null) {
  const { variant, className, typographyClassName, textClassName, tooltipProps, color, children, ...restProps } = props;
  let tagClassNameByColor = '';
  let textClassNameByColor = '';

  switch (color) {
    case 'default': {
      tagClassNameByColor = 'bg-gray-light-11';
      textClassNameByColor = 'text-gray-dark-7';
      break;
    }
    case 'warning': {
      tagClassNameByColor = 'bg-orange-4';
      textClassNameByColor = 'text-orange-1';
      break;
    }
    case 'success': {
      tagClassNameByColor = 'bg-green-5';
      textClassNameByColor = 'text-green-4';
      break;
    }
    case 'processing': {
      tagClassNameByColor = 'bg-blue-4';
      textClassNameByColor = 'text-blue-5';
      break;
    }
    case 'error': {
      tagClassNameByColor = 'bg-red-2';
      textClassNameByColor = 'text-red-3';
      break;
    }
    default:
      break;
  }

  switch (variant) {
    case 'more':
      return (
        <PrimaryTooltip {...{ hidden: !_.size(tooltipProps), ...tooltipProps }}>
          <Tag
            ref={ref}
            className={tw('rounded-full bg-orange-6 py-1 px-3', tagClassNameByColor, className)}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex', typographyClassName)}>
              <Text ellipsis className={tw('text-xs', textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );

    case 'in-card':
      return (
        <PrimaryTooltip {...{ hidden: !_.size(tooltipProps), ...tooltipProps }}>
          <Tag
            ref={ref}
            className={tw('rounded-full bg-white py-1 px-3', tagClassNameByColor, className)}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex', typographyClassName)}>
              <Text ellipsis className={tw('text-xs', textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );
    default:
      break;
  }

  return (
    <PrimaryTooltip {...{ hidden: !_.size(tooltipProps), ...tooltipProps }}>
      <Tag
        ref={ref}
        className={tw('rounded-full  py-1 px-3', tagClassNameByColor, className)}
        {...{ color, ...restProps }}
      >
        <Typography className={tw('flex', typographyClassName)}>
          <Text className={tw('text-xs', textClassNameByColor, textClassName)}>{children}</Text>
        </Typography>
      </Tag>
    </PrimaryTooltip>
  );
});
