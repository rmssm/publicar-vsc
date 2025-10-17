import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {

  // Crear botón en la barra inferior
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = "$(cloud-upload) Publicar";
  statusBarItem.tooltip = "Publicar cambios en el servidor";
  statusBarItem.command = "publicar-vsc.run";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Registrar comando
  const disposable = vscode.commands.registerCommand('publicar-vsc.run', () => {
    const cmd = vscode.workspace.getConfiguration('publicar-vsc').get('command') as string;
    const cwd = vscode.workspace.workspaceFolders?.[0].uri.fsPath || process.cwd();

    vscode.window.showInformationMessage(`🚀 Ejecutando: ${cmd}`);

    // Crear panel de salida
    const output = vscode.window.createOutputChannel("Publicar");
    output.show(true);
    output.appendLine(`Ejecutando comando: ${cmd}\n`);

    // Ejecutar script
    const proceso = exec(cmd, { cwd });

    // Mostrar cada línea que se genere en stdout
    proceso.stdout?.on('data', data => {
      output.append(data);
    });

    // Mostrar errores en stderr
    proceso.stderr?.on('data', data => {
      output.append(`⚠️ ${data}`);
    });

    // Cuando termina
    proceso.on('close', code => {
      if (code === 0) {
        vscode.window.showInformationMessage("✅ Publicación completada correctamente.");
        output.appendLine("\n✅ Publicación finalizada con éxito.");
      } else {
        vscode.window.showErrorMessage(`❌ Error al publicar (código ${code}).`);
        output.appendLine(`\n❌ Publicación finalizada con errores (código ${code}).`);
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}