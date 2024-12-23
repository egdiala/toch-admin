import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			accent: {
  				'1': '#E3FFCC',
  				'2': '#0A363C',
  				base: '#CEEBB6',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			green: {
  				'0': '#03181A',
  				'2': '#5F7173',
  				'3': '#CED7D8',
  				'4': '#F3F5F5',
  				'5': '#234E54',
  				brand: '#0A363C'
  			},
  			grey: {
  				dark: {
  					'1': '#2E3A45',
  					'2': '#767D85',
  					'3': '#D5D8DA',
  					'4': '#F6F8F9'
  				}
  			},
  			orange: {
  				'0': '#332108',
  				'2': '#FFD392',
  				'3': '#FFEDD4',
  				'4': '#FFFBF4',
  				brand: '#FFB240'
  			},
  			'portal-bg': '#F8F9FA',
  			sand: {
  				'0': '#323130',
  				'2': '#FCFAF9',
  				'3': '#FEFDFC',
  				'4': '#FFFEFE',
  				brand: '#F9F5F2'
  			},
  			semantic: {
  				amber: '#DF9900',
  				error: '#DD2418',
  				success: '#02885B'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			"caret-blink": {
			"0%,70%,100%": { opacity: "1" },
			"20%,50%": { opacity: "0" },
			},
		},
		animation: {
			"caret-blink": "caret-blink 1.25s ease-out infinite",
		}
  	}
  },
  plugins: [tailwindAnimate],
}

