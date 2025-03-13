// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={`p-4 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={`text-xl font-semibold ${className || ''}`} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={`p-4 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
