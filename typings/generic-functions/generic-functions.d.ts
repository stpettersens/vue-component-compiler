// Type definitions for generic-functions
// Project: https://github.com/stpettersens/generic-functions
// Definitions by: Sam Saint-Pettersen <https://github.com/stpettersens>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "generic-functions" {
	export function strcmp(str1: string, str2: string): boolean;
	export function icstrcmp(str1: string, str2: string): boolean;
	export function strendswith(str: string, suffix: string): boolean;
	export function icstrendwith(str: string, suffix: string): boolean;
	export function endswithdot(str: string): string;
	export function println(message: string): void;
	export function printlns(message: string): void;
	export function objGetKeyByValue(object: Object, value: any): string;
}