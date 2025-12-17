"use client";

import { useState, useEffect } from 'react';
import { freezoneDetails } from '@/Datas/freezoneDetails';

export const useFreezonePackages = (freezoneId) => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch from API
        const response = await get('/newsletter/category-packages'); 
        
        if (!response.ok) {
          throw new Error('API fetch failed');
        }

        const result = await response.json();
        
        // Find the matching freezone packages from API data
        const matchedPackages = findPackagesInAPIData(result.data, freezoneId);
        
        if (matchedPackages && matchedPackages.length > 0) {
          // Transform API data to match expected format
          const transformedPackages = matchedPackages.map(pkg => ({
            name: pkg.title,
            description: pkg.points.map(p => p.text).join(' + '),
            startingPriceAED: pkg.price
          }));
          
          setPackages(transformedPackages);
        } else {
          // No API data found, use fallback
          throw new Error('No packages found in API');
        }
        
      } catch (err) {
        console.warn('API fetch failed, using fallback data:', err.message);
        
        // Fallback to static data
        const staticFreezone = freezoneDetails.find(item => item.id === freezoneId);
        
        if (staticFreezone?.setupPackages?.packages) {
          setPackages(staticFreezone.setupPackages.packages);
        } else {
          setError('No packages available');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (freezoneId) {
      fetchPackages();
    }
  }, [freezoneId]);

  return { packages, isLoading, error };
};

// Helper function to find packages in API data structure
const findPackagesInAPIData = (apiData, freezoneId) => {
  if (!apiData || !Array.isArray(apiData)) return null;

  // Map freezone IDs to page names (adjust based on your actual mapping)
  const freezoneToPageNameMap = {
    'jafza-freezone-dubai': 'JAFZA',
    'ifza-freezone-dubai': 'IFZA',
    'dafza-freezone-dubai': 'DAFZA',
    'meydan-freezone-dubai': 'Meydan',
    'dubai-south-freezone': 'DWC',
    'adgm-abu-dhabi': 'ADGM',
    'kizad-abu-dhabi': 'KIZAD',
    'saif-zone-sharjah': 'SAIF',
    'hamriyah-free-zone-sharjah': 'Hamriyah',
    'shams-sharjah': 'SHAMS',
    'rakez-ras-al-khaimah': 'RAKEZ',
    'rak-maritime-city': 'RAK Maritime City',
    'afz-ajman': 'AFZ',
    'fujairah-free-zone': 'Fujairah Free Zone',
    'uaq-free-trade-zone': 'UAQFTZ',
    // Add more mappings as needed
  };

  const pageName = freezoneToPageNameMap[freezoneId];
  if (!pageName) return null;

  // Search through all categories
  for (const category of apiData) {
    if (category.pages && Array.isArray(category.pages)) {
      const matchedPage = category.pages.find(page => page.pageName === pageName);
      if (matchedPage && matchedPage.packages) {
        return matchedPage.packages;
      }
    }
  }

  return null;
};