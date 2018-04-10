import React, { Component } from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input style={{ marginBottom: '5px' }} {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
