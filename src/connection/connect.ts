import ModbusRTU from 'modbus-serial'
import { E3DCConnection } from './e3dcconnection'

import {
	E3DCModbusConnectionOptions,
} from '../types'

export function connect(address: string, options?: E3DCModbusConnectionOptions): Promise<E3DCConnection> {
	return new Promise((resolve, reject) => {
		
		// defaults
		var modbusPort = 502

		// read port from options if available
		if(options && options.port) modbusPort = options.port

		// open socket connection and return the connection
		openSocket(address, modbusPort).then(client => {
			
			const connection = new E3DCConnection(client)

			resolve(connection)
		})
		.catch(error => {

			reject(error)
		})
	})
}

async function openSocket(address: string, port: number): Promise<ModbusRTU> {

	console.log("Establishing modbus connection to IP "+address+" and port "+port)

	return new Promise((resolve, reject) => {

		const client = new ModbusRTU()

		client.connectTCP(address, { port: port}).then( () => {

			if (client.isOpen) {
				console.log("Connection succesful.");
				resolve(client)
			}
		})
		.catch(error => {

			console.log(error.message)
			reject(error)
		})
	})

}