# DuinoCom 

## Overview

`DuinoCom` is a simple JavaScript class designed to facilitate communication with Arduino or similar microcontrollers via a serial port in a web browser environment. This package utilizes the Web Serial API to establish a connection and exchange data with the serial port.

### Browser Support

This npm package is intended for use in web browsers. Please refer to [Can I use Web Serial API](https://caniuse.com/web-serial) for information on browser compatibility.

## Installation

You can install `DuinoCom` via npm:

```bash
npm install duinocom
```

## Usage

### Importing the Package

```javascript
import DuinoCom from 'duinocom';
```

### Creating an Instance

To create an instance of `DuinoCom`, you need to specify the baud rate:

```javascript
const duino = new DuinoCom(9600);
```

### Connecting to the Serial Port

Before sending or receiving data, you need to establish a connection to the serial port:

```javascript
await duino.connect();
```

### Sending Data

You can send data to the connected serial port using the `send()` method. By default, the data is expected to be a string:

```javascript
await duino.send("Hello Arduino!");
```

If you need to send a byte array, you can specify the `isByteArray` parameter as `true`:

```javascript
const byteArray = [0x48, 0x65, 0x6C, 0x6C, 0x6F]; // "Hello" in ASCII
await duino.send(byteArray, true);
```

### Receiving Data

To listen for incoming data from the serial port, you can use the `listen()` method. You can provide a callback function to process the received data:

```javascript
duino.listen((data) => {
  console.log("Received data:", data);
});
```

The `listen()` method expects the incoming data to be terminated by a newline (`\n`). Once a newline is detected, the received data is passed to the provided callback function.

### Disconnecting

The connection to the serial port is automatically closed when the port is disconnected. However, you can also manually close the connection:

```javascript
duino.serialPort.close();
```

## Error Handling

The package includes basic error handling for connection, sending, and receiving data from the serial port. Errors are logged to the console with detailed error messages.

## Example

Here's a complete example demonstrating the usage of `DuinoCom`:

```javascript
import DuinoCom from 'duinocom';

const duino = new DuinoCom(9600);

async function main() {
  try {
    await duino.connect();

    // Send data to Arduino
    await duino.send("Hello Arduino!");

    // Listen for incoming data
    duino.listen((data) => {
      console.log("Received data:", data);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Trigger main function on button click
document.getElementById("startButton").addEventListener("click", main);
```

**Note:** To run the example, add a button with the id "startButton" to your HTML and execute the script in a web browser environment.

## Experimental

Please note that this package is still experimental and should be used with caution.

## License

This package is licensed under the ISC License. See the [LICENSE](./LICENSE) file for more details.

## Repository

The source code for `DuinoCom` is hosted on [GitHub](https://github.com/sihilelh/duinocom). Feel free to open issues or contribute to the project!
