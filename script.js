// Função para buscar os dados dos patrocinadores e construir a página
async function loadSponsors() {
    try {
        const response = await fetch('/sponsors.json');
        if (!response.ok) {
            throw new Error('Não foi possível carregar os dados dos parceiros.');
        }
        const sponsors = await response.json();
        
        // ===== LINHA ADICIONADA PARA ORDENAR A LISTA =====
        sponsors.sort((a, b) => a.order - b.order);
        // ===============================================
        
        const grid = document.getElementById('sponsors-grid');
        if (!grid) return;

        grid.innerHTML = ''; 

        sponsors.forEach(sponsor => {
            const card = document.createElement('div');
            card.className = 'sponsor-card';

            card.innerHTML = `
                <div class="sponsor-logo-container">
                    <img src="${sponsor.logo}" alt="Logo de ${sponsor.name}" class="sponsor-logo">
                </div>
                <div class="sponsor-info">
                    <h2>${sponsor.name}</h2>
                    <p>📞 ${sponsor.phone}</p>
                    <p>📍 ${sponsor.address}</p>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        const grid = document.getElementById('sponsors-grid');
        grid.innerHTML = `<p>Ocorreu um erro ao carregar os parceiros. Tente novamente mais tarde.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadSponsors);