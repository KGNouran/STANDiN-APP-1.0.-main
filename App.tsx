
// STABLE BUILD - DUAL ENGINE ARCHITECTURE (V5.0)
import { useState, useMemo } from 'react';
import { MOCK_TRAINER, MOCK_SCHOOL } from './constants';
import { UserRole } from './types';
import { UniversalLandingView } from './views/Landing';
import { GatekeeperView } from './views/Gatekeeper';
import { TrainerEngine } from './engines/TrainerEngine';
import { StudioEngine } from './engines/StudioEngine';

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
      return localStorage.getItem('standin_beta_authorized') === 'true';
  });
  
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('TRAINER');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Static user references for the session
  const [users] = useState({ school: MOCK_SCHOOL, trainer: MOCK_TRAINER });

  if (!isAuthorized) {
    return <GatekeeperView onUnlock={() => {
        localStorage.setItem('standin_beta_authorized', 'true');
        setIsAuthorized(true);
    }} />;
  }

  if (!isLoggedIn) {
    return <UniversalLandingView 
        setIsLoggedIn={setIsLoggedIn} 
        currentUserRole={currentUserRole} 
        setCurrentUserRole={setCurrentUserRole} 
    />;
  }

  const handleToggleRole = () => {
      setCurrentUserRole(prev => prev === 'TRAINER' ? 'SCHOOL' : 'TRAINER');
  };

  return (
    <>
      {currentUserRole === 'TRAINER' ? (
        <TrainerEngine 
            user={users.trainer} 
            onLogout={() => setIsLoggedIn(false)} 
            onToggleRole={handleToggleRole}
        />
      ) : (
        <StudioEngine 
            user={users.school} 
            onLogout={() => setIsLoggedIn(false)} 
            onToggleRole={handleToggleRole}
        />
      )}
    </>
  );
}
