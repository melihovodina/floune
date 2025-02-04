import Navbar from '@/components/Navbar';
import React from 'react'

const Index = () => {
  return (
    <>
    <Navbar/>
      <div className="center">
        <h1>Welcome!</h1>
        <h3>Here collected the best tracks!</h3>
      </div>
      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `}
      </style>
    </>
  );
};

export default Index;