import { Input, Typography } from 'antd';
import React, { useState } from 'react';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import db from '../../common/firebase/firebase';

interface URLShortenerProps {}

function URLShortener(props: URLShortenerProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'url-shortener'), {
        url: inputValue,
      });
      console.log('Data saved to Cloud Firestore successfully!');
    } catch (error) {
      console.error('Error saving data to Cloud Firestore:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <Typography.Title className="m-0" level={3}>
          URL Shortener
        </Typography.Title>
      </div>
      <div className='mb-3'>
        <Input addonBefore="http://" placeholder="URL link" onChange={(e) => setInputValue(e.target.value)} />
      </div>
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
    </div>
  );
}

export default URLShortener;
