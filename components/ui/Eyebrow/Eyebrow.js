import styles from './Eyebrow.module.css';

export default function Eyebrow({
  children,
  tone = 'snow',
  as: Tag = 'span',
  className = '',
  withDot = true,
  ...rest
}) {
  return (
    <Tag
      className={`${styles.eyebrow} ${className}`}
      data-tone={tone}
      {...rest}
    >
      {withDot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </Tag>
  );
}
