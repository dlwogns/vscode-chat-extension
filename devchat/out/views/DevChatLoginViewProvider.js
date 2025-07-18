"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevChatUserViewProvider = void 0;
const vscode = __importStar(require("vscode"));
class DevChatUserViewProvider {
    extensionUri;
    constructor(extensionUri) {
        this.extensionUri = extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };
        webviewView.webview.html = this.getHtml(webviewView.webview);
    }
    getHtml(webview) {
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'base.css'));
        return `
		<!DOCTYPE html>
		<html lang="ko">
		<head>
		<meta charset="UTF-8" />
		<meta name="color-scheme" content="light dark" />
		<link href="${styleUri}" rel="stylesheet" />
		</head>
		<body>
		<div id="loginView">
			<h3>로그인</h3>
			<input type="text" id="username" placeholder="아이디" />
			<input type="password" id="password" placeholder="비밀번호" />
			<button id="loginBtn">로그인</button>
			<button id="signupBtn">회원가입</button>
		</div>

		<div id="signupView" style="display: none;">
			<h3>회원가입</h3>
			<input type="text" id="signup_id" placeholder="아이디" />
			<input type="password" id="signup_pw" placeholder="비밀번호" />
			<input type="text" id="signup_org" placeholder="소속 (선택)" />
			<input type="number" id="signup_years" placeholder="경력 연차 (선택)" />
			<input type="email" id="signup_email" placeholder="이메일 (선택)" />
			<input type="text" id="signup_stack" placeholder="기술 스택 (예: React, Kotlin)" />
			<button id="submitSignupBtn">가입하기</button>
			<button id="cancelSignupBtn">취소</button>
		</div>

		<script>
			const vscode = acquireVsCodeApi();

			// 로그인 화면
			document.getElementById("loginBtn").addEventListener("click", () => {
			const username = document.getElementById("username").value;
			const password = document.getElementById("password").value;
			vscode.postMessage({ type: 'login', username, password });
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
exports.DevChatUserViewProvider = DevChatUserViewProvider;
//# sourceMappingURL=DevChatLoginViewProvider.js.map