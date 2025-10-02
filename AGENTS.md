# AGENT CODING GUIDELINES

This document outlines the conventions and commands for agentic development in this repository.

## 1. Build, Lint, and Test Commands

| Action | Frontend (React/TS) | Backend (Go) | Notes |
| :--- | :--- | :--- | :--- |
| **Build** | `npm run build` | `go build ./...` | Assumes standard scripts. |
| **Lint** | `npm run lint` | N/A | Use project-specific linting. |
| **All Tests** | `npm test` | `go test ./...` | Run before every commit. |
| **Single Test** | `npm test -- <path>` | `go test -run <TestName> <pkg>` | Use the specific test runner syntax. |

## 2. Code Style and Conventions

### General
*   **Idiomatic Code:** Adhere strictly to existing code style (e.g., Go Fmt, TypeScript/Prettier).
*   **Imports:** Use absolute paths where possible. Group imports logically (external, internal, relative).
*   **Error Handling:** Go must use explicit error checking (`if err != nil`). TypeScript should use `try/catch` for async operations and robust type guards.
*   **Naming:** Use `camelCase` for TypeScript variables/functions and `PascalCase` for components/types. Use `PascalCase` for Go types and `camelCase` or `snake_case` for variables/functions as per existing code.
*   **Types:** Use TypeScript's strong typing. In Go, prefer interfaces for abstraction.
*   **Comments:** Use sparingly. Explain *why* a piece of complex logic exists, not *what* it does.
