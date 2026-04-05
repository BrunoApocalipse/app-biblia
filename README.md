📖 Bible App (React Native + Expo)

Aplicativo mobile de leitura bíblica desenvolvido com React Native (Expo), focado em performance, experiência do usuário e arquitetura escalável.

🚀 Objetivo

Construir um app completo de leitura bíblica com:

Navegação fluida entre livros, capítulos e versículos
Experiência de leitura moderna (UX nível YouVersion)
Sistema avançado de destaques com cores
Suporte a múltiplas versões simultâneas (tela dividida)
Base sólida para evolução (anotações, busca, temas)

🛠️ Tecnologias
React Native (Expo)
TypeScript
Expo Router (file-based routing)
React Navigation (Drawer)
AsyncStorage (persistência)
Context API

📂 Estrutura do Projeto (ATUALIZADA)

app-biblia/
│
├── app/
│   │
│   ├── (modals)/
│   │   ├── book-selector.tsx
│   │   └── version-selector.tsx
│   │
│   ├── (drawer)/
│   │   ├── _layout.tsx
│   │   │
│   │   ├── settings.tsx
│   │   ├── favorites.tsx
│   │   │
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       │
│   │       ├── chapters/
│   │       │   └── [book].tsx
│   │       │
│   │       ├── reading/
│   │       │   └── [book]/
│   │       │       └── [chapter].tsx
│   │       │
│   │       ├── verse/
│   │       │   └── [book]/
│   │       │       └── [chapter].tsx
│   │       │
│   │       └── favorites/
│   │           └── index.tsx
│   │
│   └── _layout.tsx
│
├── src/
│   │
│   ├── assets/
│   │   └── bibles/
│   │       ├── acf.json
│   │       ├── kjf.json
│   │       ├── nbv.json
│   │       └── nvi.json
│   │
│   ├── components/
│   │   ├── BookListItem.tsx
│   │   ├── ChapterHeader.tsx
│   │   ├── ReadingHeader.tsx
│   │   ├── VerseItem.tsx
│   │   ├── VerseBox.tsx
│   │   ├── VerseActionBar.tsx
│   │   ├── ColorPalette.tsx
│   │   └── LoadingIndicator.tsx
│   │
│   ├── context/
│   │   ├── SettingsContext.tsx
│   │   └── BibleReaderContext.tsx
│   │
│   ├── hooks/
│   │   ├── useBibleReader.ts
│   │   └── useLastReading.ts
│   │
│   ├── models/
│   │   ├── domain/
│   │   │   ├── Book.ts
│   │   │   ├── Chapter.ts
│   │   │   └── Verse.ts
│   │   │
│   │   └── dto/
│   │       ├── BookDTO.ts
│   │       ├── ChapterDTO.ts
│   │       └── VerseDTO.ts
│   │
│   ├── services/
│   │   ├── BibleService.ts
│   │   ├── HighlightService.ts
│   │   │
│   │   ├── mappers/
│   │   │   └── BibleMapper.ts
│   │   │
│   │   └── repositories/
│   │       └── BibleRepository.ts
│   │
│   └── storage/
│       └── LastReadingStorage.ts
│
├── tests/
│   ├── models/
│   │   ├── book.test.ts
│   │   ├── chapter.test.ts
│   │   └── verse.test.ts
│   │
│   ├── mapper.test.ts
│   ├── repository.test.ts
│   └── service.test.ts
│
├── package.json
├── tsconfig.json
├── babel.config.js
└── jest.config.js

✨ Funcionalidades
📚 Navegação Bíblica

Livros → Capítulos → Versículos
Rotas dinâmicas [book]/[chapter]
Swipe entre capítulos
Botões anterior / próximo

📖 Leitura (CORE)
Renderização otimizada dos versículos
Scroll automático para versículo selecionado
Header dinâmico
Histórico com router.replace

🎯 Destaques Avançados
Seleção múltipla de versículos
Paleta com 7 cores
Aplicação/remoção com toggle
Persistência com AsyncStorage
Overlay visual de seleção (efeito vidro)
Indicador de cor ativa (X)

⚡ Barra de Ações
Copiar
Compartilhar
Fechar seleção
Barra única (evita duplicação)

🧩 Tela Dividida (Feature Premium)
Duas versões simultâneas
Seleção da segunda versão via modal
Scroll sincronizado
Divider visual reforçado
Botão fechar inline
Integração com header

🧠 Header Profissional

☰ ← | Livro Capítulo ▼ | Versão ▼ | 🔉 𝙏 ⧉

Menu (drawer)
Livro / capítulo
Versão
Áudio (estrutura pronta)
Fonte (estrutura pronta)
Split screen

💾 Persistência
Última leitura salva automaticamente

Destaques persistidos
🧠 Arquitetura

Separação clara de responsabilidades:

Services → regras de negócio
Repositories → acesso a dados
Mappers → transformação de dados
Components → UI reutilizável
Context → estado global

Base preparada para escala real.

📊 Status Atual

✔ Fase 12 concluída
✔ App funcional (≈ 70–80%)
✔ UX avançada implementada
✔ Base sólida para produção

🔄 Próxima Fase (FASE 12.2 / 13)
🎯 Prioridade Imediata

Header / UX
 Controle real de fonte
 Dropdown completo (livro/capítulo)

Drawer Profissional
 📖 Última leitura (atalho)
 ⭐ Destaques
 ⚙️ Configurações
 👤 Header com identidade (avatar/app)

Tema
 Dark Mode
 Sistema de temas

🚀 Futuro
 Anotações por versículo
 Busca por palavra
 Filtros de destaque
 Compartilhamento avançado
 Performance e otimizações
 Build Android (produção)

▶️ Como rodar
git clone https://github.com/BrunoApocalipse/app-biblia.git

cd app-biblia

npm install

npx expo start
📌 Status do Projeto

🚧 Em desenvolvimento avançado
✔ Arquitetura profissional
✔ Pronto para evolução e deploy

👨‍💻 Autor

Bruno Apocalipse
📧 wwwbrruno@gmail.com

Projeto desenvolvido com foco em nível profissional, arquitetura escalável e preparação para mercado mobile.