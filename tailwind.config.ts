import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0e0f12",
        fg: "#ffffff",
        subtle: "#9aa0a6",
        accent: {
          DEFAULT: "#ff6a00", // Whik 오렌지
          blue: "#00d4ff"     // 보조 포인트
        },
        card: "#14161a",
        border: "#1f2227"
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
}

export default config


