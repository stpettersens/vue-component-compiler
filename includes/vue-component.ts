// VueComponent base class for use with VueComponent compiler with TypeScript.

interface IVueConfig {
    el: string;
    data: Object;
    methods?: Object;
}

abstract class VueComponent {
    protected config: IVueConfig;
    
    abstract ready(): void;
    protected $set(path: string, value: any): void { };
}
