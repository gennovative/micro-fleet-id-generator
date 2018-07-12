import * as chai from 'chai';
import * as spies from 'chai-spies';
chai.use(spies);
const expect = chai.expect;
import { IDependencyContainer, DependencyContainer, serviceContext } from '@micro-fleet/common';

import { registerIdAddOn, IdProviderAddOn, Types as T } from '../app';


describe('registerIdAddOn', function () {
	// this.timeout(60000); // For debuging

	let depCon: IDependencyContainer;

	beforeEach(() => {
		depCon = new DependencyContainer();
		serviceContext.setDependencyContainer(depCon);
	});

	afterEach(() => {
		depCon.dispose();
		depCon = null;
	});

	it('Should register dependencies if not already', () => {
		// Act
		registerIdAddOn();

		// Assert
		expect(depCon.isBound(T.ID_PROVIDER)).to.be.true;
	});

	it('Should not register dependencies if already registered', () => {
		// Arrange
		depCon.bind<IdProviderAddOn>(T.ID_PROVIDER, IdProviderAddOn);
		chai.spy.on(depCon, 'bind');

		// Act
		registerIdAddOn();

		// Assert
		expect(depCon.bind).not.to.be.called;
	});
}); // describe
