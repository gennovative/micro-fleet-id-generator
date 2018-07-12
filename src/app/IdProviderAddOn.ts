import { IConfigurationProvider, Types as ConT, constants,
	injectable, lazyInject } from '@micro-fleet/common';
import { IDirectRpcCaller, IRpcResponse, Types as ComT } from '@micro-fleet/service-communication';

import { IdGenerator } from './IdGenerator';

const { SvcSettingKeys: SvcS, ModuleNames: M, ActionNames: A } = constants;


@injectable()
export class IdProviderAddOn implements IServiceAddOn {

	public readonly name: string = 'IdProviderAddOn';

	private static CACHE_SIZE = 10;

	private _addresses: string[];

	// TODO: Will implement remote ID generation later
	private _idGen: IdGenerator;

	@lazyInject(ConT.CONFIG_PROVIDER) private _configProvider: IConfigurationProvider;
	@lazyInject(ComT.DIRECT_RPC_CALLER) private _rpcCaller: IDirectRpcCaller;

	constructor(
	) {
		this._idGen = new IdGenerator();
	}

	/**
	 * @see IServiceAddOn.init
	 */
	public init(): Promise<void> {
		this._rpcCaller.name = this._configProvider.get(SvcS.SERVICE_SLUG).value as string;
		this._addresses = this._configProvider.get(SvcS.ID_SERVICE_ADDRESSES).value as string[];
		return Promise.resolve();
	}

	/**
	 * @see IServiceAddOn.deadLetter
	 */
	public deadLetter(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * @see IServiceAddOn.dispose
	 */
	public dispose(): Promise<void> {
		return this._rpcCaller.dispose();
	}

	public async fetch(): Promise<void> {
		for (let addr of this._addresses) {
			if (await this.attempFetch(addr)) {
				return;
			}
		}
	}

	public nextBigInt(): string {
		return this._idGen.nextBigInt().toString();
	}

	public nextShortId(): string {
		return this._idGen.nextShortId();
	}

	public nextUuidv4(): string {
		return this._idGen.nextUuidv4();
	}


	private async attempFetch(address: string): Promise<boolean> {
		this._rpcCaller.baseAddress = address;
		return this._rpcCaller.call(M.ID_GEN, A.NEXT_BIG_INT, {
				service: this._rpcCaller.name,
				count: IdProviderAddOn.CACHE_SIZE
			})
			.then((res: IRpcResponse) => {
				// resolve(<any>res.data);
				return true;
			});
	}
}