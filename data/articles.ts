/**
 * Articles Data
 * Dados mockados dos artigos do blog
 */

export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const articles: Article[] = [
  {
    slug: 'guia-completo-css-grid',
    title: 'Guia Completo de CSS Grid: Do Básico ao Avançado',
    description:
      'Aprenda CSS Grid de forma prática com exemplos reais e casos de uso que você vai aplicar nos seus projetos.',
    category: 'CSS',
    date: '2026-02-15',
    readTime: '12 min',
    author: {
      name: 'Frontmakers Team',
      avatar: '👨‍💻',
    },
    content: `
# Guia Completo de CSS Grid: Do Básico ao Avançado

CSS Grid revolucionou a forma como criamos layouts na web. Neste guia completo, você vai aprender tudo sobre Grid Layout, desde os conceitos básicos até técnicas avançadas.

## O que é CSS Grid?

CSS Grid é um sistema de layout bidimensional que permite criar layouts complexos de forma mais simples e intuitiva. Diferente do Flexbox, que trabalha em uma única dimensão (linha ou coluna), o Grid trabalha em duas dimensões simultaneamente.

## Conceitos Básicos

### Grid Container

Para criar um grid, você primeiro precisa definir um container:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

Este código cria um grid com 3 colunas de tamanho igual e uma separação de 20px entre os itens.

### Grid Items

Os filhos diretos do container se tornam automaticamente grid items:

\`\`\`css
.item {
  background: #2563eb;
  padding: 20px;
  text-align: center;
}
\`\`\`

## Propriedades Essenciais

### grid-template-columns e grid-template-rows

Definem a estrutura das colunas e linhas:

\`\`\`css
.container {
  grid-template-columns: 200px 1fr 2fr;
  grid-template-rows: 100px auto 50px;
}
\`\`\`

### gap (grid-gap)

Define o espaçamento entre os itens:

\`\`\`css
.container {
  gap: 20px; /* espaçamento igual em linhas e colunas */
  /* ou */
  row-gap: 20px;
  column-gap: 10px;
}
\`\`\`

### grid-template-areas

Permite criar layouts nomeados de forma visual:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

## Técnicas Avançadas

### Auto-fit e Auto-fill

Crie grids responsivos sem media queries:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

Esta técnica cria colunas que se ajustam automaticamente ao tamanho disponível, com um mínimo de 250px.

### Grid Implícito vs Explícito

O grid explícito é definido por você, enquanto o implícito é criado automaticamente:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
\`\`\`

### Alinhamento

O Grid oferece controle total sobre alinhamento:

\`\`\`css
.container {
  justify-items: center; /* alinhamento horizontal dos itens */
  align-items: center;   /* alinhamento vertical dos itens */
  justify-content: space-between; /* alinhamento do grid no container */
  align-content: start;
}
\`\`\`

## Casos de Uso Práticos

### Layout de Cards Responsivo

\`\`\`css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### Dashboard Layout

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}
\`\`\`

### Gallery com Itens de Tamanhos Variados

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
}

.gallery-item:nth-child(3n) {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

## Browser Support

CSS Grid tem excelente suporte em navegadores modernos. Para projetos que precisam suportar IE11, considere usar Flexbox como fallback ou ferramentas como Autoprefixer.

## Conclusão

CSS Grid é uma ferramenta poderosa que simplifica a criação de layouts complexos. Com a prática, você vai perceber que muitos layouts que antes exigiam hacks e gambiarras agora são triviais com Grid.

**Próximos passos:**
- Pratique criando diferentes layouts
- Combine Grid com Flexbox para máximo controle
- Explore ferramentas como CSS Grid Generator

Experimente o **Box Shadow Generator** aqui no Frontmakers para estilizar seus grid items!
`,
  },
  {
    slug: 'typescript-tipos-avancados',
    title: 'TypeScript: Tipos Avançados que Você Deveria Conhecer',
    description:
      'Domine tipos utilitários, generics e técnicas avançadas de TypeScript para escrever código mais seguro e expressivo.',
    category: 'TypeScript',
    date: '2026-02-10',
    readTime: '15 min',
    author: {
      name: 'Frontmakers Team',
      avatar: '👨‍💻',
    },
    content: `
# TypeScript: Tipos Avançados que Você Deveria Conhecer

TypeScript não é apenas "JavaScript com tipos". Ele oferece um sistema de tipos extremamente poderoso que pode prevenir bugs e tornar seu código mais expressivo.

## Utility Types

### Partial<T>

Torna todas as propriedades opcionais:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }
\`\`\`

### Required<T>

O oposto de Partial, torna todas opcionais em obrigatórias:

\`\`\`typescript
interface Config {
  apiUrl?: string;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; }
\`\`\`

### Pick<T, K>

Seleciona apenas propriedades específicas:

\`\`\`typescript
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
\`\`\`

### Omit<T, K>

Remove propriedades específicas:

\`\`\`typescript
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; }
\`\`\`

## Generics Avançados

### Constraints

Limite os tipos que podem ser usados:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'João' };
const name = getProperty(user, 'name'); // ✓
const invalid = getProperty(user, 'age'); // ✗ Erro de compilação
\`\`\`

### Conditional Types

Tipos que dependem de condições:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

### Mapped Types

Transforme tipos de forma programática:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
\`\`\`

## Padrões Práticos

### Discriminated Unions

Útil para estados mutuamente exclusivos:

\`\`\`typescript
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: string };
type ErrorState = { status: 'error'; error: Error };

type State = LoadingState | SuccessState | ErrorState;

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      return 'Carregando...';
    case 'success':
      return state.data; // TypeScript sabe que data existe aqui
    case 'error':
      return state.error.message; // E que error existe aqui
  }
}
\`\`\`

### Template Literal Types

Tipos baseados em strings:

\`\`\`typescript
type Color = 'red' | 'blue' | 'green';
type Shade = 'light' | 'dark';

type ColorVariant = \`\${Shade}-\${Color}\`;
// 'light-red' | 'light-blue' | 'light-green' | 'dark-red' | ...
\`\`\`

### Recursive Types

Tipos que se referenciam:

\`\`\`typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const data: JSONValue = {
  name: 'João',
  age: 30,
  hobbies: ['coding', 'gaming'],
  address: {
    city: 'São Paulo',
    coordinates: [0, 0]
  }
};
\`\`\`

## Type Guards

### User-Defined Type Guards

\`\`\`typescript
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript sabe que é Cat
  } else {
    animal.bark(); // E aqui sabe que é Dog
  }
}
\`\`\`

## Infer Keyword

Extraia tipos de dentro de outros tipos:

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: 'João' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; }
\`\`\`

## Best Practices

1. **Prefira tipos sobre interfaces quando não precisar de extensão**
2. **Use \`unknown\` em vez de \`any\` quando não souber o tipo**
3. **Aproveite a inferência de tipos - não anote tudo**
4. **Use tipos utilitários em vez de recriar o mesmo tipo**
5. **Documente tipos complexos com comentários**

## Conclusão

O sistema de tipos do TypeScript é uma das ferramentas mais poderosas que você tem. Investir tempo aprendendo esses conceitos avançados vai resultar em código mais seguro, mais expressivo e mais fácil de manter.

**Continue aprendendo:** experimente criar seus próprios utility types e type guards para casos específicos do seu projeto!
`,
  },
  {
    slug: 'performance-web-core-vitals',
    title: 'Performance Web: Otimizando Core Web Vitals',
    description:
      'Guia prático para melhorar LCP, FID e CLS e oferecer uma experiência de usuário excepcional.',
    category: 'Performance',
    date: '2026-02-05',
    readTime: '10 min',
    author: {
      name: 'Frontmakers Team',
      avatar: '👨‍💻',
    },
    content: `
# Performance Web: Otimizando Core Web Vitals

Performance não é apenas sobre velocidade - é sobre experiência do usuário. Os Core Web Vitals são métricas essenciais que o Google usa para avaliar a qualidade da experiência em seu site.

## O que são Core Web Vitals?

São três métricas principais:

1. **LCP (Largest Contentful Paint)** - Carregamento
2. **FID (First Input Delay)** - Interatividade  
3. **CLS (Cumulative Layout Shift)** - Estabilidade visual

## LCP - Largest Contentful Paint

### O que é?

Mede quanto tempo leva para o maior elemento de conteúdo ficar visível. Deve ser menor que 2.5 segundos.

### Como otimizar:

**1. Otimize imagens:**

\`\`\`jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Carrega com prioridade
  quality={85}
/>
\`\`\`

**2. Use preload para recursos críticos:**

\`\`\`html
<link rel="preload" as="image" href="/hero.jpg" />
<link rel="preload" as="font" href="/font.woff2" crossorigin />
\`\`\`

**3. Otimize servidor e CDN:**

- Use cache agressivo
- Minimize TTFB (Time to First Byte)
- Use CDN para assets estáticos

**4. Remova recursos que bloqueiam renderização:**

\`\`\`jsx
// ❌ Ruim
<script src="analytics.js"></script>

// ✅ Bom
<script src="analytics.js" defer></script>
\`\`\`

## FID - First Input Delay

### O que é?

Mede o tempo entre a primeira interação do usuário e quando o navegador consegue responder. Deve ser menor que 100ms.

### Como otimizar:

**1. Reduza JavaScript:**

\`\`\`javascript
// Use code splitting
const Heavy = lazy(() => import('./Heavy'));

// Carregue apenas o necessário
import { specific } from 'library/specific';
\`\`\`

**2. Quebre tarefas longas:**

\`\`\`javascript
// ❌ Ruim - bloqueia a thread
function processLargeData(data) {
  data.forEach(item => heavyOperation(item));
}

// ✅ Bom - dá respiros para o navegador
async function processLargeData(data) {
  for (let i = 0; i < data.length; i++) {
    heavyOperation(data[i]);
    
    if (i % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}
\`\`\`

**3. Use Web Workers para processamento pesado:**

\`\`\`javascript
// worker.js
self.addEventListener('message', (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
});

// main.js
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.addEventListener('message', (e) => {
  console.log('Resultado:', e.data);
});
\`\`\`

## CLS - Cumulative Layout Shift

### O que é?

Mede mudanças inesperadas no layout. Deve ser menor que 0.1.

### Como otimizar:

**1. Defina tamanhos para imagens e vídeos:**

\`\`\`css
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
\`\`\`

**2. Reserve espaço para ads e embeds:**

\`\`\`jsx
function AdContainer() {
  return (
    <div style={{ minHeight: '250px' }}>
      <AdBanner />
    </div>
  );
}
\`\`\`

**3. Evite inserir conteúdo acima do conteúdo existente:**

\`\`\`javascript
// ❌ Ruim
const loadBanner = () => {
  const banner = document.createElement('div');
  document.body.prepend(banner);
};

// ✅ Bom
const loadBanner = () => {
  const container = document.getElementById('banner-container');
  container.innerHTML = bannerHTML;
};
\`\`\`

**4. Use transform para animações:**

\`\`\`css
/* ❌ Ruim - causa reflow */
.box {
  transition: width 0.3s;
}

/* ✅ Bom - usa compositing */
.box {
  transition: transform 0.3s;
}
.box:hover {
  transform: scale(1.1);
}
\`\`\`

## Ferramentas de Medição

### 1. Lighthouse

\`\`\`bash
npm install -g lighthouse
lighthouse https://seu-site.com --view
\`\`\`

### 2. Chrome DevTools

- Performance tab
- Core Web Vitals no Elements

### 3. Web Vitals Library

\`\`\`javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
\`\`\`

## Checklist Rápido

- [ ] Imagens otimizadas e com lazy loading
- [ ] Fontes com font-display: swap
- [ ] JavaScript code-splitted
- [ ] CSS crítico inline
- [ ] Preload de recursos importantes
- [ ] Tamanhos definidos para todos os elementos
- [ ] Sem layout shifts
- [ ] Server response time < 200ms
- [ ] Use Next.js Image para imagens

## Conclusão

Core Web Vitals não são apenas números - eles impactam diretamente a experiência do usuário e o ranking no Google. Investir em performance é investir no sucesso do seu produto.

**Dica:** Use nossas ferramentas aqui no Frontmakers para gerar CSS otimizado que não causa CLS!
`,
  },
  {
    slug: 'react-hooks-melhores-praticas',
    title: 'React Hooks: Melhores Práticas e Erros Comuns',
    description:
      'Aprenda a usar hooks corretamente, evite erros comuns e escreva componentes React mais limpos e eficientes.',
    category: 'React',
    date: '2026-01-28',
    readTime: '14 min',
    author: {
      name: 'Frontmakers Team',
      avatar: '👨‍💻',
    },
    content: `
# React Hooks: Melhores Práticas e Erros Comuns

Hooks revolucionaram o React, mas também trouxeram novos desafios. Neste artigo, vamos explorar as melhores práticas e os erros mais comuns ao usar hooks.

## useState: Além do Básico

### Estado Derivado

\`\`\`javascript
// ❌ Ruim - estado redundante
const [items, setItems] = useState([]);
const [count, setCount] = useState(0);

// Sempre que items muda, precisa atualizar count manualmente
setItems(newItems);
setCount(newItems.length);

// ✅ Bom - deriva o valor
const [items, setItems] = useState([]);
const count = items.length;
\`\`\`

### Inicialização Lazy

\`\`\`javascript
// ❌ Ruim - função executada em toda renderização
const [data] = useState(expensiveComputation());

// ✅ Bom - função executada apenas uma vez
const [data] = useState(() => expensiveComputation());
\`\`\`

### Atualizações com Base no Estado Anterior

\`\`\`javascript
// ❌ Ruim - pode ter valor desatualizado
const increment = () => setCount(count + 1);

// ✅ Bom - sempre usa valor atual
const increment = () => setCount(prev => prev + 1);
\`\`\`

## useEffect: O Hook Mais Mal Compreendido

### Dependências Corretas

\`\`\`javascript
// ❌ Ruim - array vazio quando usa props/state
useEffect(() => {
  fetchData(userId); // userId do props
}, []); // Bug: não atualiza quando userId muda

// ✅ Bom - lista todas as dependências
useEffect(() => {
  fetchData(userId);
}, [userId]);
\`\`\`

### Cleanup

\`\`\`javascript
// ❌ Ruim - sem cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
}, []);

// ✅ Bom - cleanup previne memory leaks
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
\`\`\`

### Requests Assíncronos

\`\`\`javascript
// ❌ Ruim - race condition
useEffect(() => {
  fetchData(id).then(data => setData(data));
}, [id]);

// ✅ Bom - cancela requests desatualizados
useEffect(() => {
  let cancelled = false;
  
  fetchData(id).then(data => {
    if (!cancelled) setData(data);
  });
  
  return () => { cancelled = true; };
}, [id]);

// ✅ Melhor ainda - com AbortController
useEffect(() => {
  const controller = new AbortController();
  
  fetch(\`/api/data/\${id}\`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    });
  
  return () => controller.abort();
}, [id]);
\`\`\`

## useCallback e useMemo

### Quando Usar?

\`\`\`javascript
// ❌ Uso desnecessário
const fullName = useMemo(() => {
  return \`\${firstName} \${lastName}\`;
}, [firstName, lastName]);

// ✅ Use apenas para cálculos pesados
const sortedData = useMemo(() => {
  return [...data].sort(complexSort);
}, [data]);

// ✅ Use quando passar função para child com React.memo
const MemoizedChild = React.memo(Child);

function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return <MemoizedChild onClick={handleClick} />;
}
\`\`\`

## Custom Hooks

### Boas Práticas

\`\`\`javascript
// ✅ Custom hook reutilizável
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
}

// Uso:
function Component() {
  const { data, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`

## useReducer: Quando Usar?

\`\`\`javascript
// ✅ Perfeito para lógica de estado complexa
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, ...action.errors } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };
  
  return (/* form */);
}
\`\`\`

## useRef: Mais do que Refs

### Valores Mutáveis

\`\`\`javascript
// ✅ Armazenar valores sem causar re-render
function Timer() {
  const intervalRef = useRef(null);
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
  };
  
  useEffect(() => stop, []); // cleanup
  
  return (/* UI */);
}
\`\`\`

### Previous Value

\`\`\`javascript
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Uso:
function Component({ count }) {
  const prevCount = usePrevious(count);
  
  return <div>Agora: {count}, Antes: {prevCount}</div>;
}
\`\`\`

## Erros Comuns

### 1. Mutação de Estado

\`\`\`javascript
// ❌ Ruim
const addItem = (item) => {
  items.push(item);
  setItems(items);
};

// ✅ Bom
const addItem = (item) => {
  setItems([...items, item]);
};
\`\`\`

### 2. Dependências Incorretas

\`\`\`javascript
// ❌ Ruim - omite dependências
useEffect(() => {
  fetchData(url, options);
}, [url]); // falta options

// ✅ Bom
useEffect(() => {
  fetchData(url, options);
}, [url, options]);
\`\`\`

### 3. Hooks Condicionais

\`\`\`javascript
// ❌ NUNCA faça isso
if (condition) {
  useEffect(() => {/* ... */});
}

// ✅ Condicional dentro do hook
useEffect(() => {
  if (condition) {
    // lógica
  }
}, [condition]);
\`\`\`

## Conclusão

Hooks são poderosos, mas requerem compreensão profunda. Siga estas práticas e evite os erros comuns para criar componentes React robustos e eficientes.

**Dica:** Pratique criando seus próprios custom hooks - é a melhor forma de dominar o conceito!
`,
  },
];

/**
 * Busca um artigo pelo slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Retorna todos os artigos ordenados por data (mais recente primeiro)
 */
export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Retorna artigos relacionados (mesma categoria, excluindo o atual)
 */
export function getRelatedArticles(
  currentSlug: string,
  limit = 3
): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  return articles
    .filter(
      (article) =>
        article.slug !== currentSlug && article.category === current.category
    )
    .slice(0, limit);
}
