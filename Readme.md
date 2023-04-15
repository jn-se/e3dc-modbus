# e3dc-modbus

A lightweight Node.js library to connect to E3DC devices using the Modbus protocol.

# Installation

Install the module `e3dc-modbus` via npm:

    npm install @jns-se/e3dc-modbus

# Example

```js
const e3dc = require('@jn-se/e3dc-modbus')

let ipAddress = "192.168.10.104"
let connectionOptions = {port: 502}
let readInterval = 1000

e3dc.connect(ipAddress, connectionOptions).then((connection) => {
    
    connection.read(readInterval, (data) => {

        console.log("E3DC Data: "+JSON.stringify(data, null, 2))
        
    })
})
.catch(error => {

    // Error while connecting
    console.log(error.message)
})
```

# External Documentation

Modbus/ TCP-Schnittstelle der HagerEnergy GmbH V2.0
- https://s10.e3dc.com/s10/module/download/get.php?id=1176

