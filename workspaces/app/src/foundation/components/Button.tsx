type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['button'];

export const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        letterSpacing: 0,
        lineHeight: 1.5,
        margin: 0,
        padding: 0,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
