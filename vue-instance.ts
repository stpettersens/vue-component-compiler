// Vue instance base class.

abstract class VueInstance {
	protected el: string;
	protected name: string;
	protected data: any;

	abstract ready(): void;
	public $set(path: string, value: any): void {};	
}
