import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const guardedPaths = [
  '/opening',
  '/room',
  '/hint',
  '/note',
  '/evidence',
  '/blog',
  '/blog-corrupt',
  '/SuspectSelect',
];

function shouldGuard(pathname) {
  return guardedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function RefreshGuard() {
  const { pathname } = useLocation();
  const isGuarded = shouldGuard(pathname);

  useEffect(() => {
    if (!isGuarded) {
      return undefined;
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleKeyDown = (event) => {
      const isReloadKey = event.key === 'F5' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'r');

      if (isReloadKey) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGuarded]);

  return null;
}

export default RefreshGuard;
