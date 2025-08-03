#!/bin/bash

# プロジェクトディレクトリへ移動
cd ~/Desktop/project/react-springboot-app

# 作業ツリーの状態を確認（変更点があるかチェック）
git status

# 既存のバックアップブランチがあれば削除（強制）
git branch -D backup-main

# 現在の main ブランチを backup-main としてバックアップ
git branch backup-main main

# 履歴を持たない新しいブランチを作成（孤立ブランチ）
git checkout --orphan clean-main

# すべてのファイルをステージ解除（履歴をなくすため）
git reset

# すべてのファイルを新しい履歴としてステージに追加
git add -A

# 初回コミット（クリーンな履歴として）
git commit -m "初回コミット"

# 旧 main ブランチを削除
git branch -D main

# clean-main を main にリネーム
git branch -m clean-main main

# GitHubの main を強制上書き（注意：履歴が置き換わる）
git push -f origin main

# origin から不要なリモートブランチを掃除
git fetch -p origin

# 現在存在するリモートブランチ一覧を確認
git branch -r

# 不要なリモートブランチがあれば削除（例：other-branch）
# git push origin --delete other-branch

# タグ一覧を確認
git tag -l

# 不要なリモートタグがあれば削除（例：v1.0）
# git push origin --delete v1.0