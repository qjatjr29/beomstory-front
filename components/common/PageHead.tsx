'use client';

import { useEffect } from 'react';

interface PageHeadProps {
  title: string;
}

const PageHead = ({ title }: PageHeadProps) => {
  useEffect(() => {
    document.title = `${title} | Beom'story`;
  }, [title]);

  return null;
};

export default PageHead;