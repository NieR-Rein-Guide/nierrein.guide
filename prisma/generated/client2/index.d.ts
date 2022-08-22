
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model loadout_slots
 * 
 */
export type loadout_slots = {
  id: number
  loadoutId: number
  slot_position: number
  costume_id: number | null
  weapon_1_id: number | null
  weapon_2_id: number | null
  weapon_3_id: number | null
  companion_id: number | null
  debris_id: number | null
  memoir_1_id: number | null
  memoir_2_id: number | null
  memoir_3_id: number | null
}

/**
 * Model loadouts
 * 
 */
export type loadouts = {
  loadout_id: number
  title: string
  description: string | null
  type: string
  created_at: Date | null
  slug: string
  attribute: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Loadout_slots
 * const loadout_slots = await prisma.loadout_slots.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Loadout_slots
   * const loadout_slots = await prisma.loadout_slots.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.loadout_slots`: Exposes CRUD operations for the **loadout_slots** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loadout_slots
    * const loadout_slots = await prisma.loadout_slots.findMany()
    * ```
    */
  get loadout_slots(): Prisma.loadout_slotsDelegate<GlobalReject>;

  /**
   * `prisma.loadouts`: Exposes CRUD operations for the **loadouts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loadouts
    * const loadouts = await prisma.loadouts.findMany()
    * ```
    */
  get loadouts(): Prisma.loadoutsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Prisma Client JS version: 3.15.2
   * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    loadout_slots: 'loadout_slots',
    loadouts: 'loadouts'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LoadoutsCountOutputType
   */


  export type LoadoutsCountOutputType = {
    loadout_slots: number
  }

  export type LoadoutsCountOutputTypeSelect = {
    loadout_slots?: boolean
  }

  export type LoadoutsCountOutputTypeGetPayload<
    S extends boolean | null | undefined | LoadoutsCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? LoadoutsCountOutputType
    : S extends undefined
    ? never
    : S extends LoadoutsCountOutputTypeArgs
    ?'include' extends U
    ? LoadoutsCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof LoadoutsCountOutputType ? LoadoutsCountOutputType[P] : never
  } 
    : LoadoutsCountOutputType
  : LoadoutsCountOutputType




  // Custom InputTypes

  /**
   * LoadoutsCountOutputType without action
   */
  export type LoadoutsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LoadoutsCountOutputType
     * 
    **/
    select?: LoadoutsCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model loadout_slots
   */


  export type AggregateLoadout_slots = {
    _count: Loadout_slotsCountAggregateOutputType | null
    _avg: Loadout_slotsAvgAggregateOutputType | null
    _sum: Loadout_slotsSumAggregateOutputType | null
    _min: Loadout_slotsMinAggregateOutputType | null
    _max: Loadout_slotsMaxAggregateOutputType | null
  }

  export type Loadout_slotsAvgAggregateOutputType = {
    id: number | null
    loadoutId: number | null
    slot_position: number | null
    costume_id: number | null
    weapon_1_id: number | null
    weapon_2_id: number | null
    weapon_3_id: number | null
    companion_id: number | null
    debris_id: number | null
    memoir_1_id: number | null
    memoir_2_id: number | null
    memoir_3_id: number | null
  }

  export type Loadout_slotsSumAggregateOutputType = {
    id: number | null
    loadoutId: number | null
    slot_position: number | null
    costume_id: number | null
    weapon_1_id: number | null
    weapon_2_id: number | null
    weapon_3_id: number | null
    companion_id: number | null
    debris_id: number | null
    memoir_1_id: number | null
    memoir_2_id: number | null
    memoir_3_id: number | null
  }

  export type Loadout_slotsMinAggregateOutputType = {
    id: number | null
    loadoutId: number | null
    slot_position: number | null
    costume_id: number | null
    weapon_1_id: number | null
    weapon_2_id: number | null
    weapon_3_id: number | null
    companion_id: number | null
    debris_id: number | null
    memoir_1_id: number | null
    memoir_2_id: number | null
    memoir_3_id: number | null
  }

  export type Loadout_slotsMaxAggregateOutputType = {
    id: number | null
    loadoutId: number | null
    slot_position: number | null
    costume_id: number | null
    weapon_1_id: number | null
    weapon_2_id: number | null
    weapon_3_id: number | null
    companion_id: number | null
    debris_id: number | null
    memoir_1_id: number | null
    memoir_2_id: number | null
    memoir_3_id: number | null
  }

  export type Loadout_slotsCountAggregateOutputType = {
    id: number
    loadoutId: number
    slot_position: number
    costume_id: number
    weapon_1_id: number
    weapon_2_id: number
    weapon_3_id: number
    companion_id: number
    debris_id: number
    memoir_1_id: number
    memoir_2_id: number
    memoir_3_id: number
    _all: number
  }


  export type Loadout_slotsAvgAggregateInputType = {
    id?: true
    loadoutId?: true
    slot_position?: true
    costume_id?: true
    weapon_1_id?: true
    weapon_2_id?: true
    weapon_3_id?: true
    companion_id?: true
    debris_id?: true
    memoir_1_id?: true
    memoir_2_id?: true
    memoir_3_id?: true
  }

  export type Loadout_slotsSumAggregateInputType = {
    id?: true
    loadoutId?: true
    slot_position?: true
    costume_id?: true
    weapon_1_id?: true
    weapon_2_id?: true
    weapon_3_id?: true
    companion_id?: true
    debris_id?: true
    memoir_1_id?: true
    memoir_2_id?: true
    memoir_3_id?: true
  }

  export type Loadout_slotsMinAggregateInputType = {
    id?: true
    loadoutId?: true
    slot_position?: true
    costume_id?: true
    weapon_1_id?: true
    weapon_2_id?: true
    weapon_3_id?: true
    companion_id?: true
    debris_id?: true
    memoir_1_id?: true
    memoir_2_id?: true
    memoir_3_id?: true
  }

  export type Loadout_slotsMaxAggregateInputType = {
    id?: true
    loadoutId?: true
    slot_position?: true
    costume_id?: true
    weapon_1_id?: true
    weapon_2_id?: true
    weapon_3_id?: true
    companion_id?: true
    debris_id?: true
    memoir_1_id?: true
    memoir_2_id?: true
    memoir_3_id?: true
  }

  export type Loadout_slotsCountAggregateInputType = {
    id?: true
    loadoutId?: true
    slot_position?: true
    costume_id?: true
    weapon_1_id?: true
    weapon_2_id?: true
    weapon_3_id?: true
    companion_id?: true
    debris_id?: true
    memoir_1_id?: true
    memoir_2_id?: true
    memoir_3_id?: true
    _all?: true
  }

  export type Loadout_slotsAggregateArgs = {
    /**
     * Filter which loadout_slots to aggregate.
     * 
    **/
    where?: loadout_slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of loadout_slots to fetch.
     * 
    **/
    orderBy?: Enumerable<loadout_slotsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: loadout_slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` loadout_slots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` loadout_slots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned loadout_slots
    **/
    _count?: true | Loadout_slotsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Loadout_slotsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Loadout_slotsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Loadout_slotsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Loadout_slotsMaxAggregateInputType
  }

  export type GetLoadout_slotsAggregateType<T extends Loadout_slotsAggregateArgs> = {
        [P in keyof T & keyof AggregateLoadout_slots]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoadout_slots[P]>
      : GetScalarType<T[P], AggregateLoadout_slots[P]>
  }




  export type Loadout_slotsGroupByArgs = {
    where?: loadout_slotsWhereInput
    orderBy?: Enumerable<loadout_slotsOrderByWithAggregationInput>
    by: Array<Loadout_slotsScalarFieldEnum>
    having?: loadout_slotsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Loadout_slotsCountAggregateInputType | true
    _avg?: Loadout_slotsAvgAggregateInputType
    _sum?: Loadout_slotsSumAggregateInputType
    _min?: Loadout_slotsMinAggregateInputType
    _max?: Loadout_slotsMaxAggregateInputType
  }


  export type Loadout_slotsGroupByOutputType = {
    id: number
    loadoutId: number
    slot_position: number
    costume_id: number | null
    weapon_1_id: number | null
    weapon_2_id: number | null
    weapon_3_id: number | null
    companion_id: number | null
    debris_id: number | null
    memoir_1_id: number | null
    memoir_2_id: number | null
    memoir_3_id: number | null
    _count: Loadout_slotsCountAggregateOutputType | null
    _avg: Loadout_slotsAvgAggregateOutputType | null
    _sum: Loadout_slotsSumAggregateOutputType | null
    _min: Loadout_slotsMinAggregateOutputType | null
    _max: Loadout_slotsMaxAggregateOutputType | null
  }

  type GetLoadout_slotsGroupByPayload<T extends Loadout_slotsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Loadout_slotsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Loadout_slotsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Loadout_slotsGroupByOutputType[P]>
            : GetScalarType<T[P], Loadout_slotsGroupByOutputType[P]>
        }
      >
    >


  export type loadout_slotsSelect = {
    id?: boolean
    loadoutId?: boolean
    slot_position?: boolean
    costume_id?: boolean
    weapon_1_id?: boolean
    weapon_2_id?: boolean
    weapon_3_id?: boolean
    companion_id?: boolean
    debris_id?: boolean
    memoir_1_id?: boolean
    memoir_2_id?: boolean
    memoir_3_id?: boolean
    loadout?: boolean | loadoutsArgs
  }

  export type loadout_slotsInclude = {
    loadout?: boolean | loadoutsArgs
  }

  export type loadout_slotsGetPayload<
    S extends boolean | null | undefined | loadout_slotsArgs,
    U = keyof S
      > = S extends true
        ? loadout_slots
    : S extends undefined
    ? never
    : S extends loadout_slotsArgs | loadout_slotsFindManyArgs
    ?'include' extends U
    ? loadout_slots  & {
    [P in TrueKeys<S['include']>]:
        P extends 'loadout' ? loadoutsGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'loadout' ? loadoutsGetPayload<S['select'][P]> :  P extends keyof loadout_slots ? loadout_slots[P] : never
  } 
    : loadout_slots
  : loadout_slots


  type loadout_slotsCountArgs = Merge<
    Omit<loadout_slotsFindManyArgs, 'select' | 'include'> & {
      select?: Loadout_slotsCountAggregateInputType | true
    }
  >

  export interface loadout_slotsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Loadout_slots that matches the filter.
     * @param {loadout_slotsFindUniqueArgs} args - Arguments to find a Loadout_slots
     * @example
     * // Get one Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends loadout_slotsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, loadout_slotsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'loadout_slots'> extends True ? CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots>, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T>>> : CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots | null >, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T> | null >>

    /**
     * Find the first Loadout_slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadout_slotsFindFirstArgs} args - Arguments to find a Loadout_slots
     * @example
     * // Get one Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends loadout_slotsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, loadout_slotsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'loadout_slots'> extends True ? CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots>, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T>>> : CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots | null >, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T> | null >>

    /**
     * Find zero or more Loadout_slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadout_slotsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.findMany()
     * 
     * // Get first 10 Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loadout_slotsWithIdOnly = await prisma.loadout_slots.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends loadout_slotsFindManyArgs>(
      args?: SelectSubset<T, loadout_slotsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<loadout_slots>>, PrismaPromise<Array<loadout_slotsGetPayload<T>>>>

    /**
     * Create a Loadout_slots.
     * @param {loadout_slotsCreateArgs} args - Arguments to create a Loadout_slots.
     * @example
     * // Create one Loadout_slots
     * const Loadout_slots = await prisma.loadout_slots.create({
     *   data: {
     *     // ... data to create a Loadout_slots
     *   }
     * })
     * 
    **/
    create<T extends loadout_slotsCreateArgs>(
      args: SelectSubset<T, loadout_slotsCreateArgs>
    ): CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots>, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T>>>

    /**
     * Create many Loadout_slots.
     *     @param {loadout_slotsCreateManyArgs} args - Arguments to create many Loadout_slots.
     *     @example
     *     // Create many Loadout_slots
     *     const loadout_slots = await prisma.loadout_slots.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends loadout_slotsCreateManyArgs>(
      args?: SelectSubset<T, loadout_slotsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Loadout_slots.
     * @param {loadout_slotsDeleteArgs} args - Arguments to delete one Loadout_slots.
     * @example
     * // Delete one Loadout_slots
     * const Loadout_slots = await prisma.loadout_slots.delete({
     *   where: {
     *     // ... filter to delete one Loadout_slots
     *   }
     * })
     * 
    **/
    delete<T extends loadout_slotsDeleteArgs>(
      args: SelectSubset<T, loadout_slotsDeleteArgs>
    ): CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots>, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T>>>

    /**
     * Update one Loadout_slots.
     * @param {loadout_slotsUpdateArgs} args - Arguments to update one Loadout_slots.
     * @example
     * // Update one Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends loadout_slotsUpdateArgs>(
      args: SelectSubset<T, loadout_slotsUpdateArgs>
    ): CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots>, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T>>>

    /**
     * Delete zero or more Loadout_slots.
     * @param {loadout_slotsDeleteManyArgs} args - Arguments to filter Loadout_slots to delete.
     * @example
     * // Delete a few Loadout_slots
     * const { count } = await prisma.loadout_slots.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends loadout_slotsDeleteManyArgs>(
      args?: SelectSubset<T, loadout_slotsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loadout_slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadout_slotsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends loadout_slotsUpdateManyArgs>(
      args: SelectSubset<T, loadout_slotsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Loadout_slots.
     * @param {loadout_slotsUpsertArgs} args - Arguments to update or create a Loadout_slots.
     * @example
     * // Update or create a Loadout_slots
     * const loadout_slots = await prisma.loadout_slots.upsert({
     *   create: {
     *     // ... data to create a Loadout_slots
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loadout_slots we want to update
     *   }
     * })
    **/
    upsert<T extends loadout_slotsUpsertArgs>(
      args: SelectSubset<T, loadout_slotsUpsertArgs>
    ): CheckSelect<T, Prisma__loadout_slotsClient<loadout_slots>, Prisma__loadout_slotsClient<loadout_slotsGetPayload<T>>>

    /**
     * Count the number of Loadout_slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadout_slotsCountArgs} args - Arguments to filter Loadout_slots to count.
     * @example
     * // Count the number of Loadout_slots
     * const count = await prisma.loadout_slots.count({
     *   where: {
     *     // ... the filter for the Loadout_slots we want to count
     *   }
     * })
    **/
    count<T extends loadout_slotsCountArgs>(
      args?: Subset<T, loadout_slotsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Loadout_slotsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loadout_slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Loadout_slotsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Loadout_slotsAggregateArgs>(args: Subset<T, Loadout_slotsAggregateArgs>): PrismaPromise<GetLoadout_slotsAggregateType<T>>

    /**
     * Group by Loadout_slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Loadout_slotsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Loadout_slotsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Loadout_slotsGroupByArgs['orderBy'] }
        : { orderBy?: Loadout_slotsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Loadout_slotsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoadout_slotsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for loadout_slots.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__loadout_slotsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    loadout<T extends loadoutsArgs = {}>(args?: Subset<T, loadoutsArgs>): CheckSelect<T, Prisma__loadoutsClient<loadouts | null >, Prisma__loadoutsClient<loadoutsGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * loadout_slots findUnique
   */
  export type loadout_slotsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * Throw an Error if a loadout_slots can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which loadout_slots to fetch.
     * 
    **/
    where: loadout_slotsWhereUniqueInput
  }


  /**
   * loadout_slots findFirst
   */
  export type loadout_slotsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * Throw an Error if a loadout_slots can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which loadout_slots to fetch.
     * 
    **/
    where?: loadout_slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of loadout_slots to fetch.
     * 
    **/
    orderBy?: Enumerable<loadout_slotsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for loadout_slots.
     * 
    **/
    cursor?: loadout_slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` loadout_slots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` loadout_slots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of loadout_slots.
     * 
    **/
    distinct?: Enumerable<Loadout_slotsScalarFieldEnum>
  }


  /**
   * loadout_slots findMany
   */
  export type loadout_slotsFindManyArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * Filter, which loadout_slots to fetch.
     * 
    **/
    where?: loadout_slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of loadout_slots to fetch.
     * 
    **/
    orderBy?: Enumerable<loadout_slotsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing loadout_slots.
     * 
    **/
    cursor?: loadout_slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` loadout_slots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` loadout_slots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Loadout_slotsScalarFieldEnum>
  }


  /**
   * loadout_slots create
   */
  export type loadout_slotsCreateArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * The data needed to create a loadout_slots.
     * 
    **/
    data: XOR<loadout_slotsCreateInput, loadout_slotsUncheckedCreateInput>
  }


  /**
   * loadout_slots createMany
   */
  export type loadout_slotsCreateManyArgs = {
    /**
     * The data used to create many loadout_slots.
     * 
    **/
    data: Enumerable<loadout_slotsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * loadout_slots update
   */
  export type loadout_slotsUpdateArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * The data needed to update a loadout_slots.
     * 
    **/
    data: XOR<loadout_slotsUpdateInput, loadout_slotsUncheckedUpdateInput>
    /**
     * Choose, which loadout_slots to update.
     * 
    **/
    where: loadout_slotsWhereUniqueInput
  }


  /**
   * loadout_slots updateMany
   */
  export type loadout_slotsUpdateManyArgs = {
    /**
     * The data used to update loadout_slots.
     * 
    **/
    data: XOR<loadout_slotsUpdateManyMutationInput, loadout_slotsUncheckedUpdateManyInput>
    /**
     * Filter which loadout_slots to update
     * 
    **/
    where?: loadout_slotsWhereInput
  }


  /**
   * loadout_slots upsert
   */
  export type loadout_slotsUpsertArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * The filter to search for the loadout_slots to update in case it exists.
     * 
    **/
    where: loadout_slotsWhereUniqueInput
    /**
     * In case the loadout_slots found by the `where` argument doesn't exist, create a new loadout_slots with this data.
     * 
    **/
    create: XOR<loadout_slotsCreateInput, loadout_slotsUncheckedCreateInput>
    /**
     * In case the loadout_slots was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<loadout_slotsUpdateInput, loadout_slotsUncheckedUpdateInput>
  }


  /**
   * loadout_slots delete
   */
  export type loadout_slotsDeleteArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
    /**
     * Filter which loadout_slots to delete.
     * 
    **/
    where: loadout_slotsWhereUniqueInput
  }


  /**
   * loadout_slots deleteMany
   */
  export type loadout_slotsDeleteManyArgs = {
    /**
     * Filter which loadout_slots to delete
     * 
    **/
    where?: loadout_slotsWhereInput
  }


  /**
   * loadout_slots without action
   */
  export type loadout_slotsArgs = {
    /**
     * Select specific fields to fetch from the loadout_slots
     * 
    **/
    select?: loadout_slotsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadout_slotsInclude | null
  }



  /**
   * Model loadouts
   */


  export type AggregateLoadouts = {
    _count: LoadoutsCountAggregateOutputType | null
    _avg: LoadoutsAvgAggregateOutputType | null
    _sum: LoadoutsSumAggregateOutputType | null
    _min: LoadoutsMinAggregateOutputType | null
    _max: LoadoutsMaxAggregateOutputType | null
  }

  export type LoadoutsAvgAggregateOutputType = {
    loadout_id: number | null
  }

  export type LoadoutsSumAggregateOutputType = {
    loadout_id: number | null
  }

  export type LoadoutsMinAggregateOutputType = {
    loadout_id: number | null
    title: string | null
    description: string | null
    type: string | null
    created_at: Date | null
    slug: string | null
    attribute: string | null
  }

  export type LoadoutsMaxAggregateOutputType = {
    loadout_id: number | null
    title: string | null
    description: string | null
    type: string | null
    created_at: Date | null
    slug: string | null
    attribute: string | null
  }

  export type LoadoutsCountAggregateOutputType = {
    loadout_id: number
    title: number
    description: number
    type: number
    created_at: number
    slug: number
    attribute: number
    _all: number
  }


  export type LoadoutsAvgAggregateInputType = {
    loadout_id?: true
  }

  export type LoadoutsSumAggregateInputType = {
    loadout_id?: true
  }

  export type LoadoutsMinAggregateInputType = {
    loadout_id?: true
    title?: true
    description?: true
    type?: true
    created_at?: true
    slug?: true
    attribute?: true
  }

  export type LoadoutsMaxAggregateInputType = {
    loadout_id?: true
    title?: true
    description?: true
    type?: true
    created_at?: true
    slug?: true
    attribute?: true
  }

  export type LoadoutsCountAggregateInputType = {
    loadout_id?: true
    title?: true
    description?: true
    type?: true
    created_at?: true
    slug?: true
    attribute?: true
    _all?: true
  }

  export type LoadoutsAggregateArgs = {
    /**
     * Filter which loadouts to aggregate.
     * 
    **/
    where?: loadoutsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of loadouts to fetch.
     * 
    **/
    orderBy?: Enumerable<loadoutsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: loadoutsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` loadouts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` loadouts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned loadouts
    **/
    _count?: true | LoadoutsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoadoutsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoadoutsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoadoutsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoadoutsMaxAggregateInputType
  }

  export type GetLoadoutsAggregateType<T extends LoadoutsAggregateArgs> = {
        [P in keyof T & keyof AggregateLoadouts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoadouts[P]>
      : GetScalarType<T[P], AggregateLoadouts[P]>
  }




  export type LoadoutsGroupByArgs = {
    where?: loadoutsWhereInput
    orderBy?: Enumerable<loadoutsOrderByWithAggregationInput>
    by: Array<LoadoutsScalarFieldEnum>
    having?: loadoutsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoadoutsCountAggregateInputType | true
    _avg?: LoadoutsAvgAggregateInputType
    _sum?: LoadoutsSumAggregateInputType
    _min?: LoadoutsMinAggregateInputType
    _max?: LoadoutsMaxAggregateInputType
  }


  export type LoadoutsGroupByOutputType = {
    loadout_id: number
    title: string
    description: string | null
    type: string
    created_at: Date | null
    slug: string
    attribute: string
    _count: LoadoutsCountAggregateOutputType | null
    _avg: LoadoutsAvgAggregateOutputType | null
    _sum: LoadoutsSumAggregateOutputType | null
    _min: LoadoutsMinAggregateOutputType | null
    _max: LoadoutsMaxAggregateOutputType | null
  }

  type GetLoadoutsGroupByPayload<T extends LoadoutsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LoadoutsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoadoutsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoadoutsGroupByOutputType[P]>
            : GetScalarType<T[P], LoadoutsGroupByOutputType[P]>
        }
      >
    >


  export type loadoutsSelect = {
    loadout_id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    created_at?: boolean
    slug?: boolean
    attribute?: boolean
    loadout_slots?: boolean | loadout_slotsFindManyArgs
    _count?: boolean | LoadoutsCountOutputTypeArgs
  }

  export type loadoutsInclude = {
    loadout_slots?: boolean | loadout_slotsFindManyArgs
    _count?: boolean | LoadoutsCountOutputTypeArgs
  }

  export type loadoutsGetPayload<
    S extends boolean | null | undefined | loadoutsArgs,
    U = keyof S
      > = S extends true
        ? loadouts
    : S extends undefined
    ? never
    : S extends loadoutsArgs | loadoutsFindManyArgs
    ?'include' extends U
    ? loadouts  & {
    [P in TrueKeys<S['include']>]:
        P extends 'loadout_slots' ? Array < loadout_slotsGetPayload<S['include'][P]>>  :
        P extends '_count' ? LoadoutsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'loadout_slots' ? Array < loadout_slotsGetPayload<S['select'][P]>>  :
        P extends '_count' ? LoadoutsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof loadouts ? loadouts[P] : never
  } 
    : loadouts
  : loadouts


  type loadoutsCountArgs = Merge<
    Omit<loadoutsFindManyArgs, 'select' | 'include'> & {
      select?: LoadoutsCountAggregateInputType | true
    }
  >

  export interface loadoutsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Loadouts that matches the filter.
     * @param {loadoutsFindUniqueArgs} args - Arguments to find a Loadouts
     * @example
     * // Get one Loadouts
     * const loadouts = await prisma.loadouts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends loadoutsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, loadoutsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'loadouts'> extends True ? CheckSelect<T, Prisma__loadoutsClient<loadouts>, Prisma__loadoutsClient<loadoutsGetPayload<T>>> : CheckSelect<T, Prisma__loadoutsClient<loadouts | null >, Prisma__loadoutsClient<loadoutsGetPayload<T> | null >>

    /**
     * Find the first Loadouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadoutsFindFirstArgs} args - Arguments to find a Loadouts
     * @example
     * // Get one Loadouts
     * const loadouts = await prisma.loadouts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends loadoutsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, loadoutsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'loadouts'> extends True ? CheckSelect<T, Prisma__loadoutsClient<loadouts>, Prisma__loadoutsClient<loadoutsGetPayload<T>>> : CheckSelect<T, Prisma__loadoutsClient<loadouts | null >, Prisma__loadoutsClient<loadoutsGetPayload<T> | null >>

    /**
     * Find zero or more Loadouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadoutsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loadouts
     * const loadouts = await prisma.loadouts.findMany()
     * 
     * // Get first 10 Loadouts
     * const loadouts = await prisma.loadouts.findMany({ take: 10 })
     * 
     * // Only select the `loadout_id`
     * const loadoutsWithLoadout_idOnly = await prisma.loadouts.findMany({ select: { loadout_id: true } })
     * 
    **/
    findMany<T extends loadoutsFindManyArgs>(
      args?: SelectSubset<T, loadoutsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<loadouts>>, PrismaPromise<Array<loadoutsGetPayload<T>>>>

    /**
     * Create a Loadouts.
     * @param {loadoutsCreateArgs} args - Arguments to create a Loadouts.
     * @example
     * // Create one Loadouts
     * const Loadouts = await prisma.loadouts.create({
     *   data: {
     *     // ... data to create a Loadouts
     *   }
     * })
     * 
    **/
    create<T extends loadoutsCreateArgs>(
      args: SelectSubset<T, loadoutsCreateArgs>
    ): CheckSelect<T, Prisma__loadoutsClient<loadouts>, Prisma__loadoutsClient<loadoutsGetPayload<T>>>

    /**
     * Create many Loadouts.
     *     @param {loadoutsCreateManyArgs} args - Arguments to create many Loadouts.
     *     @example
     *     // Create many Loadouts
     *     const loadouts = await prisma.loadouts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends loadoutsCreateManyArgs>(
      args?: SelectSubset<T, loadoutsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Loadouts.
     * @param {loadoutsDeleteArgs} args - Arguments to delete one Loadouts.
     * @example
     * // Delete one Loadouts
     * const Loadouts = await prisma.loadouts.delete({
     *   where: {
     *     // ... filter to delete one Loadouts
     *   }
     * })
     * 
    **/
    delete<T extends loadoutsDeleteArgs>(
      args: SelectSubset<T, loadoutsDeleteArgs>
    ): CheckSelect<T, Prisma__loadoutsClient<loadouts>, Prisma__loadoutsClient<loadoutsGetPayload<T>>>

    /**
     * Update one Loadouts.
     * @param {loadoutsUpdateArgs} args - Arguments to update one Loadouts.
     * @example
     * // Update one Loadouts
     * const loadouts = await prisma.loadouts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends loadoutsUpdateArgs>(
      args: SelectSubset<T, loadoutsUpdateArgs>
    ): CheckSelect<T, Prisma__loadoutsClient<loadouts>, Prisma__loadoutsClient<loadoutsGetPayload<T>>>

    /**
     * Delete zero or more Loadouts.
     * @param {loadoutsDeleteManyArgs} args - Arguments to filter Loadouts to delete.
     * @example
     * // Delete a few Loadouts
     * const { count } = await prisma.loadouts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends loadoutsDeleteManyArgs>(
      args?: SelectSubset<T, loadoutsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loadouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadoutsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loadouts
     * const loadouts = await prisma.loadouts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends loadoutsUpdateManyArgs>(
      args: SelectSubset<T, loadoutsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Loadouts.
     * @param {loadoutsUpsertArgs} args - Arguments to update or create a Loadouts.
     * @example
     * // Update or create a Loadouts
     * const loadouts = await prisma.loadouts.upsert({
     *   create: {
     *     // ... data to create a Loadouts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loadouts we want to update
     *   }
     * })
    **/
    upsert<T extends loadoutsUpsertArgs>(
      args: SelectSubset<T, loadoutsUpsertArgs>
    ): CheckSelect<T, Prisma__loadoutsClient<loadouts>, Prisma__loadoutsClient<loadoutsGetPayload<T>>>

    /**
     * Count the number of Loadouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {loadoutsCountArgs} args - Arguments to filter Loadouts to count.
     * @example
     * // Count the number of Loadouts
     * const count = await prisma.loadouts.count({
     *   where: {
     *     // ... the filter for the Loadouts we want to count
     *   }
     * })
    **/
    count<T extends loadoutsCountArgs>(
      args?: Subset<T, loadoutsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoadoutsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loadouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoadoutsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoadoutsAggregateArgs>(args: Subset<T, LoadoutsAggregateArgs>): PrismaPromise<GetLoadoutsAggregateType<T>>

    /**
     * Group by Loadouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoadoutsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoadoutsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoadoutsGroupByArgs['orderBy'] }
        : { orderBy?: LoadoutsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoadoutsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoadoutsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for loadouts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__loadoutsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    loadout_slots<T extends loadout_slotsFindManyArgs = {}>(args?: Subset<T, loadout_slotsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<loadout_slots>>, PrismaPromise<Array<loadout_slotsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * loadouts findUnique
   */
  export type loadoutsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * Throw an Error if a loadouts can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which loadouts to fetch.
     * 
    **/
    where: loadoutsWhereUniqueInput
  }


  /**
   * loadouts findFirst
   */
  export type loadoutsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * Throw an Error if a loadouts can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which loadouts to fetch.
     * 
    **/
    where?: loadoutsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of loadouts to fetch.
     * 
    **/
    orderBy?: Enumerable<loadoutsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for loadouts.
     * 
    **/
    cursor?: loadoutsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` loadouts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` loadouts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of loadouts.
     * 
    **/
    distinct?: Enumerable<LoadoutsScalarFieldEnum>
  }


  /**
   * loadouts findMany
   */
  export type loadoutsFindManyArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * Filter, which loadouts to fetch.
     * 
    **/
    where?: loadoutsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of loadouts to fetch.
     * 
    **/
    orderBy?: Enumerable<loadoutsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing loadouts.
     * 
    **/
    cursor?: loadoutsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` loadouts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` loadouts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LoadoutsScalarFieldEnum>
  }


  /**
   * loadouts create
   */
  export type loadoutsCreateArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * The data needed to create a loadouts.
     * 
    **/
    data: XOR<loadoutsCreateInput, loadoutsUncheckedCreateInput>
  }


  /**
   * loadouts createMany
   */
  export type loadoutsCreateManyArgs = {
    /**
     * The data used to create many loadouts.
     * 
    **/
    data: Enumerable<loadoutsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * loadouts update
   */
  export type loadoutsUpdateArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * The data needed to update a loadouts.
     * 
    **/
    data: XOR<loadoutsUpdateInput, loadoutsUncheckedUpdateInput>
    /**
     * Choose, which loadouts to update.
     * 
    **/
    where: loadoutsWhereUniqueInput
  }


  /**
   * loadouts updateMany
   */
  export type loadoutsUpdateManyArgs = {
    /**
     * The data used to update loadouts.
     * 
    **/
    data: XOR<loadoutsUpdateManyMutationInput, loadoutsUncheckedUpdateManyInput>
    /**
     * Filter which loadouts to update
     * 
    **/
    where?: loadoutsWhereInput
  }


  /**
   * loadouts upsert
   */
  export type loadoutsUpsertArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * The filter to search for the loadouts to update in case it exists.
     * 
    **/
    where: loadoutsWhereUniqueInput
    /**
     * In case the loadouts found by the `where` argument doesn't exist, create a new loadouts with this data.
     * 
    **/
    create: XOR<loadoutsCreateInput, loadoutsUncheckedCreateInput>
    /**
     * In case the loadouts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<loadoutsUpdateInput, loadoutsUncheckedUpdateInput>
  }


  /**
   * loadouts delete
   */
  export type loadoutsDeleteArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
    /**
     * Filter which loadouts to delete.
     * 
    **/
    where: loadoutsWhereUniqueInput
  }


  /**
   * loadouts deleteMany
   */
  export type loadoutsDeleteManyArgs = {
    /**
     * Filter which loadouts to delete
     * 
    **/
    where?: loadoutsWhereInput
  }


  /**
   * loadouts without action
   */
  export type loadoutsArgs = {
    /**
     * Select specific fields to fetch from the loadouts
     * 
    **/
    select?: loadoutsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: loadoutsInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const Loadout_slotsScalarFieldEnum: {
    id: 'id',
    loadoutId: 'loadoutId',
    slot_position: 'slot_position',
    costume_id: 'costume_id',
    weapon_1_id: 'weapon_1_id',
    weapon_2_id: 'weapon_2_id',
    weapon_3_id: 'weapon_3_id',
    companion_id: 'companion_id',
    debris_id: 'debris_id',
    memoir_1_id: 'memoir_1_id',
    memoir_2_id: 'memoir_2_id',
    memoir_3_id: 'memoir_3_id'
  };

  export type Loadout_slotsScalarFieldEnum = (typeof Loadout_slotsScalarFieldEnum)[keyof typeof Loadout_slotsScalarFieldEnum]


  export const LoadoutsScalarFieldEnum: {
    loadout_id: 'loadout_id',
    title: 'title',
    description: 'description',
    type: 'type',
    created_at: 'created_at',
    slug: 'slug',
    attribute: 'attribute'
  };

  export type LoadoutsScalarFieldEnum = (typeof LoadoutsScalarFieldEnum)[keyof typeof LoadoutsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type loadout_slotsWhereInput = {
    AND?: Enumerable<loadout_slotsWhereInput>
    OR?: Enumerable<loadout_slotsWhereInput>
    NOT?: Enumerable<loadout_slotsWhereInput>
    id?: IntFilter | number
    loadoutId?: IntFilter | number
    slot_position?: IntFilter | number
    costume_id?: IntNullableFilter | number | null
    weapon_1_id?: IntNullableFilter | number | null
    weapon_2_id?: IntNullableFilter | number | null
    weapon_3_id?: IntNullableFilter | number | null
    companion_id?: IntNullableFilter | number | null
    debris_id?: IntNullableFilter | number | null
    memoir_1_id?: IntNullableFilter | number | null
    memoir_2_id?: IntNullableFilter | number | null
    memoir_3_id?: IntNullableFilter | number | null
    loadout?: XOR<LoadoutsRelationFilter, loadoutsWhereInput>
  }

  export type loadout_slotsOrderByWithRelationInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
    loadout?: loadoutsOrderByWithRelationInput
  }

  export type loadout_slotsWhereUniqueInput = {
    id?: number
  }

  export type loadout_slotsOrderByWithAggregationInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
    _count?: loadout_slotsCountOrderByAggregateInput
    _avg?: loadout_slotsAvgOrderByAggregateInput
    _max?: loadout_slotsMaxOrderByAggregateInput
    _min?: loadout_slotsMinOrderByAggregateInput
    _sum?: loadout_slotsSumOrderByAggregateInput
  }

  export type loadout_slotsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<loadout_slotsScalarWhereWithAggregatesInput>
    OR?: Enumerable<loadout_slotsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<loadout_slotsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    loadoutId?: IntWithAggregatesFilter | number
    slot_position?: IntWithAggregatesFilter | number
    costume_id?: IntNullableWithAggregatesFilter | number | null
    weapon_1_id?: IntNullableWithAggregatesFilter | number | null
    weapon_2_id?: IntNullableWithAggregatesFilter | number | null
    weapon_3_id?: IntNullableWithAggregatesFilter | number | null
    companion_id?: IntNullableWithAggregatesFilter | number | null
    debris_id?: IntNullableWithAggregatesFilter | number | null
    memoir_1_id?: IntNullableWithAggregatesFilter | number | null
    memoir_2_id?: IntNullableWithAggregatesFilter | number | null
    memoir_3_id?: IntNullableWithAggregatesFilter | number | null
  }

  export type loadoutsWhereInput = {
    AND?: Enumerable<loadoutsWhereInput>
    OR?: Enumerable<loadoutsWhereInput>
    NOT?: Enumerable<loadoutsWhereInput>
    loadout_id?: IntFilter | number
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    type?: StringFilter | string
    created_at?: DateTimeNullableFilter | Date | string | null
    slug?: StringFilter | string
    attribute?: StringFilter | string
    loadout_slots?: Loadout_slotsListRelationFilter
  }

  export type loadoutsOrderByWithRelationInput = {
    loadout_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    slug?: SortOrder
    attribute?: SortOrder
    loadout_slots?: loadout_slotsOrderByRelationAggregateInput
  }

  export type loadoutsWhereUniqueInput = {
    loadout_id?: number
  }

  export type loadoutsOrderByWithAggregationInput = {
    loadout_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    slug?: SortOrder
    attribute?: SortOrder
    _count?: loadoutsCountOrderByAggregateInput
    _avg?: loadoutsAvgOrderByAggregateInput
    _max?: loadoutsMaxOrderByAggregateInput
    _min?: loadoutsMinOrderByAggregateInput
    _sum?: loadoutsSumOrderByAggregateInput
  }

  export type loadoutsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<loadoutsScalarWhereWithAggregatesInput>
    OR?: Enumerable<loadoutsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<loadoutsScalarWhereWithAggregatesInput>
    loadout_id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    type?: StringWithAggregatesFilter | string
    created_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    slug?: StringWithAggregatesFilter | string
    attribute?: StringWithAggregatesFilter | string
  }

  export type loadout_slotsCreateInput = {
    slot_position: number
    costume_id?: number | null
    weapon_1_id?: number | null
    weapon_2_id?: number | null
    weapon_3_id?: number | null
    companion_id?: number | null
    debris_id?: number | null
    memoir_1_id?: number | null
    memoir_2_id?: number | null
    memoir_3_id?: number | null
    loadout: loadoutsCreateNestedOneWithoutLoadout_slotsInput
  }

  export type loadout_slotsUncheckedCreateInput = {
    id?: number
    loadoutId: number
    slot_position: number
    costume_id?: number | null
    weapon_1_id?: number | null
    weapon_2_id?: number | null
    weapon_3_id?: number | null
    companion_id?: number | null
    debris_id?: number | null
    memoir_1_id?: number | null
    memoir_2_id?: number | null
    memoir_3_id?: number | null
  }

  export type loadout_slotsUpdateInput = {
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    loadout?: loadoutsUpdateOneRequiredWithoutLoadout_slotsInput
  }

  export type loadout_slotsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    loadoutId?: IntFieldUpdateOperationsInput | number
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type loadout_slotsCreateManyInput = {
    id?: number
    loadoutId: number
    slot_position: number
    costume_id?: number | null
    weapon_1_id?: number | null
    weapon_2_id?: number | null
    weapon_3_id?: number | null
    companion_id?: number | null
    debris_id?: number | null
    memoir_1_id?: number | null
    memoir_2_id?: number | null
    memoir_3_id?: number | null
  }

  export type loadout_slotsUpdateManyMutationInput = {
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type loadout_slotsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    loadoutId?: IntFieldUpdateOperationsInput | number
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type loadoutsCreateInput = {
    title: string
    description?: string | null
    type?: string
    created_at?: Date | string | null
    slug: string
    attribute: string
    loadout_slots?: loadout_slotsCreateNestedManyWithoutLoadoutInput
  }

  export type loadoutsUncheckedCreateInput = {
    loadout_id?: number
    title: string
    description?: string | null
    type?: string
    created_at?: Date | string | null
    slug: string
    attribute: string
    loadout_slots?: loadout_slotsUncheckedCreateNestedManyWithoutLoadoutInput
  }

  export type loadoutsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    loadout_slots?: loadout_slotsUpdateManyWithoutLoadoutInput
  }

  export type loadoutsUncheckedUpdateInput = {
    loadout_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    loadout_slots?: loadout_slotsUncheckedUpdateManyWithoutLoadoutInput
  }

  export type loadoutsCreateManyInput = {
    loadout_id?: number
    title: string
    description?: string | null
    type?: string
    created_at?: Date | string | null
    slug: string
    attribute: string
  }

  export type loadoutsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
  }

  export type loadoutsUncheckedUpdateManyInput = {
    loadout_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type LoadoutsRelationFilter = {
    is?: loadoutsWhereInput
    isNot?: loadoutsWhereInput
  }

  export type loadout_slotsCountOrderByAggregateInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
  }

  export type loadout_slotsAvgOrderByAggregateInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
  }

  export type loadout_slotsMaxOrderByAggregateInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
  }

  export type loadout_slotsMinOrderByAggregateInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
  }

  export type loadout_slotsSumOrderByAggregateInput = {
    id?: SortOrder
    loadoutId?: SortOrder
    slot_position?: SortOrder
    costume_id?: SortOrder
    weapon_1_id?: SortOrder
    weapon_2_id?: SortOrder
    weapon_3_id?: SortOrder
    companion_id?: SortOrder
    debris_id?: SortOrder
    memoir_1_id?: SortOrder
    memoir_2_id?: SortOrder
    memoir_3_id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type Loadout_slotsListRelationFilter = {
    every?: loadout_slotsWhereInput
    some?: loadout_slotsWhereInput
    none?: loadout_slotsWhereInput
  }

  export type loadout_slotsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type loadoutsCountOrderByAggregateInput = {
    loadout_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    slug?: SortOrder
    attribute?: SortOrder
  }

  export type loadoutsAvgOrderByAggregateInput = {
    loadout_id?: SortOrder
  }

  export type loadoutsMaxOrderByAggregateInput = {
    loadout_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    slug?: SortOrder
    attribute?: SortOrder
  }

  export type loadoutsMinOrderByAggregateInput = {
    loadout_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    slug?: SortOrder
    attribute?: SortOrder
  }

  export type loadoutsSumOrderByAggregateInput = {
    loadout_id?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type loadoutsCreateNestedOneWithoutLoadout_slotsInput = {
    create?: XOR<loadoutsCreateWithoutLoadout_slotsInput, loadoutsUncheckedCreateWithoutLoadout_slotsInput>
    connectOrCreate?: loadoutsCreateOrConnectWithoutLoadout_slotsInput
    connect?: loadoutsWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type loadoutsUpdateOneRequiredWithoutLoadout_slotsInput = {
    create?: XOR<loadoutsCreateWithoutLoadout_slotsInput, loadoutsUncheckedCreateWithoutLoadout_slotsInput>
    connectOrCreate?: loadoutsCreateOrConnectWithoutLoadout_slotsInput
    upsert?: loadoutsUpsertWithoutLoadout_slotsInput
    connect?: loadoutsWhereUniqueInput
    update?: XOR<loadoutsUpdateWithoutLoadout_slotsInput, loadoutsUncheckedUpdateWithoutLoadout_slotsInput>
  }

  export type loadout_slotsCreateNestedManyWithoutLoadoutInput = {
    create?: XOR<Enumerable<loadout_slotsCreateWithoutLoadoutInput>, Enumerable<loadout_slotsUncheckedCreateWithoutLoadoutInput>>
    connectOrCreate?: Enumerable<loadout_slotsCreateOrConnectWithoutLoadoutInput>
    createMany?: loadout_slotsCreateManyLoadoutInputEnvelope
    connect?: Enumerable<loadout_slotsWhereUniqueInput>
  }

  export type loadout_slotsUncheckedCreateNestedManyWithoutLoadoutInput = {
    create?: XOR<Enumerable<loadout_slotsCreateWithoutLoadoutInput>, Enumerable<loadout_slotsUncheckedCreateWithoutLoadoutInput>>
    connectOrCreate?: Enumerable<loadout_slotsCreateOrConnectWithoutLoadoutInput>
    createMany?: loadout_slotsCreateManyLoadoutInputEnvelope
    connect?: Enumerable<loadout_slotsWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type loadout_slotsUpdateManyWithoutLoadoutInput = {
    create?: XOR<Enumerable<loadout_slotsCreateWithoutLoadoutInput>, Enumerable<loadout_slotsUncheckedCreateWithoutLoadoutInput>>
    connectOrCreate?: Enumerable<loadout_slotsCreateOrConnectWithoutLoadoutInput>
    upsert?: Enumerable<loadout_slotsUpsertWithWhereUniqueWithoutLoadoutInput>
    createMany?: loadout_slotsCreateManyLoadoutInputEnvelope
    set?: Enumerable<loadout_slotsWhereUniqueInput>
    disconnect?: Enumerable<loadout_slotsWhereUniqueInput>
    delete?: Enumerable<loadout_slotsWhereUniqueInput>
    connect?: Enumerable<loadout_slotsWhereUniqueInput>
    update?: Enumerable<loadout_slotsUpdateWithWhereUniqueWithoutLoadoutInput>
    updateMany?: Enumerable<loadout_slotsUpdateManyWithWhereWithoutLoadoutInput>
    deleteMany?: Enumerable<loadout_slotsScalarWhereInput>
  }

  export type loadout_slotsUncheckedUpdateManyWithoutLoadoutInput = {
    create?: XOR<Enumerable<loadout_slotsCreateWithoutLoadoutInput>, Enumerable<loadout_slotsUncheckedCreateWithoutLoadoutInput>>
    connectOrCreate?: Enumerable<loadout_slotsCreateOrConnectWithoutLoadoutInput>
    upsert?: Enumerable<loadout_slotsUpsertWithWhereUniqueWithoutLoadoutInput>
    createMany?: loadout_slotsCreateManyLoadoutInputEnvelope
    set?: Enumerable<loadout_slotsWhereUniqueInput>
    disconnect?: Enumerable<loadout_slotsWhereUniqueInput>
    delete?: Enumerable<loadout_slotsWhereUniqueInput>
    connect?: Enumerable<loadout_slotsWhereUniqueInput>
    update?: Enumerable<loadout_slotsUpdateWithWhereUniqueWithoutLoadoutInput>
    updateMany?: Enumerable<loadout_slotsUpdateManyWithWhereWithoutLoadoutInput>
    deleteMany?: Enumerable<loadout_slotsScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type loadoutsCreateWithoutLoadout_slotsInput = {
    title: string
    description?: string | null
    type?: string
    created_at?: Date | string | null
    slug: string
    attribute: string
  }

  export type loadoutsUncheckedCreateWithoutLoadout_slotsInput = {
    loadout_id?: number
    title: string
    description?: string | null
    type?: string
    created_at?: Date | string | null
    slug: string
    attribute: string
  }

  export type loadoutsCreateOrConnectWithoutLoadout_slotsInput = {
    where: loadoutsWhereUniqueInput
    create: XOR<loadoutsCreateWithoutLoadout_slotsInput, loadoutsUncheckedCreateWithoutLoadout_slotsInput>
  }

  export type loadoutsUpsertWithoutLoadout_slotsInput = {
    update: XOR<loadoutsUpdateWithoutLoadout_slotsInput, loadoutsUncheckedUpdateWithoutLoadout_slotsInput>
    create: XOR<loadoutsCreateWithoutLoadout_slotsInput, loadoutsUncheckedCreateWithoutLoadout_slotsInput>
  }

  export type loadoutsUpdateWithoutLoadout_slotsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
  }

  export type loadoutsUncheckedUpdateWithoutLoadout_slotsInput = {
    loadout_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slug?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
  }

  export type loadout_slotsCreateWithoutLoadoutInput = {
    slot_position: number
    costume_id?: number | null
    weapon_1_id?: number | null
    weapon_2_id?: number | null
    weapon_3_id?: number | null
    companion_id?: number | null
    debris_id?: number | null
    memoir_1_id?: number | null
    memoir_2_id?: number | null
    memoir_3_id?: number | null
  }

  export type loadout_slotsUncheckedCreateWithoutLoadoutInput = {
    id?: number
    slot_position: number
    costume_id?: number | null
    weapon_1_id?: number | null
    weapon_2_id?: number | null
    weapon_3_id?: number | null
    companion_id?: number | null
    debris_id?: number | null
    memoir_1_id?: number | null
    memoir_2_id?: number | null
    memoir_3_id?: number | null
  }

  export type loadout_slotsCreateOrConnectWithoutLoadoutInput = {
    where: loadout_slotsWhereUniqueInput
    create: XOR<loadout_slotsCreateWithoutLoadoutInput, loadout_slotsUncheckedCreateWithoutLoadoutInput>
  }

  export type loadout_slotsCreateManyLoadoutInputEnvelope = {
    data: Enumerable<loadout_slotsCreateManyLoadoutInput>
    skipDuplicates?: boolean
  }

  export type loadout_slotsUpsertWithWhereUniqueWithoutLoadoutInput = {
    where: loadout_slotsWhereUniqueInput
    update: XOR<loadout_slotsUpdateWithoutLoadoutInput, loadout_slotsUncheckedUpdateWithoutLoadoutInput>
    create: XOR<loadout_slotsCreateWithoutLoadoutInput, loadout_slotsUncheckedCreateWithoutLoadoutInput>
  }

  export type loadout_slotsUpdateWithWhereUniqueWithoutLoadoutInput = {
    where: loadout_slotsWhereUniqueInput
    data: XOR<loadout_slotsUpdateWithoutLoadoutInput, loadout_slotsUncheckedUpdateWithoutLoadoutInput>
  }

  export type loadout_slotsUpdateManyWithWhereWithoutLoadoutInput = {
    where: loadout_slotsScalarWhereInput
    data: XOR<loadout_slotsUpdateManyMutationInput, loadout_slotsUncheckedUpdateManyWithoutLoadout_slotsInput>
  }

  export type loadout_slotsScalarWhereInput = {
    AND?: Enumerable<loadout_slotsScalarWhereInput>
    OR?: Enumerable<loadout_slotsScalarWhereInput>
    NOT?: Enumerable<loadout_slotsScalarWhereInput>
    id?: IntFilter | number
    loadoutId?: IntFilter | number
    slot_position?: IntFilter | number
    costume_id?: IntNullableFilter | number | null
    weapon_1_id?: IntNullableFilter | number | null
    weapon_2_id?: IntNullableFilter | number | null
    weapon_3_id?: IntNullableFilter | number | null
    companion_id?: IntNullableFilter | number | null
    debris_id?: IntNullableFilter | number | null
    memoir_1_id?: IntNullableFilter | number | null
    memoir_2_id?: IntNullableFilter | number | null
    memoir_3_id?: IntNullableFilter | number | null
  }

  export type loadout_slotsCreateManyLoadoutInput = {
    id?: number
    slot_position: number
    costume_id?: number | null
    weapon_1_id?: number | null
    weapon_2_id?: number | null
    weapon_3_id?: number | null
    companion_id?: number | null
    debris_id?: number | null
    memoir_1_id?: number | null
    memoir_2_id?: number | null
    memoir_3_id?: number | null
  }

  export type loadout_slotsUpdateWithoutLoadoutInput = {
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type loadout_slotsUncheckedUpdateWithoutLoadoutInput = {
    id?: IntFieldUpdateOperationsInput | number
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type loadout_slotsUncheckedUpdateManyWithoutLoadout_slotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slot_position?: IntFieldUpdateOperationsInput | number
    costume_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    weapon_3_id?: NullableIntFieldUpdateOperationsInput | number | null
    companion_id?: NullableIntFieldUpdateOperationsInput | number | null
    debris_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_1_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_2_id?: NullableIntFieldUpdateOperationsInput | number | null
    memoir_3_id?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}