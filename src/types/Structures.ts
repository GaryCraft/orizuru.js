import { HandlerType } from "./Handlers";

/** @hidden */
interface RequestT<T extends RequestContainer<unknown>> extends Express.Request {
	body: T
}
/** @hidden */
interface RequestContainer<T> {
	content?: string;
	content_type: HandlerType;
	args: T;
	id: string;
}

/** 
 * @classdesc
 * Information about the server received from the client
 * @class
 * @property {string} serverName The name of the server
 * @property {string} serverVersion The version of the server
 * @property {string} serverMotd The MOTD of the server
 * @property {number} serverMaxPlayers The maximum amount of players the server allows
 * @property {string} serverIP The IP of the server (bind-address)
 * @property {number} serverPort The port of the server (bind-port)
 * @property {string} pluginVersion The version of the Orizuru plugin
 */
interface ServerInfo {
	serverName: string;
	serverVersion: string;
	serverMotd: string;
	serverMaxPlayers: number;
	serverIP: string;
	serverPort: number;
	pluginVersion: string;
}
/**
 * @classdesc
 * Information about a player received from the client
 * @class
 * @property {string?} name The name of the player
 * @property {string} uuid The UUID of the player
 * @property {string} ip The IP of the player (Be careful with this)
 */
interface PlayerInfo {
	name?: string;
	uuid: string;
	ip: string;
}
/**
 * @classdesc
 * Information about an event received from the client
 * @class
 * @property {string} location The location of the event
 * @property {PlayerInfo} entity The player that triggered the event
 * @property {string} eventName The name of the event
 */
interface EventInfo {
	location: string;
	entity: PlayerInfo;
	eventName: string;
}
/** Unimplemented in Orizuru
 * @classdesc
 * Server statistics received from the client
 * @class
 * @property {number} online The amount of players online
 * @property {number} max The maximum amount of players allowed
 * @property {number} tps The current TPS of the server
 * @property {number} memory The current memory usage of the server
 * @property {number} cpu The current CPU usage of the server
 * @property {number} uptime The uptime of the server
 * @property {string} pluginVersion The version of the Orizuru plugin
 */
interface ServerStats {
	online: number;
	max: number;
	tps: number;
	memory: number;
	cpu: number;
	uptime: number;
	pluginVersion: string;
}
/** 
 * @classdesc
 * Server Player-Only statistics received from the client
 * @class
 * @property {number} online The amount of players online
 * @property {number} max The maximum amount of players allowed
 */
interface ServerPlayerStats {
	online: number;
	max: number;
}
/**
 * @classdesc
 * Server Performance statistics
 * @class
 * @property {number[]} tps The TPS of the server 
 * @property {number} availableMemory The currently free memory of the server
 * @property {number} usedMemory The currently used memory of the server
 * @property {number} maxMemory The maximum memory of the server
 * @property {number} memPercent The memory usage of the server
 * @property {number} cpuPercent The CPU usage of the server
 */
interface PerformanceData {
	players: ServerPlayerStats;
	tps: number[];
	availableMemory: number;
	usedMemory: number;
	maxMemory: number;
	memPercent: number;
	cpuPercent: number;
}
// Client -> Server Structures
/**
 * @typedef {Object} PlayerAuthArgs
 * @property {PlayerInfo} player - The player that is authenticating
 */
interface PlayerAuthArgs { player: PlayerInfo }
/**
 * @typedef {Object} PlayerJoinArgs
 * @property {PlayerInfo} player - The player that is joining
 * @property {ServerPlayerStats} server - The server player statistics
 * @property {EventInfo} event - The event information
 */
interface PlayerJoinArgs { 
	player: PlayerInfo,
	server: ServerPlayerStats,
	event: EventInfo
}
/**
 * @typedef {Object} PlayerLeaveArgs
 * @property {PlayerInfo} player - The player that left
 * @property {ServerPlayerStats} server - The server player statistics
 * @property {EventInfo} event - The event information
 */
interface PlayerLeaveArgs { player: PlayerInfo, server: ServerPlayerStats, event: EventInfo }
/**
 * @typedef {Object} PlayerDeathArgs
 * @property {PlayerInfo} player - The player that died
 * @property {EventInfo} event - The event information
 * @property {string} message - The death message
 * @property {string} cause - The cause of death
 * @property {string} location - The location of death
 * @property {string} world - The world of death
 * @property {string} dimension - The dimension of death
 */
interface PlayerDeathArgs { 
	player: PlayerInfo,
	event: EventInfo,
	message: string,
}
/**
 * @typedef {Object} PlayerCommandArgs
 * @property {PlayerInfo} player - The player that executed the command
 * @property {EventInfo} event - The event information
 * @property {string} command - The command that was executed
 * @property {string[]} args - The arguments of the command
 */
interface PlayerCommandArgs { player: PlayerInfo, event: EventInfo, command: string, args: string[] }
/**
 * @typedef {Object} PlayerAdvancementArgs
 * @property {PlayerInfo} player - The player that got the advancement
 * @property {EventInfo} event - The event information
 * @property {string} advancement - The advancement that was achieved
 * @property {string} advancementCriteria - The criteria of the advancement that was achieved
 */
interface PlayerAdvancementArgs { player: PlayerInfo, event: EventInfo, advancement: string, advancementCriteria: string }
/**
 * @typedef {Object} PlayerChatArgs
 * @property {PlayerInfo} player - The player that sent the message
 * @property {EventInfo} event - The event information
 * @property {string} message - The message that was sent
 */
interface PlayerChatArgs { player: PlayerInfo, event: EventInfo, message: string }
// Server -> Client Structures
/**
 * @typedef {Object} AuthContent
 */
interface AuthContent {
	/** @property {boolean} err - Whether or not the request errored */
	err: boolean;
	/** @property {Object} body - The body of the request, containing the player info */
	body: {
		player: PlayerInfo;
		name: string;
		identifier: string;
	}
	/** @property {number} code - The response code to be sent to the client */
	code: number;
}
/**
 * @typedef {Object} GeneralContent
 */
interface GeneralContent<T extends RequestContainer<unknown>> {
	/** @property {boolean} err - Whether or not the request errored */
	err: boolean;
	/** @property {Object} body - An unmodified body of the request */
	body: RequestT<T>["body"];
	/** @property {number} code - The response code to be sent to the client */
	code: number;
	/** @property {string} message - A message to be sent to the client */
	message: string;
}
export {
	RequestT as Request,
	RequestContainer,
	ServerInfo,
	PlayerInfo,
	EventInfo,
	ServerStats,
	ServerPlayerStats,
	PerformanceData,
	PlayerAuthArgs,
	PlayerJoinArgs,
	PlayerLeaveArgs,
	PlayerDeathArgs,
	PlayerCommandArgs,
	PlayerAdvancementArgs,
	PlayerChatArgs,
	AuthContent,
	GeneralContent
};