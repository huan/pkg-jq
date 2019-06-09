# pkg-jq

[![NPM Version](https://badge.fury.io/js/pkg-jq.svg)](https://www.npmjs.com/package/pkg-jq)
[![npm (tag)](https://img.shields.io/npm/v/pkg-jq/next.svg)](https://www.npmjs.com/package/pkg-jq?activeTab=versions)
[![Build Status](https://api.travis-ci.com/huan/pkg-jq.svg?branch=master)](https://travis-ci.com/huan/pkg-jq)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Greenkeeper badge](https://badges.greenkeeper.io/huan/pkg-jq.svg)](https://greenkeeper.io/)

Find the nearest package.json then deal with jq syntax on it. (in-line edit supported!)

## USAGE

```shell
pkger version_is_prod
pkger version_is_dev
pkger version_show
pkger public_config tag=next
```

```ts
import { Pkger } from 'pkger'

const cwd = path.join(__dirname, '..', '..')
const pkger = new Pkger({ cwd })
```

## DEVELOPMENT

### Ubuntu

```sh
sudo apt-get install libtool
```

## HISTORY

### master

### v0.0.1 (09 Jun 2019)

1. Project inited.

## AUTHOR

[Huan LI (李卓桓)](http://linkedin.com/in/zixia) <zixia@zixia.net>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## COPYRIGHT & LICENSE

- Code & Docs © 2019 - now Huan LI <zixia@zixia.net>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
