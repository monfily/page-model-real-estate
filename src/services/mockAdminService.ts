import {
  adminUsers,
  cmsPages,
  crmDeals,
  currencies,
  dashboardSeries,
  filterGroups,
  financeEntries,
  leads,
  properties,
  propertyTypes,
} from "@/mocks/adminData";

export const mockAdminService = {
  getDashboard() {
    return {
      series: dashboardSeries,
      totals: {
        properties: properties.length,
        activeProperties: properties.filter((item) => item.status === "Ativo").length,
        soldOrRented: properties.filter((item) => item.status === "Vendido" || item.status === "Alugado").length,
        expiring: properties.filter((item) => item.status === "Expirando").length,
        newLeads: leads.filter((item) => item.status === "Novo").length,
        pendingContacts: leads.filter((item) => item.status !== "Fechado").length,
        receivable: financeEntries.filter((item) => item.type === "Receita").reduce((sum, item) => sum + item.amount, 0),
        payable: financeEntries.filter((item) => item.type === "Despesa").reduce((sum, item) => sum + item.amount, 0),
      },
    };
  },
  listProperties() {
    return properties;
  },
  listPropertyTypes() {
    return propertyTypes;
  },
  listFilterGroups() {
    return filterGroups;
  },
  listLeads() {
    return leads;
  },
  listCrmDeals() {
    return crmDeals;
  },
  listCmsPages() {
    return cmsPages;
  },
  listFinanceEntries() {
    return financeEntries;
  },
  listUsers() {
    return adminUsers;
  },
  listCurrencies() {
    return currencies;
  },
};