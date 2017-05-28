/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactBootstrap;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// pluginがそれぞれ読み込まれたら配列に保存しておく。
exports.setPlugin = function (plugins, plugin) {
    if (typeof (plugins[plugin.type]) == "undefined") {
        plugins[plugin.type] = [];
    }
    plugins[plugin.type].push(plugin);
};
// すべてのpluginの読み込みが終わったらplugin参照できるチャンスを与えます。
exports.startPlugins = function (plugins) {
    // これはpluginsの中身はその順番になるけど、keysのkeyがどういう順番になるかは不明
    // とりあえずbase、media、field、sourceといった順番になってた方が都合がよさそう。
    // mediaFieldPluginの初期化の部分で、保持しているmediaPluginのaudioNode -> context.destinationという組み合わせがある。
    var ready = function (key) {
        if (plugins[key] && plugins[key].forEach) {
            plugins[key].forEach(function (plugin) {
                if (plugin.setPlugins) {
                    plugin.setPlugins(plugins);
                }
            });
        }
    };
    ready("base");
    ready("media");
    ready("field");
    ready("source");
    ready("output");
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pluginLoader_1 = __webpack_require__(3);
exports.plugins = {};
var base = __webpack_require__(6);
pluginLoader_1.setPlugin(exports.plugins, base._);
var media = __webpack_require__(7);
pluginLoader_1.setPlugin(exports.plugins, media._);
var output = __webpack_require__(11);
pluginLoader_1.setPlugin(exports.plugins, output._);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = __webpack_require__(4);
var pluginLoader_1 = __webpack_require__(3);
pluginLoader_1.startPlugins(render_1.plugins);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var electron = __webpack_require__(14);
/**
 * 全体で共有するデータを保持するBaseプラグイン
 */
var Base = (function () {
    function Base() {
        /**
         * 名前
         */
        this.name = "base";
        /**
         * 動作タイプ
         */
        this.type = "base";
    }
    Base.prototype.setPlugins = function (plugins) {
        this.context = new AudioContext();
        this.devnullNode = this.context.createGain();
        this.devnullNode.gain.value = 0.0;
        this.devnullNode.connect(this.context.destination);
    };
    /**
     * audioContextを参照する
     * @return AudioContext
     */
    Base.prototype.refAudioContext = function () {
        return this.context;
    };
    /**
     * 接続すると音を出さないAudioNodeを参照する
     * @return AudioNode
     */
    Base.prototype.refDevnullNode = function () {
        return this.devnullNode;
    };
    /**
     * electron動作であるか確認してみる。
     */
    Base.prototype.isElectron = function () {
        return electron != null;
    };
    return Base;
}());
exports._ = new Base();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var palette_1 = __webpack_require__(10);
var main_1 = __webpack_require__(9);
var dialog_1 = __webpack_require__(8);
var Media = (function () {
    function Media() {
        this.name = "media";
        this.type = "field";
        this.palette = null;
        this.main = null;
        this.sourcePlugins = [];
        this.outputPlugins = [];
        this.sources = [];
        this.index = -1;
        this.mediaPlugin = null;
    }
    Media.prototype._setPalette = function (palette) {
        this.palette = palette;
    };
    Media.prototype._setMain = function (main) {
        this.main = main;
    };
    Media.prototype.setPlugins = function (plugins) {
        var _this = this;
        // それぞれのpluginの参照をとっておく。
        if (plugins["media"] && plugins["media"].forEach) {
            // 今回は全部ではなく、mediaPluginの一番最後だけ採用する形にすればいいと思う。
            var index = plugins["media"].length - 1;
            this.mediaPlugin = plugins["media"][index];
            // ここで利用するmediaPluginが確定される。
        }
        if (plugins["source"] && plugins["source"].forEach) {
            plugins["source"].forEach(function (plugin) {
                _this.sourcePlugins.push(plugin);
            });
        }
        if (plugins["output"] && plugins["output"].forEach) {
            plugins["output"].forEach(function (plugin) {
                _this.outputPlugins.push(plugin);
            });
        }
        var basePlugin = plugins["base"][0];
        // 利用するmediaPluginが確定したので、いろいろしておく。
        // 音声を出力に接続しておく。
        if (this.mediaPlugin != null) {
            this.mediaPlugin.refNode().connect(basePlugin.refAudioContext().destination);
            this.outputPlugins.forEach(function (plugin) {
                plugin.onChangeActiveMedia(_this.mediaPlugin);
            });
        }
        // 描画を更新しておく
        this.render();
    };
    Media.prototype._refMediaPlugin = function () {
        return this.mediaPlugin;
    };
    Media.prototype._refSourcePlugins = function () {
        return this.sourcePlugins;
    };
    Media.prototype._refSources = function () {
        return this.sources;
    };
    Media.prototype._refActiveSource = function () {
        if (this.index == -1) {
            return null;
        }
        else {
            return this.sources[this.index];
        }
    };
    Media.prototype._refActiveIndex = function () {
        return this.index;
    };
    Media.prototype._setActiveSource = function (index) {
        this.index = index;
        this.mediaPlugin.onChangeActiveSource(this._refActiveSource());
    };
    Media.prototype._updateSize = function () {
        // サイズが変更になったときにcallしようと思う
        // こっち側で管理しなければならないが・・・どうするかね。
        var height = window.innerHeight;
        var fo = document.getElementById("footer").getElementsByClassName("navbar");
        if (fo.length != 0) {
            height -= fo[0].clientHeight;
        }
        var he = document.getElementById("header").getElementsByClassName("navbar");
        if (he.length != 0) {
            height -= he[0].clientHeight;
        }
        height -= 20;
        if (this.palette != null) {
            this.palette.updateHeight(height);
        }
        if (this.main != null) {
            this.main.updateHeight(height);
        }
    };
    Media.prototype.render = function () {
        palette_1.palette(this);
        main_1.main(this);
    };
    Media.prototype.renderDialog = function () {
        dialog_1.dialog(this);
    };
    // あと別で必要になりそうなもの。
    // 現在Activeなsourceを削除する動作
    Media.prototype._deleteSource = function (source) {
        var index = this.sources.indexOf(source);
        if (index >= 0) {
            // sourcesから撤去
            this.sources.splice(index, 1);
            // データを解放
            source.release();
            // パレットの部分、再描画する。
            palette_1.palette(this);
        }
    };
    // sourceが追加されたときの動作
    Media.prototype._addSource = function (source) {
        console.log("addSourceされました。");
        console.log(source);
        // 増やす
        this.sources.push(source);
        // 通知する。
        this.mediaPlugin.onAddSource(source);
        // パレットの更新を実施する。
        // 前のプログラムの場合は、別のタブに移動している状態でpaletteの更新を実施すると壊れたが、今回の動作では、paletteを別に移動することがないので、これでOKのはず
        palette_1.palette(this);
    };
    return Media;
}());
exports.Media = Media;
exports._ = new Media();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var ReactBootstrap = __webpack_require__(1);
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
exports.dialog = function (media) {
    var plugins = media._refSourcePlugins();
    // このダイアログで、新しいソースを選択する方向で調整していく
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            var _this = _super.call(this) || this;
            _this.state = {
                showDialog: true,
                index: 0
            };
            _this._close = _this._close.bind(_this);
            _this._create = _this._create.bind(_this);
            _this._change = _this._change.bind(_this);
            return _this;
        }
        Dialog.prototype._close = function () {
            this.setState({ showDialog: false });
        };
        Dialog.prototype._create = function () {
            var plugin = plugins[this.state.index];
            var newSource = plugin.createNewSource();
            if (newSource != null) {
                media._addSource(newSource);
            }
            this._close();
        };
        Dialog.prototype._change = function (item) {
            this.setState({ index: item.target.value });
        };
        Dialog.prototype.render = function () {
            var _this = this;
            return (React.createElement(Modal, { show: this.state.showDialog, onHide: this._close },
                React.createElement(Modal.Header, { closeButton: true },
                    React.createElement(Modal.Title, null, "NewSource")),
                React.createElement(Modal.Body, null,
                    React.createElement(Form, null,
                        React.createElement(FormGroup, { controlId: "formControlsSelect" },
                            React.createElement(FormControl, { componentClass: "select", placeholder: "select", onChange: this._change }, plugins.map(function (plugin, i) {
                                return React.createElement("option", { value: i, key: i }, plugin.name);
                            })))),
                    (function (target) {
                        if (_this.state.showDialog && target != null) {
                            var Component = target.refPickupComponent();
                            if (Component != null) {
                                return React.createElement(Component, null);
                            }
                        }
                        return React.createElement("div", null);
                    })(plugins[this.state.index])),
                React.createElement(Modal.Footer, null,
                    React.createElement(Button, { onClick: this._create },
                        React.createElement("span", { className: "glyphicon glyphicon-plus", "aria-hidden": "true" })))));
        };
        return Dialog;
    }(React.Component));
    ReactDOM.render(React.createElement(Dialog, null), document.getElementById("dialog"));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var ReactBootstrap = __webpack_require__(1);
