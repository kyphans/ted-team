import { Input, Typography, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import { doc, setDoc, addDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import db from '../../common/firebase/firebase';
import { useNotification } from '../../context/NotificationContext';
import PrimaryTable from '../../components/__common/custom/PrimaryTable';
import type { ColumnsType } from 'antd/es/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface URLShortenerProps {}
type DataType = {
  userId: string;
  url: string;
  slug?: string;
  customSlug?: string;
  dateExpiry?: string;
  description?: string;
};

function URLShortener(props: URLShortenerProps) {
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: 'Custom Link',
      dataIndex: 'customSlug',
      width: 300,
      render: (_, { customSlug }) => {
        return <a href={'/link/' + customSlug}>{location.protocol + '//' + location.host + '/link/' + customSlug}</a>;
      },
    },
    {
      title: 'URL',
      dataIndex: 'url',
      width: 400,
    },
    {
      title: 'Expired Date',
      dataIndex: 'expiredDate',
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
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueCreated, setInputValueCreated] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');
  const [expiredDate, setExpiredDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { addNotification } = useNotification();
  const [user, setUser] = useLocalStorage('user');
  const userInfo = JSON.parse(user).info;

  const fetchData = async (db: any, customSlug: any) => {
    const querySnapshot = await getDocs(query(collection(db, 'url-shortener'), orderBy('id', 'desc')));
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;
  };

  const { data, isLoading, isFetching, refetch } = useQuery(['listURL'], () => fetchData(db, customSlug), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const mutation = useMutation(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'url-shortener'), where('customSlug', '==', customSlug)),
      );
      const documents = querySnapshot.docs.map((doc) => doc.data());
      if (documents.length === 0 && customSlug && inputValue) {
        await addDoc(collection(db, 'url-shortener'), {
          id: Date.now(),
          userId: userInfo.id,
          author: userInfo.fullName,
          url: inputValue,
          customSlug: customSlug,
          expiredDate: expiredDate,
          description: description,
        });
        addNotification('Successfully!', 'success');
        if (typeof window !== 'undefined') {
          setInputValueCreated(location.protocol + '//' + location.host + '/link/' + customSlug);
        }

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
    console.log(dateString);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <Typography.Title className="m-0" level={3}>
          URL Shortener
        </Typography.Title>
      </div>
      <div className="mb-3 [&_.ant-input]:h-[35px] [&_.ant-picker]:h-[35px] [&_.ant-picker]:w-full">
        {inputValueCreated && (
          <Input
            addonBefore="Shortened link"
            value={inputValueCreated}
            className="[&_.ant-input]:rounded-none [&_.ant-input-group-addon]:rounded-none [&_.ant-input]:bg-green-200 mb-3 border-2 border-green-600 bg-green-300"
            readOnly
          />
        )}
        <Input
          className="mb-3"
          addonBefore="http://"
          placeholder="URL link"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <div className="flex-1">
            <Input addonBefore="Custom link" placeholder="Ex: form-soc-2024" onChange={(e) => setCustomSlug(e.target.value)} />
          </div>
          <div className="flex-1">
            <DatePicker className="" onChange={(date, dateString) => setExpiredDate(dateString)} />
          </div>
          <div className="flex-1">
            <Input addonBefore="Description" placeholder="" onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
      </div>
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      <div className="my-5">
        <div className="w-full overflow-x-scroll scrollbar-hide">
          <PrimaryTable
            loading={isLoading}
            className={'[&_.ant-table-tbody]:bg-white'}
            columns={columns}
            dataSource={data ?? []}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
}

export default URLShortener;
