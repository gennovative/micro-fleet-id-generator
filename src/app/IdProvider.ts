import { SvcSettingKeys as SvcS, ModuleNames as M, ActionNames as A } from 'back-lib-common-constants';
import { IConfigurationProvider, Types as ConT } from 'back-lib-common-contracts';
import { injectable, inject, Guard } from 'back-lib-common-util';
import { IDirectRpcCaller, IRpcResponse, Types as ComT } from 'back-lib-service-communication';

import { IdGenerator } from './IdGenerator';



@injectable()
export class IdProvider implements IServiceAddOn {

	private static CACHE_SIZE = 10;

	private _addresses: string[];
	private _bigIntProm: Promise<string[]>;

	// TODO: Will implement remote ID generation later
	private _idGen: IdGenerator;

	constructor(
		@inject(ConT.CONFIG_PROVIDER) private _configProvider: IConfigurationProvider,
		@inject(ComT.DIRECT_RPC_CALLER) private _rpcCaller: IDirectRpcCaller
	) {
		Guard.assertArgDefined('_configProvider', _configProvider);
		Guard.assertArgDefined('_rpcCaller', _rpcCaller);
		this._idGen = new IdGenerator();
	}

	/**
	 * @see IServiceAddOn.init
	 */
	public init(): Promise<void> {
		this._rpcCaller.name = this._configProvider.get(SvcS.SERVICE_SLUG);
		this._addresses = <any>this._configProvider.get(SvcS.ID_SERVICE_ADDRESSES);
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

	public fetch(): Promise<void> {
		for (let addr of this._addresses) {
			if (this.attempFetch(addr)) {
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
				count: IdProvider.CACHE_SIZE
			})
			.then((res: IRpcResponse) => {
				// resolve(<any>res.data);
				return true;
			});
	}
}