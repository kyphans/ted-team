import { Button, Typography, type ButtonProps } from 'antd';
import React from 'react';
import { tw } from '../../../../utils/classUtil';
import LinkIcon from '../icon/LinkIcon';

const { Text } = Typography;

type Variant =
  | 'no-style'
  | 'large-circle'
  | 'cancel'
  | 'default'
  | 'dark'
  | 'light'
  | 'highlight'
  | 'nude'
  | 'attachment'
  | 'primary'
  | 'refuse'
  | 'rating';

export interface PrimaryButtonProps extends ButtonProps {
  variant?: Variant;
  typographyClassName?: string;
  textClassName?: string;
}

export default React.forwardRef(function PrimaryButton(
  props: PrimaryButtonProps,
  ref: React.Ref<HTMLButtonElement> | null,
) {
  const { variant, className, typographyClassName, textClassName, children, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return (
        <Button ref={ref} className={tw('flex w-full items-center justify-center', className)} {...restProps}>
          <Typography className={tw('text-center text-purple-2', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'large-circle': {
      return (
        <Button
          ref={ref}
          className={tw(
            'group h-32 w-32 border border-solid border-orange-8 bg-white shadow-sm hover:bg-blue-1',
            className,
          )}
          shape="circle"
          {...restProps}
        >
          <Typography className={tw('text-base font-medium text-blue-1 group-hover:text-white', typographyClassName)}>
            {children}
          </Typography>
        </Button>
      );
    }
    case 'no-style': {
      return (
        <Button ref={ref} className={tw('w-full border-none shadow-none', className)} {...restProps}>
          <Typography className={tw('text-center text-purple-2', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'cancel': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex w-full items-center justify-center border-none bg-gray-light-11 hover:opacity-60',
            className,
          )}
          {...restProps}
        >
          <Typography className={tw('text-center text-base font-medium', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'dark': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex w-full items-center justify-center border-none bg-gray-light-12 hover:opacity-60',
            className,
          )}
          {...restProps}
        >
          <Typography className={tw('text-center text-base font-medium', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'light':
      break;
    case 'primary': {
      return (
        <Button ref={ref} className={tw('w-full border-none bg-blue-2 hover:opacity-80', className)} {...restProps}>
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-base font-medium text-white', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'refuse': {
      return (
        <Button ref={ref} className={tw('w-full border-red-400 hover:opacity-80', className)} {...restProps}>
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw(' text-base font-medium  text-red-400', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'attachment': {
      return (
        <Button
          ref={ref}
          className={tw('flex h-12 w-full flex-row-reverse items-center justify-between', className)}
          icon={<LinkIcon />}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center', typographyClassName)}>
            <Text className={tw('text-gray-dark-8', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    default:
      break;
  }

  return (
    <Button ref={ref} className={tw(className)} {...restProps}>
      {children}
    </Button>
  );
});
