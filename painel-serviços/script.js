// Função para buscar os dados dos patrocinadores e construir a página
async function loadSponsors() {
    // O Netlify CMS cria uma API a partir dos seus arquivos
    // Vamos usar um plugin para facilitar a leitura.
    // Por agora, vamos simular a leitura de um arquivo JSON.
    // O Netlify pode ser configurado para gerar este arquivo.

    try {
        // Iremos buscar os dados de um arquivo JSON gerado pelo Netlify
        const response = await fetch('/sponsors.json'); // Arquivo que conterá os dados
        if (!response.ok) {
            throw new Error('Não foi possível carregar os dados dos patrocinadores.');
        }
        const sponsors = await response.json();

        const grid = document.getElementById('sponsors-grid');
        if (!grid) return; // Se a grade não existir, pare

        // Limpa a grade antes de adicionar novos itens
        grid.innerHTML = ''; 

        sponsors.forEach(sponsor => {
            const card = document.createElement('div');
            card.className = 'sponsor-card';

            card.innerHTML = `
                <div class="sponsor-logo-container">
                    <img src="${sponsor.logo}" alt="Logo da ${sponsor.name}" class="sponsor-logo">
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
        grid.innerHTML = `<p>Ocorreu um erro ao carregar os patrocinadores. Tente novamente mais tarde.</p>`;
    }
}

// Chama a função quando o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', loadSponsors);