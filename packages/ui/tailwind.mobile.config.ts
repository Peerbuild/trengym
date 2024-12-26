import { Config } from 'tailwindcss'
import mainConfig from './tailwind.config'

const radius = 10

const config: Config = {
  ...mainConfig,
  theme: {
    ...mainConfig.theme,
    fontSize: {
      xs: [
        '11px',
        {
          lineHeight: '17px',
          fontWeight: '510'
        }
      ],
      sm: [
        '14px',
        {
          lineHeight: '16px',
          fontWeight: '400'
        }
      ],
      md: [
        '15px',
        {
          lineHeight: '18px',
          fontWeight: '274'
        }
      ],
      base: ['16px', { lineHeight: '19px', fontWeight: '400' }],
      lg: ['18px', { lineHeight: '21px', fontWeight: '400' }],
      xl: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
      '2xl': ['30px', { lineHeight: '36px', fontWeight: '700' }]
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px'
    }
  },
  presets: [require('nativewind/preset')]
}

export default config
