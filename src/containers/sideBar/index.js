import React, { useEffect, useState } from 'react';
import { Logo } from '../../components/logo/logo';
import SideBarList from '../../components/sidebar-list/sidebar-list';
import TabsBar from '../../components/tabs/tabs';
import { getTabs } from '../../store/actions';
import { useSelector } from 'react-redux';

export default function SideBar() {
   
    return (
      <SideBarList />
    );
}