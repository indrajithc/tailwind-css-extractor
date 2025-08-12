# Tailwind CSS Extraction Setup

This repository contains a **Node.js + PostCSS** setup for extracting Tailwind CSS styles into separate, optimized CSS files for different pages/components.  
It supports:

- **Full Tailwind CSS compilation** using `@tailwind base`, `@tailwind components`, `@tailwind utilities`
- **Automatic purging of unused styles**
- **Optional extraction of shared/common CSS into a global file**
- **Separate output files for per-page CSS**

---

## 📦 Installation

Make sure you have **Node.js LTS** installed, then:

```bash
npm init -y
npm install tailwindcss postcss autoprefixer @tailwindcss/postcss fs-extra
```

---

## 🛠 Project Structure

```
.
├── src/
│   ├── pages/
│   │   ├── home.html
│   │   ├── about.html
│   │   └── contact.html
│   └── extractCSS.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ⚙ Configuration

**`tailwind.config.js`**

```js
module.exports = {
  content: ["./src/**/*.html"], // Adjust paths to your HTML/JSX/TSX files
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**`postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 🚀 Usage

**Generate CSS for all pages:**

```bash
node src/extractCSS.js
```

This will:

1. Read the HTML content for each page
2. Extract only the Tailwind classes that are used
3. Generate a page-specific `.css` file in the `dist/css/` folder
4. Optionally create a `global.css` for shared/common styles

---

## 📂 Output Example

```
dist/
└── css/
    ├── global.css
    ├── home.css
    ├── about.css
    └── contact.css
```

---

## 🧹 Notes

- If you find **duplicate styles** across multiple CSS files, consider using the "common extraction" feature in `extractCSS.js` to move them into `global.css`.
- Always ensure your `tailwind.config.js` `content` paths cover all files where Tailwind classes might be used.

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/my-update`)
3. Commit your changes (`git commit -m "Add my update"`)
4. Push to the branch (`git push origin feature/my-update`)
5. Create a Pull Request

---

## 📜 License

MIT License
