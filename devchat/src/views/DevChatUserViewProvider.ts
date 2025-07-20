import * as vscode from 'vscode';

export class DevChatUserViewProvider implements vscode.WebviewViewProvider {
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

		webviewView.webview.onDidReceiveMessage((msg) => {
			if (msg.type === 'login_success') {
				vscode.commands.executeCommand('setContext', 'devchat.loggedIn', true);
				vscode.commands.executeCommand('devchat.mainView.focus');
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
		<h2>DevChat</h2>
		<h3>Welcome to DevChat</h3>
		<p>DevChat is chatting platform for Developers</p>

		<div id="loginView">
			<input type="text" id="username" placeholder="id" />
			<input type="password" id="password" placeholder="password" />
			<button id="loginBtn">Sign in</button>
			<button id="signupBtn">Sign up</button>
		</div>

		<div id="signupView" style="display: none;">
			<h3>Sign up</h3>
			<input type="text" id="signup_id" placeholder="id" />
			<input type="password" id="signup_pw" placeholder="password" />
			<input type="text" id="signup_org" placeholder="소속 (선택)" />
			<input type="number" id="signup_years" placeholder="경력 연차 (선택)" />
			<input type="email" id="signup_email" placeholder="이메일 (선택)" />
			<input type="text" id="signup_stack" placeholder="기술 스택 (예: React, Kotlin)" />
			<button id="submitSignupBtn">Sign up</button>
			<button id="cancelSignupBtn">cancel</button>
		</div>

		<script>
			const vscode = acquireVsCodeApi();

			// 로그인 화면
			document.getElementById("loginBtn").addEventListener("click", () => {
				const username = document.getElementById("username").value;
				const password = document.getElementById("password").value;
				if (username === 'admin' && password === '1234') {
					vscode.postMessage({ type: 'login_success' });
				}else {
					vscode.postMessage({ type: 'login', username, password });
				}
			});

			// 화면 전환: 회원가입
			document.getElementById("signupBtn").addEventListener("click", () => {
			document.getElementById("loginView").style.display = "none";
			document.getElementById("signupView").style.display = "block";
			});

			// 취소 → 다시 로그인 화면으로
			document.getElementById("cancelSignupBtn").addEventListener("click", () => {
			document.getElementById("signupView").style.display = "none";
			document.getElementById("loginView").style.display = "block";
			});

			// 회원가입 제출
			document.getElementById("submitSignupBtn").addEventListener("click", () => {
			const data = {
				id: document.getElementById("signup_id").value,
				pw: document.getElementById("signup_pw").value,
				org: document.getElementById("signup_org").value,
				years: document.getElementById("signup_years").value,
				email: document.getElementById("signup_email").value,
				stack: document.getElementById("signup_stack").value,
			};
			vscode.postMessage({ type: 'signup_submit', payload: data });
			});
		</script>
		</body>
		</html>
	`;
	}

}