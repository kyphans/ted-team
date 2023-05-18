import { Form, type FormInstance, type FormProps } from 'antd';
import React from 'react';
import { tw } from '../../../../common/utils/classUtil';

interface PrimaryFormProps extends FormProps {
  children: React.ReactNode;
}

export default React.forwardRef(
  function PrimaryForm(props: PrimaryFormProps, ref: React.Ref<FormInstance<any>> | undefined) {
    const { className, form, ...restProps } = props;
    return <Form ref={ref} form={form} className={tw('', className)} {...restProps} />;
  }
);
