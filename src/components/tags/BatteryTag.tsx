import { Tag } from 'antd';
import type { BatteryCondition } from '../../constants/batteryCondition';

interface BatteryTagProps {
  battery?: BatteryCondition;
}

const BatteryTag = ({ battery }: BatteryTagProps) => {
  if (!battery) {
    return <Tag color="default">Н/Д</Tag>;
  }

  switch (battery) {
    case 'excellent':
      return <Tag color="green">Відмінна 100% - 90%</Tag>;
    case 'good':
      return <Tag color="blue">Хороша 89% - 75%</Tag>;
    case 'fair':
      return <Tag color="orange">Задовільна 74% - 60%</Tag>;
    case 'poor':
      return <Tag color="red">Посередня 60% і менше</Tag>;
    default:
      return <Tag color="default">{battery}</Tag>;
  }
};

export default BatteryTag;


