import * as vscode from 'vscode';

export class DevChatMyPageViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'devchat.myPageView';

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

    return /* html */ `
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta name="color-scheme" content="light dark" />
          <link href="${styleUri}" rel="stylesheet" />
        </head>
        <body>
          <h3>마이페이지</h3>
          <label>이메일</label>
          <input type="email" placeholder="이메일" />
          <label>소속</label>
          <input type="text" placeholder="소속" />
          <label>경력/연차</label>
          <input type="text" placeholder="경력/연차" />
          <label>기술스택</label>
          <input type="text" placeholder="기술스택" />
          <button>수정하기</button>
        </body>
      </html>
    `;
  }
}
