export enum ContractName {
  HDDV = 'Hợp đồng Dịch vụ',
  HDCTV = 'Hợp đồng Cộng tác viên',
  HDLD = 'Hợp đồng Lao động',
  TTTV = 'Không xác định thời hạn',
}

export enum ContractType {
  XDTH = 'Xác định thời hạn',
  KXDTH = 'Không xác định thời hạn',
}

export const ContractTerm = {
  '0': 'Không xác định thời hạn',
  '12': '12 tháng',
  '24': '24 tháng',
  '36': '36 tháng',
} as const
export type ContractTermKey = keyof typeof ContractTerm
