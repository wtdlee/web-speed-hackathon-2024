import type * as CSS from 'csstype';

import { addUnitIfNeeded } from '../../lib/css/addUnitIfNeeded';

type Props = {
  height: number | string;
  loading?: string;
  objectFit: CSS.Property.ObjectFit;
  width: number | string;
} & JSX.IntrinsicElements['img'];

export const Image: React.FC<Props> = ({ height, loading = 'lazy', objectFit, width, ...rest }) => {
  return (
    <img
      height={addUnitIfNeeded(height)}
      loading={loading}
      width={addUnitIfNeeded(width)}
      {...rest}
      style={{ display: 'block', objectFit }}
    />
  );
};
