import React from 'react';
import Container from './Container';

const Main = ({ children }) => {
  return (
    <main className="min-h-[70vh]">
      <Container>{children}</Container>
    </main>
  );
};

export default Main;
