
export type E3DCData = {
    identifikation: { [key: string]: string }
    leistung: { [key: string]: any }
}

export type E3DCModbusConnectionOptions = {
    address?: string
    port?: number
    interval?: number
}

export type E3dcConnectionReader = (
    interval: number,
	callback: E3DCReadCallback
) => void

export interface E3DCReadCallback {
	(data: E3DCData): void
}