import { useAtom } from 'jotai';
import React from 'react';

import { SvgIcon } from '../../features/icons/components/SvgIcon';
import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space } from '../styles/variables';

export const Dialog: React.FC = () => {
  const [content, updateContent] = useAtom(DialogContentAtom);

  // 인라인 스타일 객체
  const styles = {
    closeButton: {
      background: 'none',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      height: '32px',
      left: `-${Space * 1}px`,
      margin: '0',
      padding: '0',
      top: `-${Space * 5}px`,
      width: '32px',
    },
    container: {
      backgroundColor: Color.MONO_A,
      borderRadius: '4px',
      height: '540px',
      overflow: 'scroll',
      padding: `${Space * 2}px`,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      left: 0,
      top: 0,
      width: '100%',
      zIndex: 1000,
    },
    wrapper: {
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
      left: '50%',
      maxWidth: '480px',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: `calc(100% - ${Space * 8}px)`,
    },
  };

  return content != null ? (
    <div style={{ ...styles.overlay, position: 'fixed' }}>
      <div style={{ ...styles.wrapper, position: 'fixed' }}>
        <button onClick={() => updateContent(null)} style={{ ...styles.closeButton, position: 'absolute' }}>
          <SvgIcon color={Color.MONO_A} height={32} type="Close" width={32} />
        </button>
        <div style={styles.container}>{content}</div>
      </div>
    </div>
  ) : null;
};
