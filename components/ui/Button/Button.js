import styles from './Button.module.css';

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  tone,
  withArrow = false,
  block = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button');
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    block ? styles.block : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      className={cls}
      href={href}
      data-tone={tone}
      {...rest}
    >
      {children}
      {withArrow && <span className={styles.arrow} aria-hidden="true">→</span>}
    </Tag>
  );
}
