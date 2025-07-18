import * as vscode from 'vscode';
import { DevChatUserViewProvider } from './views/DevChatUserViewProvider';

export function activate(context: vscode.ExtensionContext) {
  const provider = new DevChatUserViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('devchat.loginView', provider)
  );
}
