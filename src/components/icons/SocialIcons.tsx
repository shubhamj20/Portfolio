type IconProps = {
  size?: number;
  className?: string;
};

export function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="5.5" width="20" height="13" rx="4" />
      <path d="M10 9.3 15 12l-5 2.7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 12a8 8 0 1 1-3.6-6.7" />
      <path d="M20 12a8 8 0 0 1-11.2 7.3L4 20l0.8-4.6" />
      <path d="M9.2 8.8c.2-.5.6-.4 1-.4.3 0 .5 0 .7.5.2.5.7 1.6.7 1.8.1.1.1.3 0 .5-.2.3-.3.4-.5.6-.2.2-.4.4-.2.8.3.4 1.2 1.9 2.6 2.6.5.3.8.2 1-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.6.8 1.9 1 .3.1.5.2.5.4 0 .2 0 1.1-.4 1.5-.4.4-1.5.9-2.1.9-.6 0-1.6-.2-3.3-1.4-2.2-1.5-3.6-4-3.7-4.2-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.9Z" />
    </svg>
  );
}
