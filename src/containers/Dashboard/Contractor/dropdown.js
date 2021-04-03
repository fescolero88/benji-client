import React from 'react';
import User from '@iso/components/icons/User';
import Finance from '@iso/components/icons/Finance';

const topDropdown = [
  {
    key: 'profile',
    path: '/profile',
    label: 'topbar.profile',
    icon: <User />,
  },
  {
    key: 'finance',
    label: 'sidebar.finance',
    icon: <Finance fill="none" stroke="#333333" />,
  }
];

export default topDropdown;