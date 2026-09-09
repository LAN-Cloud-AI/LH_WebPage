type IconProps = {
  className?: string;
};

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function PhoneIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M8.2 3.8c.4-.5 1.1-.6 1.6-.3l2.1 1.3c.5.3.7.9.5 1.5l-.8 2.3a1.2 1.2 0 0 1-.7.7 8.8 8.8 0 0 0 4.8 4.8c.3.1.6 0 .7-.3l2.3-.8c.6-.2 1.2 0 1.5.5l1.3 2.1c.3.5.2 1.2-.3 1.6l-1.5 1.2c-.5.4-1.2.6-1.8.4C11.4 18 6 12.6 4.8 6.1c-.2-.6 0-1.3.4-1.8Z" />
    </svg>
  );
}

export function MailIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2.2" />
      <path d="m4.2 7.2 7.1 5.2c.4.3 1 .3 1.4 0l7.1-5.2" />
    </svg>
  );
}
