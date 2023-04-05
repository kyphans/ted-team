import { SearchOutlined } from '@ant-design/icons';
import { Select, type RefSelectProps, type SelectProps } from 'antd';
import React, { useState } from 'react';
import { tw } from '../../../../utils/classUtil';
import DownArrowIcon from '../icon/DownArrowIcon';

interface PrimarySelectProps extends SelectProps {}

export default React.forwardRef(function PrimarySelect(
  props: PrimarySelectProps,
  ref: React.Ref<RefSelectProps> | null,
) {
  const { className, open, mode, showSearch, defaultOpen, onDropdownVisibleChange, ...restProps } = props;
  const [isOpen, setOpen] = useState<boolean>(defaultOpen ?? open ?? false);

  return (
    <Select
      ref={ref}
      className={tw(
        `
        h-12 w-full
        [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center 
        [&_.ant-select-selection-placeholder]:flex [&_.ant-select-selection-placeholder]:items-center 
        [&_.ant-select-selection-search]:flex  [&_.ant-select-selection-search]:items-center
        [&_.ant-select-selector]:h-full
        `,
        className,
      )}
      suffixIcon={
        isOpen && ((mode === 'multiple' && (showSearch === undefined || showSearch)) ?? showSearch) ? (
          <SearchOutlined />
        ) : (
          <DownArrowIcon />
        )
      }
      onDropdownVisibleChange={(open) => {
        onDropdownVisibleChange?.(open);
        setOpen(open);
      }}
      {...{ open, defaultOpen, showSearch, mode, ...restProps }}
    />
  );
});
