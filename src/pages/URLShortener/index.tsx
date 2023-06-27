import { Input, Typography, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import React, { useState } from 'react';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import db from '../../common/firebase/firebase';

interface URLShortenerProps {}
type data = {
  userId: string;
  url: string;
  slug: string;
  customSlug?: string;
  dateExpiry?: string;
  description?: string;
};

function URLShortener(props: URLShortenerProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');

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

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <Typography.Title className="m-0" level={3}>
          URL Shortener
        </Typography.Title>
      </div>
      <div className="mb-3 [&_.ant-input]:h-[35px] [&_.ant-picker]:h-[35px] [&_.ant-picker]:w-full">
        <Input className="mb-3" disabled />
        <Input 
          className="mb-3"
          addonBefore="http://"
          placeholder="URL link"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex space-x-3">
          <div className="flex-1">
            <Input addonBefore="Custom link" placeholder="test.com/" onChange={(e) => setCustomSlug(e.target.value)} />
          </div>
          <div className="flex-1">
            <DatePicker className='' onChange={onChange} />
          </div>
          <div className="flex-1">
            <Input addonBefore="Description" placeholder="" onChange={(e) => setCustomSlug(e.target.value)} />
          </div>
        </div>
      </div>
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
    </div>
  );
}

export default URLShortener;
