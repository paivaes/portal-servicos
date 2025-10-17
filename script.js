// Função para buscar os dados dos patrocinadores e construir a página
async function loadSponsors() {
    try {
        const response = await fetch('/sponsors.json');
        if (!response.ok) {
            throw new Error('Não foi possível carregar os dados dos parceiros.');
        }
        const sponsors = await response.json();

        // 1. Ordena todos os parceiros pela ordem definida
        sponsors.sort((a, b) => (a.order || 100) - (b.order || 100));

        // 2. Agrupa os parceiros por categoria
        const groupedByCategory = sponsors.reduce((acc, sponsor) => {
            const category = sponsor.category || "Sem Categoria";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(sponsor);
            return acc;
        }, {});

        const mainContainer = document.getElementById('categories-container');
        if (!mainContainer) return;

        mainContainer.innerHTML = ''; // Limpa o container

        // 3. Cria as seções para cada categoria
        for (const category in groupedByCategory) {
            // Cria o título da categoria
            const categoryTitle = document.createElement('h2');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            mainContainer.appendChild(categoryTitle);

            // Cria a grade para os parceiros desta categoria
            const grid = document.createElement('div');
            grid.className = 'sponsors-container';

            groupedByCategory[category].forEach(sponsor => {
                const card = document.createElement('div');
                card.className = 'sponsor-card';
                card.innerHTML = `
                    <div class="sponsor-logo-container">
                        <img src="${sponsor.logo}" alt="Logo de ${sponsor.name}" class="sponsor-logo">
                    </div>
                    <div class="sponsor-info">
                        <h2>${sponsor.name}</h2>
                        <p>📞 ${sponsor.phone || ''}</p>
                        <p>📍 ${sponsor.address || ''}</p>
                    </div>
                `;
                grid.appendChild(card);
            });

            mainContainer.appendChild(grid);
        }

    } catch (error) {
        console.error(error);
        const mainContainer = document.getElementById('categories-container');
        mainContainer.innerHTML = `<p>Ocorreu um erro ao carregar os parceiros.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadSponsors);
