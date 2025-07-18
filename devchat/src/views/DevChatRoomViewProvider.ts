import * as vscode from 'vscode';

export class DevChatRoomViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'devchat.roomView';

  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
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

    return /* html */ `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <link href="${styleUri}" rel="stylesheet" />
      </head>
      <body>
      <div class="chat-wrapper">
        <div class="chat-container">
          <div class="chat-message left">
            <div class="name">소영</div>
            <div class="bubble">안녕하세요!</div>
          </div>
          <div class="chat-message right">
            <div class="name">나</div>
            <div class="bubble">반갑습니다~!</div>
          </div>
          <div class="chat-message left">
            <div class="name">소영</div>
            <div class="bubble">지금 확장 개발 중이신가요?</div>
          </div>
          <div class="chat-message right">
            <div class="name">나</div>
            <div class="bubble">네! VS Code 확장이에요 :)</div>
          </div>
            <div class="chat-message left">
                <div class="name">소영</div>
                <div class="bubble">오 멋지네요! 어떤 기능이 있나요?</div>
            </div>
            <div class="chat-message right">
                <div class="name">나</div>
                <div class="bubble">채팅방 기능이랑 사용자 관리 기능이 있어요.</div>
            </div>
            <div class="chat-message left">
            <div class="name">소영</div>
            <div class="bubble">와우, 사용자 관리 기능은 어떤 식으로 구현되나요?</div>
            </div>  
        </div>
        <div class="input-area">
          <input type="text" id="messageInput" placeholder="메시지를 입력하세요..." />
          <button id="sendBtn">전송</button>
        </div>
        </div>

        <script>
          const container = document.getElementById("chatContainer");
          const input = document.getElementById("messageInput");
          const btn = document.getElementById("sendBtn");

          btn.addEventListener("click", () => {
            const msg = input.value.trim();
            if (msg) {
              const wrap = document.createElement("div");
              wrap.className = "chat-message right";
              wrap.innerHTML = \`
                <div class="name">나</div>
                <div class="bubble">\${msg}</div>
              \`;
              container.appendChild(wrap);
              input.value = "";
              container.scrollTop = container.scrollHeight;
            }
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") btn.click();
          });
        </script>
      </body>
      </html>
    `;
  }
}
