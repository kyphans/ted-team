import { Button, Typography, type ButtonProps } from 'antd';
import { tw } from '../../../../common/utils/classUtil';

const { Text } = Typography;

type Variant =
  | 'no-style'
  | 'cancel'
  | 'default'
  | 'dark'
  | 'light'
  | 'primary'

export interface PrimaryButtonProps extends ButtonProps {
  variant?: Variant;
  typographyClassName?: string;
  textClassName?: string;
}

export default function PrimaryButton(props: PrimaryButtonProps, ref: React.Ref<HTMLButtonElement> | null) {
  const { variant, className, typographyClassName, textClassName, children, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return (
        <Button ref={ref} className={tw('flex w-full items-center justify-center', className)} {...restProps}>
          <Typography className={tw('text-center text-purple-2', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'no-style': {
      return (
        <Button ref={ref} className={tw('w-full shadow-none', className)} {...restProps}>
          <Typography className={tw('text-center text-purple-2', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'cancel': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex w-full items-center justify-center bg-gray-light-11 hover:opacity-60',
            className,
          )}
          {...restProps}
        >
          <Typography className={tw('text-center text-base', typographyClassName)}>
            <Text className={tw('text-base', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'dark': {
      return (
        <Button
          ref={ref}
          className={tw('flex w-full items-center justify-center bg-black hover:opacity-60', className)}
          {...restProps}
        >
          <Typography className={tw('text-center text-base', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'light':
      break;
    case 'primary': {
      return (
        <Button ref={ref} type='primary' className={tw('w-full hover:opacity-80', className)} {...restProps}>
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-base text-white', textClassName)}>{children}</Text>
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
}
