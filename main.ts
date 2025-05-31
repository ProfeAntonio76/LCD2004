//% weight=100 color=#0fbc11 icon="\uf26c" block="Pantalla LCD2004"
namespace lcd2004 {
    let address = 0x27

    /**
     * Establece la dirección I2C del LCD (por defecto 0x27)
     */
    //% block="establecer dirección I2C del LCD %addr"
    //% addr.min=0x03 addr.max=0x77 addr.defl=0x27
    export function setAddress(addr: number) {
        address = addr
    }

    /**
     * Borra la pantalla LCD
     */
    //% block="borrar pantalla LCD"
    export function clear() {
        command(0x01)
        basic.pause(2)
    }

    /**
     * Escribe texto en una posición concreta de la pantalla
     * @param text El texto a mostrar
     * @param row Fila (0-3)
     * @param col Columna (0-19)
     */
    //% block="escribir %text en fila %row columna %col"
    //% row.min=0 row.max=3 col.min=0 col.max=19
    export function printAt(text: string, row: number, col: number) {
        setCursor(row, col)
        for (let i = 0; i < text.length; i++) {
            write(text.charCodeAt(i))
        }
    }

    function setCursor(row: number, col: number) {
        let row_offsets = [0x00, 0x40, 0x14, 0x54]
        command(0x80 | (col + row_offsets[row]))
    }

    // Enviar comando
    function command(value: number) {
        send(value, 0)
    }

    // Enviar dato
    function write(value: number) {
        send(value, 1)
    }

    function send(value: number, mode: number) {
        let highnib = value & 0xf0
        let lownib = (value << 4) & 0xf0
        write4bits(highnib | mode)
        write4bits(lownib | mode)
    }

    function write4bits(value: number) {
        i2cSend(value | 0x08) // backlight ON
        pulseEnable(value | 0x08)
    }

    function pulseEnable(data: number) {
        i2cSend(data | 0x04)
        control.waitMicros(1)
        i2cSend(data & ~0x04)
        control.waitMicros(50)
    }

    function i2cSend(data: number) {
        pins.i2cWriteNumber(address, data, NumberFormat.UInt8BE)
    }

    // Inicialización automática (simple)
    // Opcional: Llamar a init() en on start si se desea inicialización explícita
    function init() {
        basic.pause(50)
        write4bits(0x30)
        basic.pause(5)
        write4bits(0x30)
        control.waitMicros(150)
        write4bits(0x30)
        write4bits(0x20)
        command(0x28) // 4 bit, 2 line, 5x8 font
        command(0x08) // display off
        command(0x01) // clear display
        basic.pause(2)
        command(0x06) // entry mode set
        command(0x0C) // display on, cursor off, blink off
    }

    // Ejecutar init en on start
    init()
}