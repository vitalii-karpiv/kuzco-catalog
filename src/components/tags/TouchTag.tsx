import { Tag } from 'antd';

interface TouchTagProps {
  isTouch?: boolean;
}

const TouchTag = ({ isTouch }: TouchTagProps) => {
  if (isTouch === undefined) {
    return <Tag color="default">Н/Д</Tag>;
  }

  return isTouch ? (
    <Tag color="green">Так</Tag>
  ) : (
    <Tag color="blue">Ні</Tag>
  );
};

export default TouchTag;