import { Modal, Space, Typography, type ModalFuncProps, type ModalProps, type ResultProps } from 'antd';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { tw } from '../../../../common/utils/classUtil';
import PrimaryButton, { type PrimaryButtonProps } from '../PrimaryButton';

type Variant = 'default' | 'preview' | 'success' | 'warning' | 'error' | 'confirm' | 'info';
type ModalType = NonNullable<ModalFuncProps['type']>;
type FooterButtonType = 'accept' | 'cancel' | 'confirm' | 'delete' | 'add' | 'edit';
type FooterButtonOptions = {
  type: FooterButtonType;
  buttonProps: PrimaryButtonProps;
};

interface CommonModalProps {
  variant?: Variant;
  subtitle?: string | React.ReactNode;
  noBodySpacing?: boolean;
  footerButtons?: Array<FooterButtonType | FooterButtonOptions>;
  footerClassName?: string;
  onCloseModal?: () => void;
}
export interface PrimaryModalProps extends ModalProps, CommonModalProps {}
interface PrimaryModalFuncPropsParams extends ModalFuncProps, CommonModalProps {}

export const primaryModalFuncProps = ( params?: PrimaryModalFuncPropsParams ): Partial<Record<ModalType, ModalFuncProps>> => {
  const { variant, ...restParams } = params ?? {};
  return {
    info: {
      okButtonProps: {
        className: '',
      },
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      centered: true,
      ...restParams,
    },
    confirm: {
      okButtonProps: {
        className: '',
      },
      centered: true,
      ...restParams,
    },
    warning: {
      okButtonProps: {
        className: '',
      },
      centered: true,
      className: '',
      ...restParams,
    },
    error: {
      centered: true,
      ...restParams,
    },
    success: {
      centered: true,
      ...restParams,
    },
    warn: {
      centered: true,
      ...restParams,
    },
  };
};

export default function PrimaryModal(props: PrimaryModalProps) {
  const {
    className,
    noBodySpacing,
    variant,
    footer,
    footerButtons,
    footerClassName,
    onCancel,
    onOk,
    onCloseModal,
    title,
    subtitle,
    ...restProps
  } = props;

  // Variant
  switch (variant) {
    case 'default': {
      return (
        <Modal className={className} footer={footer} title={title} onCancel={onCancel} onOk={onOk} {...restProps} />
      );
    }
    default:
      break;
  }

  return (
    <Modal
      forceRender
      className={tw(
        `
        mmd:my-3
        [&_.ant-modal-body]:px-6 
        [&_.ant-modal-content]:p-0 
        [&_.ant-modal-footer]:m-0 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:py-4
        [&_.ant-modal-header]:px-6 [&_.ant-modal-header]:pb-2 [&_.ant-modal-header]:pt-4
        [&_.ant-divider]:my-0
        `,
        noBodySpacing && '[&_.ant-modal-body]:px-0',
        className,
      )}
      footer={footer}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      {...restProps}
    />
  );
}
