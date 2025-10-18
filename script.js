// Aguarda o conteúdo da página carregar para iniciar o script
document.addEventListener('DOMContentLoaded', initializeApp);

// Variável global para guardar todos os parceiros e evitar múltiplas buscas
let allSponsors = [];

// Função principal que inicia tudo
async function initializeApp() {
    try {
        const response = await fetch('/sponsors.json');
        if (!response.ok) {
            throw new Error('Não foi possível carregar os dados dos parceiros.');
        }
        allSponsors = await response.json();
        
        // Ordena a lista principal em ordem alfabética
        allSponsors.sort((a, b) => a.name.localeCompare(b.name));

        createCategoryMenu();
        renderSponsors('Todos'); // Mostra todos os parceiros inicialmente

    } catch (error) {
        console.error(error);
        const mainContainer = document.getElementById('categories-container');
        if (mainContainer) {
            mainContainer.innerHTML = `<p style="text-align:center; color: #333;">Ocorreu um erro ao carregar os parceiros.</p>`;
        }
    }
}

// Função para criar o menu de categorias dinamicamente
function createCategoryMenu() {
    const menuContainer = document.getElementById('category-menu-container');
    if (!menuContainer) return;

    // Pega todas as categorias únicas da lista de parceiros e adiciona "Todos" no início
    const categories = ['Todos', ...new Set(allSponsors.map(sponsor => sponsor.category).filter(Boolean))];

    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-filter';
        button.textContent = category;
        button.dataset.category = category; // Guarda a categoria no botão

        // Adiciona um evento de clique para cada botão
        button.addEventListener('click', () => {
            renderSponsors(category);
        });

        menuContainer.appendChild(button);
    });
}

// Função para renderizar os parceiros na tela com base na categoria selecionada
function renderSponsors(selectedCategory) {
    const mainContainer = document.getElementById('categories-container');
    if (!mainContainer) return;

    mainContainer.innerHTML = ''; // Limpa o container antes de renderizar

    // Filtra a lista de parceiros com base na categoria
    const sponsorsToRender = selectedCategory === 'Todos'
        ? allSponsors
        : allSponsors.filter(sponsor => sponsor.category === selectedCategory);

    if (sponsorsToRender.length === 0) {
        mainContainer.innerHTML = `<p style="text-align:center; color: #333;">Nenhum parceiro encontrado nesta categoria.</p>`;
        return;
    }
    
    // Agrupa os parceiros filtrados por categoria para exibição
    const groupedByCategory = sponsorsToRender.reduce((acc, sponsor) => {
        const category = sponsor.category || "Sem Categoria";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(sponsor);
        return acc;
    }, {});

    // Cria as seções para cada categoria
    for (const category in groupedByCategory) {
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        mainContainer.appendChild(categoryTitle);

        const grid = document.createElement('div');
        grid.className = 'sponsors-container';

        groupedByCategory[category].forEach(sponsor => {
            const card = document.createElement('div');
            card.className = 'sponsor-card';
            const cleanPhone = sponsor.phone ? sponsor.phone.replace(/[^0-9+]/g, '') : '';

            card.innerHTML = `
                <div class="sponsor-logo-container">
                    <img src="${sponsor.logo}" alt="Logo de ${sponsor.name}" class="sponsor-logo">
                </div>
                <div class="sponsor-info">
                    <h2>${sponsor.name}</h2>
                    <p>📞 <a href="tel:${cleanPhone}">${sponsor.phone || ''}</a></p>
                    <p>📍 ${sponsor.address || ''}</p>
                </div>
            `;
            grid.appendChild(card);
        });
        mainContainer.appendChild(grid);
    }

    // Atualiza o estilo do botão ativo no menu
    document.querySelectorAll('.category-filter').forEach(btn => {
        if (btn.dataset.category === selectedCategory) {
            btn.classList.add('active-filter');
        } else {
            btn.classList.remove('active-filter');
        }
    });
}
