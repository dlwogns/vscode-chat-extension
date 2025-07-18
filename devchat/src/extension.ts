import * as vscode from 'vscode';
import { DevChatUserViewProvider } from './views/DevChatUserViewProvider';
import { DevChatMainViewProvider } from './views/DevChatMainViewProvider';
import { DevChatRoomViewProvider } from './views/DevChatRoomViewProvider';

export function activate(context: vscode.ExtensionContext) {
  const userViewProvider = new DevChatUserViewProvider(context.extensionUri);
  const mainViewProvider = new DevChatMainViewProvider(context.extensionUri);
  const roomViewProvider = new DevChatRoomViewProvider(context.extensionUri);
  
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('devchat.loginView', userViewProvider),
    vscode.window.registerWebviewViewProvider('devchat.mainView', mainViewProvider),
    vscode.window.registerWebviewViewProvider('devchat.roomView', roomViewProvider)
  );
}

