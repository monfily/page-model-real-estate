"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Filter,
  Globe2,
  Home,
  KanbanSquare,
  Languages,
  LayoutDashboard,
  LineChart,
  Lock,
  Menu,
  MoreHorizontal,
  Pencil,
  PieChart,
  Plus,
  Search,
  Settings,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { countryConfigs, getCountryConfig, uiDictionary } from "@/config/admin/locales";
import { mockAdminService } from "@/services/mockAdminService";
import type { CountryCode, Property, UserRole } from "@/types/admin";
import { formatDate, formatMoney, formatNumber } from "@/utils/adminFormatters";

type ModuleKey =
  | "dashboard"
  | "properties"
  | "property-editor"
  | "property-types"
  | "filters"
  | "currencies"
  | "cms"
  | "leads"
  | "reports"
  | "crm"
  | "erp"
  | "users"
  | "settings"
  | "locales";

const modules: Array<{
  key: ModuleKey;
  label: string;
  icon: typeof LayoutDashboard;
  roles?: UserRole[];
}> = [
  { key: "dashboard", label: "Dashboard Geral", icon: LayoutDashboard },
  { key: "properties", label: "Imóveis", icon: Building2 },
  { key: "property-types", label: "Tipos de Imóveis", icon: Home },
  { key: "filters", label: "Filtros e Taxonomias", icon: Filter },
  { key: "currencies", label: "Moedas", icon: CircleDollarSign },
  { key: "cms", label: "CMS / Conteúdo", icon: FileText },
  { key: "leads", label: "Leads e Contatos", icon: ClipboardList },
  { key: "reports", label: "Relatórios", icon: BarChart3 },
  { key: "crm", label: "CRM", icon: KanbanSquare },
  { key: "erp", label: "ERP", icon: LineChart, roles: ["Super Admin", "Admin", "Financeiro"] },
  { key: "users", label: "Usuários e Permissões", icon: Users, roles: ["Super Admin", "Admin"] },
  { key: "settings", label: "Configurações Gerais", icon: Settings, roles: ["Super Admin", "Admin"] },
  { key: "locales", label: "País / Idioma / Locale", icon: Languages },
];

const roles: UserRole[] = ["Super Admin", "Admin", "Editor de Conteúdo", "Corretor / Operador Comercial", "Financeiro"];

function canAccess(role: UserRole, module: (typeof modules)[number]) {
  return !module.roles || module.roles.includes(role);
}

function clsx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "red" | "green" | "amber" | "blue" | "slate" | "purple" }) {
  const styles = {
    red: "bg-stone-100 text-stone-700 ring-stone-200",
    green: "bg-stone-100 text-stone-700 ring-stone-200",
    amber: "bg-stone-100 text-stone-700 ring-stone-200",
    blue: "bg-stone-100 text-stone-700 ring-stone-200",
    slate: "bg-stone-100 text-stone-700 ring-stone-200",
    purple: "bg-stone-100 text-stone-700 ring-stone-200",
  };

  return <span className={clsx("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1", styles[tone])}>{children}</span>;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("rounded-lg border border-stone-200 bg-white p-5 shadow-none", className)}>{children}</section>;
}

function Button({ children, variant = "primary", onClick }: { children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; onClick?: () => void }) {
  const styles = {
    primary: "bg-stone-950 text-white hover:bg-stone-800",
    secondary: "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50",
    ghost: "text-stone-600 hover:bg-stone-100",
    danger: "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50",
  };

  return (
    <button onClick={onClick} className={clsx("inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition", styles[variant])}>
      {children}
    </button>
  );
}

function Field({ label, value, placeholder, type = "text" }: { label: string; value?: string; placeholder?: string; type?: string }) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-medium text-stone-500">{label}</span>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
      />
    </label>
  );
}

function SelectField({ label, value, options }: { label: string; value?: string; options: string[] }) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-medium text-stone-500">{label}</span>
      <select defaultValue={value} className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium text-stone-800 outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-100">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SparkLine({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-24 items-end gap-2">
      {data.map((value, index) => (
        <div key={`${value}-${index}`} className="flex-1 rounded-t-md bg-stone-300" style={{ height: `${Math.max(18, (value / max) * 100)}%` }} />
      ))}
    </div>
  );
}

