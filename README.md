# pkg-jq

[![NPM Version](https://badge.fury.io/js/pkg-jq.svg)](https://www.npmjs.com/package/pkg-jq)
[![npm (tag)](https://img.shields.io/npm/v/pkg-jq/next.svg)](https://www.npmjs.com/package/pkg-jq?activeTab=versions)
[![Build Status](https://api.travis-ci.com/huan/pkg-jq.svg?branch=master)](https://travis-ci.com/huan/pkg-jq)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Greenkeeper badge](https://badges.greenkeeper.io/huan/pkg-jq.svg)](https://greenkeeper.io/)

![pkg-jq](https://huan.github.io/pkg-jq/images/pkg-jq.gif)
> Source: [Processing JSON Data With jq](https://sites.temple.edu/tudsc/2017/09/21/processing-json-data-with-jq/)

Find the nearest package.json then deal with jq syntax on it. (in-line edit supported!)

## FEATURES

1. Search current directory, and all parent directories for `package.json` file automatically.
1. Use `jq` syntax to deal with the json file.
1. `In-place` edit support by specify a `-i` or `--in-place` argument.

## USAGE

```shell
$ npm-jq --help

usage: pkg-jq [-h] [-v] [-i] filter [path]

Node.js Package jq Utility

Positional arguments:
  filter          jq filter
  path            npm module subdirectory, or a json file. default: $PWD

Optional arguments:
  -h, --help      Show this help message and exit.
  -v, --version   Show program's version number and exit.
  -i, --in-place  edit files in place

```

### 1. Query

```shell
$ pkg-jq .version
"0.0.6"
```

### 2. Edit In Place

```shell
pkg-jq -i '.publishConfig.tag="next"'
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
