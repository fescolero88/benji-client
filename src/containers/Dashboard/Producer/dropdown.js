import React from 'react';
import User from '@iso/components/icons/User';
import Finance from '@iso/components/icons/Finance';
import Invite from '@iso/components/icons/Invite';
import { isExecutiveProducer } from '@iso/lib/helpers/auth';

const topDropdown = (user) => {
  if (isExecutiveProducer(user)) {
    return [
      {
        key: 'personal-profile',
        path: '/profile',
        label: 'sidebar.personalProfile',
        icon: <User />,
      },
      {
        key: 'finance',
        label: 'sidebar.finance',
        icon: <Finance fill="none" />,
      },
      {
        key: 'invite',
        path: '/invitation',
        label: 'topbar.invite',
        icon: <Invite />,
      }
    ];
  } else {
    return [
      {
        key: 'personal-profile',
        path: '/profile',
        label: 'sidebar.personalProfile',
        icon: <User />,
      },
      {
        key: 'finance',
        label: 'sidebar.finance',
        icon: <Finance fill="none" />,
      }
    ];
  }
};

export default topDropdown;