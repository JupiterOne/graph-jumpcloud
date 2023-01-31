# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.1.1 - 2023-01-26

### Fixed

- Skip `Group HAS Member` relationship creation if it was already created.

## 2.1.0 - 2021-11-10

### Added

- Added support for ingesting the following **new** entity:

| Resources   | Entity `_type`          | Entity `_class` |
| ----------- | ----------------------- | --------------- |
| Application | `jumpcloud_application` | `Application`   |

- Added support for ingesting the following **new** relationships:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`   |
| --------------------- | --------------------- | ----------------------- |
| `jumpcloud_account`   | **HAS**               | `jumpcloud_application` |
| `jumpcloud_user`      | **ASSIGNED**          | `jumpcloud_application` |
| `jumpcloud_group`     | **ASSIGNED**          | `jumpcloud_application` |

## 2.0.0 - 2021-02-15

### Added

- `jumpcloud_account` **HAS** `jumpcloud_group` relationship

### Changed

- Convert to new SDK

### Fixed

- Paginate group members
