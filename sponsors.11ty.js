class SponsorList {
    data() {
        return {
            permalink: "sponsors.json",
            eleventyExcludeFromCollections: true,
        };
    }

    render(data) {
        // ================== NOSSO ESPIÃO ==================
        // Esta linha vai imprimir no log do Netlify todas as "coleções" de dados que o Eleventy encontrou.
        console.log("--- DEBUG: Coleções encontradas ---", Object.keys(data.collections));
        // ================================================

        const sponsorCollection = data.collections.sponsors || [];

        // ================== NOSSO ESPIÃO 2 ================
        // Esta linha vai nos dizer quantos itens ele encontrou dentro da coleção "sponsors".
        console.log(`--- DEBUG: Encontrados ${sponsorCollection.length} itens na coleção 'sponsors'.`);
        // ================================================

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