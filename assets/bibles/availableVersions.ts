// src/data/bibles/availableVersions.ts
export type BibleVersion = {
  id: string;
  name: string;
  file: string;
};

export const availableVersions: BibleVersion[] = [
  { id: 'acf', name: 'Almeida Corrigida Fiel', file: 'acf.json' },
  { id: 'kjf', name: 'King James Fiel', file: 'kjf.json' },
  { id: 'nvi', name: 'Nova Versão Internacional', file: 'nvi.json' },
  { id: 'nbv', name: 'Nova Bíblia Viva', file: 'nbv.json' },
];
