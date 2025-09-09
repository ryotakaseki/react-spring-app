package com.example.todo.constants;

public class UrlConst {

    // APIのエンドポイント
    public static final String API_BASE_URL = "/api";
    public static final String API_LOGIN_URL = API_BASE_URL + "/login";
    public static final String API_MENU_MESSAGE_URL = API_BASE_URL + "/menu-message";

    // CORS設定
    public static final String CORS_ORIGIN = "http://localhost:5173"; // ReactアプリケーションのURL
    public static final String CORS_ALLOWED_HEADERS = "Content-Type, Authorization";
    public static final String CORS_EXPOSED_HEADERS = "Authorization";
    public static final String CORS_MAX_AGE = "3600"; // 1時間
    public static final String CORS_ALLOWED_CREDENTIALS = "true";
    public static final String CORS_ALLOWED_METHODS = "GET, POST, PUT, DELETE, OPTIONS";
}