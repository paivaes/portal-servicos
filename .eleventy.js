module.exports = function(eleventyConfig) {
  // A LINHA MAIS IMPORTANTE: Cria manualmente a coleção "sponsors".
  // Eleventy vai procurar todos os arquivos .md dentro da pasta _sponsors
  // e agrupá-los em uma lista chamada "sponsors".
  eleventyConfig.addCollection("sponsors", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_sponsors/**/*.md");
  });

  // Copia as pastas e arquivos que o Eleventy não precisa processar.
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // Define as opções de diretório e os "motores" de template.
  return {
    dir: {
      input: ".",
      output: "_site"
    },
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};