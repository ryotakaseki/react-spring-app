package com.example.demo.controller;

import com.example.demo.dto.TodoDto;
import com.example.demo.service.TodoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import com.example.demo.constants.UrlConst;

/**
 * Controllerクラス (API層)
 * ReactからのHTTPリクエストを受け付ける窓口。
 * 自身ではロジックを持たず、TodoServiceに処理を依頼する。
 */
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    // TodoServiceを注入（DI: Dependency Injection）
    @Autowired
    private TodoService todoService;

    /**
     * GET /api/todos
     * 全てのTODOタスクを取得するAPI
     */
    @GetMapping
    public List<TodoDto> getAllTodos() {
        return todoService.getAllTodos();
    }

    /**
     * POST /api/todos
     * 新しいTODOタスクを作成するAPI
     * @param payload リクエストボディ (例: {"title": "新しいタスク"})
     */
    @PostMapping
    public TodoDto createTodo(@RequestBody Map<String, String> payload) {
        return todoService.addTodo(payload.get("title"));
    }

    /**
     * PUT /api/todos/{id}
     * 指定されたIDのタスクの状態（完了/未完了）を更新するAPI
     * @param id パス変数 (URLに含まれるID)
     * @param payload リクエストボディ (例: {"completed": true})
     */
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        return todoService.updateTodo(id, payload.get("completed"))
                .map(ResponseEntity::ok) // 更新成功時 (200 OK)
                .orElse(ResponseEntity.notFound().build()); // 対象が見つからない場合 (404 Not Found)
    }

    /**
     * DELETE /api/todos/{id}
     * 指定されたIDのタスクを削除するAPI
     * @param id パス変数 (URLに含まれるID)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (todoService.deleteTodo(id)) {
            return ResponseEntity.noContent().build(); // 削除成功時 (204 No Content)
        } else {
            return ResponseEntity.notFound().build(); // 対象が見つからない場合 (404 Not Found)
        }
    }
}
