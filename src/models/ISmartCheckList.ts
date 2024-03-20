export interface ISmartCheckList {
  listByEquipment: {
    checkListPeriod: {
      status_item: number | null
    }[]
    equipment: {
      ID: number
      descricao: string | null
      equipamento_codigo: string | null
      ID_familia: number | null
      familyEquipment: {
        familia: string | null
      } | null
    } | null
  }
  listByBranch: {
    checkListPeriod: {
      status_item: number | null
    }[]
    equipment: {
      ID: number
      descricao: string | null
      equipamento_codigo: string | null
      ID_familia: number | null
      familyEquipment: {
        familia: string | null
      } | null
    } | null
  }
  listRegisterByTime: {
    id: number
    status: number
    id_turno: number | null
    data_hora_encerramento: Date | null
    log_date: Date | null
    equipment: {
      ID: number
      equipamento_codigo: string | null
      descricao: string | null
    } | null
    data_hora_inicio: Date | null
    login: string | null
  }
  listRegisterByBranch: {
    id: number
    status: number
    id_turno: number | null
    data_hora_encerramento: Date | null
    log_date: Date | null
    equipment: {
      ID: number
      equipamento_codigo: string | null
      descricao: string | null
    } | null
    data_hora_inicio: Date | null
    login: string | null
  }
  listChecklistByTime: {
    id: number
    status: number
    id_turno: number | null
    data_hora_inicio: Date | null
    data_hora_encerramento: Date | null
    log_date: Date | null
    equipment: {
      ID: number
      equipamento_codigo: string | null
      descricao: string | null
    } | null
    location: {
      id: number
      id_filial: number
      localizacao: string | null
    } | null
    login: string | null
  }
}
