import { DateTime } from 'luxon'
import { get, derived, writable } from 'svelte/store'

import { persist } from './persist'

export interface User {
  name: string
  taxAccount: string
  bankAccount: string
}
export interface Payment {
  paid: number
  date: DateTime
  name: string
  taxAccount: string
  bankAccount: string
}

export type UserType = 'matti' | 'minna'

export const HEALTH_INSURANCE = 0.0187
export const TYEL = 0.1738
export const EMPLOYEE_PENSION = 0.0715
export const UNEMPLOYMENT_INSURANCE = 0.002
const MATTI = {
  name: 'Matti Meikäläinen',
  taxAccount: 'FI01 2000 3000 4000 50',
  bankAccount: 'FI98 8655 3525 3242 21',
}

const TAX_BRACKETS = [
  { from: 0, to: 20500, tax: 0.1264 },
  { from: 20500, to: 30500, tax: 0.19 },
  { from: 30500, to: 50400, tax: 0.3025 },
  { from: 50400, to: 88200, tax: 0.34 },
  { from: 88200, to: 150000, tax: 0.42 },
  { from: 150000, to: Number.MAX_VALUE, tax: 0.44 },
]

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
  const total = p.reduce((acc, cur) => acc + cur.paid, 0)
  const pension = total * TYEL + (total - total * TYEL) * EMPLOYEE_PENSION
  const health = total * HEALTH_INSURANCE
  const unemploy = total * UNEMPLOYMENT_INSURANCE
  const yle = total > 14000 ? Math.min((total - 14000) * 1.025, 163) : 0
  const totalPayments = pension + health + unemploy + yle
  const taxes = TAX_BRACKETS.reduce((acc, cur) => {
    const lower = Math.min(total - totalPayments, cur.to) - cur.from
    const tax = total - totalPayments > cur.from ? Math.round(lower * cur.tax) : 0
    return acc + tax
  }, 0)
  const salary = total - totalPayments - taxes
  const taxPc = Math.round(taxes > 0 ? (taxes / (total - totalPayments)) * 1000 : 0) / 10
  return {
    brutto: Math.round(total),
    salary: Math.round(salary),
    totalPayments: Math.round(pension + health + unemploy + taxes + yle),
    pension: Math.round(pension),
    health: Math.round(health),
    unemploy: Math.round(unemploy),
    taxes: Math.round(taxes),
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
    payments.update(p => [
      ...p,
      { paid: get(salaryBrutto), date: DateTime.now(), ...get(employee) },
    ])
  },
}
