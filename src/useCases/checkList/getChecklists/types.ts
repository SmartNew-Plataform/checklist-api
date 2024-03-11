interface ChildType {
  id: number
  taskId: number
  statusId: number
  controlId: number
  description: string
  impeding: boolean
  logUser: string
  logDate: string
  type: string
}

interface ChecklistStatus {
  id: number
  description: string
  action: boolean
  controlId: number
  icon: string
  color: string
}

export interface ChecklistPeriod {
  id: number
  _id: string
  productionRegisterId: number
  statusId: number
  branchId: number
  checklistItemId: number
  controlId: number
  statusNC: number
  img: {
    name: string
    path: string
    url: string
  }[]
  options: ChecklistStatus[]
  task: {
    children: ChildType[]
    id: number
    familyId: number
    description: string
    answer: string
    type: string
  }
}

export interface Checklist {
  id: number
  equipmentId: number
  initialTime: Date
  finalTime: Date | null
  date: Date
  signatures: unknown[]
  status: 'close' | 'open'
  period?: {
    id: number
    period: string
    branchId: number
  }
  checklistPeriods: ChecklistPeriod[]
}
