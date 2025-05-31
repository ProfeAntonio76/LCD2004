# Extensión MakeCode para micro:bit — Pantalla LCD 2004 (I2C)

Esta extensión permite controlar una pantalla LCD 2004 (20x4) con interfaz I2C desde MakeCode para micro:bit. Incluye bloques para:

- Escribir texto en una posición concreta (fila, columna)
- Borrar la pantalla
- Establecer la dirección I2C

## Instalación

1. Haz clic en **Extensiones** en MakeCode.
2. Busca la URL de este repositorio y añádelo.

## Uso de los bloques

- **Establecer dirección I2C**: Configura la dirección del módulo I2C (por defecto 0x27).
- **Borrar pantalla**: Limpia toda la pantalla.
- **Escribir texto en posición**: Escribe un texto en la fila y columna indicadas (fila y columna empiezan en 0).

## Ejemplo de código

```blocks
lcd2004.setAddress(0x27)
lcd2004.clear()
lcd2004.printAt("¡Hola!", 0, 0)
lcd2004.printAt("micro:bit", 1, 5)
```

## Conexión física

- SDA → Pin 20 (micro:bit)
- SCL → Pin 19 (micro:bit)
- VCC → 3.3V
- GND → GND
