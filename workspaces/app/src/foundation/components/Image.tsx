import type * as CSS from 'csstype';

import { addUnitIfNeeded } from '../../lib/css/addUnitIfNeeded';

type Props = {
  height: number | string;
  objectFit: CSS.Property.ObjectFit;
  width: number | string;
} & JSX.IntrinsicElements['img'];

export const Image: React.FC<Props> = ({ height, objectFit, width, ...rest }) => {
  return (
    <img
      height={addUnitIfNeeded(height)}
      width={addUnitIfNeeded(width)}
      {...rest}
      loading="lazy"
      style={{ display: 'block', objectFit }}
    />
  );
};
