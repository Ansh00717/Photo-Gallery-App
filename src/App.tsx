/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useReducer, useEffect, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import {
  favouritesReducer,
  initialFavouritesState,
} from './reducers/favouritesReducer';
import { PhotoCard } from './components/PhotoCard';
import { SearchBar } from './components/SearchBar';

const STORAGE_KEY = 'favourites';

function getInitialFavourites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return { favourites: parsed };
      }
    }
  } catch (e) {
    console.error('Failed to parse favourites from localStorage', e);
  }
  return initialFavouritesState;
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [favouritesState, dispatch] = useReducer(
    favouritesReducer,
    initialFavouritesState,
    getInitialFavourites
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Persist favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favouritesState.favourites));
  }, [favouritesState.favourites]);

  const toggleFavourite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) return photos;
    const lowercasedTerm = searchTerm.toLowerCase();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(lowercasedTerm)
    );
  }, [photos, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Photo Gallery</h1>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-lg">No photos found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favouritesState.favourites.includes(photo.id)}
                    onToggleFavourite={toggleFavourite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
