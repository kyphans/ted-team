import { Input, type InputRef } from 'antd';
import { type TextAreaProps } from 'antd/es/input';
import React from 'react';
import { tw } from '../../../../utils/classUtil';

const { TextArea } = Input;

interface PrimaryTextAreaProps extends TextAreaProps {}

export default React.forwardRef(function PrimaryTextArea(props: PrimaryTextAreaProps, ref: React.Ref<InputRef> | null) {
  const { className, ...restProps } = props;

  return <TextArea ref={ref} className={tw(className)} placeholder="Nhập nội dung" {...restProps} />;
});
