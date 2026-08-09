# 10. Achado de segurança corrigido nesta sessão

**Credencial de banco de dados hardcoded** em [../lib/prisma.ts](../lib/prisma.ts): havia uma connection string completa do Neon Postgres (usuário e senha em texto plano) como valor de fallback caso `DATABASE_URL` não estivesse definida. Isso expõe credenciais reais no repositório (histórico de git incluído).

## Ação tomada
- Removido o fallback; agora o app lança erro explícito na inicialização se `DATABASE_URL` não estiver configurada, forçando uso de variável de ambiente.

## Ação recomendada (requer decisão do responsável pela infra)
1. Rotacionar a senha do usuário `neondb_owner` no Neon imediatamente (a credencial antiga deve ser considerada comprometida).
2. Verificar o histórico do Git — a credencial provavelmente já está em commits anteriores e deve ser tratada como vazada mesmo após a remoção do arquivo atual.
3. Confirmar que `.env`/`.env.local` estão no `.gitignore` e que `DATABASE_URL` é fornecida apenas via variáveis de ambiente do provedor de deploy.

## Outros riscos identificados (não corrigidos, requerem decisão de produto/arquitetura)
- Autorização por `userId` sem verificação de posse de sessão (IDOR) nas rotas `/api/account/*` e `/api/submissions` (GET/PATCH). Ver [06-api-routes.md](./06-api-routes.md).
- `/api/submissions` GET/PATCH não exige autenticação — qualquer pessoa com acesso à API pode listar submissões e aprovar/rejeitar artigos.
