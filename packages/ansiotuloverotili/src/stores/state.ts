import { DateTime } from 'luxon'
import { get, derived, writable } from 'svelte/store'

import { persist } from './persist'
import taxes from './taxes.json'

export interface User {
  name: string
  taxAccount: string
  bankAccount: string
}
export interface Payment {
  salary: number
  brutto: number
  date: DateTime
  from: string
  to: string
  taxAccount: string
  bankAccount: string
}

export type UserType = 'matti' | 'minna'

export const TAXES = taxes[2025]
export const MUNICIPALITY_TAX = TAXES.municipality_tax.helsinki

export const HEALTH_INSURANCE = TAXES.health_ins
export const TYEL = TAXES.tyel
export const EMPLOYEE_PENSION = TAXES.employee_pension
export const UNEMPLOYMENT_INSURANCE = TAXES.unemployment_ins
export const YLE = TAXES.yle
const MATTI = {
  name: 'Matti Meikäläinen',
  taxAccount: 'FI01 2000 3000 4000 50',
  bankAccount: 'FI98 8655 3525 3242 21',
}

const TAX_BRACKETS = TAXES.tax_brackets.map(br => ({
  ...br,
  to: br.to === -1 ? Number.MAX_VALUE : br.to,
}))

export const signedInUser = writable<UserType | undefined>()
export const employee = writable<User>(MATTI)
export const salary = writable(2500)
export const salaryBrutto = derived(salary, s =>
  Math.round(s * (1 + HEALTH_INSURANCE + TYEL + UNEMPLOYMENT_INSURANCE))
)
export const payments = persist(writable<Payment[]>([]), {
  key: 'payments',
  serialize: val => val.map(v => ({ ...v, date: v.date.toISO() || DateTime.now().toISO() })),
  deserialize: val => val.map(v => ({ ...v, date: DateTime.fromISO(v.date) })),
})
export const employeeYear = derived(payments, p => {
  const total = p.reduce((acc, cur) => acc + cur.brutto, 0)
  const pension = total * TYEL + (total - total * TYEL) * EMPLOYEE_PENSION
  const health = total * HEALTH_INSURANCE
  const unemploy = total * UNEMPLOYMENT_INSURANCE
  const yle = total > YLE.from ? Math.min((total - YLE.from) * 1.025, YLE.cap) : 0
  const totalPayments = pension + health + unemploy + yle
  const taxes = TAX_BRACKETS.reduce((acc, cur) => {
    const lower = Math.min(total - totalPayments, cur.to) - cur.from
    const tax = total - totalPayments > cur.from ? Math.round(lower * cur.tax) : 0
    return acc + tax
  }, 0)
  const municipalityTax = (total - totalPayments) * MUNICIPALITY_TAX
  const taxTotal = taxes + municipalityTax
  const salary = total - totalPayments - taxTotal
  const taxPc = Math.round(taxTotal > 0 ? (taxTotal / (total - totalPayments)) * 1000 : 0) / 10
  return {
    brutto: Math.round(total),
    salary: Math.round(salary),
    totalPayments: Math.round(pension + health + unemploy + taxes + yle),
    pension: Math.round(pension),
    health: Math.round(health),
    unemploy: Math.round(unemploy),
    taxes: Math.round(taxes),
    municipalityTax: Math.round(municipalityTax),
    yle: Math.round(yle),
    taxPc,
  }
})

export const actions = {
  signIn(user?: 'matti' | 'minna') {
    signedInUser.set(user)
    employee.set(MATTI)
  },
  setSalary(n: number) {
    salary.set(n)
  },
  addPayment() {
    const empl = get(employee)
    payments.update(p => [
      ...p,
      {
        salary: get(salary),
        brutto: get(salaryBrutto),
        date: DateTime.now(),
        from: 'Minna Yrittäjä',
        to: empl.name,
        ...empl,
      },
    ])
  },
  deletePayment(idx: number) {
    payments.update(p => p.filter((_, i) => i !== idx))
  },
}
