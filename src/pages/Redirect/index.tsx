import React, { useEffect, useState } from 'react';
import db from '../../common/firebase/firebase';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function Redirect() {
  const { slug } = useParams();
  useEffect(() => {
    let q = query(collection(db, 'url-shortener'), where('customSlug', '==', slug));
    const unsubscribe = onSnapshot(q, (doc) => {
      doc.forEach((item) => {
        window.location.href = item.data().url;
      });
    });
    return () => unsubscribe();
  }, [slug]);
  return <div></div>;
}

export default Redirect;
