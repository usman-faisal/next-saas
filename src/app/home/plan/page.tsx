'use client';

import { useState } from 'react';
import Image from 'next/image';

// COMPONENTS
import Card from 'components/card';

// ICONS
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import Filter from 'components/filter';

const Clients = () => {
  const [isCountryFilter, setIsCountryFilter] = useState(false);
  const [isIndustryFilter, setIsIndustryOpen] = useState(false);
  const [isBusinessFilter, setIsBusinessOpen] = useState(false);
  return (
    <div>
      <Card extra="mt-3 h-fit p-8 gap-6"></Card>
    </div>
  );
};

export default Clients;
