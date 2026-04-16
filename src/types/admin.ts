export type CountryCode = "BR" | "PT" | "US";

export type LocaleCode = "pt-BR" | "pt-PT" | "en-US";

export type UserRole =
  | "Super Admin"
  | "Admin"
  | "Editor de Conteúdo"
  | "Corretor / Operador Comercial"
  | "Financeiro";

export type PropertyStatus = "Ativo" | "Rascunho" | "Vendido" | "Alugado" | "Expirando" | "Arquivado";

export type Property = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  transaction: "Comprar" | "Alugar" | "Lançamento";
  status: PropertyStatus;
  type: string;
  category: "Residencial" | "Comercial" | "Rural";
  tags: string[];
  country: CountryCode;
  state: string;
  city: string;
  district: string;
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  hideAddress: boolean;
  currency: "BRL" | "EUR" | "USD";
  price: number;
  rent: number;
  condoFee: number;
  taxes: number;
  financing: boolean;
  fgts: boolean;
  exchange: boolean;
  commission: number;
  agent: string;
  owner: string;
  usefulArea: number;
  totalArea: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  floor: number;
  builtYear: number;
  furnished: boolean;
  renovated: boolean;
  amenities: string[];
  views: number;
  leads: number;
  expiresAt: string;
  premium: boolean;
  featured: boolean;
};

export type PropertyType = {
  id: string;
  name: string;
  group: "Residencial" | "Comercial";
  active: boolean;
  countries: CountryCode[];
  portalVisible: boolean;
  order: number;
  translations: Record<LocaleCode, string>;
};

export type FilterOption = {
  id: string;
  label: string;
  type: "tab" | "text" | "range" | "multi" | "number" | "boolean";
  active: boolean;
  countries: CountryCode[];
};

export type FilterGroup = {
  id: string;
  name: string;
  type: "Principal" | "Localização" | "Preço" | "Característica" | "Comodidade" | "Segurança";
  active: boolean;
  options: FilterOption[];
};

export type Lead = {
  id: string;
  name: string;
  type: string;
  source: string;
  status: "Novo" | "Em atendimento" | "Agendado" | "Proposta" | "Fechado" | "Perdido";
  priority: "Baixa" | "Média" | "Alta" | "Urgente";
  agent: string;
  propertyCode: string;
  phone: string;
  email: string;
  value: number;
  createdAt: string;
  notes: string[];
};

export type CrmDeal = {
  id: string;
  customer: string;
  property: string;
  stage: "Novo lead" | "Qualificação" | "Visita" | "Proposta" | "Contrato";
  value: number;
  agent: string;
  nextAction: string;
};

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  status: "Publicado" | "Rascunho" | "Revisão";
  locale: LocaleCode;
  sections: number;
  seoScore: number;
  updatedAt: string;
};

export type FinanceEntry = {
  id: string;
  description: string;
  type: "Receita" | "Despesa";
  category: string;
  amount: number;
  status: "Pago" | "Pendente" | "Atrasado";
  dueDate: string;
  owner: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Ativo" | "Inativo" | "Convidado";
  country: CountryCode;
  lastAccess: string;
};

export type CurrencyConfig = {
  code: "BRL" | "EUR" | "USD";
  name: string;
  symbol: string;
  position: "before" | "after";
  decimals: number;
  thousandSeparator: string;
  decimalSeparator: string;
  active: boolean;
  defaultCountries: CountryCode[];
};

export type CountryConfig = {
  country: CountryCode;
  locale: LocaleCode;
  name: string;
  currency: "BRL" | "EUR" | "USD";
  dateFormat: string;
  phoneMask: string;
  postalLabel: string;
  postalPlaceholder: string;
  taxLabel: string;
  priceLabel: string;
  rentLabel: string;
  addressLabel: string;
  showFgts: boolean;
  showExchange: boolean;
  marketTerms: {
    property: string;
    agent: string;
    neighborhood: string;
    taxes: string;
  };
};