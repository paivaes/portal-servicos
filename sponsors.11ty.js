// Arquivo de template para gerar o sponsors.json
class SponsorList {
    data() {
        return {
            permalink: "sponsors.json",
            eleventyExcludeFromCollections: true,
        };
    }

    render(data) {
        // 'data.collections.sponsors' é a lista de patrocinadores.
        // A correção está aqui: Adicionamos "|| []"
        // Se 'data.collections.sponsors' não existir (for undefined),
        // ele usará uma lista vazia '[]' no lugar, evitando o erro.
        const sponsorCollection = data.collections.sponsors || [];

        const sponsors = sponsorCollection.map(sponsor => {
            return {
                name: sponsor.data.name,
                logo: sponsor.data.logo,
                phone: sponsor.data.phone,
                address: sponsor.data.address
            };
        });

        return JSON.stringify(sponsors, null, 2);
    }
}

module.exports = SponsorList;