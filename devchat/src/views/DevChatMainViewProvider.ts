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
        <h3>참여 중인 채팅방</h3>
        <ul>
          <li>Java</li>
          <li>TypeScript</li>
          <li>React</li>
        </ul>
        <button id="logoutBtn">로그아웃</button>

        <script>
          const vscode = acquireVsCodeApi();
          document.getElementById("logoutBtn").addEventListener("click", () => {
            vscode.postMessage({ type: 'logout' });
          });
        </script>
      </body>
      </html>
    `;
  }
}
