## VERSIONS

### 1.2.0 (Coming soon)
- *IdProvider*: Can fetch from remote source.

### 1.1.1
- Remove script "postinstall" from `package.json`.

### 1.1.0
- `IdGenerator.nextBigInt()` now returns native BigInt.

### 1.0.2
- Fixed node engine version in package.json.
- Refactor to replace `let` with `const`.

### 1.0.1
- Temporarily removed dependency on '@micro-fleet/service-communication'.

### 1.0.0
- *IdProvider*: A service addon that can generates IDs.
- *IdGenerator*: Generates bigint string, shortid, and UUID v4.
