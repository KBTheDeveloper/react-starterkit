// shared/ui/Icon.tsx
import { LucideProps } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ComponentType, createElement } from 'react';

type IconName = keyof typeof Icons;

interface IconProps extends LucideProps {
  name: IconName;
}

 const Icon = ({ name, size = 16, ...props }: IconProps) => {
  const LucideComponent = Icons[name] as ComponentType<LucideProps>;
  return createElement(LucideComponent, props);
};

export default Icon;
