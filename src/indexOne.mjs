import postcss from "postcss";
// import tailwindcss from "@tailwindcss/postcss";
import tailwindcss from "tailwindcss"; // ✅ for Tailwind v3.x

import autoprefixer from "autoprefixer";
import fs from "fs";

const layoutHtml = `<!DOCTYPE html>
 <html dir="ltr" lang="en">
      <head>
        <meta charSet="utf-8" />
        <base href="http://localhost:3000/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <title>Teleflora | Order Flower Delivery Online | Flowers Near Me</title>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Teleflora" />
        <meta
          property="og:description"
          content="Teleflora makes it easy to order flowers online and get same day flower delivery right to your loved one's door, no matter what the occasion is."
        />
        <meta property="og:url" content="https://teleflora.com/" />
        <meta property="og:site_name" content="Teleflora" />
        <meta
          name="description"
          content="Teleflora makes it easy to order flowers online and get same day flower delivery right to your loved one's door, no matter what the occasion is."
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#E7F3E3" />
        <meta name="application-name" content="Teleflora" />
        <meta name="apple-mobile-web-app-title" content="Teleflora" />
        <link rel="icon" sizes="144x144" href="/images/favicon/mstile-144x144.png" />
        <link rel="shortcut icon" type="image/x-icon" media="all" href="/images/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon.ico" />
        <meta name="next-head-count" content="23" />
      </head>

      <body>
        <header className="w-full h-[60px] max-lg:shadow-md bg-white">
          <div className="container h-full">
            <nav className="flex items-center lg:items-end w-full max-w-[940px] h-full mx-auto lg:pb-3">
              <div className="flex items-center">
                <a className="lg:hidden me-4" href="/">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="currentColor"
                      d="M0 88C0 74.7 10.7 64 24 64l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 112C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 272c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24L24 432c-13.3 0-24-10.7-24-24s10.7-24 24-24l400 0c13.3 0 24 10.7 24 24z"
                    ></path>
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </header>
      </body>
    </html>
`;

const widgetOneHtml = `<div class="bg-white border border-gray-300 rounded-lg shadow p-4 max-w-sm">
  <h3 class="text-lg font-semibold mb-2">Widget 1</h3>
  <p class="text-gray-700 mb-4">This is a simple widget.</p>
  <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
    Click Me
  </button>
</div>`;

const widgetTwoHtml = `<div class="flex items-center space-x-4 bg-yellow-100 p-4 rounded-lg shadow">
  <img src="https://via.placeholder.com/40" class="w-10 h-10 rounded-full" alt="Profile">
  <div>
    <p class="text-sm font-medium text-gray-900">Jane Doe</p>
    <p class="text-sm text-gray-500">Web Developer</p>
  </div>
</div>
`;

const seenRules = new Set();
// Custom deduplication plugin
const deduplicateCSS = () => {
  console.log("Deduplication plugin initialized =================");
  return {
    postcssPlugin: "postcss-deduplicate",
    OnceExit(root) {
      root.walkRules((rule) => {
        const ruleStr = rule.toString();
        if (seenRules.has(ruleStr)) {
          rule.remove();
        } else {
          seenRules.add(ruleStr);
        }
      });
    },
  };
};
deduplicateCSS.postcss = true;

// Function to build CSS from given HTML content
async function buildCss(htmlContent, outFile) {
  const twConfig = {
    content: [
      {
        raw: htmlContent,
        extension: "html",
      },
    ],
    theme: {
      colors: {
        white: "#fff",
        black: "#000",
        primary: {
          DEFAULT: "#fa3c7a",
          dark: "#c82e61",
        },
        secondary: "#000",
        tertiary: "#1799b0",
        red: {
          DEFAULT: "#D92832",
          light: "#F3C1C3",
        },
        green: {
          light: "#E7F3E3",
          dark: "#A1B999",
          darker: "#2C322B",
        },
        orange: {
          light: "#FFE7D2",
        },
        blue: {
          DEFAULT: "#4285F4",
          light: "#C8EAF4",
        },
        cyan: {
          DEFAULT: "#007AA0",
        },
        yellow: {
          light: "#FFFAC2",
        },
        orange: {
          light: "#FFE7D2",
        },
        pink: {
          DEFAULT: "#EC008C",
          light: "#FFE9F6",
        },
        gray: {
          DEFAULT: "#fafafa",
          100: "#f5f5f5",
          200: "#efefef",
          300: "#dedede",
          400: "#cccccc",
          500: "#8e8e8e",
          600: "#666666",
          700: "#787878",
          800: "#3a3a3a",
          900: "#242424",
        },
      },

      fontFamily: {
        primary: ['"Bembo"', "serif"],
        secondary: ['"Avenir"', "sans-serif"],
        "secondary-italic": ['"AvenirBI"', "sans-serif"],
      },

      fontSize: {
        xs: "0.625rem", //10px
        sm: "0.75rem", //12px
        base: "0.813rem", //14px
        md: "1rem", //16px
        lg: "1.125rem", //18px
        xl: "1.25rem", //20px
        h1: "3rem", //48px
        h2: "2rem", //32px
        h3: "1.75rem", //28px
        h4: "1.5rem", //24px
        h5: "1.375rem", //22px
        h6: "0.875rem", //14px
      },

      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1rem",
          lg: "1rem",
          xl: "1.5rem",
        },

        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
          xxl: "1200px",
        },
      },

      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
      },

      borderRadius: {
        none: "0",
        sm: ".188rem",
        DEFAULT: ".25rem",
        lg: ".5rem",
        full: "9999px",
      },
    },

    plugins: [],
  };

  const result = await postcss([
    tailwindcss(twConfig),
    autoprefixer(),

    deduplicateCSS(),
  ]).process(
    `
    
    @tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@layer base {
  body {
     
  }
}

@layer utilities {
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
}`,

    { from: "./src" }
  );

  // console.log(result.css);

  fs.writeFileSync(outFile, result.css, "utf8");
  console.log(`✅ Generated ${outFile}`);
}

// Build global CSS
await buildCss(layoutHtml, "dist/global.css");

// // Build widget-specific CSS
// await buildCss(widgetOneHtml, "dist/widget1.css");
// await buildCss(widgetTwoHtml, "dist/widget2.css");
