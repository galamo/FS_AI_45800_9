import AssessmentIcon from '@mui/icons-material/Assessment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import type { ComponentType } from 'react'

export type NavItem = {
  to: string
  label: string
  icon: ComponentType<SvgIconProps>
  end?: boolean
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/reports', label: 'Reports', icon: AssessmentIcon },
  { to: '/users', label: 'Users', icon: PeopleIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]
