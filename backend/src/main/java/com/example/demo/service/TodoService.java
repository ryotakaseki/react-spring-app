package com.example.demo.service;

import com.example.demo.dto.TodoDto;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Serviceクラス (ビジネスロジック層)
 * TODOタスクに関する、データ操作やビジネスロジックを担当する。
 * DBの代わりとして、メモリ上にタスクのリストを保持する。
 */
@Service
public class TodoService {

    // タスクリストをメモリ上に保持する (DBの代わり)
    private final List<TodoDto> todos = new ArrayList<>();

    // タスクIDを自動で採番するためのカウンター
    private final AtomicLong counter = new AtomicLong();

    /**
     * アプリケーション起動時に、初期データを投入するためのメソッド。
     * @PostConstructアノテーションにより、このクラスの準備完了後に一度だけ実行される。
     */
    @PostConstruct
    public void init() {
        // 初期データを3件追加
        todos.add(new TodoDto(counter.incrementAndGet(), "Reactの学習", false));
        todos.add(new TodoDto(counter.incrementAndGet(), "Spring Bootの学習", false));
        todos.add(new TodoDto(counter.incrementAndGet(), "TODOアプリの作成", true));
    }

    // C: Create (作成)
    public TodoDto addTodo(String title) {
        long newId = counter.incrementAndGet(); // 新しいIDを採番
        TodoDto newTodo = new TodoDto(newId, title, false);
        todos.add(newTodo);
        return newTodo;
    }

    // R: Read (読み取り)
    public List<TodoDto> getAllTodos() {
        return todos;
    }

    // U: Update (更新)
    public Optional<TodoDto> updateTodo(Long id, boolean completed) {
        Optional<TodoDto> todoToUpdate = todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst();

        todoToUpdate.ifPresent(todo -> todo.setCompleted(completed));
        return todoToUpdate;
    }

    // D: Delete (削除)
    public boolean deleteTodo(Long id) {
        return todos.removeIf(todo -> todo.getId().equals(id));
    }
}
