import React from 'react';

// Admin Imports

// Icon Imports
import { MdHome, MdOutlineUploadFile, MdHistory } from 'react-icons/md';
import { BiSolidReport } from 'react-icons/bi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { TbBusinessplan } from 'react-icons/tb';

const routes = [
  {
    name: 'Dashboard',
    layout: '/home',
    path: 'dashboard',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Plan',
    layout: '/home',
    path: 'plan',
    icon: <TbBusinessplan className="h-6 w-6" />,
    secondary: true,
  },
];
export default routes;
