/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				"custom-red": "#FF5154",
				"custom-grey": "#EBECEF",
				"custom-text-color": "#363635",
				"custom-white": "#FFFFFC",
				"custom-theme": "#282a36",
			},
		},
	},
	plugins: [require("daisyui")],
	// daisyui: {
	// 	themes: [ "dracula"],
	// },
	daisyui: {
		themes: [
		  {
			light: {
			  ...require("daisyui/src/theming/themes")["dracula"],
			  primary: "#ad3297",
			  secondary: "#00204B",
			"base-200": "#00204B",
			// "primary": "#793ef9",
            // "primary-focus": "#570df8",
            // "primary-content": "#ffffff",
            // "secondary": "#f000b8",
            // "secondary-focus": "#bd0091",
            // "secondary-content": "#ffffff",
            // "accent": "#37cdbe",
            // "accent-focus": "#2aa79b",
            // "accent-content": "#ffffff",
            // "neutral": "#2a2e37",
            // "neutral-focus": "#16181d",
            // "neutral-content": "#ffffff",
            "base-100": "#00204B",
            "base-300": "#00c4cc"
            // "base-300": "#16181d",
            // "base-content": "#ebecf0",
            // "info": "#66c6ff",
            // "success": "#87d039",
            // "warning": "#e2d562",
            // "error": "#ff6f6f"
			},
		  },
		],
	  },
	// daisyui: {
    //     themes: [
    //       {'dark': {
    //         "primary": "#793ef9",
    //         "primary-focus": "#570df8",
    //         "primary-content": "#ffffff",
    //         "secondary": "#f000b8",
    //         "secondary-focus": "#bd0091",
    //         "secondary-content": "#ffffff",
    //         "accent": "#37cdbe",
    //         "accent-focus": "#2aa79b",
    //         "accent-content": "#ffffff",
    //         "neutral": "#2a2e37",
    //         "neutral-focus": "#16181d",
    //         "neutral-content": "#ffffff",
    //         "base-200": "#2a2e37",
    //         "base-300": "#16181d",
    //         "base-content": "#ebecf0",
    //         "info": "#66c6ff",
    //         "success": "#87d039",
    //         "warning": "#e2d562",
    //         "error": "#ff6f6f"
    //       }},
    //       'light',
    //     ]
    // }
};
