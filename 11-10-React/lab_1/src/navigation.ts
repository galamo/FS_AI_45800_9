import AssessmentIcon from '@mui/icons-material/Assessment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import PasswordIcon from '@mui/icons-material/Password'
import PeopleIcon from '@mui/icons-material/People'
import PetsIcon from '@mui/icons-material/Pets'
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
  { to: '/login-state', label: 'Login (state)', icon: LoginIcon },
  { to: '/login-ref', label: 'Login (ref)', icon: PasswordIcon },
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/reports', label: 'Reports', icon: AssessmentIcon },
  { to: '/users', label: 'Users', icon: PeopleIcon },
  { to: '/favorites', label: 'Favorites', icon: FavoriteIcon },
  { to: '/jokes', label: 'Jokes', icon: EmojiEmotionsIcon },
  { to: '/dogs', label: 'Dogs', icon: PetsIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]
