const GettingStarted = () => {
    return (
        <div className='content'>
            <h1>Getting Started</h1>
            <p>
                Este guia ajudará você a configurar e executar o <strong>PC Overview</strong> pela primeira vez. 
                A aplicação foi projetada para ser portátil e eficiente, fornecendo dados de hardware em tempo real.
            </p>

            <h1>Installation</h1>
            <p>
                A aplicação é distribuída como um arquivo executável (<code>.exe</code>) gerado via PKG. 
                Siga os passos abaixo:
            </p>
            <ul>
                <li>Baixe a versão mais recente do executável.</li>
                <li>Coloque o arquivo em uma pasta de sua preferência.</li>
                <li>Certifique-se de que a porta <strong>3067</strong> está livre no seu firewall.</li>
            </ul>

            <h1>Running the Application</h1>
            <p>
                Ao executar o arquivo, o servidor Node.js será iniciado e você verá uma janela de terminal com as seguintes informações:
            </p>
            <ul>
                <li><strong>Server Status:</strong> Uma mensagem confirmando que o servidor está rodando em <code>http://localhost:3067</code>.</li>
                <li><strong>System Access:</strong> O servidor começará a acessar os componentes do sistema imediatamente.</li>
                <li><strong>Warning:</strong> É fundamental <strong>não fechar a janela do terminal</strong>, pois ela é o motor que fornece os dados para a interface web.</li>
            </ul>

            <h1>First Access</h1>
            <p>
                Com o servidor rodando, abra seu navegador e acesse <code>http://localhost:3067</code>. 
                A aplicação React carregará os detalhes do sistema através da API interna. 
                Se for a primeira execução, o sistema pode levar alguns segundos para coletar todos os dados iniciais do hardware.
            </p>

            <h1>Troubleshooting</h1>
            <p>
                Caso encontre uma tela de erro durante a inicialização:
            </p>
            <ul>
                <li>Verifique se o servidor (janela do terminal) ainda está aberto.</li>
                <li>Certifique-se de que você tem permissões de administrador, necessárias para que o <code>systeminformation</code> acesse sensores de temperatura e GPU.</li>
                <li>Recarregue a página caso a rede local tenha oscilado.</li>
            </ul>
        </div>
    );
}

export default GettingStarted;