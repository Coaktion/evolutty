# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.1](https://github.com/Coaktion/evolutty/compare/v1.3.0...v1.3.1) (2023-07-18)


### Bug Fixes

* use relative imports to avoid build errors ([d1f74e4](https://github.com/Coaktion/evolutty/commit/d1f74e49bca15fcf4518b2657636d1d1ba25a0ed))

## [1.3.0](https://github.com/Coaktion/evolutty/compare/v1.2.1...v1.3.0) (2023-07-17)


### Features

* add message translator to sqs client options ([6de8487](https://github.com/Coaktion/evolutty/commit/6de8487392d8b93084367ea1e3cbbfdf34b204d1))
* add sqs message translator ([70da54a](https://github.com/Coaktion/evolutty/commit/70da54ade7f3fa4824bb7988f03f92e2970bd283))
* add sqs queue router ([f6d3676](https://github.com/Coaktion/evolutty/commit/f6d3676311d1ae9a923acad8e535421aa6182ef6))
* export new implementations of sqs ([0733bf4](https://github.com/Coaktion/evolutty/commit/0733bf4d73eebc97a86016808cad5349d9464c75))


### Bug Fixes

* abstract message translator contract ([7bfd89f](https://github.com/Coaktion/evolutty/commit/7bfd89f71dfc2bce4160c98cd1cc02b2972d2088))
* adjusts abstract message translator test ([72c7724](https://github.com/Coaktion/evolutty/commit/72c7724088d6dd2d236ed6442ee18d3ee8afe989))
* adjusts bull message translator test ([575333d](https://github.com/Coaktion/evolutty/commit/575333dda6be62c6a9dbb463229b5faeedcd7360))
* adjusts sqs handler tests according to new structure ([9b53db4](https://github.com/Coaktion/evolutty/commit/9b53db4a866ed0f4759ca872bdeec589d85cb6bc))
* lint ([69c5116](https://github.com/Coaktion/evolutty/commit/69c5116d29fdfa1a9e23ceecf2cf983f29c0c3f9))
* renames SQSMessageTranslator to improve context ([10d39cb](https://github.com/Coaktion/evolutty/commit/10d39cb3c3f12ce9ae3c4014ca0d160ad2027971))
* **sqs:** handle different message translator in handler ([27a175b](https://github.com/Coaktion/evolutty/commit/27a175b8880bfa6f5e018e0aac04154681771849))

## [1.2.0](https://github.com/Coaktion/evolutty/compare/v1.0.1...v1.2.0) (2023-06-13)


### Features

* Adding rabbitmq provider ([22d2859](https://github.com/Coaktion/evolutty/commit/22d28593a0941d3beb6672b0d96a8831bd572ebd))
* delete message condition to rabbitmq handler ([be2a438](https://github.com/Coaktion/evolutty/commit/be2a4382cdd9c2cf297387d118792071465a37fd))
* exports delete message exception ([a35bd24](https://github.com/Coaktion/evolutty/commit/a35bd2468c1ba8d8953a59d3bd18f9181790b198))


### Bug Fixes

* adjusts assert queue logic ([7770969](https://github.com/Coaktion/evolutty/commit/777096980a5d04901d2d0ef02e1655a35f56384e))
* parse processMessage method to arrow function ([60470be](https://github.com/Coaktion/evolutty/commit/60470be820df5aff611d9d10c7df2c042458d317))
* rabbitmq implementation without provider ([47d6274](https://github.com/Coaktion/evolutty/commit/47d627448e93f2b9dc6786e9c6d31708f4807979))
* **rabbitmq:** use less client options ([f657ebe](https://github.com/Coaktion/evolutty/commit/f657ebec20a0c5df60dc8ff5ddfbb40ded416e08))
* remove rabbitmq provider export ([f269629](https://github.com/Coaktion/evolutty/commit/f269629d122fcbcd4e5a4abcefd1eb44baa5e4e8))
* semantic error in sqs types ([374d07f](https://github.com/Coaktion/evolutty/commit/374d07f1c32cbd79dc10561076298146fd8bca8d))
* use absolute imports in rabbitmq tests ([92082b5](https://github.com/Coaktion/evolutty/commit/92082b5724ece8a4fcbb1777fd1b6343027cb391))

## [1.1.0](https://github.com/Coaktion/evolutty/compare/v1.0.1...v1.1.0) (2023-05-15)

### [1.0.1](https://github.com/Coaktion/evolutty/compare/v1.0.0...v1.0.1) (2023-04-14)

### [1.0.0](https://github.com/Coaktion/evolutty/compare/v0.1.4...v0.1.8) (2023-04-12)

### [0.1.3](https://github.com/Coaktion/evolutty/compare/v0.1.2...v0.1.3) (2023-02-02)

### Features

- Adding docs ([1c5d203](https://github.com/Coaktion/evolutty/commit/1c5d203cc72e922c04f01052dc4bd3321df1ff47))

### Bug Fixes

- Adding commands ([33198c9](https://github.com/Coaktion/evolutty/commit/33198c91dd2cb1aecf26de0a002a7abe865299c6))
- Adding husky folder in .gitignore ([649d265](https://github.com/Coaktion/evolutty/commit/649d26557f9e7accc7bfe7f893cf473ab652e0c3))
- Adding husky hooks ([519e1ac](https://github.com/Coaktion/evolutty/commit/519e1ac52a57dc8a7101f0465ea69810d4849993))
- Adjusting doc ([cab436c](https://github.com/Coaktion/evolutty/commit/cab436cf7f401f36216555ae1984750dd0db5cc0))
- Adjusting pre-commit ([2daf041](https://github.com/Coaktion/evolutty/commit/2daf04162ec2248ae18e7fedbf4602fe8f829ef5))
- adjuting husky ([6e5f76f](https://github.com/Coaktion/evolutty/commit/6e5f76fac9ff268f184241e0047201e2f8dd86fe))
- lint ([49f9c95](https://github.com/Coaktion/evolutty/commit/49f9c9575e63f811a8447f979337a2eb3481b781))
- lint ([966c17b](https://github.com/Coaktion/evolutty/commit/966c17bd3f90a169223c1dfacd04493284b63a01))
- protect main ([e98f2ae](https://github.com/Coaktion/evolutty/commit/e98f2ae445ca8094b3e934afe44b64919ef40dfe))
