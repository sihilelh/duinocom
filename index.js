class DuinoCom {
  baudRate = 9600;
  serialPort = null;
  reader = null;
  writer = null;
  constructor(baudRate) {
    this.baudRate = baudRate;
  }
  async connect() {
    try {
      this.serialPort = await navigator.serial.requestPort();
      console.log("Connected to serial port:", this.serialPort);
      this.serialPort.ondisconnect = (event) => {
        console.error("Disconnected from the serial port:", event);
        if (this.reader) {
          this.reader.releaseLock();
        }
      };
      await this.serialPort.open({ baudRate: this.baudRate });
      this.writer = this.serialPort.writable.getWriter();
    } catch (error) {
      console.error("Error connecting to the serial port:", error);
    }
  }
  async send(data, isByteArray = false) {
    try {
      if (isByteArray) {
        await this.writer.write(new Uint8Array(data));
      } else {
        await this.writer.write(new TextEncoder().encode(data));
      }
      console.log("Data sent:", data);
    } catch (error) {
      console.error("Error sending data to the serial port:", error);
    }
  }
  async listen(listener = (data) => {}) {
    try {
      this.reader = this.serialPort.readable.getReader();
      let receivedData = "";
      while (true) {
        const { value, done } = await this.reader.read();
        if (done) {
          this.reader.releaseLock();
          break;
        }
        const textDecoder = new TextDecoder();
        const decodedData = textDecoder.decode(value);
        receivedData += decodedData;
        if (receivedData.includes("\n")) {
          listener(receivedData.trim());
          receivedData = "";
        }
      }
    } catch (error) {
      console.error("Error reading data from the serial port:", error);
      if (this.reader) {
        this.reader.releaseLock();
      }
    }
  }
}
