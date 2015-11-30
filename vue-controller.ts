/// <reference path="vue-instance.ts" />

// Vue controller base class.

abstract class VueController extends VueInstance {
	protected name?: string;
	protected services: any;
}
