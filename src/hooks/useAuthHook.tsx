
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { LogoutButton } from '@/components/auth/LogoutButton';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    ...context,
    LogoutButton
  };
}
