# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## users テーブル
| Column | Type | Options     |
|--------|------|-------------|
|name|string|null: false,unique: true  |
|email|string|null: false,unique: true  |
|pass |string|null: false     |

### Association
- has_many:messages
- has_many:groups_users
- has_many:groups, through: groups_users 


## messages テーブル
| Column | Type | Options     |
|--------|------|-------------|
|body|text|    |
|image |string|               |
|user_id |t.references|null.false,foreign_key: true |
|group_id |t.references|null.false,foreign_key: true |

### Association
- belongs_to:user
- belongs_to:group


## groups テーブル
| Column | Type | Options     |
|--------|------|-------------|
|name |string|null.false, unique: true |


### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages


## groups_users テーブル
| Column | Type | Options     |
|--------|------|-------------|
|user_id |t.references|null.false,foreign_key: true |
|group_id |t.references|null.false,foreign_key: true |

### Association
- belongs_to:user
- belongs_to:group