import * as vscode from 'vscode';

export class DevChatSearchRoomViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'devchat.searchRoomView';

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
      if (msg.type === 'join_room') {
        vscode.window.showInformationMessage(`'${msg.roomId}' 채팅방에 참여했습니다!`);
        // TODO: 참여 처리 및 상태 저장
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
        <h3>참여 가능한 채팅방</h3>
        <div class="chat-list">
          <div class="chat-item">
            <span class="chat-title">디자인 채팅방</span>
            <button class="join-btn" data-room-id="design">참여</button>
          </div>
          <div class="chat-item">
            <span class="chat-title">AI 채팅방</span>
            <button class="join-btn" data-room-id="ai">참여</button>
          </div>
        </div>

        <script>
          const vscode = acquireVsCodeApi();

          document.querySelectorAll('.join-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
              const roomId = btn.getAttribute('data-room-id');
              vscode.postMessage({ type: 'join_room', roomId });
            });
          });
        </script>
      </body>
      </html>
    `;
  }
}