function Donut({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{ background: `conic-gradient(#57534e ${value * 3.6}deg, #e7e5e4 0deg)` }}
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-lg font-medium text-stone-900">{value}%</div>
      </div>
      <div>
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <p className="mt-1 text-2xl font-medium text-stone-900">+{value - 50}%</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-stone-500">
          <span>Admin</span>
          <ChevronRight size={15} />
          <span className="text-stone-700">{title}</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-stone-950">{title}</h1>
        <p className="mt-1 max-w-3xl text-sm font-normal text-stone-500">{subtitle}</p>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function AdminDashboard() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("dashboard");
  const [role, setRole] = useState<UserRole>("Super Admin");
  const [country, setCountry] = useState<CountryCode>("BR");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("Dados de demonstração carregados localmente.");

  const config = getCountryConfig(country);
  const dictionary = uiDictionary[config.locale];
  const data = useMemo(() => mockAdminService.getDashboard(), []);
  const properties = useMemo(() => mockAdminService.listProperties(), []);
  const filteredProperties = properties.filter((property) =>
    [property.code, property.title, property.city, property.district, property.agent].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const goTo = (module: ModuleKey) => {
    setActiveModule(module);
    setSidebarOpen(false);
    setToast(`Tela "${modules.find((item) => item.key === module)?.label}" aberta com dados mockados.`);
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="flex min-h-screen">
        <aside className={clsx("fixed inset-y-0 left-0 z-40 w-80 border-r border-stone-200 bg-white text-stone-900 transition lg:static lg:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex h-full flex-col">
            <div className="flex h-20 items-center justify-between border-b border-stone-200 px-6">
              <div>
                <p className="text-xs font-medium  text-stone-500">Painel</p>
                <p className="text-xl font-medium">Admin</p>
              </div>
              <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <div className="space-y-3 border-b border-stone-200 p-4">
              <label className="block text-xs font-medium text-stone-500">Perfil mockado</label>
              <select value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium text-stone-800 outline-none">
                {roles.map((item) => (
                  <option className="text-stone-900" key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {modules.map((module) => {
                const Icon = module.icon;
                const allowed = canAccess(role, module);
                return (
                  <button
                    key={module.key}
                    disabled={!allowed}
                    onClick={() => allowed && goTo(module.key)}
                    className={clsx(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition",
                      activeModule === module.key ? "bg-stone-100 text-stone-950" : "text-stone-600 hover:bg-stone-50 hover:text-stone-950",
                      !allowed && "cursor-not-allowed opacity-40"
                    )}
                  >
                    <Icon size={18} />
                    <span className="flex-1">{module.label}</span>
                    {!allowed && <Lock size={14} />}
                  </button>
                );
              })}
            </nav>
            <div className="m-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium">Demonstração local</p>
              <p className="mt-1 text-xs font-normal leading-5 text-stone-500">Dados e ações são simulados para validação visual do painel.</p>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-stone-200 bg-white">
            <div className="flex h-18 items-center gap-3 px-4 py-3 lg:px-8">
              <button onClick={() => setSidebarOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-stone-200 bg-white lg:hidden">
                <Menu size={20} />
              </button>
              <div className="relative hidden flex-1 md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`${dictionary.search} por código, cidade, bairro ou corretor`}
                  className="h-11 w-full rounded-lg border border-stone-200 bg-white pl-11 pr-4 text-sm font-normal outline-none focus:ring-2 focus:ring-stone-100"
                />
              </div>
              <select value={country} onChange={(event) => setCountry(event.target.value as CountryCode)} className="h-11 rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium outline-none">
                {Object.values(countryConfigs).map((item) => (
                  <option key={item.country} value={item.country}>
                    {item.name} · {item.locale}
                  </option>
                ))}
              </select>
              <button className="relative grid h-11 w-11 place-items-center rounded-lg border border-stone-200 bg-white">
                <Bell size={19} />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-stone-900" />
              </button>
              <div className="hidden items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 xl:flex">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-stone-950 text-sm font-medium text-white">AD</div>
                <div>
                  <p className="text-sm font-medium">Admin Demo</p>
                  <p className="text-xs font-medium text-stone-500">{role}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="border-b border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-600 lg:px-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {toast}
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-8">
            {activeModule === "dashboard" && <DashboardView config={config} data={data} properties={properties} goTo={goTo} />}
            {activeModule === "properties" && <PropertiesView config={config} properties={filteredProperties} goTo={goTo} setToast={setToast} />}
            {activeModule === "property-editor" && <PropertyEditor config={config} property={filteredProperties[0] ?? properties[0]} setToast={setToast} />}
            {activeModule === "property-types" && <PropertyTypesView country={country} />}
            {activeModule === "filters" && <FiltersView />}
            {activeModule === "currencies" && <CurrenciesView country={country} />}
            {activeModule === "cms" && <CmsView setToast={setToast} />}
            {activeModule === "leads" && <LeadsView config={config} />}
            {activeModule === "reports" && <ReportsView config={config} />}
            {activeModule === "crm" && <CrmView config={config} />}
            {activeModule === "erp" && <ErpView config={config} />}
            {activeModule === "users" && <UsersView />}
            {activeModule === "settings" && <SettingsView config={config} country={country} setCountry={setCountry} />}
            {activeModule === "locales" && <LocalesView country={country} setCountry={setCountry} />}
          </div>
        </div>
      </div>
    </main>
  );
}

function DashboardView({ config, data, properties, goTo }: { config: ReturnType<typeof getCountryConfig>; data: ReturnType<typeof mockAdminService.getDashboard>; properties: Property[]; goTo: (module: ModuleKey) => void }) {
  const stats = [
    ["Total de imóveis", data.totals.properties, "+12%", Building2, "blue"],
    ["Imóveis ativos", data.totals.activeProperties, "+8%", CheckCircle2, "green"],
    ["Expirando", data.totals.expiring, "atenção", AlertTriangle, "amber"],
    ["Leads novos", data.totals.newLeads, "+24%", ClipboardList, "red"],
  ] as const;

  return (
    <>
      <SectionHeader title="Dashboard Geral" subtitle="Visão executiva de imóveis, leads, páginas, financeiro e alertas operacionais em tempo real simulado.">
        <Button onClick={() => goTo("property-editor")}><Plus size={17} />Cadastrar imóvel</Button>
        <Button variant="secondary" onClick={() => goTo("leads")}><ClipboardList size={17} />Cadastrar lead</Button>
        <Button variant="secondary" onClick={() => goTo("reports")}><Upload size={17} />Exportar relatório</Button>
      </SectionHeader>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, delta, Icon, tone]) => (
          <Card key={label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">{label}</p>
                <p className="mt-2 text-3xl font-medium text-stone-950">{formatNumber(Number(value), config)}</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-stone-100 text-stone-600">
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <Badge tone={tone as "red" | "green" | "amber" | "blue"}>{delta}</Badge>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Desempenho comercial</h2>
              <p className="text-sm font-normal text-stone-500">Leads, acessos e receita simulada nos últimos meses.</p>
            </div>
            <Badge>Dados locais</Badge>
          </div>
          <SparkLine data={data.series.map((item) => item.revenue)} />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {data.series.slice(-3).map((item) => (
              <div key={item.label} className="rounded-lg bg-stone-50 p-4">
                <p className="text-xs font-medium text-stone-500">{item.label}</p>
                <p className="mt-1 text-lg font-medium">{formatMoney(item.revenue, config)}</p>
                <p className="text-xs font-medium text-stone-500">{item.leads} leads · {item.visits} visitas</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-medium">Saúde operacional</h2>
          <div className="mt-5 space-y-5">
            <Donut label="Cadastro completo" value={86} />
            <Donut label="Conversão de leads" value={64} />
          </div>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h2 className="text-xl font-medium">Imóveis mais vistos</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs text-stone-500">
                <tr>
                  <th className="py-3">Código</th>
                  <th>Imóvel</th>
                  <th>Cidade</th>
                  <th>Views</th>
                  <th>Leads</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="py-4 font-medium">{property.code}</td>
                    <td className="font-medium">{property.title}</td>
                    <td className="font-medium text-stone-500">{property.city}</td>
                    <td className="font-medium">{formatNumber(property.views, config)}</td>
                    <td>{property.leads}</td>
                    <td><StatusBadge status={property.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-medium">Alertas</h2>
          <div className="mt-4 space-y-3">
            {["3 imóveis com SEO incompleto", "2 contatos sem corretor atribuído", "1 conta vencida no ERP", "4 banners aguardando publicação"].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg bg-stone-50 p-3 text-sm font-normal text-stone-600">
                <AlertTriangle size={18} />
                <span>{item}</span>
                <span className="ml-auto">{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Ativo" || status === "Publicado" || status === "Pago" ? "green" : status === "Rascunho" || status === "Pendente" ? "amber" : status === "Expirando" || status === "Atrasado" ? "red" : "slate";
  return <Badge tone={tone as "green" | "amber" | "red" | "slate"}>{status}</Badge>;
}

function PropertiesView({ config, properties, goTo, setToast }: { config: ReturnType<typeof getCountryConfig>; properties: Property[]; goTo: (module: ModuleKey) => void; setToast: (message: string) => void }) {
  return (
    <>
      <SectionHeader title="Imóveis" subtitle="Listagem avançada com busca, filtros, ordenação, paginação visual e ações em lote simuladas.">
        <Button onClick={() => goTo("property-editor")}><Plus size={17} />Novo imóvel</Button>
        <Button variant="secondary" onClick={() => setToast("Exportação CSV simulada gerada com sucesso.")}><Upload size={17} />Exportar</Button>
      </SectionHeader>
      <div className="grid gap-4 xl:grid-cols-[300px_1fr]">
        <Card>
          <h2 className="flex items-center gap-2 text-lg font-medium"><SlidersHorizontal size={18} />Filtros avançados</h2>
          <div className="mt-4 space-y-4">
            <SelectField label="Tipo de anúncio" options={["Todos", "Comprar", "Alugar", "Lançamentos"]} />
            <SelectField label="Status" options={["Todos", "Ativo", "Rascunho", "Expirando", "Arquivado"]} />
            <SelectField label="Tipo de imóvel" options={["Todos", "Apartamento", "Casa em condomínio", "Ponto Comercial"]} />
            <Field label={config.marketTerms.neighborhood} placeholder="Digite bairro, rua ou cidade" />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Preço mín." placeholder="0" />
              <Field label="Preço máx." placeholder="2.000.000" />
            </div>
            <Button variant="secondary"><Filter size={17} />Aplicar filtros</Button>
          </div>
        </Card>
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-medium">Tabela de anúncios</h2>
              <p className="text-sm font-normal text-stone-500">{properties.length} registros filtrados · página 1 de 3</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setToast("Duplicação em lote simulada.")}>Duplicar</Button>
              <Button variant="secondary" onClick={() => setToast("Arquivamento em lote simulado.")}>Arquivar</Button>
              <Button variant="danger" onClick={() => setToast("Exclusão visual simulada. Nenhum dado real foi removido.")}><Trash2 size={16} />Excluir</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-stone-50 text-xs text-stone-500">
                <tr>
                  <th className="rounded-l-2xl px-4 py-3"><input type="checkbox" /></th>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Localização</th>
                  <th>Valor</th>
                  <th>{config.marketTerms.agent}</th>
                  <th>Leads</th>
                  <th>Status</th>
                  <th className="rounded-r-2xl">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-stone-50">
                    <td className="px-4 py-4"><input type="checkbox" /></td>
                    <td className="font-medium">{property.code}</td>
                    <td>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-xs font-medium text-stone-500">{property.type} · {property.transaction}</p>
                    </td>
                    <td className="font-medium text-stone-600">{property.city}, {property.district}</td>
                    <td className="font-medium">{formatMoney(property.price || property.rent, config)}</td>
                    <td>{property.agent}</td>
                    <td><Badge tone="blue">{property.leads}</Badge></td>
                    <td><StatusBadge status={property.status} /></td>
                    <td>
                      <button onClick={() => goTo("property-editor")} className="rounded-lg p-2 hover:bg-stone-100"><Pencil size={17} /></button>
                      <button onClick={() => setToast(`Imóvel ${property.code} publicado visualmente.`)} className="rounded-lg p-2 hover:bg-stone-100"><MoreHorizontal size={17} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}

function PropertyEditor({ config, property, setToast }: { config: ReturnType<typeof getCountryConfig>; property: Property; setToast: (message: string) => void }) {
  const tabs = ["Dados básicos", "Localização", "Comercial", "Características", "Comodidades", "Mídia", "SEO", "Relacionamentos", "Publicação"];
  const [tab, setTab] = useState(tabs[0]);

  return (
    <>
      <SectionHeader title="Cadastro / Edição de Imóvel" subtitle={`Formulário completo adaptado para ${config.name}: moeda ${config.currency}, ${config.postalLabel}, telefone ${config.phoneMask} e campos condicionais.`}>
        <Button onClick={() => setToast("Imóvel salvo em memória com validação visual concluída.")}><CheckCircle2 size={17} />Salvar alterações</Button>
        <Button variant="secondary"><Sparkles size={17} />Gerar SEO</Button>
      </SectionHeader>
      <Card>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((item) => (
            <button key={item} onClick={() => setTab(item)} className={clsx("whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium", tab === item ? "bg-stone-950 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200")}>
              {item}
            </button>
          ))}
        </div>
      </Card>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <h2 className="text-xl font-medium">{tab}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tab === "Dados básicos" && (
              <>
                <Field label="Código" value={property.code} />
                <Field label="Título" value={property.title} />
                <Field label="Subtítulo" value={property.subtitle} />
                <Field label="Slug" value={property.slug} />
                <SelectField label="Tipo de anúncio" value={property.transaction} options={["Comprar", "Alugar", "Lançamento"]} />
                <SelectField label="Status" value={property.status} options={["Ativo", "Rascunho", "Vendido", "Alugado", "Expirando", "Arquivado"]} />
                <SelectField label="Tipo de imóvel" value={property.type} options={["Apartamento", "Casas & Sobrados", "Casa em condomínio", "Ponto Comercial", "Sala Comercial"]} />
                <Field label="Tags" value={property.tags.join(", ")} />
                <label className="space-y-1.5 md:col-span-2 xl:col-span-3">
                  <span className="text-xs font-medium text-stone-500">Descrição completa</span>
                  <textarea defaultValue={property.description} className="min-h-36 w-full rounded-lg border border-stone-200 bg-white p-3 text-sm font-medium outline-none focus:ring-4 focus:ring-stone-100" />
                </label>
              </>
            )}
            {tab === "Localização" && (
              <>
                <SelectField label="País" value={config.name} options={["Brasil", "Portugal", "United States"]} />
                <Field label="Estado / Região" value={property.state} />
                <Field label="Cidade" value={property.city} />
                <Field label={config.marketTerms.neighborhood} value={property.district} />
                <Field label={config.addressLabel} value={property.address} />
                <Field label={config.postalLabel} value={property.postalCode} placeholder={config.postalPlaceholder} />
                <Field label="Latitude" value={String(property.latitude)} />
                <Field label="Longitude" value={String(property.longitude)} />
                <SelectField label="Ocultar endereço" value={property.hideAddress ? "Sim" : "Não"} options={["Sim", "Não"]} />
              </>
            )}
            {tab === "Comercial" && (
              <>
                <SelectField label="Moeda" value={config.currency} options={["BRL", "EUR", "USD"]} />
                <Field label={config.priceLabel} value={String(property.price)} />
                <Field label={config.rentLabel} value={String(property.rent)} />
                <Field label="Condomínio" value={String(property.condoFee)} />
                <Field label={config.taxLabel} value={String(property.taxes)} />
                <Field label="Comissão (%)" value={String(property.commission)} />
                <SelectField label="Financiamento" value={property.financing ? "Sim" : "Não"} options={["Sim", "Não"]} />
                {config.showFgts && <SelectField label="FGTS" value={property.fgts ? "Sim" : "Não"} options={["Sim", "Não"]} />}
                {config.showExchange && <SelectField label="Permuta" value={property.exchange ? "Sim" : "Não"} options={["Sim", "Não"]} />}
              </>
            )}
            {tab === "Características" && (
              <>
                <Field label="Área útil" value={String(property.usefulArea)} />
                <Field label="Área total" value={String(property.totalArea)} />
                <Field label="Dormitórios" value={String(property.bedrooms)} />
                <Field label="Suítes" value={String(property.suites)} />
                <Field label="Banheiros" value={String(property.bathrooms)} />
                <Field label="Lavabos" value="1" />
                <Field label="Vagas" value={String(property.parking)} />
                <Field label="Andar" value={String(property.floor)} />
                <Field label="Ano de construção" value={String(property.builtYear)} />
                <SelectField label="Mobiliado" value={property.furnished ? "Sim" : "Não"} options={["Sim", "Não"]} />
                <SelectField label="Reformado" value={property.renovated ? "Sim" : "Não"} options={["Sim", "Não"]} />
                <SelectField label="Padrão de acabamento" value="Alto padrão" options={["Econômico", "Médio", "Alto padrão", "Luxo"]} />
              </>
            )}
            {tab === "Comodidades" && (
              <div className="md:col-span-2 xl:col-span-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["Brinquedoteca", "Churrasqueira", "Espaço gourmet", "Piscina", "Playground", "Salão de festas", "Ar-condicionado", "Armários Planejados", "Elevador", "Jardim", "Mobiliado", "Varanda", "Lavanderia", "Escritório", "Portaria", "Interfone"].map((item) => (
                  <label key={item} className="flex items-center gap-3 rounded-lg border border-stone-200 p-3 text-sm font-medium">
                    <input type="checkbox" defaultChecked={property.amenities.includes(item)} />
                    {item}
                  </label>
                ))}
              </div>
            )}
            {tab === "Mídia" && (
              <div className="md:col-span-2 xl:col-span-3 grid gap-4 md:grid-cols-3">
                {["Imagem de capa", "Galeria", "Vídeo", "Tour virtual", "PDF"].map((item) => (
                  <div key={item} className="grid min-h-40 place-items-center rounded-lg border border-dashed border-stone-200 bg-stone-50 p-5 text-center">
                    <Upload className="mx-auto text-stone-400" />
                    <p className="mt-2 font-medium">{item}</p>
                    <p className="text-xs font-medium text-stone-500">Área de mídia demonstrativa</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "SEO" && (
              <>
                <Field label="Meta title" value={property.title} />
                <Field label="Meta description" value={property.description.slice(0, 110)} />
                <Field label="URL canônica" value={`/imovel/${property.slug}/${property.id}`} />
                <SelectField label="Indexável" value="Sim" options={["Sim", "Não"]} />
              </>
            )}
            {tab === "Relacionamentos" && (
              <>
                <Field label={config.marketTerms.agent} value={property.agent} />
                <Field label="Proprietário" value={property.owner} />
                <Field label="Imóveis relacionados" value="IMB-2048, COM-3301" />
                <Field label="Campanha vinculada" value="Google Search - Premium" />
              </>
            )}
            {tab === "Publicação" && (
              <>
                <SelectField label="Destaque" value={property.featured ? "Sim" : "Não"} options={["Sim", "Não"]} />
                <SelectField label="Premium" value={property.premium ? "Sim" : "Não"} options={["Sim", "Não"]} />
                <SelectField label="Agendamento" value="Publicar agora" options={["Publicar agora", "Agendar publicação", "Salvar rascunho"]} />
                <Field label="Expiração" type="date" value={property.expiresAt} />
              </>
            )}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-medium">Preview do anúncio</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
            <div className="h-44 bg-stone-100" />
            <div className="p-4">
              <Badge tone="red">{property.transaction}</Badge>
              <h3 className="mt-3 text-lg font-medium">{property.title}</h3>
              <p className="mt-1 text-sm font-normal text-stone-500">{property.city}, {property.district}</p>
              <p className="mt-3 text-2xl font-medium">{formatMoney(property.price || property.rent, config)}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-medium text-stone-600">
                <span className="rounded-lg bg-white p-2">{property.bedrooms} dorm.</span>
                <span className="rounded-lg bg-white p-2">{property.bathrooms} banh.</span>
                <span className="rounded-lg bg-white p-2">{property.parking} vagas</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function PropertyTypesView({ country }: { country: CountryCode }) {
  const types = mockAdminService.listPropertyTypes();
  return (
    <>
      <SectionHeader title="Tipos de Imóveis" subtitle="Cadastro visual de tipos, grupos, traduções, países associados, ordenação e visibilidade no portal.">
        <Button><Plus size={17} />Novo tipo</Button>
      </SectionHeader>
      <div className="grid gap-4 lg:grid-cols-2">
        {["Residencial", "Comercial"].map((group) => (
          <Card key={group}>
            <h2 className="text-xl font-medium">{group}</h2>
            <div className="mt-4 space-y-3">
              {types.filter((item) => item.group === group).map((type) => (
                <div key={type.id} className="flex items-center gap-3 rounded-lg border border-stone-200 p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-stone-100 text-sm font-medium">{type.order}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{type.name}</p>
                    <p className="truncate text-xs font-medium text-stone-500">{type.translations[countryConfigs[country].locale]} · {type.countries.join(", ")}</p>
                  </div>
                  <Badge tone={type.active ? "green" : "slate"}>{type.active ? "Ativo" : "Inativo"}</Badge>
                  <Badge tone={type.portalVisible ? "blue" : "amber"}>{type.portalVisible ? "Portal" : "Oculto"}</Badge>
                  <Pencil size={17} className="text-stone-400" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function FiltersView() {
  const groups = mockAdminService.listFilterGroups();
  return (
    <>
      <SectionHeader title="Filtros e Taxonomias" subtitle="Grupos e filtros configuráveis por país, tipo de imóvel, ordenação, tipo de campo e traduções.">
        <Button><Plus size={17} />Criar filtro</Button>
      </SectionHeader>
      <div className="grid gap-4 xl:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-medium">{group.name}</h2>
                <p className="text-sm font-normal text-stone-500">{group.type}</p>
              </div>
              <StatusBadge status={group.active ? "Ativo" : "Inativo"} />
            </div>
            <div className="mt-4 space-y-2">
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center gap-3 rounded-lg bg-stone-50 p-3 text-sm">
                  <Filter size={16} className="text-stone-400" />
                  <span className="flex-1 font-medium">{option.label}</span>
                  <Badge tone="slate">{option.type}</Badge>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function CurrenciesView({ country }: { country: CountryCode }) {
  const currencies = mockAdminService.listCurrencies();
  return (
    <>
      <SectionHeader title="Moedas" subtitle="Configuração visual de BRL, EUR e USD com separadores, casas decimais, posição do símbolo e país padrão." />
      <div className="grid gap-4 lg:grid-cols-3">
        {currencies.map((currency) => (
          <Card key={currency.code} className={currency.defaultCountries.includes(country) ? "ring-1 ring-stone-300" : ""}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-medium">{currency.symbol}</p>
                <h2 className="mt-2 text-xl font-medium">{currency.name}</h2>
              </div>
              <Badge tone={currency.active ? "green" : "slate"}>{currency.code}</Badge>
            </div>
            <div className="mt-5 grid gap-3 text-sm font-medium text-stone-600">
              <p>Posição: {currency.position === "before" ? "antes do valor" : "depois do valor"}</p>
              <p>Casas decimais: {currency.decimals}</p>
              <p>Separadores: milhar "{currency.thousandSeparator}" · decimal "{currency.decimalSeparator}"</p>
              <p>País padrão: {currency.defaultCountries.join(", ")}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function CmsView({ setToast }: { setToast: (message: string) => void }) {
  const pages = mockAdminService.listCmsPages();
  return (
    <>
      <SectionHeader title="CMS / Conteúdo" subtitle="Editor mockado para páginas, banners, SEO, cabeçalho, rodapé, popups, depoimentos e versões por idioma.">
        <Button onClick={() => setToast("Página duplicada em rascunho no mock local.")}><Plus size={17} />Nova página</Button>
      </SectionHeader>
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs text-stone-500">
                <tr><th className="py-3">Página</th><th>Slug</th><th>Idioma</th><th>Seções</th><th>SEO</th><th>Status</th><th>Atualizado</th></tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pages.map((page) => (
                  <tr key={page.id}>
                    <td className="py-4 font-medium">{page.title}</td>
                    <td className="font-medium text-stone-500">{page.slug}</td>
                    <td><Badge tone="blue">{page.locale}</Badge></td>
                    <td>{page.sections}</td>
                    <td><Badge tone={page.seoScore > 80 ? "green" : "amber"}>{page.seoScore}%</Badge></td>
                    <td><StatusBadge status={page.status} /></td>
                    <td>{page.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-medium">Editor visual</h2>
          <div className="mt-4 space-y-4">
            <Field label="Título da seção" value="Encontre seu imóvel ideal" />
            <SelectField label="Versão por idioma" options={["pt-BR", "pt-PT", "en-US"]} />
            <label className="space-y-1.5 block">
              <span className="text-xs font-medium text-stone-500">Rich text simulado</span>
              <textarea defaultValue="Texto institucional com CTA, palavras-chave e conteúdo editável para validação." className="min-h-32 w-full rounded-lg border border-stone-200 p-3 text-sm font-medium outline-none" />
            </label>
            <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 p-5 text-center font-medium text-stone-500">Preview + upload fake + ordenação de blocos</div>
          </div>
        </Card>
      </div>
    </>
  );
}

function LeadsView({ config }: { config: ReturnType<typeof getCountryConfig> }) {
  const leads = mockAdminService.listLeads();
  return (
    <>
      <SectionHeader title="Leads e Contatos" subtitle="Lista, cards, drawer de detalhes, histórico, notas, prioridade e atribuição de corretor simulados." />
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Card>
          <div className="grid gap-3 md:grid-cols-3">
            {leads.map((lead) => (
              <div key={lead.id} className="rounded-lg border border-stone-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-medium">{lead.name}</h2>
                    <p className="text-sm font-normal text-stone-500">{lead.type}</p>
                  </div>
                  <Badge tone={lead.priority === "Urgente" ? "red" : lead.priority === "Alta" ? "amber" : "blue"}>{lead.priority}</Badge>
                </div>
                <p className="mt-3 text-2xl font-medium">{formatMoney(lead.value, config)}</p>
                <p className="mt-1 text-sm font-normal text-stone-500">{lead.propertyCode} · {lead.agent}</p>
                <div className="mt-4 flex items-center justify-between">
                  <StatusBadge status={lead.status} />
                  <span className="text-xs font-medium text-stone-500">{lead.source}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-medium">Drawer de detalhes</h2>
          <div className="mt-4 space-y-3">
            {leads[0].notes.map((note) => (
              <div key={note} className="rounded-lg bg-stone-50 p-3 text-sm font-medium text-stone-700">{note}</div>
            ))}
            <Field label="Nova nota" placeholder="Registrar interação mockada" />
            <SelectField label="Atribuir corretor" options={["Marina Costa", "Rui Matos", "Olivia Grant", "Daniel Rocha"]} />
            <Button><CheckCircle2 size={17} />Salvar atendimento</Button>
          </div>
        </Card>
      </div>
    </>
  );
}

function CrmView({ config }: { config: ReturnType<typeof getCountryConfig> }) {
  const deals = mockAdminService.listCrmDeals();
  const stages = ["Novo lead", "Qualificação", "Visita", "Proposta", "Contrato"] as const;
  return (
    <>
      <SectionHeader title="CRM" subtitle="Funil kanban com leads, preferências, timeline, tarefas, visitas, propostas e motivos de perda mockados." />
      <div className="grid min-h-[560px] gap-4 overflow-x-auto xl:grid-cols-5">
        {stages.map((stage) => (
          <Card key={stage} className="min-w-72 bg-stone-50">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-medium">{stage}</h2>
              <Badge>{deals.filter((deal) => deal.stage === stage).length}</Badge>
            </div>
            <div className="space-y-3">
              {deals.filter((deal) => deal.stage === stage).map((deal) => (
                <div key={deal.id} className="rounded-lg border border-stone-200 bg-white p-4">
                  <h3 className="font-medium">{deal.customer}</h3>
                  <p className="text-sm font-normal text-stone-500">{deal.property}</p>
                  <p className="mt-2 text-lg font-medium">{formatMoney(deal.value, config)}</p>
                  <p className="mt-3 rounded-lg bg-stone-50 p-3 text-xs font-normal text-stone-600">{deal.nextAction}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ReportsView({ config }: { config: ReturnType<typeof getCountryConfig> }) {
  const series = mockAdminService.getDashboard().series;
  return (
    <>
      <SectionHeader title="Relatórios" subtitle="Desempenho do portal, imóveis, leads, CRM e financeiro com gráficos coerentes e dados fictícios." />
      <div className="grid gap-4 xl:grid-cols-2">
        {["Portal", "Imóveis", "Leads e CRM", "Financeiro / ERP"].map((name, index) => (
          <Card key={name}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">{name}</h2>
              {index % 2 === 0 ? <PieChart className="text-stone-500" /> : <BarChart3 className="text-stone-500" />}
            </div>
            <div className="mt-5">
              <SparkLine data={series.map((item) => (index === 3 ? item.revenue : index === 2 ? item.leads : item.visits))} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {series.slice(-3).map((item) => (
                <div key={item.label} className="rounded-lg bg-stone-50 p-3">
                  <p className="text-xs font-medium text-stone-500">{item.label}</p>
                  <p className="font-medium">{index === 3 ? formatMoney(item.revenue, config) : formatNumber(index === 2 ? item.leads : item.visits, config)}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ErpView({ config }: { config: ReturnType<typeof getCountryConfig> }) {
  const entries = mockAdminService.listFinanceEntries();
  return (
    <>
      <SectionHeader title="ERP" subtitle="Contas a pagar, receber, categorias, comissões, fluxo de caixa, filtros por período e status de pagamento." />
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm font-medium text-stone-500">Contas a receber</p><p className="mt-2 text-3xl font-medium">{formatMoney(entries.filter((item) => item.type === "Receita").reduce((sum, item) => sum + item.amount, 0), config)}</p></Card>
        <Card><p className="text-sm font-medium text-stone-500">Contas a pagar</p><p className="mt-2 text-3xl font-medium">{formatMoney(entries.filter((item) => item.type === "Despesa").reduce((sum, item) => sum + item.amount, 0), config)}</p></Card>
        <Card><p className="text-sm font-medium text-stone-500">Comissões pendentes</p><p className="mt-2 text-3xl font-medium">{formatMoney(76800, config)}</p></Card>
      </div>
      <Card className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs text-stone-500">
              <tr><th className="py-3">Descrição</th><th>Tipo</th><th>Categoria</th><th>Valor</th><th>Vencimento</th><th>Responsável</th><th>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="py-4 font-medium">{entry.description}</td>
                  <td>{entry.type}</td>
                  <td>{entry.category}</td>
                  <td className="font-medium">{formatMoney(entry.amount, config)}</td>
                  <td>{formatDate(entry.dueDate, config)}</td>
                  <td>{entry.owner}</td>
                  <td><StatusBadge status={entry.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function UsersView() {
  const users = mockAdminService.listUsers();
  return (
    <>
      <SectionHeader title="Usuários e Permissões" subtitle="Perfis, roles, permissões por módulo, permissões por ação, logs e redefinição de senha visual." />
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs text-stone-500">
                <tr><th className="py-3">Usuário</th><th>Email</th><th>Role</th><th>País</th><th>Último acesso</th><th>Status</th></tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-4 font-medium">{user.name}</td>
                    <td className="font-medium text-stone-500">{user.email}</td>
                    <td><Badge tone="purple">{user.role}</Badge></td>
                    <td>{user.country}</td>
                    <td>{user.lastAccess}</td>
                    <td><StatusBadge status={user.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-medium">Matriz de permissões</h2>
          <div className="mt-4 space-y-3">
            {["Imóveis", "CMS", "CRM", "ERP", "Usuários"].map((module) => (
              <div key={module} className="rounded-lg bg-stone-50 p-3">
                <p className="font-medium">{module}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["ver", "criar", "editar", "excluir"].map((action) => <Badge key={action} tone={action === "excluir" ? "amber" : "green"}>{action}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function SettingsView({ config, country, setCountry }: { config: ReturnType<typeof getCountryConfig>; country: CountryCode; setCountry: (country: CountryCode) => void }) {
  return (
    <>
      <SectionHeader title="Configurações Gerais" subtitle="Empresa, marca, SEO global, contato, redes sociais, notificações, paginação e parâmetros do portal." />
      <Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Nome da empresa" value="Portal Imobiliário Demo" />
          <Field label="Telefone" value={config.phoneMask} />
          <Field label="E-mail" value="contato@portal-demo.test" />
          <Field label="WhatsApp" value={config.phoneMask} />
          <Field label={config.addressLabel} value="Av. Principal, 1000" />
          <SelectField label="País padrão" value={country} options={["BR", "PT", "US"]} />
          <SelectField label="Idioma padrão" value={config.locale} options={["pt-BR", "pt-PT", "en-US"]} />
          <SelectField label="Moeda padrão" value={config.currency} options={["BRL", "EUR", "USD"]} />
          <Field label="SEO global" value="Imóveis para comprar, alugar e investir" />
          <Field label="Paginação" value="24 imóveis por página" />
          <SelectField label="Notificações" value="Ativas" options={["Ativas", "Somente críticas", "Desativadas"]} />
          <SelectField label="País rápido" value={country} options={["BR", "PT", "US"]} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {(["BR", "PT", "US"] as CountryCode[]).map((item) => <Button key={item} variant={country === item ? "primary" : "secondary"} onClick={() => setCountry(item)}><Globe2 size={16} />{countryConfigs[item].name}</Button>)}
        </div>
      </Card>
    </>
  );
}

function LocalesView({ country, setCountry }: { country: CountryCode; setCountry: (country: CountryCode) => void }) {
  return (
    <>
      <SectionHeader title="Configurações de País / Idioma / Locale" subtitle="Demonstra claramente alterações de idioma, moeda, máscaras, labels e campos visíveis conforme mercado." />
      <div className="grid gap-4 lg:grid-cols-3">
        {Object.values(countryConfigs).map((item) => (
          <Card key={item.country} className={country === item.country ? "ring-1 ring-stone-300" : ""}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">{item.name}</h2>
              <Badge tone="blue">{item.locale}</Badge>
            </div>
            <div className="mt-5 space-y-3 text-sm font-medium text-stone-600">
              <p>Moeda: {item.currency}</p>
              <p>Data: {item.dateFormat}</p>
              <p>Telefone: {item.phoneMask}</p>
              <p>{item.postalLabel}: {item.postalPlaceholder}</p>
              <p>Taxa local: {item.taxLabel}</p>
              <p>FGTS visível: {item.showFgts ? "sim" : "não"}</p>
              <p>Permuta visível: {item.showExchange ? "sim" : "não"}</p>
            </div>
            <Button variant={country === item.country ? "primary" : "secondary"} onClick={() => setCountry(item.country)}><Languages size={17} />Usar locale</Button>
          </Card>
        ))}
      </div>
    </>
  );
}