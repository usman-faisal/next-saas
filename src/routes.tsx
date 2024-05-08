import React from 'react';

// Admin Imports

// Icon Imports
import { MdHome, MdOutlineUploadFile, MdHistory } from 'react-icons/md';
import { BiSolidReport } from 'react-icons/bi';
import { FaPeopleGroup, FaWpforms } from 'react-icons/fa6';
import { TbBusinessplan } from 'react-icons/tb';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

const routes = [
  {
    name: 'Dashboard',
    layout: '/home',
    path: 'dashboard',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Chat',
    layout: '/home',
    path: 'chat',
    icon: <IoChatboxEllipsesOutline className="h-6 w-6" />,
  },
  {
    name: 'Plan',
    layout: '/home',
    path: 'plan',
    icon: <TbBusinessplan className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: 'Form',
    layout: '/home',
    path: 'form',
    icon: <FaWpforms className="h-6 w-6" />,
  },
];
export default routes;
