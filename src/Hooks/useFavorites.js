import {useEffect, useState} from 'react';
import { storage } from '../../App';

const useFavorites = () => {

  // Load data from MMKV on component mount

  const jsonFavorites = storage.getString('favoritesListData');
  try {
    const storedFavorites = JSON.parse(jsonFavorites);
    if (storedFavorites) {
      console.log(
        '🚀 ~ file: useFavorites.js:18 ~ loadData ~ storedFavorites:',
        storedFavorites,
      );
      return storedFavorites;
    }
    return []
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return []
    // Handle the error or set default data as needed
  }
};

export default useFavorites;
