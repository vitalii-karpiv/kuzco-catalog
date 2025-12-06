import { Tag } from 'antd';
import type { LaptopCondition } from '../../constants/laptopCondition';

interface ConditionTagProps {
  condition?: LaptopCondition;
}

const ConditionTag = ({ condition }: ConditionTagProps) => {
  if (!condition) {
    return <Tag color="default">Н/Д</Tag>;
  }

  switch (condition) {
    case 'A+':
      return <Tag color="green">A+ (як новий)</Tag>;
    case 'A':
      return <Tag color="blue">A (дуже хороший)</Tag>;
    case 'B':
      return <Tag color="orange">B (хороший)</Tag>;
    case 'C':
      return <Tag color="red">C (задовільний)</Tag>;
    default:
      return <Tag color="default">{condition}</Tag>;
  }
};

export default ConditionTag;


