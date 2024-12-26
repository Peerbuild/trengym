import { Config } from 'tailwindcss'
import mainConfig from './tailwind.config'

const config: Config = {
  ...mainConfig,
  theme: {
    fontSize: {
      xs: [
        '0.75rem',
        {
          lineHeight: '0.875rem'
        }
      ],
      sm: [
        '0.875rem',
        {
          lineHeight: '0.875rem',
          fontWeight: '500'
        }
      ],
      'md-semibold': [
        '0.875rem',
        {
          lineHeight: '1.25rem',
          fontWeight: '500'
        }
      ],
      md: [
        '0.875rem',
        {
          lineHeight: '1.25rem',
          fontWeight: '400'
        }
      ],
      base: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
      'base-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
      lg: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      xl: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
      '2xl': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
      '3xl': ['3rem', { lineHeight: '3rem', fontWeight: '800' }]
    }
  }
}

export default config
