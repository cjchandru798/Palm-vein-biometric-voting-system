import React from 'react';

interface StatusChipProps {
  status: 'pending' | 'done' | 'active' | 'draft' | 'completed' | 'verified' | 'error';
  children: React.ReactNode;
}

export function StatusChip({ status, children }: StatusChipProps) {
  const styles = {
    pending: 'bg-[#FFC107]/20 text-[#F57C00] border border-[#FFC107]/30',
    done: 'bg-[#4CAF50]/20 text-[#2E7D32] border border-[#4CAF50]/30',
    active: 'bg-[#3E7BFA]/20 text-[#3E7BFA] border border-[#3E7BFA]/30',
    draft: 'bg-gray-100 text-gray-600 border border-gray-200',
    completed: 'bg-[#0ACF83]/20 text-[#00875A] border border-[#0ACF83]/30',
    verified: 'bg-[#4CAF50]/20 text-[#2E7D32] border border-[#4CAF50]/30',
    error: 'bg-[#FF4D4F]/20 text-[#FF4D4F] border border-[#FF4D4F]/30'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full ${styles[status]}`}>
      {children}
    </span>
  );
}
