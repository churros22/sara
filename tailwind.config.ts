import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				sara: {
					pink: '#FFC0CB',
					blue: '#AEC6CF',
					yellow: '#FDFD96',
					green: '#B5EAD7',
					purple: '#C3B1E1',
					glass: 'rgba(255, 255, 255, 0.15)',
					pastel1: '#F2FCE2',
					pastel2: '#FEF7CD',
					pastel3: '#FEC6A1',
					pastel4: '#E5DEFF',
					pastel5: '#FFDEE2',
					pastel6: '#FDE1D3',
					pixel1: '#1E3A8A',
					pixel2: '#2563EB',
					pixel3: '#3B82F6',
					pixel4: '#60A5FA',
					pixel5: '#93C5FD',
					pixel6: '#172554',
					pixelBg: '#0F172A'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'sans-serif'],
				caveat: ['Caveat', 'cursive'],
				vt323: ['VT323', 'monospace'],
				press: ['"Press Start 2P"', 'cursive'],
				silkscreen: ['Silkscreen', 'monospace'],
				pixelated: ['Pixelated', 'monospace'],
                arcade: ['ArcadeClassic', 'monospace']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'pixel-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'rainbow': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' }
				},
				'pixel-float': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-6px) scale(1.01)' }
				},
				'pixel-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'scanline': {
					'0%': { transform: 'translateY(0%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'pixel-glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-1px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(1px)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.2s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'scale-out': 'scale-out 0.4s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'slide-out': 'slide-out 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'pixel-bounce': 'pixel-bounce 0.6s ease-in-out infinite',
				'rainbow': 'rainbow 5s linear infinite',
				'pixel-float': 'pixel-float 3s ease-in-out infinite',
				'pixel-pulse': 'pixel-pulse 2s ease-in-out infinite',
				'scanline': 'scanline 8s linear infinite',
				'pixel-glitch': 'pixel-glitch 0.3s ease-in-out infinite'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
