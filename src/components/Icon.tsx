import type { SVGProps } from 'react'

// Stroke icons on Lucide's 24px grid.
const paths = {
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="1" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
}

export type IconName = keyof typeof paths

export default function Icon({ name, size = 18, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={true}
      focusable={false}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
