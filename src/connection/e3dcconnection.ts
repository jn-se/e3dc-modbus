import ModbusRTU from "modbus-serial"

import {
	E3dcConnectionReader,
	E3DCData,
} from '../types'

/**
 * An object representing a connection with an E3DC device.
 */
export class E3DCConnection {
	constructor(
		client: ModbusRTU
	) {
        
        let connection = this

        const read: E3dcConnectionReader = (interval, callback) => {

            // responseEventHandler.on(event, callback)
    
            let _ = setInterval(async function () {
    
                const data = await connection.readData(client)
    
                callback(data)
    
            }, interval);
    
        }

		this.read = (interval, listener) => {
			if (this.closed) {
				console.warn('You are trying to add an event listener to a closed E3DCConnection.')
			} else {
				read(interval, listener)
			}
			return this
		}

		this.client = client
	}

	private client: ModbusRTU
	private closed: boolean = false

	read: E3dcConnectionReader

	close(): Promise<void> {
		this.closed = true
		return new Promise(resolve => {
			this.client.close
		})
	}

    readData(client: ModbusRTU): Promise<E3DCData> {

        return new Promise((resolve, reject) => {
    
            client.setID(1);
    
            var e3dcData: E3DCData = {identifikation: {}, leistung: {}}
    
            client.readHoldingRegisters(40000, 109).then( (result) => {
    
                var data = result
    
                // Identifikation
    
                const bufferHerstellerStart = 3;
                const bufferHersteller = data.buffer.slice(bufferHerstellerStart*2,(bufferHerstellerStart+16)*2)
                e3dcData.identifikation["Hersteller"] = bufferHersteller.toString('utf8').replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, "");
    
                const bufferModellStart = 19;
                const bufferModell = data.buffer.slice(bufferModellStart*2, (bufferModellStart+16)*2);
                e3dcData.identifikation["Modell"] = bufferModell.toString('utf8').replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, "");
    
                const bufferSeriennummerStart = 35;
                const bufferSeriennummer = data.buffer.slice(bufferSeriennummerStart*2, (bufferSeriennummerStart+16)*2);
                e3dcData.identifikation["Seriennummer"] = bufferSeriennummer.toString('utf8').replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, "");
    
                const bufferFirmwareStart = 51;
                const bufferFirmware = data.buffer.slice(bufferFirmwareStart*2, (bufferFirmwareStart+16)*2);
                e3dcData.identifikation["Firmware"] = bufferFirmware.toString('utf8').replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, "");
    
                var ReadModbus = new Uint32Array(data.data);
    
                // Leistungsdaten
    
                //E3DC_PV
                e3dcData.leistung["E3DC_PV"] = ReadModbus[67]-ReadModbus[68];
                //E3DC_Batterie
                e3dcData.leistung["E3DC_Batterie"] = ReadModbus[69]-ReadModbus[70];
                //E3DC_Hausverbrauch
                e3dcData.leistung["E3DC_Hausverbrauch"] = ReadModbus[71]-ReadModbus[72];
                //E3DC_Netz
                e3dcData.leistung["E3DC_Netz"] = ReadModbus[73]-ReadModbus[74];
                //E3DC_WeitereEinspeiser
                e3dcData.leistung["E3DC_WeitereEinspeiser"] = ReadModbus[75]-ReadModbus[76];
                //E3DC_Wallbox
                e3dcData.leistung["E3DC_Wallbox"] = ReadModbus[77]-ReadModbus[78];
                //E3DC_SolarWallbox
                e3dcData.leistung["E3DC_SolarWallbox"] = ReadModbus[79]-ReadModbus[80];
                //E3DC_Autarkie
                e3dcData.leistung["E3DC_Autarkie"] = ReadModbus[81]/256;
                //E3DC_Eigenstrom
                e3dcData.leistung["E3DC_Eigenstrom"] = ReadModbus[81]%256;
                //E3DC_BatterieStatus
                e3dcData.leistung["E3DC_BatterieStatus"] = ReadModbus[82]%256;
                //E3DC_EmergencyPowerStatus
                e3dcData.leistung["E3DC_EmergencyPowerStatus"] = ReadModbus[83];
                //E3DC_EMSStatus
                e3dcData.leistung["E3DC_EMSStatus"] = ReadModbus[84];
                //E3DC_EMSRemoteControl
                e3dcData.leistung["E3DC_EMSRemoteControl"] = ReadModbus[85];
                //E3DC_EMSCTRL
                e3dcData.leistung["E3DC_EMSCTRL"] = ReadModbus[86];
                //E3DC_Wallbox_0_CTRL
                e3dcData.leistung["E3DC_Wallbox_0_CTRL"] = ReadModbus[87];
                //E3DC_Wallbox_1_CTRL
                e3dcData.leistung["E3DC_Wallbox_1_CTRL"] = ReadModbus[88];
                //E3DC_Wallbox_2_CTRL
                e3dcData.leistung["E3DC_Wallbox_2_CTRL"] = ReadModbus[89];
                //E3DC_Wallbox_3_CTRL
                e3dcData.leistung["E3DC_Wallbox_3_CTRL"] = ReadModbus[90];
                //E3DC_Wallbox_4_CTRL
                e3dcData.leistung["E3DC_Wallbox_4_CTRL"] = ReadModbus[91];
                //E3DC_Wallbox_5_CTRL
                e3dcData.leistung["E3DC_Wallbox_5_CTRL"] = ReadModbus[92];
                //E3DC_Wallbox_6_CTRL
                e3dcData.leistung["E3DC_Wallbox_6_CTRL"] = ReadModbus[93];
                //E3DC_Wallbox_7_CTRL
                e3dcData.leistung["E3DC_Wallbox_7_CTRL"] = ReadModbus[94];
    
                //DC_STRING_1_Voltage
                e3dcData.leistung["DC_STRING_1_Voltage"] = ReadModbus[95];
                //DC_STRING_2_Voltage
                e3dcData.leistung["DC_STRING_2_Voltage"] = ReadModbus[96];
                //DC_STRING_3_Voltage
                e3dcData.leistung["DC_STRING_3_Voltage"] = ReadModbus[97];
                //DC_STRING_1_Current
                e3dcData.leistung["DC_STRING_1_Current"] = ReadModbus[98];
                //DC_STRING_2_Current
                e3dcData.leistung["DC_STRING_2_Current"] = ReadModbus[99];
                //DC_STRING_3_Current
                e3dcData.leistung["DC_STRING_3_Current"] = ReadModbus[100];
                //DC_STRING_1_Power
                e3dcData.leistung["DC_STRING_1_Power"] = ReadModbus[101];
                //DC_STRING_2_Power
                e3dcData.leistung["DC_STRING_2_Power"] = ReadModbus[102];
                //DC_STRING_3_Power
                e3dcData.leistung["DC_STRING_3_Power"] = ReadModbus[103];
    
                resolve(e3dcData);
            })
            .catch(error => {
                
                reject(error)
            })
    
        })
    }
}