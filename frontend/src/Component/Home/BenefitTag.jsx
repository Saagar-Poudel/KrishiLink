import React from 'react';
import { Check } from 'lucide-react';

const BenefitTag = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
      <span className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full">
  <Check className="h-4 w-4 text-green-500" />
</span>

      </div>
      <span className="text-gray-600 text-l">{text}</span>
    </div>
  );
};

export default BenefitTag;