# APOD (NASA)

Aplicacion mobile de React native con Expo para consultar la imagen/video astronomico del dia (APOD).

## Requisitos

- Node.js 
- npm
- Expo Go (para correr en dispositivo fisico sin builds nativas)
- Android Studio o Xcode (opcional, solo si se ejecutara un build nativo)

## Instalacion

Si no tiene el codigo local, clone el repositorio y entre a la carpeta del proyecto.

Luego instale dependencias:
npm install


## Variables de entorno

1. Cree un archivo `.env` en la raiz del proyecto.
2. Copie las claves desde `.env.example`.
3. Asigne tu API key de NASA.

EXPO_PUBLIC_NASA_API_KEY=tu_api_key_aqui


## Ejecutar el proyecto en la terminal:

### Opcion 1: Expo Go

npx expo start

Escanea el QR con Expo Go.

### Opcion 2: Build nativo

Android:
npx expo run:android

iOS:
npx expo run:ios