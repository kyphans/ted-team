import React, { useEffect, useState } from 'react';
import db from '../../common/firebase/firebase';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function Redirect() {
  const { slug } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    let q = query(collection(db, 'url-shortener'), where('customSlug', '==', slug));
    const unsubscribe = onSnapshot(q, (doc) => {
      console.log('Current data: ', doc);
      console.log('Type of doc: ', typeof doc);
      doc.forEach((item) => {
        console.log('item data: ', item.data());
        setData(item.data());
        window.location.href = item.data().url;
      });
    });
    return () => unsubscribe();
  }, [slug]);
  return <div>{slug}</div>;
}

export default Redirect;
 