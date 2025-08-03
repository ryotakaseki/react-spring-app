package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object)
 * フロントエンドとバックエンドの間で、TODOタスクのデータを転送するために使われる専用のクラス。
 * APIの「契約」を明確にする役割を持つ。
 */
@Data // @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor を自動生成するLombokのアノテーション
@NoArgsConstructor // 引数なしのコンストラクタを自動生成
@AllArgsConstructor // 全てのフィールドを引数に持つコンストラクタを自動生成
public class TodoDto {

    /**
     * タスクの一意なID
     */
    private Long id;

    /**
     * タスクのタイトル（内容）
     */
    private String title;

    /**
     * タスクが完了したかどうか (true: 完了, false: 未完了)
     */
    private boolean completed;
}
