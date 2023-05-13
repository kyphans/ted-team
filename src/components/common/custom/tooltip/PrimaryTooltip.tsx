import { Tooltip } from 'antd';
import { type TooltipPropsWithOverlay } from 'antd/es/tooltip';
import React from 'react';
import { tw } from '../../../../utils/classUtil';

type Variant = 'default';

export interface PrimaryTooltipProps extends TooltipPropsWithOverlay {
  variant?: Variant;
  hidden?: boolean;
}

export default React.forwardRef(function PrimaryTooltip(
  props: PrimaryTooltipProps,
  ref: React.Ref<HTMLElement> | null,
) {
  const { variant, hidden, className, children, ...restProps } = props;

  if (hidden) return <>{children}</>;

  switch (variant) {
    case 'default': {
      return (
        <Tooltip ref={ref} className={tw(className)} {...restProps}>
          {children}
        </Tooltip>
      );
    }

    default:
      break;
  }

  return (
    <Tooltip ref={ref} className={tw(className)} {...restProps}>
      {children}
    </Tooltip>
  );
});
