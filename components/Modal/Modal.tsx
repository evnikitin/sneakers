"use client";

import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  message: string;
  onClose: () => void;
}

export const Modal = ({ message, onClose }: ModalProps) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="text-center">
          <p>{message}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};
