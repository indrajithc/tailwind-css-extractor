import postcss from "postcss";
// import tailwindcss from "tailwindcss";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const layoutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Layout</title>
</head>
<body class="bg-gray-100 text-gray-800">

  <header class="bg-blue-600 text-white p-4 flex items-center justify-between">
    <h1 class="text-xl font-bold">My Site</h1>
    <nav>
      <a href="#" class="px-3 py-2 hover:bg-blue-500 rounded">Home</a>
      <a href="#" class="px-3 py-2 hover:bg-blue-500 rounded">About</a>
    </nav>
  </header>

  <main class="max-w-4xl mx-auto mt-8">
    <section class="bg-white shadow-md p-6 rounded">
      <h2 class="text-2xl font-semibold mb-4">Welcome!</h2>
      <p class="text-gray-600">This is the main layout content.</p>
    </section>
  </main>

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

const twConfigGlobal = {
  content: [
    {
      raw: [layoutHtml, widgetOneHtml, widgetTwoHtml].join("\n"),
      extension: "html",
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

const resultGlobal = await postcss([
  tailwindcss(twConfigGlobal),
  autoprefixer(),
]).process(`@import "tailwindcss";`, {
  from: "src/",
});

console.log(resultGlobal);
