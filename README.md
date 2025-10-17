# ☁️ Publicar-VSC

**Publicar-VSC** es una extensión para Visual Studio Code que añade un botón en la barra de estado para **publicar tus cambios automáticamente en un servidor remoto** (por ejemplo, mediante `rsync` o un script personalizado).

Ideal para desarrolladores que suben cambios con frecuencia y quieren hacerlo con un solo clic, sin tener que abrir una terminal ni escribir comandos manualmente.

---

## 🚀 Características

- Añade un **botón “☁️ Publicar”** en la barra inferior de VS Code.  
- Ejecuta automáticamente un script o comando de publicación (`publicar.sh` por defecto).  
- Muestra la salida directamente en la terminal integrada de VS Code.  
- Compatible con **macOS**, **Linux** y **Windows (WSL)**.  

---

## ⚙️ Instalación

1. Crea un archivo llamado `publicar.sh``
2. Aquí un ejemplo de configuración del archivo:

- 
#!/bin/bash
\# publicar.sh — Subir cambios al servidor remoto

\# Configura tus datos:
SERVIDOR="usuario@tuservidor.com"
RUTA_REMOTA="/var/www/html/"
RUTA_LOCAL="$(pwd)/"

echo "🚀 Iniciando publicación de cambios..."
echo "🔁 Subiendo desde: $RUTA_LOCAL"
echo "📡 Hacia: $SERVIDOR:$RUTA_REMOTA"
echo

\# Sincroniza los archivos con el servidor
rsync -avz --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.vscode/' \
  "$RUTA_LOCAL" "$SERVIDOR:$RUTA_REMOTA"

if [ $? -eq 0 ]; then
  echo
  echo "✅ Publicación completada correctamente."
else
  echo
  echo "❌ Error durante la publicación."
fi