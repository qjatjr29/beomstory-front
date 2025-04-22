// hooks/useUser.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  profileImage: string;
  email: string;
}

interface UserData {
  user: User;
  token: string;
}

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // localStorage는 클라이언트에서만 접근 가능
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // 서버에서 유저 정보 가져오기
        const response = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
          setIsLoggedIn(true);
        } else {
          // 토큰이 유효하지 않으면 로컬 스토리지에서 제거
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, []);
  
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLoggedIn(false);
    router.push('/');
  };
  
  return {
    currentUser,
    isLoggedIn,
    isLoading,
    logout
  };
};