import { Request, PlayerAuthArgs, RequestContainer, AuthContent, PlayerJoinArgs, GeneralContent, PlayerLeaveArgs, ServerInfo, PerformanceData, PlayerAdvancementArgs, PlayerChatArgs, PlayerCommandArgs, PlayerDeathArgs } from "./Structures";
import { ObjectValues } from "./Util";
/** @hidden */
const HANDLER_TYPE = {
	Auth: 'Auth',
	PlayerJoin: 'PlayerJoin',
	PlayerLeave: 'PlayerLeave',
	PlayerDeath: 'PlayerDeath',
	PlayerCommand: 'PlayerCommand',
	PlayerAdvancement: 'PlayerAdvancement',
	Chat: 'Chat',
	Log: 'Log',
	Performance: 'Performance',
} as const;
/** @hidden */
type HandlerType = ObjectValues<typeof HANDLER_TYPE>;

/** @hidden */
type AuthHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerAuthArgs>>) => Promise<AuthContent>;
/** @hidden */
type PlayerJoinHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerJoinArgs>>) => Promise<GeneralContent<RequestContainer<PlayerJoinArgs>>>;
/** @hidden */
type PlayerLeaveHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerLeaveArgs>>) => Promise<GeneralContent<RequestContainer<PlayerLeaveArgs>>>;
/** @hidden */
type PlayerDeathHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerDeathArgs>>) => Promise<GeneralContent<RequestContainer<PlayerDeathArgs>>>;
/** @hidden */
type PlayerCommandHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerCommandArgs>>) => Promise<GeneralContent<RequestContainer<PlayerCommandArgs>>>;
/** @hidden */
type PlayerAdvancementHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerAdvancementArgs>>) => Promise<GeneralContent<RequestContainer<PlayerAdvancementArgs>>>;
/** @hidden */
type ChatHandler<CTX> = (context: CTX, req: Request<RequestContainer<PlayerChatArgs>>) => Promise<GeneralContent<RequestContainer<PlayerChatArgs>>>;
/** @hidden */
type LogHandler<CTX> = (context: CTX, req: Request<RequestContainer<ServerInfo>>) => Promise<GeneralContent<RequestContainer<ServerInfo>>>;
/** @hidden */
type PerformanceHandler<CTX> = (context: CTX, req: Request<RequestContainer<PerformanceData>>) => Promise<GeneralContent<RequestContainer<PerformanceData>>>;
/** @hidden */
type HandlerFunction<CTX extends unknown, T extends HandlerType> =
	T extends 'Auth' ? AuthHandler<CTX> :
	T extends 'PlayerJoin' ? PlayerJoinHandler<CTX> :
	T extends 'PlayerLeave' ? PlayerLeaveHandler<CTX> :
	T extends 'PlayerDeath' ? PlayerDeathHandler<CTX> :
	T extends 'PlayerCommand' ? PlayerCommandHandler<CTX> :
	T extends 'PlayerAdvancement' ? PlayerAdvancementHandler<CTX> :
	T extends 'Chat' ? ChatHandler<CTX> :
	T extends 'Log' ? LogHandler<CTX> :
	T extends 'Performance' ? PerformanceHandler<CTX> :
	never;

export {
	HandlerType,
	HANDLER_TYPE,
	HandlerFunction,
	AuthHandler,
	PlayerJoinHandler,
	PlayerLeaveHandler,
	ChatHandler,
	LogHandler,
}
