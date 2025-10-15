// Arquivo de template para gerar o sponsors.json
class SponsorList {
    data() {
        return {
            // Este é o nome do arquivo que será gerado: /sponsors.json
            permalink: "sponsors.json",
            // Diz ao Eleventy para não usar um layout. Queremos o JSON puro.
            eleventyExcludeFromCollections: true,
        };
    }

    // A função render é que gera o conteúdo do arquivo
    render(data) {
        // 'data.collections.sponsors' é uma coleção automática que o Eleventy cria
        // a partir da pasta '_sponsors' que o Netlify CMS utiliza.
        const sponsors = data.collections.sponsors.map(sponsor => {
            return {
                name: sponsor.data.name,
                logo: sponsor.data.logo,
                phone: sponsor.data.phone,
                address: sponsor.data.address
            };
        });

        // Converte a lista de patrocinadores para o formato JSON
        return JSON.stringify(sponsors, null, 2);
    }
}

module.exports = SponsorList;