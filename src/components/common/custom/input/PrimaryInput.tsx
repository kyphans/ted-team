import { Input, type InputProps, type InputRef } from 'antd';
import React from 'react';
import { tw } from '../../../../utils/classUtil';
import SearchIcon from '../icon/SearchIcon';

type Variant = 'search-suffix' | 'search-prefix';

interface PrimaryInputProps extends InputProps {
  variant?: Variant;
}

export default React.forwardRef(function PrimaryInput(props: PrimaryInputProps, ref: React.Ref<InputRef> | null) {
  const { variant, className, ...restProps } = props;

  switch (variant) {
    case 'search-suffix': {
      return (
        <Input
          ref={ref}
          className={tw('h-12 [&_.ant-input]:bg-transparent', className)}
          suffix={<SearchIcon />}
          {...restProps}
        />
      );
    }
    case 'search-prefix': {
      return (
        <Input
          ref={ref}
          className={tw('h-12 [&_.ant-input]:bg-transparent', className)}
          prefix={<SearchIcon />}
          {...restProps}
        />
      );
    }

    default:
      break;
  }

  return <Input ref={ref} className={tw('h-12 [&_.ant-input]:bg-transparent', className)} {...restProps} />;
});
