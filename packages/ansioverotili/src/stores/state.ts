import { get, derived, writable } from 'svelte/store'

import { persist } from './persist'

interface User {
  name: string
  taxAccount: string
  bankAccount: string
}

export type UserType = 'matti' | 'minna'

const HEALTH_INSURANCE = 1.87
const TYEL = 17.38
const UNEMPLOYMENT_INSURANCE = 0.2
const MATTI = {
  name: 'Matti Meikäläinen',
  taxAccount: 'FI01 2000 3000 4000 50',
  bankAccount: 'FI98 8655 3525 3242 21',
}

export const signedInUser = writable<UserType | undefined>()
export const employee = writable<User>(MATTI)
export const salary = writable(2500)
export const salaryBrutto = derived(salary, s =>
  Math.round((s * (100 + HEALTH_INSURANCE + TYEL + UNEMPLOYMENT_INSURANCE)) / 100)
)
export const payments = writable<any[]>([])

export const actions = {
  signIn(user?: 'matti' | 'minna') {
    signedInUser.set(user)
    employee.set(MATTI)
  },
  setSalary(n: number) {
    salary.set(n)
  },
  addPayment() {
    payments.update(p => [...p, { paid: get(salaryBrutto), ...get(employee) }])
  },
}
