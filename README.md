# Evolutty

[![NPM downloads](https://img.shields.io/npm/dm/evolutty.svg?style=flat)](https://www.npmjs.com/package/evolutty)
[![Build Status](https://github.com/bbc/sqs-consumer/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/paulo-tinoco/evolutty/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b858ac139de92c496b9/maintainability)](https://codeclimate.com/github/paulo-tinoco/evolutty/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5b858ac139de92c496b9/test_coverage)](https://codeclimate.com/github/paulo-tinoco/evolutty/test_coverage)

**evolutty** is an asynchronous message dispatcher for concurrent tasks processing, with the following features:

* Encourages decoupling from message providers and consumers
* Easy to extend and customize
* Easy error handling, including integration with sentry
* Easy to create one or multiple services
* Generic Handlers
* Bull integration

---
:information_source: Currently, only BullMQ is supported
