module.exports = function(eleventyConfig) {
  // Copia as pastas e arquivos que o Eleventy não precisa processar.
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // Esta é a configuração chave:
  // Define as opções de diretório e os "motores" de template.
  return {
    dir: {
      input: ".",      // Onde estão os arquivos de origem (raiz do projeto)
      output: "_site"  // Onde o site final será salvo
    },
    // Garante que arquivos .html sejam processados como templates.
    htmlTemplateEngine: "liquid",
    // Garante que arquivos .md (dos parceiros) sejam processados também.
    markdownTemplateEngine: "liquid"
  };
};