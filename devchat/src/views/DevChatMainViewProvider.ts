import * as vscode from 'vscode';

export class DevChatMainViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri]
    };

    webviewView.webview.html = this.getHtml(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((msg) => {
      if (msg.type === 'enter_room') {
        vscode.commands.executeCommand('setContext', 'devchat.inRoom', true);
        vscode.commands.executeCommand('devchat.roomView.focus');
      }
    });
  }

  private getHtml(webview: vscode.Webview): string {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'base.css')
    );

    return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <link href="${styleUri}" rel="stylesheet" />
      </head>
      <body>
        <div id="userProfile" class="user-profile">
          <img src="..." alt="프로필" class="avatar" />
          <span class="username">admin</span>
        </div>
        <div id="searchBar" class="search-bar">
          <input type="text" placeholder="채팅방 검색" readonly />
        </div>
        <div class="chat-list">
          <div class="chat-item" data-room-id="frontend">
            <img src="..." class="chat-avatar" />
            <span class="chat-title">프론트엔드 채팅방</span>
          </div>
          <div class="chat-item" data-room-id="backend">
            <img src="..." class="chat-avatar" />
            <span class="chat-title">백엔드 채팅방</span>
          </div>
        </div>
        <script>
          const vscode = acquireVsCodeApi();

          document.querySelectorAll('.chat-item').forEach((item) => {
            item.addEventListener('click', () => {
              const roomId = item.getAttribute('data-room-id');
              vscode.postMessage({ type: 'enter_room', roomId });
            });
          });
        </script>
      </body>
      </html>
    `;
  }
}
