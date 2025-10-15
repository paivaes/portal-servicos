module.exports = function(eleventyConfig) {
  // Esta função diz ao Eleventy para copiar arquivos e pastas
  // diretamente para a pasta de saída (_site), sem tentar processá-los.

  // 1. Copia a pasta de imagens.
  eleventyConfig.addPassthroughCopy("img");

  // 2. Copia a pasta do painel de administração.
  eleventyConfig.addPassthroughCopy("admin");

  // 3. Copia o arquivo de estilo CSS.
  eleventyConfig.addPassthroughCopy("style.css");

  // 4. Copia o arquivo de script principal.
  eleventyConfig.addPassthroughCopy("script.js");

  // Eleventy irá processar o index.html principal por padrão
  // e o sponsors.11ty.js para criar o sponsors.json.

  return {
    // Diretório de entrada (onde seus arquivos estão)
    input: ".",
    // Diretório de saída (onde o site pronto será colocado)
    output: "_site",
  };
};