---
name: push-to-master
description: Stages all changes, commits with year-author message, and pushes to master. Use when the user runs /push or asks to push the current project content to master.
---

# Push to Master (`/push`)

When the user asks for `/push` (or equivalent: push current content to master), run this workflow in the current git project.

## Workflow

1. **Stage everything**

```bash
git add -A
```

2. **Commit** with message `<current_year>-<author>`

- `current_year`: calendar year from today's date (e.g. `2026`)
- `author`: use `galamo` unless the user names a different author
- Example message: `2026-galamo`
- Pass the message via HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
2026-galamo
EOF
)"
```

Replace `2026` and `galamo` with the actual year and author.

3. **Push to master**

```bash
git push -u origin HEAD:main
```

If the local branch is already `main`:

```bash
git push -u origin main
```

4. **Success reply**

After a successful push, reply with exactly:

```
the content updated
```

## Rules

- Do **not** amend commits
- Do **not** use `--force` / `--force-with-lease` unless the user explicitly asks
- Do **not** skip hooks (`--no-verify`)
- Do **not** update git config
- Do **not** push to a different branch name unless the user overrides

## Empty commit

If `git commit` reports nothing to commit, still push to master if the branch has unpushed commits. If there is nothing new to push either, reply with `the content updated` only after confirming the remote is up to date (or after a successful no-op push attempt).
