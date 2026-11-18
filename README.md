# O Omnitorrinco — versão atualizada

## Arquivos
- `index.html`: página principal.
- `style.css`: estilos e responsividade.
- `java.js`: interações do menu, cards, formulário e cookies.
- `chatbot.js`: chatbot.
- `minha-base-de-dados.json`: base de conhecimento do chatbot.
- `documentacao.html`: DER e dicionário de dados apresentados no site.
- `database.sql`: modelo relacional proposto.
- `guia-instalacao.txt`: arquivo disponibilizado para download.
- `docs/`: roteiro, wireframe textual e evidências pendentes.

## Como executar
Abra `index.html` no navegador ou publique a pasta em um serviço de hospedagem estática. Mantenha todos os arquivos na mesma estrutura de pastas.

## Atenção aos recursos
- Copie sua pasta `img/` original para esta pasta, mantendo `img/logo.png`.
- Se possuir o favicon original, copie `logo.png` para a raiz.
- O chatbot carrega `minha-base-de-dados.json` por `fetch`; para testar localmente, prefira abrir o projeto por um servidor local (por exemplo, Live Server no VS Code), não diretamente pelo protocolo `file://`.
- O formulário é apenas demonstrativo e não transmite dados.
- O SQL e o DER documentam uma proposta futura; não existe conexão com banco nesta versão.
- O item de vídeo permanece pendente até que seja fornecido um vídeo apropriado e autorizado.

## Antes de publicar
1. Copie os arquivos de logo e demais imagens locais.
2. Teste menu, cards, galeria, chatbot, download e formulário.
3. Teste em celular e desktop.
4. Valide HTML e CSS nos validadores W3C.
5. Confirme que a implantação pública abre sem autenticação.
