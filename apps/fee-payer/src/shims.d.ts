declare module 'cloudflare:workers' {
	interface RateLimiter {
		limit(input: { key: string }): Promise<{ success: boolean }>
	}

	export const env: {
		ALLOWED_ORIGINS: string
		SPONSOR_PRIVATE_KEY: string
		TEMPO_RPC_URL: string
		INDEXSUPPLY_API_KEY: string
		AddressRateLimiter: RateLimiter
		REQUESTS_RATE_LIMITER?: RateLimiter
	}
}

declare module 'hono' {
	export type Next = () => Promise<void>

	export interface RequestContext extends Request {
		raw: Request
		path: string
		valid: <T = unknown>(type: string) => T
	}

	export interface Context {
		req: RequestContext
		json: (data: unknown, status?: number) => Response
	}

	export type MiddlewareHandler = (
		c: Context,
		next: Next,
	) => Response | Promise<Response | undefined> | undefined

	export class Hono {
		use(...args: Array<string | MiddlewareHandler>): this
		get(path: string, ...handlers: MiddlewareHandler[]): this
		all(path: string, ...handlers: MiddlewareHandler[]): this
	}
}

declare module 'hono/cors' {
	import type { MiddlewareHandler } from 'hono'

	interface CorsOptions {
		origin: (origin: string | undefined) => string | null
		allowMethods?: string[]
		allowHeaders?: string[]
		maxAge?: number
	}

	export function cors(options: CorsOptions): MiddlewareHandler
}

declare module 'hono/request' {
	export function cloneRawRequest(request: Request): Promise<Request>
}

declare module '@hono/zod-validator' {
	import type { MiddlewareHandler } from 'hono'
	import type { ZodTypeAny } from 'zod'

	export function zValidator(
		type: 'query' | 'json' | 'param' | 'form',
		schema: ZodTypeAny,
	): MiddlewareHandler
}

declare module 'tempo.ts/chains' {
	export interface TempoChain {
		id: number
	}

	export const tempo: TempoChain &
		((config?: { feeToken?: string }) => TempoChain)
}

declare module 'tempo.ts/server' {
	export interface FeePayerOptions {
		account: { address: string }
		chain: unknown
		transport: unknown
		onRequest?: (request: Request) => void | Promise<void>
	}

	export const Handler: {
		feePayer(options: FeePayerOptions): {
			fetch(request: Request): Promise<Response>
		}
	}
}

declare module 'tempo.ts/viem' {
	export interface Transaction {
		from: string
	}

	export const Transaction: {
		deserialize(serialized: `0x76${string}`): Transaction
	}

	export function withFeePayer<T>(options: T): T
}

declare module 'viem' {
	export function http(url: string): unknown
}

declare module 'viem/accounts' {
	export interface Account {
		address: string
	}

	export function privateKeyToAccount(key: `0x${string}`): Account
}

declare module 'zod' {
	export type ZodTypeAny = unknown
	export type ZodOptional<_T> = unknown

	export const coerce: {
		number(): ZodTypeAny
	}

	export function object<T extends Record<string, ZodTypeAny>>(
		shape: T,
	): ZodTypeAny
	export function optional<T>(schema: T): ZodOptional<T>
}

declare module 'ox' {
	export interface RpcRequest<TParams = unknown[]> {
		params?: TParams
	}

	export const RpcRequest: {
		from<TParams = unknown[]>(input: unknown): RpcRequest<TParams>
	}

	export namespace Address {
		type Address = string
	}
}

declare module 'idxs' {
	export interface IndexSupplyConfig {
		apiKey: string
	}

	export interface IndexSupply {
		apiKey: string
	}

	export interface AliasedExpression<T = unknown> {
		as(alias: string): T
	}

	export interface QueryBuilder<TSelection = unknown> {
		withSignatures(signatures: string[]): QueryBuilder<TSelection>
		selectFrom(table: string): QueryBuilder<TSelection>
		select<T>(selection: (eb: ExpressionBuilder) => T): QueryBuilder<T>
		where(
			column: string | AliasedExpression,
			comparator: string,
			value: unknown,
		): QueryBuilder<T>
		$if(
			condition: boolean,
			cb: (qb: QueryBuilder<T>) => QueryBuilder<T>,
		): QueryBuilder<T>
		executeTakeFirst<TResult = TSelection>(): Promise<TResult | undefined>
	}

	export interface ExpressionBuilder {
		fn: {
			sum(column: string): AliasedExpression
			count(column: string): AliasedExpression
		}
	}

	export const IndexSupply: {
		create(config: IndexSupplyConfig): IndexSupply
	}

	export const QueryBuilder: {
		from(indexSupply: IndexSupply): QueryBuilder
	}
}

declare module 'kysely' {
	import type { AliasedExpression } from 'idxs'

	export function sql<T = unknown>(
		strings: TemplateStringsArray,
		...values: unknown[]
	): AliasedExpression<T>
}
