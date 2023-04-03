import { Button } from 'antd';
import React from 'react';
import { useNotification } from '../../components/Notification/NotificationContext';

const ButtonTest = () => {
  const { addNotification } = useNotification();
  return (
    <>
      <div>Notification ButtonTest</div>
      <div className="flex justify-around my-5">
        <div>
          <Button type="primary" onClick={() => addNotification('This is a success notification', 'success')}>
            Success Button
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={() => addNotification('This is a error notification', 'error')} danger>
            Error Button
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonTest;
