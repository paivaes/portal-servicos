// ===================================================================
//  ÁREA DE CADASTRO: Adicione ou edite seus patrocinadores aqui!
// ===================================================================

const sponsors = [
    {
        name: "Empresa Incrível",
        logo: "img/logo-empresa-a.png", // Caminho para a imagem na pasta img/
        phone: "(11) 99999-8888",
        address: "Rua das Inovações, 123 - São Paulo, SP"
    },
    {
        name: "Soluções Criativas",
        logo: "img/logo-empresa-b.svg",
        phone: "(21) 5555-4444",
        address: "Avenida Central, 456 - Rio de Janeiro, RJ"
    },
    {
        name: "Parceiros Tech",
        logo: "img/logo-empresa-c.jpg",
        phone: "(31) 1234-5678",
        address: "Praça da Tecnologia, 789 - Belo Horizonte, MG"
    }
    // Para adicionar um novo patrocinador, copie o bloco acima,
    // cole aqui embaixo e altere as informações.
];


// ===================================================================
//  O CÓDIGO ABAIXO GERA A PÁGINA. NÃO PRECISA EDITAR AQUI.
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('sponsors-grid');

    sponsors.forEach(sponsor => {
        // Cria o elemento do card
        const card = document.createElement('div');
        card.className = 'sponsor-card';

        // Monta o HTML interno do card
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

        // Adiciona o card criado à grade na página
        grid.appendChild(card);
    });
});