// Vue instance base class.

abstract class VueInstance {
	protected el: string;
	protected data: any;

	abstract ready(): void;
}
