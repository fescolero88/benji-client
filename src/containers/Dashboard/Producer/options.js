import React from 'react';
import Dashboard from '@iso/components/icons/Dashboard';
import Jobs from '@iso/components/icons/Jobs';
import Finance from '@iso/components/icons/Finance';
import Document from '@iso/components/icons/Document';
import Message from '@iso/components/icons/Message';
import Help from '@iso/components/icons/Help';
import Setting from '@iso/components/icons/Setting';
import Person from '@iso/components/icons/Person';
import Badge from '@iso/components/uielements/badge';

export const producerCompanyViewOptions = (companyId) => {

  return [
    {
      key: `companies/${companyId}/dashboard`,
      label: 'sidebar.dashboard',
      leftIcon: <Dashboard width={16} height={16} />,
    },
    {
      key: `companies/${companyId}/jobs`,
      className: 'has-border',
      label: 'sidebar.jobs',
      leftIcon: <Jobs width={16} height={15} fill="#ffffff" />,
    },
    {
      key: `companies/${companyId}/finance`,
      label: 'sidebar.finance',
      leftIcon: <Finance width={16} height={16} />,
    },
    {
      key: `companies/${companyId}/documents`,
      label: 'sidebar.documents',
      leftIcon: <Document width={16} height={13} />,
    },
    {
      key: `companies/${companyId}/network`,
      label: 'sidebar.companyNetwork',
      leftIcon: <Person width={16} height={16} />
    },
    // {
    //   key: `companies/${companyId}/messages`,
    //   label: 'sidebar.messages',
    //   leftIcon: <Message width={16} height={13} />,
    // },
    {
      key: `companies/${companyId}/settings`,
      className: 'has-border',
      label: 'sidebar.settings',
      leftIcon: <Setting width={16} height={16} />,
    },
    {
      key: `companies/${companyId}/help`,
      label: 'sidebar.help',
      leftIcon: <Help width={16} height={16} />,
    }
  ];
};

export const personalViewOptions = (pending, callsheet, invitations) => {
  const totalJobs = pending.length + callsheet.length;

  return [
    {
      key: 'dashboard',
      label: 'sidebar.dashboard',
      leftIcon: <Dashboard width={16} height={16} />,
    },
    {
      key: 'jobs',
      className: 'has-border',
      label: 'sidebar.jobs',
      leftIcon: <Jobs width={16} height={15} fill="#ffffff" />,
      suffix: <Badge count={totalJobs} style={{backgroundColor: '#352e76'}} />,
    },
    {
      key: 'finance',
      label: 'sidebar.finance',
      leftIcon: <Finance width={16} height={16} />,
    },
    {
      key: 'documents',
      label: 'sidebar.documents',
      leftIcon: <Document width={16} height={13} />,
    },
    {
      key: 'network',
      label: 'sidebar.personalNetwork',
      leftIcon: <Person width={16} height={16} />,
      suffix: <Badge count={invitations.length} />,
    },
    // {
    //   key: 'messages',
    //   label: 'sidebar.messages',
    //   leftIcon: <Message width={16} height={13} />,
    // },
    {
      key: 'profile',
      label: 'sidebar.settings',
      leftIcon: <Setting width={16} height={16} />,
    },
    {
      key: 'help',
      label: 'sidebar.help',
      leftIcon: <Help width={16} height={16} />,
    }
  ];
};
