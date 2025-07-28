// components/common/EmptyStateMessage.tsx
import React from 'react';

// Using react-icons as an example for the icon
import { FiInbox } from 'react-icons/fi';

interface EmptyStateMessageProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({
  icon = <FiInbox size={48} />, // Default icon
  title,
  message,
}) => {
  return (
    <div className="empty-state-message text-center">
      <div className="empty-state-icon mb-3">
        {icon}
      </div>
      <h4 className="empty-state-title fw-semibold mb-2">{title}</h4>
      <p className="empty-state-text text-muted mx-auto">{message}</p>
    </div>
  );
};

export default EmptyStateMessage;