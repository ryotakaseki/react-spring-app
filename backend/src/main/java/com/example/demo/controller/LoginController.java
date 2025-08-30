package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

import com.example.demo.constants.UrlConst;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = UrlConst.CORS_ORIGIN)
public class LoginController {

    /**
     * POSTリクエストの処理 (/api/login)
     *
     * POST: クライアントからサーバーへデータを送信するために使われる。
     *       リクエストの本体(body)にデータを含めることができる。
     *       主に、新しいデータの作成や、ログイン認証のようにサーバーの状態を変更する可能性のある操作で使われる。
     *       この例では、Reactから送られてくるログインコードを検証する。
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        // 固定のコード "" と一致するかチェック
        if ("".equals(code)) {
            // 成功レスポンス
            return ResponseEntity.ok(Collections.singletonMap("status", "success"));
        } else {
            // 失敗レスポンス (401 Unauthorized)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("status", "failure"));
        }
    }

    /**
     * GETリクエストの処理 (/api/menu-message)
     *
     * GET: サーバーから情報を取得するために使われる。
     *      リクエストにパラメータを含めることはできるが、主にURLのクエリ文字列として渡される。
     *      サーバー上のデータを変更しない、読み取り専用の操作で使われるのが原則。
     *      この例では、メニュー画面に表示する固定のメッセージをReactへ返す。
     */
    @GetMapping("/menu-message")
    public Map<String, String> getMenuMessage() {
        return Collections.singletonMap("message", "これはメニュー画面のメッセージです。");
    }
}
