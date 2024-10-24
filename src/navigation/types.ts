import React from 'react';
import { EnumUserRequestRole } from '../backend/services/backend';

export interface RouteConfig {
  key: string;
  title: string;
  roles?: EnumUserRequestRole[],
  component?: React.ReactNode;
}

export interface NavigationItemConfig {
  key: string;
  roles?: EnumUserRequestRole[],
  icon?: React.ReactNode,
  label?: React.ReactNode,
}

export interface NavigationItemType extends RouteConfig, NavigationItemConfig {
  hidden?: boolean;
}

export interface NavigationSubmenuItemType extends NavigationItemConfig {
  children: NavigationItemType[];
}

export type NavigationType = Array<NavigationItemType | NavigationSubmenuItemType>;
