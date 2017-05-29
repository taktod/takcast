# takcast

# 作者

taktod

https://twitter.com/taktod

poepoemix@hotmail.com

# 概要

javascriptやhtmlをベースにした配信ツールをつくることで誰でも簡単に機能をつくることができる
配信ツールを目指してみました。

# 使い方

takcastを入手する
```
$ git clone git@github.com:taktod/takcast.git
$ cd takcast
$ npm install
```

適当なプラグインを導入する
```
$ npm install taktod/takcast.source.capture
$ npm install taktod/takcast.media.imagemixer
$ npm install taktod/takcast.output.webmfile
$ npm run setup
```
とりあえず
カメラ・マイクキャプチャいれて
画像・動画合成いれて
出力にwebm作成をいれる

electronを起動する
```
$ npm test
```

あとはいじればよし
