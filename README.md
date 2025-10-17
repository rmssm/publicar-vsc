# publicar-vsc README


## Features

Plugin para publicar los cambios en el servidor

## Requirements

Se ha de crear un archivo el la raiz del proyecto a subir con nombre publicar.sh
Aquí en boceto de como debe configurarse:

publicar.sh->

#!/bin/bash

# ==== CONFIGURACIÓN ====
USUARIO="usuario"
SERVIDOR="https://urlservidor.eu"
PUERTO="22"
DIRECTORIO_LOCAL="/Directorio/Local/A/Subir/"
# El directorio local debe terminar con /
# El directorio remoto debe terminar con /
DIRECTORIO_REMOTO="/home/directorio/remoto/"
ARCHIVO_EXCLUIDO="publicar.sh"  # nombre del script u otros archivos a excluir
SSH_KEY="$HOME/.ssh/clave_ssh"
# ========================

# Sincronización con rsync
rsync -avz \
  -e "ssh -i $SSH_KEY -p $PUERTO" \
  --delete \
  --exclude "vendor/" \
  --exclude "node_modules/" \
  --exclude "MyFiles/" \
  --exclude "$ARCHIVO_EXCLUIDO" \
  --exclude ".git" \
  --exclude ".DS_Store" \
  --exclude "venv" \
  --exclude ".vscode" \
  "$DIRECTORIO_LOCAL" "${USUARIO}@${SERVIDOR}:$DIRECTORIO_REMOTO"



**Enjoy!**
