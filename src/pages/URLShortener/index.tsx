import { Input, Typography, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import { doc, setDoc, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../common/firebase/firebase';
import { useNotification } from '../../context/NotificationContext';
import PrimaryTable from '../../components/__common/custom/PrimaryTable';
import type { ColumnsType } from 'antd/es/table';
import { useMutation, useQuery } from '@tanstack/react-query';

interface URLShortenerProps {}
type DataType = {
  userId: string;
  url: string;
  slug?: string;
  customSlug?: string;
  dateExpiry?: string;
  description?: string;
};

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: 'Custom Link',
    dataIndex: 'customSlug',
    width: 400,
  },
  {
    title: 'URL',
    dataIndex: 'url',
    width: 400,
  },
  {
    title: 'Date Expiry',
    dataIndex: 'dateExpiry',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
];

function URLShortener(props: URLShortenerProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { addNotification } = useNotification();

  const fetchData = async (db: any, customSlug: any) => {
    const querySnapshot = await getDocs(query(collection(db, 'url-shortener'), where('author', '==', 'Phan Quốc Kỳ')));
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;
  };

  const { data, isLoading, isFetching, refetch } = useQuery(['listURL'], () => fetchData(db, customSlug), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  
  const mutation = useMutation(async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'url-shortener'), where('customSlug', '==', customSlug)));
      const documents = querySnapshot.docs.map((doc) => doc.data());
      if (documents.length === 0 && customSlug && inputValue) {
        await addDoc(collection(db, 'url-shortener'), {
          id: 'abc-tad-va4fa-ac',
          userId: '123331',
          author: 'Phan Quốc Kỳ',
          url: inputValue,
          customSlug: customSlug,
          description: description,
        });
        addNotification('Successfully!', 'success');
        refetch(); // Trigger re-fetching the data after adding a new URL
      } else {
        addNotification('Cannot create URL Shortener! Custom link already exists', 'warning');
      }
    } catch (error) {
      console.error('Error saving data to Cloud Firestore:', error);
      addNotification('Error saving data to Cloud Firestore', 'error');
    }
  });

  const handleSubmit = async () => {
    mutation.mutate();
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
            <DatePicker className="" onChange={onChange} />
          </div>
          <div className="flex-1">
            <Input addonBefore="Description" placeholder="" onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
      </div>
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      <div className="my-5">
        <PrimaryTable columns={columns} dataSource={data ?? []} rowKey="id" />
      </div>
    </div>
  );
}

export default URLShortener;
