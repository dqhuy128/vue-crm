export enum LeaveTypeOptions {
  MORNING = 'Buổi sáng',
  AFTERNOON = 'Buổi chiếu',
  FULL = 'Cả ngày',
  REGIME = 'Chế độ',
  HALF = 'Nửa ngày',
}

export enum LeaveTypeOptionsKeys {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  FULL = 'FULL',
  REGIME = 'REGIME',
}

export const RegimeOptions: Record<string, string> = {
  '97': 'Nghỉ bản thân CBNV kết hôn',
  '98': 'Nghỉ con cái CBNV kết hôn',
  '99': 'Tứ thân phụ mẫu và anh/chị/em ruột kết hôn',
  '100': 'Tứ thân phụ mẫu mất, vợ/ chồng mất, con mất',
  '101': 'Ông bà nội/ ngoại, anh/chị/em ruột (bên vợ hoặc chồng) mất',
}

export interface ItemLeaveResponse {
  id?: string
  user_id?: string
  regime_id?: string
  type?: string
  begin_date?: Date
  finish_date?: Date
  total_date?: string
  reason?: string
  manager_status?: string
  human_status?: string
  manager_id?: string
  human_id?: string
  base_path?: string | null
  image_file?: string | null
  created_at?: Date | string | null
  updated_at?: Date | string | null
  manager_status_text?: string
  human_status_text?: string
  type_text?: string
  name?: string
  code?: string
  action?: any[]
  manager_approved?: boolean
  human_approved?: boolean
  image?: string
}