var Panel = ReactBootstrap.Panel;
exports.main = function (media) {
    if (media._refMediaPlugin() != null) {
        var BodyComponent = media._refMediaPlugin().refBodyComponent();
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                var _this = _super.call(this) || this;
                _this.state = { height: window.innerHeight };
                return _this;
            }
            Main.prototype.updateHeight = function (height) {
                this.setState({ height: height });
            };
            Main.prototype.render = function () {
                media._setMain(this);
                return (React.createElement(Panel, { style: { height: this.state.height } },
                    React.createElement(BodyComponent, null)));
            };
            return Main;
        }(React.Component));
        ReactDOM.render(React.createElement(Main, null), document.getElementById("body"));
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var ReactBootstrap = __webpack_require__(1);
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
exports.palette = function (media) {
    // こっち側つくっていくか・・・
    // とりあえずボタンを押したときに、dialog boxを表示する動作をつくってみようと思う。
    // あとはactiveになったとき、再描画したときにscroll位置がうごくのがよくない。
    var Palette = (function (_super) {
        __extends(Palette, _super);
        function Palette() {
            var _this = _super.call(this) || this;
            _this.state = { index: media._refActiveIndex(), height: window.innerHeight };
            _this.openDialog = _this.openDialog.bind(_this);
            _this.clickList = _this.clickList.bind(_this);
            _this.deleteSource = _this.deleteSource.bind(_this);
            return _this;
        }
        Palette.prototype.openDialog = function () {
            media.renderDialog();
        };
        Palette.prototype.clickList = function (item) {
            var i = parseInt(item._dispatchInstances._hostNode.name);
            if (media._refActiveIndex() == i) {
                media._setActiveSource(-1);
                this.setState({ index: -1 });
            }
            else {
                media._setActiveSource(i);
                this.setState({ index: i });
            }
        };
        Palette.prototype.deleteSource = function () {
            media._setActiveSource(-1);
            media._deleteSource(media._refSources()[this.state.index]);
        };
        Palette.prototype.updateHeight = function (height) {
            this.setState({ height: height });
        };
        Palette.prototype.componentDidMount = function () {
            media._updateSize();
        };
        Palette.prototype.render = function () {
            var _this = this;
            var _pthis = this;
            media._setPalette(this);
            // これはもうこれでいいんだけど、resizeのイベントうけとりたい。
            return (React.createElement(Panel, { style: { height: this.state.height } },
                React.createElement(ButtonGroup, { ref: "btngroup" },
                    React.createElement(Button, { onClick: this.openDialog },
                        React.createElement("span", { className: "glyphicon glyphicon-plus", "aria-hidden": "true" })),
                    React.createElement(Button, { onClick: this.deleteSource },
                        React.createElement("span", { className: "glyphicon glyphicon-trash", "aria-hidden": "true" }))),
                React.createElement("br", null),
                React.createElement("div", { style: { border: "0px", padding: "0px", overflow: "scroll", height: (_pthis.state.height - 66) } }, /* この部分にpaletteとして選択可能なリソースを列挙する予定 */ 
                // ２つずつループするようにすれば、事足りるわけか・・・なるほど
                media._refSources().map(function (data, i) {
                    // あとはコンポーネントの描画を実施すればよい。
                    var clsname = "list-group-item col-xs-4 col-sm-4";
                    if (_this.state.index == i) {
                        clsname += " active";
                    }
                    var _pthis = _this;
                    var isAudio = data.refAudioNode() != null;
                    var HogeComponent = (function (_super) {
                        __extends(HogeComponent, _super);
                        function HogeComponent() {
                            var _this = _super.call(this) || this;
                            // 前の値をしっておかないと・・・ということはないか・・・
                            // 毎回100に戻したらまずいかな。
                            _this.state = { volume: data.getVolume() };
                            _this._inputVolume = _this._inputVolume.bind(_this);
                            return _this;
                        }
                        HogeComponent.prototype._inputVolume = function (item) {
                            data.setVolume(parseInt(item.target.value));
                        };
                        HogeComponent.prototype.componentWillUnmount = function () {
                            var element = data.refDisplayElement();
                            if (element) {
                                var paused = false;
                                if (element instanceof HTMLMediaElement) {
                                    paused = element.paused;
                                }
                                document.body.appendChild(element);
                                element.style["display"] = "none";
                                element.style["width"] = "100px";
                                if (element instanceof HTMLMediaElement && !paused) {
                                    element.play();
                                }
                                // 音声onlyの場合にmediaElementにアクセスできないのはまずいか・・・
                                // ただし、これは描画に関わってはいけないことになるわけか・・・
                            }
                        };
                        HogeComponent.prototype.componentDidMount = function () {
                            var element = data.refDisplayElement();
                            if (element) {
                                var paused = false;
                                if (element instanceof HTMLMediaElement) {
                                    paused = element.paused;
                                }
                                this.refs["media"].appendChild(element);
                                element.style["display"] = "";
                                element.style["width"] = "100%";
                                if (element instanceof HTMLMediaElement && !paused) {
                                    element.play();
                                }
                            }
                            // とりあえず縦横をあわせておこうと思う。
                            element.style["height"] = (element.clientWidth * 9 / 16) + "px";
                        };
                        HogeComponent.prototype.render = function () {
                            var _this = this;
                            return (React.createElement(Button, { ref: "item", className: clsname, onClick: _pthis.clickList, name: "" + i, key: i },
                                React.createElement("div", { ref: "media" }),
                                (function (isAudio) {
                                    if (isAudio) {
                                        return React.createElement("input", { type: "range", onInput: _this._inputVolume, defaultValue: "" + _this.state.volume });
                                    }
                                    else {
                                        return React.createElement("div", null);
                                    }
                                })(isAudio)));
                        };
                        return HogeComponent;
                    }(React.Component));
                    return (React.createElement(HogeComponent, null));
                }))));
        };
        return Palette;
    }(React.Component));
    ReactDOM.render(React.createElement(Palette, null), document.getElementById("palette"));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 出力調整用のplugin
// こっちでは、出力のコントロールと下部にある、outputコントロール動作部をコントロールする予定
// footerをこっちでコントロールしてもいいかも・・・
// そうするか・・・
// なお、outputPluginにせよ、mediaPluginにせよ、最後に選択されたものを採用することで進めようと思う。
// でも、それは実装の仕方次第か・・・
// そこからはずれた動作を実施されたら・・・あ、でもreactで描画されたところを再描画すると、あとで書いた方が有効になるか
// ということなら、特になにも考えずにつくって大丈夫っぽいな。
// 音声の出力の動作は、それ専用のpluginでコントロールしようと思う。
// headerに音声調整のがあると、どの音量を操作しているかわからなくなって、ややこしくなりそう。
// まぁあってもいいけど。
// いや、やはり全体の音量をコントロールできるほうが都合がいいか・・・
Object.defineProperty(exports, "__esModule", { value: true });
var header_1 = __webpack_require__(13);
var footer_1 = __webpack_require__(12);
// こいつが、mediaPluginをすべて管理しておかないといけない。
// volumeが変更したら、その値をmediaPluginに通知しないといけない。
var Output = (function () {
    function Output() {
        this.name = "output";
        this.type = "field"; // これはfieldでありoutputNodeでもあるというのは可能といえば可能ですね。
    }
    // 現在有効になっているmediaPluginを知る必要がある。
    // 現在保持してるoutputPluginも知る必要がある。
    Output.prototype.setPlugins = function (plugins) {
        var _this = this;
        this.mediaPlugins = [];
        this.outputPlugins = [];
        // pluginが全部そろったときにcallされる動作
        // ここから、mediaPluginを取り出してそのaudioContextをrefとして保持しておかないといけない。
        // それくらいかな。
        // このタイミングで自分からfooterの内容を更新しにいくか・・・
        // そして自分の中のイベントでfooterの再描画が必要になったら、自分でrenderを再度実施するでいいか
        // 元々の動作ではactiveなデータを表示したかったのでmediaPluginを参照していた。
        // 今回はmediaの表示部を隠すことはないので、必要ないかな。
        // baseからaudioContextとdevnullNodeだけ参照してたら十分なきがする。
        if (plugins["field"] && plugins["field"].forEach) {
            plugins["field"].forEach(function (plugin) {
                if (plugin["_updateSize"]) {
                    _this.mediaFieldPlugin = plugin;
                }
            });
        }
        if (plugins["media"] && plugins["media"].forEach) {
            plugins["media"].forEach(function (plugin) {
                _this.mediaPlugins.push(plugin);
            });
        }
        if (plugins["output"] && plugins["output"].forEach) {
            plugins["output"].forEach(function (plugin) {
                _this.outputPlugins.push(plugin);
            });
        }
        this.render();
    };
    // 描画せよと命令されたときの動作
    Output.prototype.render = function () {
        header_1.header(this);
        footer_1.footer(this);
    };
    Output.prototype._setVolume = function (number) {
        this.mediaPlugins.forEach(function (plugin) {
            plugin.setVolume(number);
        });
    };
    Output.prototype._refOutputPlugins = function () {
        return this.outputPlugins;
    };
    Output.prototype._onUpdateSize = function () {
        // サイズの更新を実施する
        this.mediaFieldPlugin._updateSize();
    };
    return Output;
}());
exports.Output = Output;
exports._ = new Output();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var ReactBootstrap = __webpack_require__(1);
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NCollapse = Navbar.Collapse;
var Form = ReactBootstrap.Form;
var FormControl = ReactBootstrap.FormControl;
exports.footer = function (output) {
    var plugins = output._refOutputPlugins();
    var footer = document.getElementById("footer");
    var Footer = (function (_super) {
        __extends(Footer, _super);
        function Footer() {
            var _this = _super.call(this) || this;
            _this.state = {
                index: 0,
                hoge: 0
            };
            _this._updatePadding = _this._updatePadding.bind(_this);
            return _this;
        }
        Footer.prototype._updatePadding = function () {
            output._onUpdateSize();
            //      document.body.style["padding-bottom"] = (footer.getElementsByClassName("navbar")[0].clientHeight + 10) + "px";
        };
        Footer.prototype.componentDidMount = function () {
            console.log("did mount is called");
            this._updatePadding();
            window.addEventListener("resize", this._updatePadding);
        };
        Footer.prototype.render = function () {
            return (React.createElement(Navbar, { collapseOnSelect: true, fixedBottom: true },
                React.createElement(Navbar.Toggle, null),
                React.createElement(NCollapse, { onEntered: this._updatePadding, onExited: this._updatePadding },
                    React.createElement(Navbar.Text, null,
                        React.createElement(Form, null,
                            React.createElement(FormControl, { componentClass: "select" }, plugins.map(function (plugin, i) {
                                return React.createElement("option", { value: i, key: i }, plugin.name);
                            })))),
                    (function (target) {
                        if (target != null) {
                            var Component = target.refSettingComponent();
                            if (Component != null) {
                                return React.createElement(Component, null);
                            }
                        }
                        return React.createElement("div", null);
                    })(plugins[this.state.index]))));
        };
        return Footer;
    }(React.Component));
    ReactDOM.render(React.createElement(Footer, null), footer);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// ヘッダー部をコントロールする。
// ここに音声出力動作を追加しとくことにする。
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var ReactBootstrap = __webpack_require__(1);
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NCollapse = Navbar.Collapse;
exports.header = function (output) {
    var header = document.getElementById("header");
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header() {
            var _this = _super.call(this) || this;
            _this.volume = _this.volume.bind(_this);
            _this._updatePadding = _this._updatePadding.bind(_this);
            return _this;
        }
        Header.prototype.volume = function (item) {
            output._setVolume(item.target.value);
        };
        Header.prototype._updatePadding = function () {
            output._onUpdateSize();
            document.body.style["padding-top"] = (header.getElementsByClassName("navbar")[0].clientHeight + 10) + "px";
        };
        Header.prototype.componentDidMount = function () {
            this._updatePadding();
            window.addEventListener("resize", this._updatePadding);
        };
        Header.prototype.render = function () {
            return (React.createElement(Navbar, { inverse: true, collapseOnSelect: true, fixedTop: true },
                React.createElement(Navbar.Header, null,
                    React.createElement(Navbar.Brand, null, "TakCast"),
                    React.createElement(Navbar.Toggle, null)),
                React.createElement(NCollapse, { onEntered: this._updatePadding, onExited: this._updatePadding },
                    React.createElement(Navbar.Text, { pullRight: true },
                        "Volume",
                        React.createElement("input", { type: "range", defaultValue: "100", onChange: this.volume })))));
        };
        return Header;
    }(React.Component));
    ReactDOM.render(React.createElement(Header, null), header);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = electron;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDg5NjA2MjY0Y2FmMTUxNjc2NzkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdEJvb3RzdHJhcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvcGx1Z2luTG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3JlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2Jhc2UvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL21lZGlhL3JlbmRlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2lucy9tZWRpYS9yZW5kZXIvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2lucy9tZWRpYS9yZW5kZXIvdWkvbWFpbi50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvbWVkaWEvcmVuZGVyL3VpL3BhbGV0dGUudHN4Iiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvb3V0cHV0L3JlbmRlci91aS9mb290ZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvdWkvaGVhZGVyLnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQSx1Qjs7Ozs7O0FDQUEsZ0M7Ozs7OztBQ0FBLDBCOzs7Ozs7Ozs7QUNFQSwrQkFBK0I7QUFDcEIsaUJBQVMsR0FBRyxVQUFDLE9BQXFDLEVBQUUsTUFBYztJQUMzRSxFQUFFLEVBQUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsNkNBQTZDO0FBQ2xDLG9CQUFZLEdBQUcsVUFBQyxPQUFxQztJQUM5RCxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELDBGQUEwRjtJQUMxRixJQUFJLEtBQUssR0FBRyxVQUFDLEdBQUc7UUFDZCxFQUFFLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUMxQixFQUFFLEVBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsQixDQUFDOzs7Ozs7Ozs7O0FDN0JELDRDQUF5QztBQUU5QixlQUFPLEdBQUcsRUFBRSxDQUFDO0FBRXhCLGtDQUFzQztBQUN0Qyx3QkFBUyxDQUFDLGVBQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0IsbUNBQXdDO0FBQ3hDLHdCQUFTLENBQUMsZUFBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixxQ0FBMEM7QUFDMUMsd0JBQVMsQ0FBQyxlQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDVDdCLHNDQUF5QztBQUN6Qyw0Q0FBb0Q7QUFFcEQsMkJBQVksQ0FBQyxnQkFBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7QUNEdEIsdUNBQXFDO0FBRXJDOztHQUVHO0FBQ0g7SUFBQTtRQUNFOztXQUVHO1FBQ0ksU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNyQjs7V0FFRztRQUNJLFNBQUksR0FBRyxNQUFNLENBQUM7SUFxQ3ZCLENBQUM7SUExQlEseUJBQVUsR0FBakIsVUFBa0IsT0FBcUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNEOzs7T0FHRztJQUNJLDhCQUFlLEdBQXRCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLDZCQUFjLEdBQXJCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNEOztPQUVHO0lBQ0kseUJBQVUsR0FBakI7UUFDRSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0gsV0FBQztBQUFELENBQUM7QUFFVSxTQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7OztBQ3pDMUIsd0NBQXFDO0FBQ3JDLG9DQUErQjtBQUMvQixzQ0FBbUM7QUFNbkM7SUFjRTtRQWJPLFNBQUksR0FBRyxPQUFPLENBQUM7UUFDZixTQUFJLEdBQUcsT0FBTyxDQUFDO1FBYXBCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNNLDJCQUFXLEdBQWxCLFVBQW1CLE9BQTJCO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFDTSx3QkFBUSxHQUFmLFVBQWdCLElBQXdCO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDTSwwQkFBVSxHQUFqQixVQUFrQixPQUFxQztRQUF2RCxpQkE4QkM7UUE3QkMsd0JBQXdCO1FBQ3hCLEVBQUUsRUFBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEQsOENBQThDO1lBQzlDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBaUIsQ0FBQztZQUMzRCw0QkFBNEI7UUFDOUIsQ0FBQztRQUNELEVBQUUsRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQy9CLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQXVCLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUMvQixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUF1QixDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUVuRCxtQ0FBbUM7UUFDbkMsZ0JBQWdCO1FBQ2hCLEVBQUUsRUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtnQkFDaEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxZQUFZO1FBQ1osSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDTSwrQkFBZSxHQUF0QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDTSxpQ0FBaUIsR0FBeEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBQ00sMkJBQVcsR0FBbEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ08sZ0NBQWdCLEdBQXhCO1FBQ0UsRUFBRSxFQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFDTSwrQkFBZSxHQUF0QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDTSxnQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBWTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNNLDJCQUFXLEdBQWxCO1FBQ0UsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUM5QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUUsRUFBRSxFQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUMvQixDQUFDO1FBQ0QsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RSxFQUFFLEVBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQy9CLENBQUM7UUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2IsRUFBRSxFQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsRUFBRSxFQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQUNNLHNCQUFNLEdBQWI7UUFDRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2QsV0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNNLDRCQUFZLEdBQW5CO1FBQ0UsZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDbEIsNkJBQWEsR0FBcEIsVUFBcUIsTUFBYztRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxFQUFFLEVBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxjQUFjO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFNBQVM7WUFDVCxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsaUJBQWlCO1lBQ2pCLGlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFDRCxvQkFBb0I7SUFDYiwwQkFBVSxHQUFqQixVQUFrQixNQUFjO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE1BQU07UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixRQUFRO1FBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsZ0JBQWdCO1FBQ2hCLHdGQUF3RjtRQUN4RixpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQztBQXpJWSxzQkFBSztBQTJJUCxTQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSzNCLG1DQUF3QztBQUN4QyxzQ0FBNEM7QUFDNUMsNENBQWtEO0FBSWxELElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7QUFDakMsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUNuQyxJQUFJLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO0FBQy9CLElBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7QUFDekMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztBQUM3QyxJQUFJLFlBQVksR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO0FBRXBDLGNBQU0sR0FBRyxVQUFDLEtBQVc7SUFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDeEMsZ0NBQWdDO0lBQ2hDO1FBQXFCLDBCQUF1QjtRQUsxQztZQUFBLFlBQ0UsaUJBQU8sU0FJUjtZQVRELFdBQUssR0FBRztnQkFDTixVQUFVLEVBQUMsSUFBSTtnQkFDZixLQUFLLEVBQUMsQ0FBQzthQUNSLENBQUM7WUFHQSxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7UUFDekMsQ0FBQztRQUNNLHVCQUFNLEdBQWI7WUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNNLHdCQUFPLEdBQWQ7WUFDRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekMsRUFBRSxFQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUNNLHdCQUFPLEdBQWQsVUFBZSxJQUFJO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDTSx1QkFBTSxHQUFiO1lBQUEsaUJBb0NDO1lBbkNDLE1BQU0sQ0FBQyxDQUNMLG9CQUFDLEtBQUssSUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNyRCxvQkFBQyxLQUFLLENBQUMsTUFBTSxJQUFDLFdBQVc7b0JBQ3ZCLG9CQUFDLEtBQUssQ0FBQyxLQUFLLG9CQUF3QixDQUN2QjtnQkFDZixvQkFBQyxLQUFLLENBQUMsSUFBSTtvQkFDVCxvQkFBQyxJQUFJO3dCQUNILG9CQUFDLFNBQVMsSUFBQyxTQUFTLEVBQUMsb0JBQW9COzRCQUN2QyxvQkFBQyxXQUFXLElBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxJQUU5RSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVMsTUFBTSxFQUFFLENBQUM7Z0NBQzVCLE1BQU0sQ0FBQyxnQ0FBUSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUcsTUFBTSxDQUFDLElBQUksQ0FBVTs0QkFDekQsQ0FBQyxDQUFDLENBRVUsQ0FDSixDQUNQO29CQUVOLENBQ0MsVUFBQyxNQUFNO3dCQUNMLEVBQUUsRUFBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDM0MsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7NEJBQzVDLEVBQUUsRUFBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDckIsTUFBTSxDQUFDLG9CQUFDLFNBQVMsT0FBRzs0QkFDdEIsQ0FBQzt3QkFDSCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxnQ0FBTyxDQUFDO29CQUNqQixDQUFDLENBQ0YsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNqQjtnQkFDYixvQkFBQyxLQUFLLENBQUMsTUFBTTtvQkFDWCxvQkFBQyxNQUFNLElBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO3dCQUFFLDhCQUFNLFNBQVMsRUFBQywwQkFBMEIsaUJBQWEsTUFBTSxHQUFRLENBQVMsQ0FDaEcsQ0FDVCxDQUNULENBQUM7UUFDSixDQUFDO1FBQ0gsYUFBQztJQUFELENBQUMsQ0E5RG9CLEtBQUssQ0FBQyxTQUFTLEdBOERuQztJQUNELFFBQVEsQ0FBQyxNQUFNLENBQ2Isb0JBQUMsTUFBTSxPQUFHLEVBQ1YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FDbEMsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkZELG1DQUF3QztBQUN4QyxzQ0FBNEM7QUFDNUMsNENBQWtEO0FBRWxELElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7QUFLdEIsWUFBSSxHQUFHLFVBQUMsS0FBVztJQUM1QixFQUFFLEVBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0Q7WUFBbUIsd0JBQXVCO1lBRXhDO2dCQUFBLFlBQ0UsaUJBQU8sU0FDUjtnQkFIRCxXQUFLLEdBQUcsRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLFdBQVcsRUFBQyxDQUFDOztZQUdwQyxDQUFDO1lBQ00sMkJBQVksR0FBbkIsVUFBb0IsTUFBYTtnQkFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFDTSxxQkFBTSxHQUFiO2dCQUNFLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxDQUNMLG9CQUFDLEtBQUssSUFBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUM7b0JBQ3RDLG9CQUFDLGFBQWEsT0FBRyxDQUNYLENBQ1QsQ0FBQztZQUNKLENBQUM7WUFDSCxXQUFDO1FBQUQsQ0FBQyxDQWhCa0IsS0FBSyxDQUFDLFNBQVMsR0FnQmpDO1FBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FDYixvQkFBQyxJQUFJLE9BQUcsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUNoQyxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENELG1DQUF3QztBQUN4QyxzQ0FBNEM7QUFDNUMsNENBQWtEO0FBT2xELElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDN0IsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztBQUNyQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ2pDLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFDbkMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztBQUVsQyxlQUFPLEdBQUcsVUFBQyxLQUFXO0lBQy9CLGlCQUFpQjtJQUNqQixnREFBZ0Q7SUFDaEQsOENBQThDO0lBQzlDO1FBQXNCLDJCQUF1QjtRQUUzQztZQUFBLFlBQ0UsaUJBQU8sU0FJUjtZQU5ELFdBQUssR0FBRyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUMsQ0FBQztZQUdqRSxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQzdDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7UUFDbkQsQ0FBQztRQUNNLDRCQUFVLEdBQWpCO1lBQ0UsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDTSwyQkFBUyxHQUFoQixVQUFpQixJQUFJO1lBQ25CLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELEVBQUUsRUFBQyxLQUFLLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUMzQixDQUFDO1FBQ0gsQ0FBQztRQUNNLDhCQUFZLEdBQW5CO1lBQ0UsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDTSw4QkFBWSxHQUFuQixVQUFvQixNQUFhO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ00sbUNBQWlCLEdBQXhCO1lBQ0UsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFDTSx3QkFBTSxHQUFiO1lBQUEsaUJBK0ZDO1lBOUZDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLG9DQUFvQztZQUNwQyxNQUFNLENBQUMsQ0FDTCxvQkFBQyxLQUFLLElBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO2dCQUN0QyxvQkFBQyxXQUFXLElBQUMsR0FBRyxFQUFDLFVBQVU7b0JBQ3pCLG9CQUFDLE1BQU0sSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7d0JBQUUsOEJBQU0sU0FBUyxFQUFDLDBCQUEwQixpQkFBYSxNQUFNLEdBQVEsQ0FBUztvQkFDaEgsb0JBQUMsTUFBTSxJQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTt3QkFBRSw4QkFBTSxTQUFTLEVBQUMsMkJBQTJCLGlCQUFhLE1BQU0sR0FBUSxDQUFTLENBQ3ZHO2dCQUNkLCtCQUFNO2dCQUNOLDZCQUFLLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFDLElBQ3pGLHFDQUFxQztnQkFDcEMsaUNBQWlDO2dCQUNqQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzlCLHlCQUF5QjtvQkFDekIsSUFBSSxPQUFPLEdBQUcsbUNBQW1DLENBQUM7b0JBQ2xELEVBQUUsRUFBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixPQUFPLElBQUksU0FBUyxDQUFDO29CQUN2QixDQUFDO29CQUNELElBQUksTUFBTSxHQUFHLEtBQUksQ0FBQztvQkFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQztvQkFDMUM7d0JBQTRCLGlDQUF1Qjt3QkFJakQ7NEJBQUEsWUFDRSxpQkFBTyxTQUVSOzRCQU5ELDhCQUE4Qjs0QkFDOUIsbUJBQW1COzRCQUNuQixXQUFLLEdBQUcsRUFBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDOzRCQUcvQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDOzt3QkFDbkQsQ0FBQzt3QkFDTSxvQ0FBWSxHQUFuQixVQUFvQixJQUFJOzRCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzlDLENBQUM7d0JBQ00sNENBQW9CLEdBQTNCOzRCQUNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzRCQUN2QyxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FDWCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0NBQ25CLEVBQUUsRUFBQyxPQUFPLFlBQVksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29DQUN2QyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQ0FDMUIsQ0FBQztnQ0FDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDbkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7Z0NBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO2dDQUNqQyxFQUFFLEVBQUMsT0FBTyxZQUFZLGdCQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQ0FDbEQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUNqQixDQUFDO2dDQUNELDJDQUEyQztnQ0FDM0MsaUNBQWlDOzRCQUNuQyxDQUFDO3dCQUNILENBQUM7d0JBQ00seUNBQWlCLEdBQXhCOzRCQUNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzRCQUN2QyxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FDWCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0NBQ25CLEVBQUUsRUFBQyxPQUFPLFlBQVksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29DQUN2QyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQ0FDMUIsQ0FBQztnQ0FDQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBaUIsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQ0FDaEMsRUFBRSxFQUFDLE9BQU8sWUFBWSxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0NBQ2xELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDakIsQ0FBQzs0QkFDSCxDQUFDOzRCQUNELHNCQUFzQjs0QkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDaEUsQ0FBQzt3QkFDTSw4QkFBTSxHQUFiOzRCQUFBLGlCQWtCQzs0QkFqQkMsTUFBTSxDQUFDLENBQ0wsb0JBQUMsTUFBTSxJQUFDLEdBQUcsRUFBQyxNQUFNLEVBQ2QsU0FBUyxFQUFFLE9BQU8sRUFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQ3pCLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUNaLEdBQUcsRUFBRSxDQUFDO2dDQUNSLDZCQUFLLEdBQUcsRUFBQyxPQUFPLEdBQUc7Z0NBQ2xCLENBQUMsVUFBQyxPQUFPO29DQUNSLEVBQUUsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dDQUNYLE1BQU0sQ0FBQywrQkFBTyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxFQUFFLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQVU7b0NBQ3ZHLENBQUM7b0NBQ0QsSUFBSSxDQUFDLENBQUM7d0NBQ0osTUFBTSxDQUFDLGdDQUFPO29DQUNoQixDQUFDO2dDQUNILENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUNKLENBQ1Y7d0JBQ0gsQ0FBQzt3QkFDSCxvQkFBQztvQkFBRCxDQUFDLENBaEUyQixLQUFLLENBQUMsU0FBUyxHQWdFMUM7b0JBQ0QsTUFBTSxDQUFDLENBQ0wsb0JBQUMsYUFBYSxPQUFHLENBQ2xCO2dCQUNILENBQUMsQ0FBQyxDQUVBLENBQ0EsQ0FDVCxDQUFDO1FBQ0osQ0FBQztRQUNILGNBQUM7SUFBRCxDQUFDLENBaElxQixLQUFLLENBQUMsU0FBUyxHQWdJcEM7SUFDRCxRQUFRLENBQUMsTUFBTSxDQUNiLG9CQUFDLE9BQU8sT0FBRyxFQUNYLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ25DLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7QUN4SkQsZUFBZTtBQUNmLG1EQUFtRDtBQUNuRCw4QkFBOEI7QUFDOUIsV0FBVztBQUNYLCtEQUErRDtBQUMvRCxvQkFBb0I7QUFDcEIsK0RBQStEO0FBQy9ELGdDQUFnQztBQUNoQyxzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELGNBQWM7QUFDZCxvQ0FBb0M7O0FBbUJwQyx1Q0FBbUM7QUFDbkMsdUNBQW1DO0FBRW5DLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0M7SUFBQTtRQUNTLFNBQUksR0FBVSxRQUFRLENBQUM7UUFDdkIsU0FBSSxHQUFVLE9BQU8sQ0FBQyxDQUFDLDZDQUE2QztJQXNEN0UsQ0FBQztJQWxEQyxpQ0FBaUM7SUFDakMsK0JBQStCO0lBQ3hCLDJCQUFVLEdBQWpCLFVBQWtCLE9BQXFDO1FBQXZELGlCQThCQztRQTdCQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4Qiw0QkFBNEI7UUFDNUIsNERBQTREO1FBQzVELFdBQVc7UUFDWCxtQ0FBbUM7UUFDbkMsdURBQXVEO1FBRXZELGlEQUFpRDtRQUNqRCxpQ0FBaUM7UUFDakMsaURBQWlEO1FBQ2pELEVBQUUsRUFBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQzlCLEVBQUUsRUFBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBZSxDQUFDO2dCQUMxQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxFQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtnQkFDOUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBc0IsQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQy9CLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQXVCLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHVCQUFNLEdBQWI7UUFDRSxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixlQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZixDQUFDO0lBQ00sMkJBQVUsR0FBakIsVUFBa0IsTUFBTTtRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ00sa0NBQWlCLEdBQXhCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUNNLDhCQUFhLEdBQXBCO1FBQ0UsY0FBYztRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUM7QUF4RFksd0JBQU07QUEwRFIsU0FBQyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0Y1QixtQ0FBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDRDQUFrRDtBQUVsRCxJQUFJLEdBQUcsR0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQ2pDLElBQUksTUFBTSxHQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFDcEMsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBZSxDQUFDO0FBRXZDLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDL0IsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztBQUlsQyxjQUFNLEdBQUcsVUFBQyxNQUFhO0lBQ2hDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0M7UUFBcUIsMEJBQXVCO1FBSzFDO1lBQUEsWUFDRSxpQkFBTyxTQUVSO1lBUEQsV0FBSyxHQUFHO2dCQUNOLEtBQUssRUFBQyxDQUFDO2dCQUNQLElBQUksRUFBQyxDQUFDO2FBQ1AsQ0FBQztZQUdBLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O1FBQ3ZELENBQUM7UUFDTywrQkFBYyxHQUF0QjtZQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QixzSEFBc0g7UUFDbEgsQ0FBQztRQUNNLGtDQUFpQixHQUF4QjtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNNLHVCQUFNLEdBQWI7WUFDRSxNQUFNLENBQUMsQ0FDTCxvQkFBQyxNQUFNLElBQUMsZ0JBQWdCLFFBQUMsV0FBVztnQkFDbEMsb0JBQUMsTUFBTSxDQUFDLE1BQU0sT0FBRTtnQkFDaEIsb0JBQUMsU0FBUyxJQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYztvQkFDdEUsb0JBQUMsTUFBTSxDQUFDLElBQUk7d0JBQ1osb0JBQUMsSUFBSTs0QkFDSCxvQkFBQyxXQUFXLElBQUMsY0FBYyxFQUFDLFFBQVEsSUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFTLE1BQU0sRUFBRSxDQUFDO2dDQUM1QixNQUFNLENBQUMsZ0NBQVEsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQVU7NEJBQ3pELENBQUMsQ0FBQyxDQUVRLENBQ1QsQ0FDSztvQkFFYixDQUNDLFVBQUMsTUFBTTt3QkFDTCxFQUFFLEVBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2xCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDOzRCQUM3QyxFQUFFLEVBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ3JCLE1BQU0sQ0FBQyxvQkFBQyxTQUFTLE9BQUc7NEJBQ3RCLENBQUM7d0JBQ0gsQ0FBQzt3QkFDRCxNQUFNLENBQUMsZ0NBQU87b0JBQ2hCLENBQUMsQ0FDRixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ2hCLENBQ0wsQ0FDVixDQUFDO1FBQ0osQ0FBQztRQUNILGFBQUM7SUFBRCxDQUFDLENBbERvQixLQUFLLENBQUMsU0FBUyxHQWtEbkM7SUFDRCxRQUFRLENBQUMsTUFBTSxDQUNiLG9CQUFDLE1BQU0sT0FBRyxFQUNWLE1BQU0sQ0FDUCxDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RUQsa0JBQWtCO0FBQ2xCLHdCQUF3QjtBQUN4QixtQ0FBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDRDQUFrRDtBQUVsRCxJQUFJLEdBQUcsR0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQ2pDLElBQUksTUFBTSxHQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFDcEMsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBZSxDQUFDO0FBSTVCLGNBQU0sR0FBRyxVQUFDLE1BQWE7SUFDaEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQztRQUFxQiwwQkFBdUI7UUFDMUM7WUFBQSxZQUNFLGlCQUFPLFNBR1I7WUFGQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O1FBQ3ZELENBQUM7UUFDTSx1QkFBTSxHQUFiLFVBQWMsSUFBSTtZQUNoQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNPLCtCQUFjLEdBQXRCO1lBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDN0csQ0FBQztRQUNNLGtDQUFpQixHQUF4QjtZQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ00sdUJBQU0sR0FBYjtZQUNFLE1BQU0sQ0FBQyxDQUNMLG9CQUFDLE1BQU0sSUFBQyxPQUFPLFFBQUMsZ0JBQWdCLFFBQUMsUUFBUTtnQkFDdkMsb0JBQUMsTUFBTSxDQUFDLE1BQU07b0JBQ1osb0JBQUMsTUFBTSxDQUFDLEtBQUssa0JBQXVCO29CQUNwQyxvQkFBQyxNQUFNLENBQUMsTUFBTSxPQUFFLENBQ0Y7Z0JBQ2hCLG9CQUFDLFNBQVMsSUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWM7b0JBQ3hFLG9CQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUMsU0FBUzs7d0JBRXBCLCtCQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUNuRCxDQUNGLENBQ0wsQ0FDVixDQUFDO1FBQ0osQ0FBQztRQUNILGFBQUM7SUFBRCxDQUFDLENBakNvQixLQUFLLENBQUMsU0FBUyxHQWlDbkM7SUFDRCxRQUFRLENBQUMsTUFBTSxDQUNiLG9CQUFDLE1BQU0sT0FBRyxFQUNWLE1BQU0sQ0FDUCxDQUFDO0FBQ0osQ0FBQzs7Ozs7OztBQ3JERCwwQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ4OTYwNjI2NGNhZjE1MTY3Njc5IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdEJvb3RzdHJhcDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0Qm9vdHN0cmFwXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtJUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcblxuLy8gcGx1Z2lu44GM44Gd44KM44Ge44KM6Kqt44G/6L6844G+44KM44Gf44KJ6YWN5YiX44Gr5L+d5a2Y44GX44Gm44GK44GP44CCXG5leHBvcnQgdmFyIHNldFBsdWdpbiA9IChwbHVnaW5zOntba2V5OnN0cmluZ106QXJyYXk8SVBsdWdpbj59LCBwbHVnaW46SVBsdWdpbikgPT4ge1xuICBpZih0eXBlb2YocGx1Z2luc1twbHVnaW4udHlwZV0pID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBwbHVnaW5zW3BsdWdpbi50eXBlXSA9IFtdO1xuICB9XG4gIHBsdWdpbnNbcGx1Z2luLnR5cGVdLnB1c2gocGx1Z2luKTtcbn1cblxuLy8g44GZ44G544Gm44GucGx1Z2lu44Gu6Kqt44G/6L6844G/44GM57WC44KP44Gj44Gf44KJcGx1Z2lu5Y+C54Wn44Gn44GN44KL44OB44Oj44Oz44K544KS5LiO44GI44G+44GZ44CCXG5leHBvcnQgdmFyIHN0YXJ0UGx1Z2lucyA9IChwbHVnaW5zOntba2V5OnN0cmluZ106QXJyYXk8SVBsdWdpbj59KSA9PiB7XG4gIC8vIOOBk+OCjOOBr3BsdWdpbnPjga7kuK3ouqvjga/jgZ3jga7poIbnlarjgavjgarjgovjgZHjganjgIFrZXlz44Gua2V544GM44Gp44GG44GE44GG6aCG55Wq44Gr44Gq44KL44GL44Gv5LiN5piOXG4gIC8vIOOBqOOCiuOBguOBiOOBmmJhc2XjgIFtZWRpYeOAgWZpZWxk44CBc291cmNl44Go44GE44Gj44Gf6aCG55Wq44Gr44Gq44Gj44Gm44Gf5pa544GM6YO95ZCI44GM44KI44GV44Gd44GG44CCXG4gIC8vIG1lZGlhRmllbGRQbHVnaW7jga7liJ3mnJ/ljJbjga7pg6jliIbjgafjgIHkv53mjIHjgZfjgabjgYTjgottZWRpYVBsdWdpbuOBrmF1ZGlvTm9kZSAtPiBjb250ZXh0LmRlc3RpbmF0aW9u44Go44GE44GG57WE44G/5ZCI44KP44Gb44GM44GC44KL44CCXG4gIHZhciByZWFkeSA9IChrZXkpID0+IHtcbiAgICBpZihwbHVnaW5zW2tleV0gJiYgcGx1Z2luc1trZXldLmZvckVhY2gpIHtcbiAgICAgIHBsdWdpbnNba2V5XS5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgICAgaWYocGx1Z2luLnNldFBsdWdpbnMpIHsgLy8gc2V0UGx1Z2luc+OBjOWumue+qeOBleOCjOOBpuOBhOOCi+WgtOWQiOOBoOOBkeWun+ihjFxuICAgICAgICAgIHBsdWdpbi5zZXRQbHVnaW5zKHBsdWdpbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmVhZHkoXCJiYXNlXCIpO1xuICByZWFkeShcIm1lZGlhXCIpO1xuICByZWFkeShcImZpZWxkXCIpO1xuICByZWFkeShcInNvdXJjZVwiKTtcbiAgcmVhZHkoXCJvdXRwdXRcIik7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9wbHVnaW5Mb2FkZXIudHMiLCJpbXBvcnQge3NldFBsdWdpbn0gZnJvbSBcIi4vcGx1Z2luTG9hZGVyXCI7XG5cbmV4cG9ydCB2YXIgcGx1Z2lucyA9IHt9O1xuXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gXCIuL2Jhc2UvcmVuZGVyXCI7XG5zZXRQbHVnaW4ocGx1Z2lucywgYmFzZS5fKTtcbmltcG9ydCAqIGFzIG1lZGlhIGZyb20gXCIuL21lZGlhL3JlbmRlclwiO1xuc2V0UGx1Z2luKHBsdWdpbnMsIG1lZGlhLl8pO1xuaW1wb3J0ICogYXMgb3V0cHV0IGZyb20gXCIuL291dHB1dC9yZW5kZXJcIjtcbnNldFBsdWdpbihwbHVnaW5zLCBvdXRwdXQuXyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9yZW5kZXIudHMiLCJpbXBvcnQge3BsdWdpbnN9IGZyb20gXCIuL3BsdWdpbnMvcmVuZGVyXCI7XG5pbXBvcnQge3N0YXJ0UGx1Z2luc30gZnJvbSBcIi4vcGx1Z2lucy9wbHVnaW5Mb2FkZXJcIjtcblxuc3RhcnRQbHVnaW5zKHBsdWdpbnMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC50cyIsImltcG9ydCB7SUJhc2VQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCAqIGFzIGVsZWN0cm9uIGZyb20gXCJlbGVjdHJvblwiO1xuXG4vKipcbiAqIOWFqOS9k+OBp+WFseacieOBmeOCi+ODh+ODvOOCv+OCkuS/neaMgeOBmeOCi0Jhc2Xjg5fjg6njgrDjgqTjg7NcbiAqL1xuY2xhc3MgQmFzZSBpbXBsZW1lbnRzIElCYXNlUGx1Z2luIHtcbiAgLyoqXG4gICAqIOWQjeWJjVxuICAgKi9cbiAgcHVibGljIG5hbWUgPSBcImJhc2VcIjtcbiAgLyoqXG4gICAqIOWLleS9nOOCv+OCpOODl1xuICAgKi9cbiAgcHVibGljIHR5cGUgPSBcImJhc2VcIjtcbiAgLyoqXG4gICAqIOWFseacieOBmeOCi0F1ZGlvQ29udGV4dFxuICAgKi9cbiAgcHJpdmF0ZSBjb250ZXh0OkF1ZGlvQ29udGV4dDtcbiAgLyoqXG4gICAqIOWFseacieOBmeOCi0F1ZGlvTm9kZVxuICAgKiDjgZPjgZPjgavjgYLjgabjgYzjgYbjgajjgIHpn7PjgYzjgafjgarjgY/jgarjgotcbiAgICovXG4gIHByaXZhdGUgZGV2bnVsbE5vZGU6R2Fpbk5vZGU7XG4gIHByaXZhdGUgZ2Fpbk5vZGU6R2Fpbk5vZGU7XG4gIHB1YmxpYyBzZXRQbHVnaW5zKHBsdWdpbnM6e1trZXk6c3RyaW5nXTpBcnJheTxJUGx1Z2luPn0pOnZvaWQge1xuICAgIHRoaXMuY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB0aGlzLmRldm51bGxOb2RlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmRldm51bGxOb2RlLmdhaW4udmFsdWUgPSAwLjA7XG4gICAgdGhpcy5kZXZudWxsTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG4gIH1cbiAgLyoqXG4gICAqIGF1ZGlvQ29udGV4dOOCkuWPgueFp+OBmeOCi1xuICAgKiBAcmV0dXJuIEF1ZGlvQ29udGV4dFxuICAgKi9cbiAgcHVibGljIHJlZkF1ZGlvQ29udGV4dCgpOkF1ZGlvQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dDtcbiAgfVxuICAvKipcbiAgICog5o6l57aa44GZ44KL44Go6Z+z44KS5Ye644GV44Gq44GEQXVkaW9Ob2Rl44KS5Y+C54Wn44GZ44KLXG4gICAqIEByZXR1cm4gQXVkaW9Ob2RlXG4gICAqL1xuICBwdWJsaWMgcmVmRGV2bnVsbE5vZGUoKTpBdWRpb05vZGUge1xuICAgIHJldHVybiB0aGlzLmRldm51bGxOb2RlO1xuICB9XG4gIC8qKlxuICAgKiBlbGVjdHJvbuWLleS9nOOBp+OBguOCi+OBi+eiuuiqjeOBl+OBpuOBv+OCi+OAglxuICAgKi9cbiAgcHVibGljIGlzRWxlY3Ryb24oKTpib29sZWFuIHtcbiAgICByZXR1cm4gZWxlY3Ryb24gIT0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF8gPSBuZXcgQmFzZSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL2Jhc2UvcmVuZGVyLnRzIiwiLy8gbWVkaWHjga7jg4fjg7zjgr/lh7rlipvjgpLlrp/mlr3jgZnjgotwbHVnaW5cbi8vIOOBk+OBk+OBp+OBr+OAgeecn+OCk+S4reOBq+OBguOCi+OAgeODh+ODvOOCv+ihqOekuuOBrumDqOWIhuOBruOCs+ODs+ODiOODreODvOODq1xuLy8g5bem5YG044Gu44OR44Os44OD44OI44Gu6YOo5YiG44Gu44Kz44Oz44OI44Ot44O844OrXG4vLyDjg5Hjg6zjg4Pjg4jov73liqDmmYLjga7jg4DjgqTjgqLjg63jgrDjga7jgrPjg7Pjg4jjg63jg7zjg6tcbi8vIOetieOCkuWun+aWveOBmeOCi+S6iOWumlxuaW1wb3J0IHtJUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SUJhc2VQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJRmllbGRQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJU291cmNlfSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU1lZGlhUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SVNvdXJjZVBsdWdpbn0gZnJvbSBcInRha2Nhc3QuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lPdXRwdXRQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuXG5pbXBvcnQge3BhbGV0dGV9IGZyb20gXCIuL3VpL3BhbGV0dGVcIjtcbmltcG9ydCB7bWFpbn0gZnJvbSBcIi4vdWkvbWFpblwiO1xuaW1wb3J0IHtkaWFsb2d9IGZyb20gXCIuL3VpL2RpYWxvZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhRmllbGRJbnRlcmZhY2Uge1xuICB1cGRhdGVIZWlnaHQoaGVpZ2h0Om51bWJlcik6dm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIE1lZGlhIGltcGxlbWVudHMgSUZpZWxkUGx1Z2luIHtcbiAgcHVibGljIG5hbWUgPSBcIm1lZGlhXCI7XG4gIHB1YmxpYyB0eXBlID0gXCJmaWVsZFwiO1xuXG4gIC8vIOS7iuWbnuOBr+aPj+eUu+WQiOaIkOWgtOaJgOOCkuikh+aVsOOBq+OBr+OBl+OBquOBi+OBo+OBn+OAguikh+aVsOOBq+OBmeOCi+OBqOWHuuWKm+OBq+OCiOOBo+OBpuOBhOOCjeOBhOOCjeOBqOiqv+aVtOOBp+OBjeOCi+OBjOOAgVVJ44GM44GL44Gq44KK6KSH6ZuR44Gr44Gq44KL44Gu44Gn44CB44KE44KJ44Gq44GE5pa544GM5ZCJ44Gg44KN44GG44CCXG4gIHByaXZhdGUgbWVkaWFQbHVnaW46SU1lZGlhUGx1Z2luO1xuICAvLyBzb3VyY2XjgajjgZfjgabliKnnlKjjgZnjgovjga7jga9Tb3VyY2VQbHVnaW5cbiAgcHJpdmF0ZSBzb3VyY2VQbHVnaW5zOkFycmF5PElTb3VyY2VQbHVnaW4+O1xuICAvLyDlhajkvZPjga7pn7Plo7Djga5jb250ZXh0XG4gIHByaXZhdGUgc291cmNlczpBcnJheTxJU291cmNlPjtcbiAgcHJpdmF0ZSBpbmRleDpudW1iZXI7XG4gIHByaXZhdGUgb3V0cHV0UGx1Z2luczpBcnJheTxJT3V0cHV0UGx1Z2luPjtcbiAgcHJpdmF0ZSBwYWxldHRlOk1lZGlhRmllbGRJbnRlcmZhY2U7XG4gIHByaXZhdGUgbWFpbjpNZWRpYUZpZWxkSW50ZXJmYWNlO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhbGV0dGUgPSBudWxsO1xuICAgIHRoaXMubWFpbiA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VQbHVnaW5zID0gW107XG4gICAgdGhpcy5vdXRwdXRQbHVnaW5zID0gW107XG4gICAgdGhpcy5zb3VyY2VzID0gW107XG4gICAgdGhpcy5pbmRleCA9IC0xO1xuICAgIHRoaXMubWVkaWFQbHVnaW4gPSBudWxsO1xuICB9XG4gIHB1YmxpYyBfc2V0UGFsZXR0ZShwYWxldHRlOk1lZGlhRmllbGRJbnRlcmZhY2UpIHtcbiAgICB0aGlzLnBhbGV0dGUgPSBwYWxldHRlO1xuICB9XG4gIHB1YmxpYyBfc2V0TWFpbihtYWluOk1lZGlhRmllbGRJbnRlcmZhY2UpIHtcbiAgICB0aGlzLm1haW4gPSBtYWluO1xuICB9XG4gIHB1YmxpYyBzZXRQbHVnaW5zKHBsdWdpbnM6e1trZXk6c3RyaW5nXTpBcnJheTxJUGx1Z2luPn0pOnZvaWQge1xuICAgIC8vIOOBneOCjOOBnuOCjOOBrnBsdWdpbuOBruWPgueFp+OCkuOBqOOBo+OBpuOBiuOBj+OAglxuICAgIGlmKHBsdWdpbnNbXCJtZWRpYVwiXSAmJiBwbHVnaW5zW1wibWVkaWFcIl0uZm9yRWFjaCkge1xuICAgICAgLy8g5LuK5Zue44Gv5YWo6YOo44Gn44Gv44Gq44GP44CBbWVkaWFQbHVnaW7jga7kuIDnlarmnIDlvozjgaDjgZHmjqHnlKjjgZnjgovlvaLjgavjgZnjgozjgbDjgYTjgYTjgajmgJ3jgYbjgIJcbiAgICAgIHZhciBpbmRleCA9IHBsdWdpbnNbXCJtZWRpYVwiXS5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5tZWRpYVBsdWdpbiA9IHBsdWdpbnNbXCJtZWRpYVwiXVtpbmRleF0gYXMgSU1lZGlhUGx1Z2luO1xuICAgICAgLy8g44GT44GT44Gn5Yip55So44GZ44KLbWVkaWFQbHVnaW7jgYznorrlrprjgZXjgozjgovjgIJcbiAgICB9XG4gICAgaWYocGx1Z2luc1tcInNvdXJjZVwiXSAmJiBwbHVnaW5zW1wic291cmNlXCJdLmZvckVhY2gpIHtcbiAgICAgIHBsdWdpbnNbXCJzb3VyY2VcIl0uZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgIHRoaXMuc291cmNlUGx1Z2lucy5wdXNoKHBsdWdpbiBhcyBJU291cmNlUGx1Z2luKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZihwbHVnaW5zW1wib3V0cHV0XCJdICYmIHBsdWdpbnNbXCJvdXRwdXRcIl0uZm9yRWFjaCkge1xuICAgICAgcGx1Z2luc1tcIm91dHB1dFwiXS5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgICAgdGhpcy5vdXRwdXRQbHVnaW5zLnB1c2gocGx1Z2luIGFzIElPdXRwdXRQbHVnaW4pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBiYXNlUGx1Z2luID0gcGx1Z2luc1tcImJhc2VcIl1bMF0gYXMgSUJhc2VQbHVnaW47XG5cbiAgICAvLyDliKnnlKjjgZnjgottZWRpYVBsdWdpbuOBjOeiuuWumuOBl+OBn+OBruOBp+OAgeOBhOOCjeOBhOOCjeOBl+OBpuOBiuOBj+OAglxuICAgIC8vIOmfs+WjsOOCkuWHuuWKm+OBq+aOpee2muOBl+OBpuOBiuOBj+OAglxuICAgIGlmKHRoaXMubWVkaWFQbHVnaW4gIT0gbnVsbCkge1xuICAgICAgdGhpcy5tZWRpYVBsdWdpbi5yZWZOb2RlKCkuY29ubmVjdChiYXNlUGx1Z2luLnJlZkF1ZGlvQ29udGV4dCgpLmRlc3RpbmF0aW9uKTtcbiAgICAgIHRoaXMub3V0cHV0UGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgICAgcGx1Z2luLm9uQ2hhbmdlQWN0aXZlTWVkaWEodGhpcy5tZWRpYVBsdWdpbik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8g5o+P55S744KS5pu05paw44GX44Gm44GK44GPXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuICBwdWJsaWMgX3JlZk1lZGlhUGx1Z2luKCk6SU1lZGlhUGx1Z2luIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYVBsdWdpbjtcbiAgfVxuICBwdWJsaWMgX3JlZlNvdXJjZVBsdWdpbnMoKTpBcnJheTxJU291cmNlUGx1Z2luPiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlUGx1Z2lucztcbiAgfVxuICBwdWJsaWMgX3JlZlNvdXJjZXMoKTpBcnJheTxJU291cmNlPiB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcztcbiAgfVxuICBwcml2YXRlIF9yZWZBY3RpdmVTb3VyY2UoKTpJU291cmNlIHtcbiAgICBpZih0aGlzLmluZGV4ID09IC0xKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VzW3RoaXMuaW5kZXhdO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgX3JlZkFjdGl2ZUluZGV4KCk6bnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbiAgfVxuICBwdWJsaWMgX3NldEFjdGl2ZVNvdXJjZShpbmRleDpudW1iZXIpOnZvaWQge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLm1lZGlhUGx1Z2luLm9uQ2hhbmdlQWN0aXZlU291cmNlKHRoaXMuX3JlZkFjdGl2ZVNvdXJjZSgpKTtcbiAgfVxuICBwdWJsaWMgX3VwZGF0ZVNpemUoKTp2b2lkIHtcbiAgICAvLyDjgrXjgqTjgrrjgYzlpInmm7TjgavjgarjgaPjgZ/jgajjgY3jgatjYWxs44GX44KI44GG44Go5oCd44GGXG4gICAgLy8g44GT44Gj44Gh5YG044Gn566h55CG44GX44Gq44GR44KM44Gw44Gq44KJ44Gq44GE44GM44O744O744O744Gp44GG44GZ44KL44GL44Gt44CCXG4gICAgdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb3RlclwiKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2YmFyXCIpO1xuICAgIGlmKGZvLmxlbmd0aCAhPSAwKSB7XG4gICAgICBoZWlnaHQgLT0gZm9bMF0uY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICB2YXIgaGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2YmFyXCIpO1xuICAgIGlmKGhlLmxlbmd0aCAhPSAwKSB7XG4gICAgICBoZWlnaHQgLT0gaGVbMF0uY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICBoZWlnaHQgLT0gMjA7XG4gICAgaWYodGhpcy5wYWxldHRlICE9IG51bGwpIHtcbiAgICAgIHRoaXMucGFsZXR0ZS51cGRhdGVIZWlnaHQoaGVpZ2h0KTtcbiAgICB9XG4gICAgaWYodGhpcy5tYWluICE9IG51bGwpIHtcbiAgICAgIHRoaXMubWFpbi51cGRhdGVIZWlnaHQoaGVpZ2h0KTtcbiAgICB9XG4gIH1cbiAgcHVibGljIHJlbmRlcigpOnZvaWQge1xuICAgIHBhbGV0dGUodGhpcyk7XG4gICAgbWFpbih0aGlzKTtcbiAgfVxuICBwdWJsaWMgcmVuZGVyRGlhbG9nKCk6dm9pZCB7XG4gICAgZGlhbG9nKHRoaXMpO1xuICB9XG5cbiAgLy8g44GC44Go5Yil44Gn5b+F6KaB44Gr44Gq44KK44Gd44GG44Gq44KC44Gu44CCXG4gIC8vIOePvuWcqEFjdGl2ZeOBqnNvdXJjZeOCkuWJiumZpOOBmeOCi+WLleS9nFxuICBwdWJsaWMgX2RlbGV0ZVNvdXJjZShzb3VyY2U6SVNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuc291cmNlcy5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgLy8gc291cmNlc+OBi+OCieaSpOWOu1xuICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAvLyDjg4fjg7zjgr/jgpLop6PmlL5cbiAgICAgIHNvdXJjZS5yZWxlYXNlKCk7XG4gICAgICAvLyDjg5Hjg6zjg4Pjg4jjga7pg6jliIbjgIHlho3mj4/nlLvjgZnjgovjgIJcbiAgICAgIHBhbGV0dGUodGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIHNvdXJjZeOBjOi/veWKoOOBleOCjOOBn+OBqOOBjeOBruWLleS9nFxuICBwdWJsaWMgX2FkZFNvdXJjZShzb3VyY2U6SVNvdXJjZSk6dm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJhZGRTb3VyY2XjgZXjgozjgb7jgZfjgZ/jgIJcIik7XG4gICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICAvLyDlopfjgoTjgZlcbiAgICB0aGlzLnNvdXJjZXMucHVzaChzb3VyY2UpO1xuICAgIC8vIOmAmuefpeOBmeOCi+OAglxuICAgIHRoaXMubWVkaWFQbHVnaW4ub25BZGRTb3VyY2Uoc291cmNlKTtcbiAgICAvLyDjg5Hjg6zjg4Pjg4jjga7mm7TmlrDjgpLlrp/mlr3jgZnjgovjgIJcbiAgICAvLyDliY3jga7jg5fjg63jgrDjg6njg6Djga7loLTlkIjjga/jgIHliKXjga7jgr/jg5bjgavnp7vli5XjgZfjgabjgYTjgovnirbmhYvjgadwYWxldHRl44Gu5pu05paw44KS5a6f5pa944GZ44KL44Go5aOK44KM44Gf44GM44CB5LuK5Zue44Gu5YuV5L2c44Gn44Gv44CBcGFsZXR0ZeOCkuWIpeOBq+enu+WLleOBmeOCi+OBk+OBqOOBjOOBquOBhOOBruOBp+OAgeOBk+OCjOOBp09L44Gu44Gv44GaXG4gICAgcGFsZXR0ZSh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF8gPSBuZXcgTWVkaWEoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9tZWRpYS9yZW5kZXIvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCAgICAgICAgICBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NICAgICAgIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCAqIGFzIFJlYWN0Qm9vdHN0cmFwIGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcblxuaW1wb3J0IHtNZWRpYX0gZnJvbSBcIi4uXCI7XG5cbnZhciBNb2RhbCA9IFJlYWN0Qm9vdHN0cmFwLk1vZGFsO1xudmFyIEJ1dHRvbiA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbjtcbnZhciBGb3JtID0gUmVhY3RCb290c3RyYXAuRm9ybTtcbnZhciBGb3JtR3JvdXAgPSBSZWFjdEJvb3RzdHJhcC5Gb3JtR3JvdXA7XG52YXIgRm9ybUNvbnRyb2wgPSBSZWFjdEJvb3RzdHJhcC5Gb3JtQ29udHJvbDtcbnZhciBDb250cm9sTGFiZWwgPSBSZWFjdEJvb3RzdHJhcC5Db250cm9sTGFiZWw7XG5cbmV4cG9ydCB2YXIgZGlhbG9nID0gKG1lZGlhOk1lZGlhKSA9PiB7XG4gIHZhciBwbHVnaW5zID0gbWVkaWEuX3JlZlNvdXJjZVBsdWdpbnMoKTtcbiAgLy8g44GT44Gu44OA44Kk44Ki44Ot44Kw44Gn44CB5paw44GX44GE44K944O844K544KS6YG45oqe44GZ44KL5pa55ZCR44Gn6Kq/5pW044GX44Gm44GE44GPXG4gIGNsYXNzIERpYWxvZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIHNob3dEaWFsb2c6dHJ1ZSxcbiAgICAgIGluZGV4OjBcbiAgICB9O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuX2Nsb3NlID0gdGhpcy5fY2xvc2UuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuX2NyZWF0ZSA9IHRoaXMuX2NyZWF0ZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5fY2hhbmdlID0gdGhpcy5fY2hhbmdlLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHB1YmxpYyBfY2xvc2UoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93RGlhbG9nOmZhbHNlfSk7XG4gICAgfVxuICAgIHB1YmxpYyBfY3JlYXRlKCkge1xuICAgICAgdmFyIHBsdWdpbiA9IHBsdWdpbnNbdGhpcy5zdGF0ZS5pbmRleF07XG4gICAgICB2YXIgbmV3U291cmNlID0gcGx1Z2luLmNyZWF0ZU5ld1NvdXJjZSgpO1xuICAgICAgaWYobmV3U291cmNlICE9IG51bGwpIHtcbiAgICAgICAgbWVkaWEuX2FkZFNvdXJjZShuZXdTb3VyY2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgcHVibGljIF9jaGFuZ2UoaXRlbSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXg6aXRlbS50YXJnZXQudmFsdWV9KTtcbiAgICB9XG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbCBzaG93PXt0aGlzLnN0YXRlLnNob3dEaWFsb2d9IG9uSGlkZT17dGhpcy5fY2xvc2V9PlxuICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8TW9kYWwuVGl0bGU+TmV3U291cmNlPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxGb3JtPlxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cImZvcm1Db250cm9sc1NlbGVjdFwiPlxuICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjb21wb25lbnRDbGFzcz1cInNlbGVjdFwiIHBsYWNlaG9sZGVyPVwic2VsZWN0XCIgb25DaGFuZ2U9e3RoaXMuX2NoYW5nZX0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcGx1Z2lucy5tYXAoZnVuY3Rpb24ocGx1Z2luLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXtpfSBrZXk9e2l9PntwbHVnaW4ubmFtZX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgICAgey8qIOOBk+OBrumDqOWIhuOBq+W/heimgeOBjOOBguOCjOOBsOWQhHBsdWdpbuOBrnByZXZpZXfjgpLooajnpLrjgZnjgovmhJ/jgZjjgacgKi99XG4gICAgICAgICAgICB7KFxuICAgICAgICAgICAgICAodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5zaG93RGlhbG9nICYmIHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgQ29tcG9uZW50ID0gdGFyZ2V0LnJlZlBpY2t1cENvbXBvbmVudCgpO1xuICAgICAgICAgICAgICAgICAgaWYoQ29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkocGx1Z2luc1t0aGlzLnN0YXRlLmluZGV4XSl9XG4gICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2NyZWF0ZX0+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIDxEaWFsb2cgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWFsb2dcIilcbiAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL21lZGlhL3JlbmRlci91aS9kaWFsb2cudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgICAgICAgICAgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSAgICAgICBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgKiBhcyBSZWFjdEJvb3RzdHJhcCBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbnZhciBQYW5lbCA9IFJlYWN0Qm9vdHN0cmFwLlBhbmVsO1xuXG5pbXBvcnQge01lZGlhfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7TWVkaWFGaWVsZEludGVyZmFjZX0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCB2YXIgbWFpbiA9IChtZWRpYTpNZWRpYSkgPT4ge1xuICBpZihtZWRpYS5fcmVmTWVkaWFQbHVnaW4oKSAhPSBudWxsKSB7XG4gICAgdmFyIEJvZHlDb21wb25lbnQgPSBtZWRpYS5fcmVmTWVkaWFQbHVnaW4oKS5yZWZCb2R5Q29tcG9uZW50KCk7XG4gICAgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IGltcGxlbWVudHMgTWVkaWFGaWVsZEludGVyZmFjZSB7XG4gICAgICBzdGF0ZSA9IHtoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fTtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgfVxuICAgICAgcHVibGljIHVwZGF0ZUhlaWdodChoZWlnaHQ6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGVpZ2h0OmhlaWdodH0pO1xuICAgICAgfVxuICAgICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgbWVkaWEuX3NldE1haW4odGhpcyk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFBhbmVsIHN0eWxlPXt7aGVpZ2h0OnRoaXMuc3RhdGUuaGVpZ2h0fX0+XG4gICAgICAgICAgICA8Qm9keUNvbXBvbmVudCAvPlxuICAgICAgICAgIDwvUGFuZWw+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxNYWluIC8+LFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2R5XCIpXG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BsdWdpbnMvbWVkaWEvcmVuZGVyL3VpL21haW4udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgICAgICAgICAgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSAgICAgICBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgKiBhcyBSZWFjdEJvb3RzdHJhcCBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbmltcG9ydCB7TWVkaWF9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHtNZWRpYUZpZWxkSW50ZXJmYWNlfSBmcm9tIFwiLi5cIjtcblxuaW1wb3J0IHtJU291cmNlfSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcblxudmFyIE5hdiA9IFJlYWN0Qm9vdHN0cmFwLk5hdjtcbnZhciBOYXZJdGVtID0gUmVhY3RCb290c3RyYXAuTmF2SXRlbTtcbnZhciBQYW5lbCA9IFJlYWN0Qm9vdHN0cmFwLlBhbmVsO1xudmFyIEJ1dHRvbiA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbjtcbnZhciBCdXR0b25Hcm91cCA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbkdyb3VwO1xuXG5leHBvcnQgdmFyIHBhbGV0dGUgPSAobWVkaWE6TWVkaWEpID0+IHtcbiAgLy8g44GT44Gj44Gh5YG044Gk44GP44Gj44Gm44GE44GP44GL44O744O744O7XG4gIC8vIOOBqOOCiuOBguOBiOOBmuODnOOCv+ODs+OCkuaKvOOBl+OBn+OBqOOBjeOBq+OAgWRpYWxvZyBib3jjgpLooajnpLrjgZnjgovli5XkvZzjgpLjgaTjgY/jgaPjgabjgb/jgojjgYbjgajmgJ3jgYbjgIJcbiAgLy8g44GC44Go44GvYWN0aXZl44Gr44Gq44Gj44Gf44Go44GN44CB5YaN5o+P55S744GX44Gf44Go44GN44Grc2Nyb2xs5L2N572u44GM44GG44GU44GP44Gu44GM44KI44GP44Gq44GE44CCXG4gIGNsYXNzIFBhbGV0dGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiBpbXBsZW1lbnRzIE1lZGlhRmllbGRJbnRlcmZhY2Uge1xuICAgIHN0YXRlID0ge2luZGV4Om1lZGlhLl9yZWZBY3RpdmVJbmRleCgpLCBoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLm9wZW5EaWFsb2cgPSB0aGlzLm9wZW5EaWFsb2cuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuY2xpY2tMaXN0ID0gdGhpcy5jbGlja0xpc3QuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuZGVsZXRlU291cmNlID0gdGhpcy5kZWxldGVTb3VyY2UuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcHVibGljIG9wZW5EaWFsb2coKSB7XG4gICAgICBtZWRpYS5yZW5kZXJEaWFsb2coKTtcbiAgICB9XG4gICAgcHVibGljIGNsaWNrTGlzdChpdGVtKSB7XG4gICAgICB2YXIgaSA9IHBhcnNlSW50KGl0ZW0uX2Rpc3BhdGNoSW5zdGFuY2VzLl9ob3N0Tm9kZS5uYW1lKTtcbiAgICAgIGlmKG1lZGlhLl9yZWZBY3RpdmVJbmRleCgpID09IGkpIHtcbiAgICAgICAgbWVkaWEuX3NldEFjdGl2ZVNvdXJjZSgtMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4Oi0xfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbWVkaWEuX3NldEFjdGl2ZVNvdXJjZShpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXg6aX0pO1xuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZGVsZXRlU291cmNlKCkge1xuICAgICAgbWVkaWEuX3NldEFjdGl2ZVNvdXJjZSgtMSk7XG4gICAgICBtZWRpYS5fZGVsZXRlU291cmNlKG1lZGlhLl9yZWZTb3VyY2VzKClbdGhpcy5zdGF0ZS5pbmRleF0pO1xuICAgIH1cbiAgICBwdWJsaWMgdXBkYXRlSGVpZ2h0KGhlaWdodDpudW1iZXIpOnZvaWQge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aGVpZ2h0OmhlaWdodH0pO1xuICAgIH1cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBtZWRpYS5fdXBkYXRlU2l6ZSgpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgdmFyIF9wdGhpcyA9IHRoaXM7XG4gICAgICBtZWRpYS5fc2V0UGFsZXR0ZSh0aGlzKTtcbiAgICAgIC8vIOOBk+OCjOOBr+OCguOBhuOBk+OCjOOBp+OBhOOBhOOCk+OBoOOBkeOBqeOAgXJlc2l6ZeOBruOCpOODmeODs+ODiOOBhuOBkeOBqOOCiuOBn+OBhOOAglxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFBhbmVsIHN0eWxlPXt7aGVpZ2h0OnRoaXMuc3RhdGUuaGVpZ2h0fX0+XG4gICAgICAgICAgPEJ1dHRvbkdyb3VwIHJlZj1cImJ0bmdyb3VwXCI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub3BlbkRpYWxvZ30+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVNvdXJjZX0+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L0J1dHRvbj5cbiAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tib3JkZXI6XCIwcHhcIixwYWRkaW5nOlwiMHB4XCIsb3ZlcmZsb3c6XCJzY3JvbGxcIixoZWlnaHQ6KF9wdGhpcy5zdGF0ZS5oZWlnaHQgLSA2Nil9fT5cbiAgICAgICAgICAgIHsvKiDjgZPjga7pg6jliIbjgatwYWxldHRl44Go44GX44Gm6YG45oqe5Y+v6IO944Gq44Oq44K944O844K544KS5YiX5oyZ44GZ44KL5LqI5a6aICovXG4gICAgICAgICAgICAgIC8vIO+8kuOBpOOBmuOBpOODq+ODvOODl+OBmeOCi+OCiOOBhuOBq+OBmeOCjOOBsOOAgeS6i+i2s+OCiuOCi+OCj+OBkeOBi+ODu+ODu+ODu+OBquOCi+OBu+OBqVxuICAgICAgICAgICAgICBtZWRpYS5fcmVmU291cmNlcygpLm1hcCgoZGF0YSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOOBguOBqOOBr+OCs+ODs+ODneODvOODjeODs+ODiOOBruaPj+eUu+OCkuWun+aWveOBmeOCjOOBsOOCiOOBhOOAglxuICAgICAgICAgICAgICAgIHZhciBjbHNuYW1lID0gXCJsaXN0LWdyb3VwLWl0ZW0gY29sLXhzLTQgY29sLXNtLTRcIjtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlLmluZGV4ID09IGkpIHtcbiAgICAgICAgICAgICAgICAgIGNsc25hbWUgKz0gXCIgYWN0aXZlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBfcHRoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBpc0F1ZGlvID0gZGF0YS5yZWZBdWRpb05vZGUoKSAhPSBudWxsO1xuICAgICAgICAgICAgICAgIGNsYXNzIEhvZ2VDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XG4gICAgICAgICAgICAgICAgICAvLyDliY3jga7lgKTjgpLjgZfjgaPjgabjgYrjgYvjgarjgYTjgajjg7vjg7vjg7vjgajjgYTjgYbjgZPjgajjga/jgarjgYTjgYvjg7vjg7vjg7tcbiAgICAgICAgICAgICAgICAgIC8vIOavjuWbnjEwMOOBq+aIu+OBl+OBn+OCieOBvuOBmuOBhOOBi+OBquOAglxuICAgICAgICAgICAgICAgICAgc3RhdGUgPSB7dm9sdW1lOmRhdGEuZ2V0Vm9sdW1lKCl9XG4gICAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5wdXRWb2x1bWUgPSB0aGlzLl9pbnB1dFZvbHVtZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcHVibGljIF9pbnB1dFZvbHVtZShpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0Vm9sdW1lKHBhcnNlSW50KGl0ZW0udGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwdWJsaWMgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZGF0YS5yZWZEaXNwbGF5RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MTWVkaWFFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZWQgPSBlbGVtZW50LnBhdXNlZDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW1wiZGlzcGxheVwiXSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbXCJ3aWR0aFwiXSA9IFwiMTAwcHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgSFRNTE1lZGlhRWxlbWVudCAmJiAhcGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8g6Z+z5aOwb25seeOBruWgtOWQiOOBq21lZGlhRWxlbWVudOOBq+OCouOCr+OCu+OCueOBp+OBjeOBquOBhOOBruOBr+OBvuOBmuOBhOOBi+ODu+ODu+ODu1xuICAgICAgICAgICAgICAgICAgICAgIC8vIOOBn+OBoOOBl+OAgeOBk+OCjOOBr+aPj+eUu+OBq+mWouOCj+OBo+OBpuOBr+OBhOOBkeOBquOBhOOBk+OBqOOBq+OBquOCi+OCj+OBkeOBi+ODu+ODu+ODu1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZGF0YS5yZWZEaXNwbGF5RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MTWVkaWFFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXVzZWQgPSBlbGVtZW50LnBhdXNlZDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMucmVmc1tcIm1lZGlhXCJdIGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW1wiZGlzcGxheVwiXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtcIndpZHRoXCJdID0gXCIxMDAlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxNZWRpYUVsZW1lbnQgJiYgIXBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIOOBqOOCiuOBguOBiOOBmue4puaoquOCkuOBguOCj+OBm+OBpuOBiuOBk+OBhuOBqOaAneOBhuOAglxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW1wiaGVpZ2h0XCJdID0gKGVsZW1lbnQuY2xpZW50V2lkdGggKiA5LzE2KSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiByZWY9XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbHNuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtfcHRoaXMuY2xpY2tMaXN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXtcIlwiICsgaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwibWVkaWFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgeygoaXNBdWRpbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0F1ZGlvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBvbklucHV0PXt0aGlzLl9pbnB1dFZvbHVtZX0gZGVmYXVsdFZhbHVlPXtcIlwiICsgdGhpcy5zdGF0ZS52b2x1bWV9PjwvaW5wdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoaXNBdWRpbyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxIb2dlQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1BhbmVsPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIDxQYWxldHRlIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFsZXR0ZVwiKVxuICApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BsdWdpbnMvbWVkaWEvcmVuZGVyL3VpL3BhbGV0dGUudHN4IiwiLy8g5Ye65Yqb6Kq/5pW055So44GucGx1Z2luXG4vLyDjgZPjgaPjgaHjgafjga/jgIHlh7rlipvjga7jgrPjg7Pjg4jjg63jg7zjg6vjgajkuIvpg6jjgavjgYLjgovjgIFvdXRwdXTjgrPjg7Pjg4jjg63jg7zjg6vli5XkvZzpg6jjgpLjgrPjg7Pjg4jjg63jg7zjg6vjgZnjgovkuojlrppcbi8vIGZvb3RlcuOCkuOBk+OBo+OBoeOBp+OCs+ODs+ODiOODreODvOODq+OBl+OBpuOCguOBhOOBhOOBi+OCguODu+ODu+ODu1xuLy8g44Gd44GG44GZ44KL44GL44O744O744O7XG4vLyDjgarjgYrjgIFvdXRwdXRQbHVnaW7jgavjgZvjgojjgIFtZWRpYVBsdWdpbuOBq+OBm+OCiOOAgeacgOW+jOOBq+mBuOaKnuOBleOCjOOBn+OCguOBruOCkuaOoeeUqOOBmeOCi+OBk+OBqOOBp+mAsuOCgeOCiOOBhuOBqOaAneOBhuOAglxuLy8g44Gn44KC44CB44Gd44KM44Gv5a6f6KOF44Gu5LuV5pa55qyh56ys44GL44O744O744O7XG4vLyDjgZ3jgZPjgYvjgonjga/jgZrjgozjgZ/li5XkvZzjgpLlrp/mlr3jgZXjgozjgZ/jgonjg7vjg7vjg7vjgYLjgIHjgafjgoJyZWFjdOOBp+aPj+eUu+OBleOCjOOBn+OBqOOBk+OCjeOCkuWGjeaPj+eUu+OBmeOCi+OBqOOAgeOBguOBqOOBp+abuOOBhOOBn+aWueOBjOacieWKueOBq+OBquOCi+OBi1xuLy8g44Go44GE44GG44GT44Go44Gq44KJ44CB54m544Gr44Gq44Gr44KC6ICD44GI44Ga44Gr44Gk44GP44Gj44Gm5aSn5LiI5aSr44Gj44G944GE44Gq44CCXG4vLyDpn7Plo7Djga7lh7rlipvjga7li5XkvZzjga/jgIHjgZ3jgozlsILnlKjjga5wbHVnaW7jgafjgrPjg7Pjg4jjg63jg7zjg6vjgZfjgojjgYbjgajmgJ3jgYbjgIJcbi8vIGhlYWRlcuOBq+mfs+WjsOiqv+aVtOOBruOBjOOBguOCi+OBqOOAgeOBqeOBrumfs+mHj+OCkuaTjeS9nOOBl+OBpuOBhOOCi+OBi+OCj+OBi+OCieOBquOBj+OBquOBo+OBpuOAgeOChOOChOOBk+OBl+OBj+OBquOCiuOBneOBhuOAglxuLy8g44G+44GB44GC44Gj44Gm44KC44GE44GE44GR44Gp44CCXG4vLyDjgYTjgoTjgIHjgoTjga/jgorlhajkvZPjga7pn7Pph4/jgpLjgrPjg7Pjg4jjg63jg7zjg6vjgafjgY3jgovjgbvjgYbjgYzpg73lkIjjgYzjgYTjgYTjgYvjg7vjg7vjg7tcblxuLyoqXG4gKiDkuIvpg6jjga5ydG1w44Gu6YOo5YiG44CBY29kZWPjga/jgaHjgofjgY/jgaHjgofjgY/lpInmm7TjgZnjgovjgoLjga7jgafjga/jgarjgYTjga7jgafjgIHpmqDjgozjgovjgojjgYbjgavjgZfjgabjgYrjgY3jgZ/jgYTjgIJcbiAqIHJ0bXDjgarjgonln7rmnKxoMjY0IC8gYWFj44Gg44GoIOaOpee2muWFiOOCguaDheWgseOBjOOBguOCi+W9ouOBq+OBl+OBpuOBiuOBhOOBpuOAgeOCr+ODquODg+OCr+OBmeOCi+OBqOWkieabtOOBmeOCi+OBn+OCgeOBruODgOOCpOOCouODreOCsOOBjOOBp+OBpuOBj+OCi+aEn+OBmOOBp+OBhOOBhOOBqOaAneOBhuOAglxuICogIOOCguOBl+OBj+OBr+OBneOBruWgtOOBp2FjdGl2ZeOBq+OBquOBo+OBpuWFpeWKm+OBp+OBjeOCi+OCiOOBhuOBquaEn+OBmOOBp1xuICogd2VibeOBoOOBo+OBn+OCiXZwOCAvIG9wdXPjgaDjgZfjgIHku5bjga7kvZnoqIjjgarjga7jga/jgIHopovjgYjjgarjgY/jgabjgYTjgYTjgajmgJ3jgYbjgIJcbiAqIOOBguOBvuOCiuOChOOChOOBk+OBl+OBhHVp44Gr44GZ44KL44Go44GE44KN44GE44KN44Go56C057a744GX44Gd44GG44CCXG4gKiBcbiAqIOOBn+OBoOOBl+OAgXVp44Gr5Yed44KL44GC44G+44KK44OX44Ot44Kw44Op44Og44GM5q2i44G+44KL44Go5pys5pyr6Lui5YCS44Gq44Gu44Gn44CB44Gd44GT44G+44Gn44GT44Gg44KP44Gj44Gm57Ch57Sg44Gr44Gv44GX44Gq44GE5oSf44GY44Gn44CCXG4gKiBib290c3RyYXDjga7li5XkvZzjga7jg4fjg5XjgqnjgavlvpPjgYbmhJ/jgZjjgYvjga3jgIJcbiAqL1xuaW1wb3J0IHtJUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SUZpZWxkUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU1lZGlhUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU91dHB1dFBsdWdpbn0gZnJvbSBcInRha2Nhc3QuaW50ZXJmYWNlXCI7XG5cbmltcG9ydCB7TWVkaWF9IGZyb20gXCIuLi8uLi9tZWRpYS9yZW5kZXJcIjtcblxuaW1wb3J0IHtoZWFkZXJ9IGZyb20gXCIuL3VpL2hlYWRlclwiO1xuaW1wb3J0IHtmb290ZXJ9IGZyb20gXCIuL3VpL2Zvb3RlclwiO1xuXG4vLyDjgZPjgYTjgaTjgYzjgIFtZWRpYVBsdWdpbuOCkuOBmeOBueOBpueuoeeQhuOBl+OBpuOBiuOBi+OBquOBhOOBqOOBhOOBkeOBquOBhOOAglxuLy8gdm9sdW1l44GM5aSJ5pu044GX44Gf44KJ44CB44Gd44Gu5YCk44KSbWVkaWFQbHVnaW7jgavpgJrnn6XjgZfjgarjgYTjgajjgYTjgZHjgarjgYTjgIJcbmV4cG9ydCBjbGFzcyBPdXRwdXQgaW1wbGVtZW50cyBJRmllbGRQbHVnaW4ge1xuICBwdWJsaWMgbmFtZTpzdHJpbmcgPSBcIm91dHB1dFwiO1xuICBwdWJsaWMgdHlwZTpzdHJpbmcgPSBcImZpZWxkXCI7IC8vIOOBk+OCjOOBr2ZpZWxk44Gn44GC44KKb3V0cHV0Tm9kZeOBp+OCguOBguOCi+OBqOOBhOOBhuOBruOBr+WPr+iDveOBqOOBhOOBiOOBsOWPr+iDveOBp+OBmeOBreOAglxuICBwcml2YXRlIG1lZGlhRmllbGRQbHVnaW46TWVkaWE7XG4gIHByaXZhdGUgbWVkaWFQbHVnaW5zOkFycmF5PElNZWRpYVBsdWdpbj47XG4gIHByaXZhdGUgb3V0cHV0UGx1Z2luczpBcnJheTxJT3V0cHV0UGx1Z2luPjtcbiAgLy8g54++5Zyo5pyJ5Yq544Gr44Gq44Gj44Gm44GE44KLbWVkaWFQbHVnaW7jgpLnn6Xjgovlv4XopoHjgYzjgYLjgovjgIJcbiAgLy8g54++5Zyo5L+d5oyB44GX44Gm44KLb3V0cHV0UGx1Z2lu44KC55+l44KL5b+F6KaB44GM44GC44KL44CCXG4gIHB1YmxpYyBzZXRQbHVnaW5zKHBsdWdpbnM6e1trZXk6c3RyaW5nXTpBcnJheTxJUGx1Z2luPn0pOnZvaWQge1xuICAgIHRoaXMubWVkaWFQbHVnaW5zID0gW107XG4gICAgdGhpcy5vdXRwdXRQbHVnaW5zID0gW107XG4gICAgLy8gcGx1Z2lu44GM5YWo6YOo44Gd44KN44Gj44Gf44Go44GN44GrY2FsbOOBleOCjOOCi+WLleS9nFxuICAgIC8vIOOBk+OBk+OBi+OCieOAgW1lZGlhUGx1Z2lu44KS5Y+W44KK5Ye644GX44Gm44Gd44GuYXVkaW9Db250ZXh044KScmVm44Go44GX44Gm5L+d5oyB44GX44Gm44GK44GL44Gq44GE44Go44GE44GR44Gq44GE44CCXG4gICAgLy8g44Gd44KM44GP44KJ44GE44GL44Gq44CCXG4gICAgLy8g44GT44Gu44K/44Kk44Of44Oz44Kw44Gn6Ieq5YiG44GL44KJZm9vdGVy44Gu5YaF5a6544KS5pu05paw44GX44Gr44GE44GP44GL44O744O744O7XG4gICAgLy8g44Gd44GX44Gm6Ieq5YiG44Gu5Lit44Gu44Kk44OZ44Oz44OI44GnZm9vdGVy44Gu5YaN5o+P55S744GM5b+F6KaB44Gr44Gq44Gj44Gf44KJ44CB6Ieq5YiG44GncmVuZGVy44KS5YaN5bqm5a6f5pa944GZ44KL44Gn44GE44GE44GLXG5cbiAgICAvLyDlhYPjgIXjga7li5XkvZzjgafjga9hY3RpdmXjgarjg4fjg7zjgr/jgpLooajnpLrjgZfjgZ/jgYvjgaPjgZ/jga7jgadtZWRpYVBsdWdpbuOCkuWPgueFp+OBl+OBpuOBhOOBn+OAglxuICAgIC8vIOS7iuWbnuOBr21lZGlh44Gu6KGo56S66YOo44KS6Zqg44GZ44GT44Go44Gv44Gq44GE44Gu44Gn44CB5b+F6KaB44Gq44GE44GL44Gq44CCXG4gICAgLy8gYmFzZeOBi+OCiWF1ZGlvQ29udGV4dOOBqGRldm51bGxOb2Rl44Gg44GR5Y+C54Wn44GX44Gm44Gf44KJ5Y2B5YiG44Gq44GN44GM44GZ44KL44CCXG4gICAgaWYocGx1Z2luc1tcImZpZWxkXCJdICYmIHBsdWdpbnNbXCJmaWVsZFwiXS5mb3JFYWNoKSB7XG4gICAgICBwbHVnaW5zW1wiZmllbGRcIl0uZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgIGlmKHBsdWdpbltcIl91cGRhdGVTaXplXCJdKSB7XG4gICAgICAgICAgdGhpcy5tZWRpYUZpZWxkUGx1Z2luID0gcGx1Z2luIGFzIE1lZGlhO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYocGx1Z2luc1tcIm1lZGlhXCJdICYmIHBsdWdpbnNbXCJtZWRpYVwiXS5mb3JFYWNoKSB7XG4gICAgICBwbHVnaW5zW1wibWVkaWFcIl0uZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgIHRoaXMubWVkaWFQbHVnaW5zLnB1c2gocGx1Z2luIGFzIElNZWRpYVBsdWdpbik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYocGx1Z2luc1tcIm91dHB1dFwiXSAmJiBwbHVnaW5zW1wib3V0cHV0XCJdLmZvckVhY2gpIHtcbiAgICAgIHBsdWdpbnNbXCJvdXRwdXRcIl0uZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgIHRoaXMub3V0cHV0UGx1Z2lucy5wdXNoKHBsdWdpbiBhcyBJT3V0cHV0UGx1Z2luKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG4gIC8vIOaPj+eUu+OBm+OCiOOBqOWRveS7pOOBleOCjOOBn+OBqOOBjeOBruWLleS9nFxuICBwdWJsaWMgcmVuZGVyKCk6dm9pZCB7XG4gICAgaGVhZGVyKHRoaXMpO1xuICAgIGZvb3Rlcih0aGlzKTtcbiAgfVxuICBwdWJsaWMgX3NldFZvbHVtZShudW1iZXIpOnZvaWQge1xuICAgIHRoaXMubWVkaWFQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4ge1xuICAgICAgcGx1Z2luLnNldFZvbHVtZShudW1iZXIpO1xuICAgIH0pXG4gIH1cbiAgcHVibGljIF9yZWZPdXRwdXRQbHVnaW5zKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFBsdWdpbnM7XG4gIH1cbiAgcHVibGljIF9vblVwZGF0ZVNpemUoKSB7XG4gICAgLy8g44K144Kk44K644Gu5pu05paw44KS5a6f5pa944GZ44KLXG4gICAgdGhpcy5tZWRpYUZpZWxkUGx1Z2luLl91cGRhdGVTaXplKCk7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfID0gbmV3IE91dHB1dCgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCAqIGFzIFJlYWN0Qm9vdHN0cmFwIGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcblxudmFyIE5hdiAgICAgPSBSZWFjdEJvb3RzdHJhcC5OYXY7XG52YXIgTmF2YmFyICA9IFJlYWN0Qm9vdHN0cmFwLk5hdmJhcjtcbnZhciBOYXZJdGVtID0gUmVhY3RCb290c3RyYXAuTmF2SXRlbTtcbnZhciBOQ29sbGFwc2UgPSBOYXZiYXIuQ29sbGFwc2UgYXMgYW55O1xuXG52YXIgRm9ybSA9IFJlYWN0Qm9vdHN0cmFwLkZvcm07XG52YXIgRm9ybUNvbnRyb2wgPSBSZWFjdEJvb3RzdHJhcC5Gb3JtQ29udHJvbDtcblxuaW1wb3J0IHtPdXRwdXR9IGZyb20gXCIuLlwiO1xuXG5leHBvcnQgdmFyIGZvb3RlciA9IChvdXRwdXQ6T3V0cHV0KSA9PiB7XG4gIHZhciBwbHVnaW5zID0gb3V0cHV0Ll9yZWZPdXRwdXRQbHVnaW5zKCk7XG4gIHZhciBmb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb3RlclwiKTtcbiAgY2xhc3MgRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xuICAgIHN0YXRlID0ge1xuICAgICAgaW5kZXg6MCxcbiAgICAgIGhvZ2U6MFxuICAgIH07XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5fdXBkYXRlUGFkZGluZyA9IHRoaXMuX3VwZGF0ZVBhZGRpbmcuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfdXBkYXRlUGFkZGluZygpIHtcbiAgICAgIG91dHB1dC5fb25VcGRhdGVTaXplKCk7XG4vLyAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXSA9IChmb290ZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdmJhclwiKVswXS5jbGllbnRIZWlnaHQgKyAxMCkgKyBcInB4XCI7XG4gICAgfVxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZGlkIG1vdW50IGlzIGNhbGxlZFwiKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVBhZGRpbmcoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3VwZGF0ZVBhZGRpbmcpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE5hdmJhciBjb2xsYXBzZU9uU2VsZWN0IGZpeGVkQm90dG9tPlxuICAgICAgICAgIDxOYXZiYXIuVG9nZ2xlLz5cbiAgICAgICAgICA8TkNvbGxhcHNlIG9uRW50ZXJlZD17dGhpcy5fdXBkYXRlUGFkZGluZ30gb25FeGl0ZWQ9e3RoaXMuX3VwZGF0ZVBhZGRpbmd9PlxuICAgICAgICAgICAgPE5hdmJhci5UZXh0PlxuICAgICAgICAgICAgPEZvcm0+XG4gICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjb21wb25lbnRDbGFzcz1cInNlbGVjdFwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbnMubWFwKGZ1bmN0aW9uKHBsdWdpbiwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPG9wdGlvbiB2YWx1ZT17aX0ga2V5PXtpfT57cGx1Z2luLm5hbWV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICA8L05hdmJhci5UZXh0PlxuICAgICAgICAgIHsvKiDjgZPjga7pg6jliIbjgavlv4XopoHjgYzjgYLjgozjgbDjgIHlkIRwbHVnaW7jga5zZXR0aW5n44KS6KGo56S644GZ44KL5oSf44GYICovfVxuICAgICAgICAgIHsoXG4gICAgICAgICAgICAodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgIGlmKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIENvbXBvbmVudCA9IHRhcmdldC5yZWZTZXR0aW5nQ29tcG9uZW50KCk7XG4gICAgICAgICAgICAgICAgaWYoQ29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiA8Q29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiA8ZGl2IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKShwbHVnaW5zW3RoaXMuc3RhdGUuaW5kZXhdKX1cbiAgICAgICAgICA8L05Db2xsYXBzZT5cbiAgICAgICAgPC9OYXZiYXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgPEZvb3RlciAvPixcbiAgICBmb290ZXJcbiAgKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9vdXRwdXQvcmVuZGVyL3VpL2Zvb3Rlci50c3giLCIvLyDjg5jjg4Pjg4Djg7zpg6jjgpLjgrPjg7Pjg4jjg63jg7zjg6vjgZnjgovjgIJcbi8vIOOBk+OBk+OBq+mfs+WjsOWHuuWKm+WLleS9nOOCkui/veWKoOOBl+OBqOOBj+OBk+OBqOOBq+OBmeOCi+OAglxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgKiBhcyBSZWFjdEJvb3RzdHJhcCBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbnZhciBOYXYgICAgID0gUmVhY3RCb290c3RyYXAuTmF2O1xudmFyIE5hdmJhciAgPSBSZWFjdEJvb3RzdHJhcC5OYXZiYXI7XG52YXIgTmF2SXRlbSA9IFJlYWN0Qm9vdHN0cmFwLk5hdkl0ZW07XG52YXIgTkNvbGxhcHNlID0gTmF2YmFyLkNvbGxhcHNlIGFzIGFueTtcblxuaW1wb3J0IHtPdXRwdXR9IGZyb20gXCIuLlwiO1xuXG5leHBvcnQgdmFyIGhlYWRlciA9IChvdXRwdXQ6T3V0cHV0KSA9PiB7XG4gIHZhciBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKTtcbiAgY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMudm9sdW1lID0gdGhpcy52b2x1bWUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVBhZGRpbmcgPSB0aGlzLl91cGRhdGVQYWRkaW5nLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHB1YmxpYyB2b2x1bWUoaXRlbSkge1xuICAgICAgb3V0cHV0Ll9zZXRWb2x1bWUoaXRlbS50YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF91cGRhdGVQYWRkaW5nKCkge1xuICAgICAgb3V0cHV0Ll9vblVwZGF0ZVNpemUoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbXCJwYWRkaW5nLXRvcFwiXSA9IChoZWFkZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdmJhclwiKVswXS5jbGllbnRIZWlnaHQgKyAxMCkgKyBcInB4XCI7XG4gICAgfVxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVBhZGRpbmcoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX3VwZGF0ZVBhZGRpbmcpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE5hdmJhciBpbnZlcnNlIGNvbGxhcHNlT25TZWxlY3QgZml4ZWRUb3A+XG4gICAgICAgICAgPE5hdmJhci5IZWFkZXI+XG4gICAgICAgICAgICA8TmF2YmFyLkJyYW5kPlRha0Nhc3Q8L05hdmJhci5CcmFuZD5cbiAgICAgICAgICAgIDxOYXZiYXIuVG9nZ2xlLz5cbiAgICAgICAgICA8L05hdmJhci5IZWFkZXI+XG4gICAgICAgICAgPE5Db2xsYXBzZSBvbkVudGVyZWQ9e3RoaXMuX3VwZGF0ZVBhZGRpbmd9IG9uRXhpdGVkPXt0aGlzLl91cGRhdGVQYWRkaW5nfT5cbiAgICAgICAgICA8TmF2YmFyLlRleHQgcHVsbFJpZ2h0PlxuICAgICAgICAgICAgVm9sdW1lXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgZGVmYXVsdFZhbHVlPVwiMTAwXCIgb25DaGFuZ2U9e3RoaXMudm9sdW1lfS8+XG4gICAgICAgICAgPC9OYXZiYXIuVGV4dD5cbiAgICAgICAgICA8L05Db2xsYXBzZT5cbiAgICAgICAgPC9OYXZiYXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgPEhlYWRlciAvPixcbiAgICBoZWFkZXJcbiAgKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9vdXRwdXQvcmVuZGVyL3VpL2hlYWRlci50c3giLCJtb2R1bGUuZXhwb3J0cyA9IGVsZWN0cm9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZWxlY3Ryb25cIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==