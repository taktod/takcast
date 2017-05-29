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
    /**
     * コンストラクタ
     */
    function Base() {
        /**
         * 名前
         */
        this.name = "base";
        /**
         * 動作タイプ
         */
        this.type = "base";
        this.context = new AudioContext();
        this.devnullNode = this.context.createGain();
        this.devnullNode.gain.value = 0.0;
        this.devnullNode.connect(this.context.destination);
    }
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
            if (plugins.length != 0) {
                var plugin = plugins[this.state.index];
                var newSource = plugin.createNewSource();
                if (newSource != null) {
                    media._addSource(newSource);
                }
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
            if (this.state.index == -1) {
                return;
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNmMGU2Yjc2MjFhMzY2NGY0ZDQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdEJvb3RzdHJhcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvcGx1Z2luTG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3JlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2Jhc2UvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL21lZGlhL3JlbmRlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2lucy9tZWRpYS9yZW5kZXIvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2lucy9tZWRpYS9yZW5kZXIvdWkvbWFpbi50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvbWVkaWEvcmVuZGVyL3VpL3BhbGV0dGUudHN4Iiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvb3V0cHV0L3JlbmRlci91aS9mb290ZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvdWkvaGVhZGVyLnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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QztJQUNELFFBQVEsQ0FBQyxNQUFNLENBQ2Isb0JBQUMsTUFBTSxPQUFHLEVBQ1YsTUFBTSxDQUNQLENBQUM7QUFDSixDQUFDOzs7Ozs7O0FDckRELDBCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDNmMGU2Yjc2MjFhMzY2NGY0ZDQiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0Qm9vdHN0cmFwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RCb290c3RyYXBcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0lQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuXG4vLyBwbHVnaW7jgYzjgZ3jgozjgZ7jgozoqq3jgb/ovrzjgb7jgozjgZ/jgonphY3liJfjgavkv53lrZjjgZfjgabjgYrjgY/jgIJcbmV4cG9ydCB2YXIgc2V0UGx1Z2luID0gKHBsdWdpbnM6e1trZXk6c3RyaW5nXTpBcnJheTxJUGx1Z2luPn0sIHBsdWdpbjpJUGx1Z2luKSA9PiB7XG4gIGlmKHR5cGVvZihwbHVnaW5zW3BsdWdpbi50eXBlXSkgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHBsdWdpbnNbcGx1Z2luLnR5cGVdID0gW107XG4gIH1cbiAgcGx1Z2luc1twbHVnaW4udHlwZV0ucHVzaChwbHVnaW4pO1xufVxuXG4vLyDjgZnjgbnjgabjga5wbHVnaW7jga7oqq3jgb/ovrzjgb/jgYzntYLjgo/jgaPjgZ/jgolwbHVnaW7lj4LnhafjgafjgY3jgovjg4Hjg6Pjg7PjgrnjgpLkuI7jgYjjgb7jgZnjgIJcbmV4cG9ydCB2YXIgc3RhcnRQbHVnaW5zID0gKHBsdWdpbnM6e1trZXk6c3RyaW5nXTpBcnJheTxJUGx1Z2luPn0pID0+IHtcbiAgLy8g44GT44KM44GvcGx1Z2luc+OBruS4rei6q+OBr+OBneOBrumghueVquOBq+OBquOCi+OBkeOBqeOAgWtleXPjga5rZXnjgYzjganjgYbjgYTjgYbpoIbnlarjgavjgarjgovjgYvjga/kuI3mmI5cbiAgLy8g44Go44KK44GC44GI44GaYmFzZeOAgW1lZGlh44CBZmllbGTjgIFzb3VyY2XjgajjgYTjgaPjgZ/poIbnlarjgavjgarjgaPjgabjgZ/mlrnjgYzpg73lkIjjgYzjgojjgZXjgZ3jgYbjgIJcbiAgLy8gbWVkaWFGaWVsZFBsdWdpbuOBruWIneacn+WMluOBrumDqOWIhuOBp+OAgeS/neaMgeOBl+OBpuOBhOOCi21lZGlhUGx1Z2lu44GuYXVkaW9Ob2RlIC0+IGNvbnRleHQuZGVzdGluYXRpb27jgajjgYTjgYbntYTjgb/lkIjjgo/jgZvjgYzjgYLjgovjgIJcbiAgdmFyIHJlYWR5ID0gKGtleSkgPT4ge1xuICAgIGlmKHBsdWdpbnNba2V5XSAmJiBwbHVnaW5zW2tleV0uZm9yRWFjaCkge1xuICAgICAgcGx1Z2luc1trZXldLmZvckVhY2goKHBsdWdpbikgPT4ge1xuICAgICAgICBpZihwbHVnaW4uc2V0UGx1Z2lucykgeyAvLyBzZXRQbHVnaW5z44GM5a6a576p44GV44KM44Gm44GE44KL5aC05ZCI44Gg44GR5a6f6KGMXG4gICAgICAgICAgcGx1Z2luLnNldFBsdWdpbnMocGx1Z2lucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZWFkeShcImJhc2VcIik7XG4gIHJlYWR5KFwibWVkaWFcIik7XG4gIHJlYWR5KFwiZmllbGRcIik7XG4gIHJlYWR5KFwic291cmNlXCIpO1xuICByZWFkeShcIm91dHB1dFwiKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL3BsdWdpbkxvYWRlci50cyIsImltcG9ydCB7c2V0UGx1Z2lufSBmcm9tIFwiLi9wbHVnaW5Mb2FkZXJcIjtcblxuZXhwb3J0IHZhciBwbHVnaW5zID0ge307XG5cbmltcG9ydCAqIGFzIGJhc2UgZnJvbSBcIi4vYmFzZS9yZW5kZXJcIjtcbnNldFBsdWdpbihwbHVnaW5zLCBiYXNlLl8pO1xuaW1wb3J0ICogYXMgbWVkaWEgZnJvbSBcIi4vbWVkaWEvcmVuZGVyXCI7XG5zZXRQbHVnaW4ocGx1Z2lucywgbWVkaWEuXyk7XG5pbXBvcnQgKiBhcyBvdXRwdXQgZnJvbSBcIi4vb3V0cHV0L3JlbmRlclwiO1xuc2V0UGx1Z2luKHBsdWdpbnMsIG91dHB1dC5fKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL3JlbmRlci50cyIsImltcG9ydCB7cGx1Z2luc30gZnJvbSBcIi4vcGx1Z2lucy9yZW5kZXJcIjtcbmltcG9ydCB7c3RhcnRQbHVnaW5zfSBmcm9tIFwiLi9wbHVnaW5zL3BsdWdpbkxvYWRlclwiO1xuXG5zdGFydFBsdWdpbnMocGx1Z2lucyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLnRzIiwiaW1wb3J0IHtJQmFzZVBsdWdpbn0gZnJvbSBcInRha2Nhc3QuaW50ZXJmYWNlXCI7XG5pbXBvcnQgKiBhcyBlbGVjdHJvbiBmcm9tIFwiZWxlY3Ryb25cIjtcblxuLyoqXG4gKiDlhajkvZPjgaflhbHmnInjgZnjgovjg4fjg7zjgr/jgpLkv53mjIHjgZnjgotCYXNl44OX44Op44Kw44Kk44OzXG4gKi9cbmNsYXNzIEJhc2UgaW1wbGVtZW50cyBJQmFzZVBsdWdpbiB7XG4gIC8qKlxuICAgKiDlkI3liY1cbiAgICovXG4gIHB1YmxpYyBuYW1lID0gXCJiYXNlXCI7XG4gIC8qKlxuICAgKiDli5XkvZzjgr/jgqTjg5dcbiAgICovXG4gIHB1YmxpYyB0eXBlID0gXCJiYXNlXCI7XG4gIC8qKlxuICAgKiDlhbHmnInjgZnjgotBdWRpb0NvbnRleHRcbiAgICovXG4gIHByaXZhdGUgY29udGV4dDpBdWRpb0NvbnRleHQ7XG4gIC8qKlxuICAgKiDlhbHmnInjgZnjgotBdWRpb05vZGVcbiAgICog44GT44GT44Gr44GC44Gm44GM44GG44Go44CB6Z+z44GM44Gn44Gq44GP44Gq44KLXG4gICAqL1xuICBwcml2YXRlIGRldm51bGxOb2RlOkdhaW5Ob2RlO1xuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgdGhpcy5kZXZudWxsTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5kZXZudWxsTm9kZS5nYWluLnZhbHVlID0gMC4wO1xuICAgIHRoaXMuZGV2bnVsbE5vZGUuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xuICB9XG4gIC8qKlxuICAgKiBhdWRpb0NvbnRleHTjgpLlj4LnhafjgZnjgotcbiAgICogQHJldHVybiBBdWRpb0NvbnRleHRcbiAgICovXG4gIHB1YmxpYyByZWZBdWRpb0NvbnRleHQoKTpBdWRpb0NvbnRleHQge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cbiAgLyoqXG4gICAqIOaOpee2muOBmeOCi+OBqOmfs+OCkuWHuuOBleOBquOBhEF1ZGlvTm9kZeOCkuWPgueFp+OBmeOCi1xuICAgKiBAcmV0dXJuIEF1ZGlvTm9kZVxuICAgKi9cbiAgcHVibGljIHJlZkRldm51bGxOb2RlKCk6QXVkaW9Ob2RlIHtcbiAgICByZXR1cm4gdGhpcy5kZXZudWxsTm9kZTtcbiAgfVxuICAvKipcbiAgICogZWxlY3Ryb27li5XkvZzjgafjgYLjgovjgYvnorroqo3jgZfjgabjgb/jgovjgIJcbiAgICovXG4gIHB1YmxpYyBpc0VsZWN0cm9uKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZWN0cm9uICE9IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfID0gbmV3IEJhc2UoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9iYXNlL3JlbmRlci50cyIsIi8vIG1lZGlh44Gu44OH44O844K/5Ye65Yqb44KS5a6f5pa944GZ44KLcGx1Z2luXG4vLyDjgZPjgZPjgafjga/jgIHnnJ/jgpPkuK3jgavjgYLjgovjgIHjg4fjg7zjgr/ooajnpLrjga7pg6jliIbjga7jgrPjg7Pjg4jjg63jg7zjg6tcbi8vIOW3puWBtOOBruODkeODrOODg+ODiOOBrumDqOWIhuOBruOCs+ODs+ODiOODreODvOODq1xuLy8g44OR44Os44OD44OI6L+95Yqg5pmC44Gu44OA44Kk44Ki44Ot44Kw44Gu44Kz44Oz44OI44Ot44O844OrXG4vLyDnrYnjgpLlrp/mlr3jgZnjgovkuojlrppcbmltcG9ydCB7SVBsdWdpbn0gZnJvbSBcInRha2Nhc3QuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lCYXNlUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SUZpZWxkUGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SVNvdXJjZX0gZnJvbSBcInRha2Nhc3QuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNZWRpYVBsdWdpbn0gZnJvbSBcInRha2Nhc3QuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lTb3VyY2VQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJT3V0cHV0UGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcblxuaW1wb3J0IHtwYWxldHRlfSBmcm9tIFwiLi91aS9wYWxldHRlXCI7XG5pbXBvcnQge21haW59IGZyb20gXCIuL3VpL21haW5cIjtcbmltcG9ydCB7ZGlhbG9nfSBmcm9tIFwiLi91aS9kaWFsb2dcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYUZpZWxkSW50ZXJmYWNlIHtcbiAgdXBkYXRlSGVpZ2h0KGhlaWdodDpudW1iZXIpOnZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBNZWRpYSBpbXBsZW1lbnRzIElGaWVsZFBsdWdpbiB7XG4gIHB1YmxpYyBuYW1lID0gXCJtZWRpYVwiO1xuICBwdWJsaWMgdHlwZSA9IFwiZmllbGRcIjtcblxuICAvLyDku4rlm57jga/mj4/nlLvlkIjmiJDloLTmiYDjgpLopIfmlbDjgavjga/jgZfjgarjgYvjgaPjgZ/jgILopIfmlbDjgavjgZnjgovjgajlh7rlipvjgavjgojjgaPjgabjgYTjgo3jgYTjgo3jgajoqr/mlbTjgafjgY3jgovjgYzjgIFVSeOBjOOBi+OBquOCiuikh+mbkeOBq+OBquOCi+OBruOBp+OAgeOChOOCieOBquOBhOaWueOBjOWQieOBoOOCjeOBhuOAglxuICBwcml2YXRlIG1lZGlhUGx1Z2luOklNZWRpYVBsdWdpbjtcbiAgLy8gc291cmNl44Go44GX44Gm5Yip55So44GZ44KL44Gu44GvU291cmNlUGx1Z2luXG4gIHByaXZhdGUgc291cmNlUGx1Z2luczpBcnJheTxJU291cmNlUGx1Z2luPjtcbiAgLy8g5YWo5L2T44Gu6Z+z5aOw44GuY29udGV4dFxuICBwcml2YXRlIHNvdXJjZXM6QXJyYXk8SVNvdXJjZT47XG4gIHByaXZhdGUgaW5kZXg6bnVtYmVyO1xuICBwcml2YXRlIG91dHB1dFBsdWdpbnM6QXJyYXk8SU91dHB1dFBsdWdpbj47XG4gIHByaXZhdGUgcGFsZXR0ZTpNZWRpYUZpZWxkSW50ZXJmYWNlO1xuICBwcml2YXRlIG1haW46TWVkaWFGaWVsZEludGVyZmFjZTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wYWxldHRlID0gbnVsbDtcbiAgICB0aGlzLm1haW4gPSBudWxsO1xuICAgIHRoaXMuc291cmNlUGx1Z2lucyA9IFtdO1xuICAgIHRoaXMub3V0cHV0UGx1Z2lucyA9IFtdO1xuICAgIHRoaXMuc291cmNlcyA9IFtdO1xuICAgIHRoaXMuaW5kZXggPSAtMTtcbiAgICB0aGlzLm1lZGlhUGx1Z2luID0gbnVsbDtcbiAgfVxuICBwdWJsaWMgX3NldFBhbGV0dGUocGFsZXR0ZTpNZWRpYUZpZWxkSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5wYWxldHRlID0gcGFsZXR0ZTtcbiAgfVxuICBwdWJsaWMgX3NldE1haW4obWFpbjpNZWRpYUZpZWxkSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5tYWluID0gbWFpbjtcbiAgfVxuICBwdWJsaWMgc2V0UGx1Z2lucyhwbHVnaW5zOntba2V5OnN0cmluZ106QXJyYXk8SVBsdWdpbj59KTp2b2lkIHtcbiAgICAvLyDjgZ3jgozjgZ7jgozjga5wbHVnaW7jga7lj4LnhafjgpLjgajjgaPjgabjgYrjgY/jgIJcbiAgICBpZihwbHVnaW5zW1wibWVkaWFcIl0gJiYgcGx1Z2luc1tcIm1lZGlhXCJdLmZvckVhY2gpIHtcbiAgICAgIC8vIOS7iuWbnuOBr+WFqOmDqOOBp+OBr+OBquOBj+OAgW1lZGlhUGx1Z2lu44Gu5LiA55Wq5pyA5b6M44Gg44GR5o6h55So44GZ44KL5b2i44Gr44GZ44KM44Gw44GE44GE44Go5oCd44GG44CCXG4gICAgICB2YXIgaW5kZXggPSBwbHVnaW5zW1wibWVkaWFcIl0ubGVuZ3RoIC0gMTtcbiAgICAgIHRoaXMubWVkaWFQbHVnaW4gPSBwbHVnaW5zW1wibWVkaWFcIl1baW5kZXhdIGFzIElNZWRpYVBsdWdpbjtcbiAgICAgIC8vIOOBk+OBk+OBp+WIqeeUqOOBmeOCi21lZGlhUGx1Z2lu44GM56K65a6a44GV44KM44KL44CCXG4gICAgfVxuICAgIGlmKHBsdWdpbnNbXCJzb3VyY2VcIl0gJiYgcGx1Z2luc1tcInNvdXJjZVwiXS5mb3JFYWNoKSB7XG4gICAgICBwbHVnaW5zW1wic291cmNlXCJdLmZvckVhY2goKHBsdWdpbikgPT4ge1xuICAgICAgICB0aGlzLnNvdXJjZVBsdWdpbnMucHVzaChwbHVnaW4gYXMgSVNvdXJjZVBsdWdpbik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYocGx1Z2luc1tcIm91dHB1dFwiXSAmJiBwbHVnaW5zW1wib3V0cHV0XCJdLmZvckVhY2gpIHtcbiAgICAgIHBsdWdpbnNbXCJvdXRwdXRcIl0uZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgIHRoaXMub3V0cHV0UGx1Z2lucy5wdXNoKHBsdWdpbiBhcyBJT3V0cHV0UGx1Z2luKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgYmFzZVBsdWdpbiA9IHBsdWdpbnNbXCJiYXNlXCJdWzBdIGFzIElCYXNlUGx1Z2luO1xuXG4gICAgLy8g5Yip55So44GZ44KLbWVkaWFQbHVnaW7jgYznorrlrprjgZfjgZ/jga7jgafjgIHjgYTjgo3jgYTjgo3jgZfjgabjgYrjgY/jgIJcbiAgICAvLyDpn7Plo7DjgpLlh7rlipvjgavmjqXntprjgZfjgabjgYrjgY/jgIJcbiAgICBpZih0aGlzLm1lZGlhUGx1Z2luICE9IG51bGwpIHtcbiAgICAgIHRoaXMubWVkaWFQbHVnaW4ucmVmTm9kZSgpLmNvbm5lY3QoYmFzZVBsdWdpbi5yZWZBdWRpb0NvbnRleHQoKS5kZXN0aW5hdGlvbik7XG4gICAgICB0aGlzLm91dHB1dFBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgIHBsdWdpbi5vbkNoYW5nZUFjdGl2ZU1lZGlhKHRoaXMubWVkaWFQbHVnaW4pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIOaPj+eUu+OCkuabtOaWsOOBl+OBpuOBiuOBj1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cbiAgcHVibGljIF9yZWZNZWRpYVBsdWdpbigpOklNZWRpYVBsdWdpbiB7XG4gICAgcmV0dXJuIHRoaXMubWVkaWFQbHVnaW47XG4gIH1cbiAgcHVibGljIF9yZWZTb3VyY2VQbHVnaW5zKCk6QXJyYXk8SVNvdXJjZVBsdWdpbj4ge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZVBsdWdpbnM7XG4gIH1cbiAgcHVibGljIF9yZWZTb3VyY2VzKCk6QXJyYXk8SVNvdXJjZT4ge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXM7XG4gIH1cbiAgcHJpdmF0ZSBfcmVmQWN0aXZlU291cmNlKCk6SVNvdXJjZSB7XG4gICAgaWYodGhpcy5pbmRleCA9PSAtMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlc1t0aGlzLmluZGV4XTtcbiAgICB9XG4gIH1cbiAgcHVibGljIF9yZWZBY3RpdmVJbmRleCgpOm51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cbiAgcHVibGljIF9zZXRBY3RpdmVTb3VyY2UoaW5kZXg6bnVtYmVyKTp2b2lkIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5tZWRpYVBsdWdpbi5vbkNoYW5nZUFjdGl2ZVNvdXJjZSh0aGlzLl9yZWZBY3RpdmVTb3VyY2UoKSk7XG4gIH1cbiAgcHVibGljIF91cGRhdGVTaXplKCk6dm9pZCB7XG4gICAgLy8g44K144Kk44K644GM5aSJ5pu044Gr44Gq44Gj44Gf44Go44GN44GrY2FsbOOBl+OCiOOBhuOBqOaAneOBhlxuICAgIC8vIOOBk+OBo+OBoeWBtOOBp+euoeeQhuOBl+OBquOBkeOCjOOBsOOBquOCieOBquOBhOOBjOODu+ODu+ODu+OBqeOBhuOBmeOCi+OBi+OBreOAglxuICAgIHZhciBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb290ZXJcIikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdmJhclwiKTtcbiAgICBpZihmby5sZW5ndGggIT0gMCkge1xuICAgICAgaGVpZ2h0IC09IGZvWzBdLmNsaWVudEhlaWdodDtcbiAgICB9XG4gICAgdmFyIGhlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdmJhclwiKTtcbiAgICBpZihoZS5sZW5ndGggIT0gMCkge1xuICAgICAgaGVpZ2h0IC09IGhlWzBdLmNsaWVudEhlaWdodDtcbiAgICB9XG4gICAgaGVpZ2h0IC09IDIwO1xuICAgIGlmKHRoaXMucGFsZXR0ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBhbGV0dGUudXBkYXRlSGVpZ2h0KGhlaWdodCk7XG4gICAgfVxuICAgIGlmKHRoaXMubWFpbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLm1haW4udXBkYXRlSGVpZ2h0KGhlaWdodCk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyByZW5kZXIoKTp2b2lkIHtcbiAgICBwYWxldHRlKHRoaXMpO1xuICAgIG1haW4odGhpcyk7XG4gIH1cbiAgcHVibGljIHJlbmRlckRpYWxvZygpOnZvaWQge1xuICAgIGRpYWxvZyh0aGlzKTtcbiAgfVxuXG4gIC8vIOOBguOBqOWIpeOBp+W/heimgeOBq+OBquOCiuOBneOBhuOBquOCguOBruOAglxuICAvLyDnj77lnKhBY3RpdmXjgapzb3VyY2XjgpLliYrpmaTjgZnjgovli5XkvZxcbiAgcHVibGljIF9kZWxldGVTb3VyY2Uoc291cmNlOklTb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnNvdXJjZXMuaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmKGluZGV4ID49IDApIHtcbiAgICAgIC8vIHNvdXJjZXPjgYvjgonmkqTljrtcbiAgICAgIHRoaXMuc291cmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgLy8g44OH44O844K/44KS6Kej5pS+XG4gICAgICBzb3VyY2UucmVsZWFzZSgpO1xuICAgICAgLy8g44OR44Os44OD44OI44Gu6YOo5YiG44CB5YaN5o+P55S744GZ44KL44CCXG4gICAgICBwYWxldHRlKHRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBzb3VyY2XjgYzov73liqDjgZXjgozjgZ/jgajjgY3jga7li5XkvZxcbiAgcHVibGljIF9hZGRTb3VyY2Uoc291cmNlOklTb3VyY2UpOnZvaWQge1xuICAgIC8vIOWil+OChOOBmVxuICAgIHRoaXMuc291cmNlcy5wdXNoKHNvdXJjZSk7XG4gICAgLy8g6YCa55+l44GZ44KL44CCXG4gICAgdGhpcy5tZWRpYVBsdWdpbi5vbkFkZFNvdXJjZShzb3VyY2UpO1xuICAgIC8vIOODkeODrOODg+ODiOOBruabtOaWsOOCkuWun+aWveOBmeOCi+OAglxuICAgIC8vIOWJjeOBruODl+ODreOCsOODqeODoOOBruWgtOWQiOOBr+OAgeWIpeOBruOCv+ODluOBq+enu+WLleOBl+OBpuOBhOOCi+eKtuaFi+OBp3BhbGV0dGXjga7mm7TmlrDjgpLlrp/mlr3jgZnjgovjgajlo4rjgozjgZ/jgYzjgIHku4rlm57jga7li5XkvZzjgafjga/jgIFwYWxldHRl44KS5Yil44Gr56e75YuV44GZ44KL44GT44Go44GM44Gq44GE44Gu44Gn44CB44GT44KM44GnT0vjga7jga/jgZpcbiAgICBwYWxldHRlKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCB2YXIgXyA9IG5ldyBNZWRpYSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL21lZGlhL3JlbmRlci9pbmRleC50cyIsImltcG9ydCAqIGFzIFJlYWN0ICAgICAgICAgIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RET00gICAgICAgZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0ICogYXMgUmVhY3RCb290c3RyYXAgZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuXG5pbXBvcnQge01lZGlhfSBmcm9tIFwiLi5cIjtcblxudmFyIE1vZGFsID0gUmVhY3RCb290c3RyYXAuTW9kYWw7XG52YXIgQnV0dG9uID0gUmVhY3RCb290c3RyYXAuQnV0dG9uO1xudmFyIEZvcm0gPSBSZWFjdEJvb3RzdHJhcC5Gb3JtO1xudmFyIEZvcm1Hcm91cCA9IFJlYWN0Qm9vdHN0cmFwLkZvcm1Hcm91cDtcbnZhciBGb3JtQ29udHJvbCA9IFJlYWN0Qm9vdHN0cmFwLkZvcm1Db250cm9sO1xudmFyIENvbnRyb2xMYWJlbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbnRyb2xMYWJlbDtcblxuZXhwb3J0IHZhciBkaWFsb2cgPSAobWVkaWE6TWVkaWEpID0+IHtcbiAgdmFyIHBsdWdpbnMgPSBtZWRpYS5fcmVmU291cmNlUGx1Z2lucygpO1xuICAvLyDjgZPjga7jg4DjgqTjgqLjg63jgrDjgafjgIHmlrDjgZfjgYTjgr3jg7zjgrnjgpLpgbjmip7jgZnjgovmlrnlkJHjgafoqr/mlbTjgZfjgabjgYTjgY9cbiAgY2xhc3MgRGlhbG9nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xuICAgIHN0YXRlID0ge1xuICAgICAgc2hvd0RpYWxvZzp0cnVlLFxuICAgICAgaW5kZXg6MFxuICAgIH07XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5fY2xvc2UgPSB0aGlzLl9jbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5fY3JlYXRlID0gdGhpcy5fY3JlYXRlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLl9jaGFuZ2UgPSB0aGlzLl9jaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcHVibGljIF9jbG9zZSgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dEaWFsb2c6ZmFsc2V9KTtcbiAgICB9XG4gICAgcHVibGljIF9jcmVhdGUoKSB7XG4gICAgICBpZihwbHVnaW5zLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgIHZhciBwbHVnaW4gPSBwbHVnaW5zW3RoaXMuc3RhdGUuaW5kZXhdO1xuICAgICAgICB2YXIgbmV3U291cmNlID0gcGx1Z2luLmNyZWF0ZU5ld1NvdXJjZSgpO1xuICAgICAgICBpZihuZXdTb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgIG1lZGlhLl9hZGRTb3VyY2UobmV3U291cmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgcHVibGljIF9jaGFuZ2UoaXRlbSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXg6aXRlbS50YXJnZXQudmFsdWV9KTtcbiAgICB9XG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbCBzaG93PXt0aGlzLnN0YXRlLnNob3dEaWFsb2d9IG9uSGlkZT17dGhpcy5fY2xvc2V9PlxuICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8TW9kYWwuVGl0bGU+TmV3U291cmNlPC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxGb3JtPlxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cImZvcm1Db250cm9sc1NlbGVjdFwiPlxuICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBjb21wb25lbnRDbGFzcz1cInNlbGVjdFwiIHBsYWNlaG9sZGVyPVwic2VsZWN0XCIgb25DaGFuZ2U9e3RoaXMuX2NoYW5nZX0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcGx1Z2lucy5tYXAoZnVuY3Rpb24ocGx1Z2luLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXtpfSBrZXk9e2l9PntwbHVnaW4ubmFtZX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgICAgey8qIOOBk+OBrumDqOWIhuOBq+W/heimgeOBjOOBguOCjOOBsOWQhHBsdWdpbuOBrnByZXZpZXfjgpLooajnpLrjgZnjgovmhJ/jgZjjgacgKi99XG4gICAgICAgICAgICB7KFxuICAgICAgICAgICAgICAodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5zaG93RGlhbG9nICYmIHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgQ29tcG9uZW50ID0gdGFyZ2V0LnJlZlBpY2t1cENvbXBvbmVudCgpO1xuICAgICAgICAgICAgICAgICAgaWYoQ29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkocGx1Z2luc1t0aGlzLnN0YXRlLmluZGV4XSl9XG4gICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2NyZWF0ZX0+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIDxEaWFsb2cgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWFsb2dcIilcbiAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL21lZGlhL3JlbmRlci91aS9kaWFsb2cudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgICAgICAgICAgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSAgICAgICBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgKiBhcyBSZWFjdEJvb3RzdHJhcCBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbnZhciBQYW5lbCA9IFJlYWN0Qm9vdHN0cmFwLlBhbmVsO1xuXG5pbXBvcnQge01lZGlhfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7TWVkaWFGaWVsZEludGVyZmFjZX0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCB2YXIgbWFpbiA9IChtZWRpYTpNZWRpYSkgPT4ge1xuICBpZihtZWRpYS5fcmVmTWVkaWFQbHVnaW4oKSAhPSBudWxsKSB7XG4gICAgdmFyIEJvZHlDb21wb25lbnQgPSBtZWRpYS5fcmVmTWVkaWFQbHVnaW4oKS5yZWZCb2R5Q29tcG9uZW50KCk7XG4gICAgY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IGltcGxlbWVudHMgTWVkaWFGaWVsZEludGVyZmFjZSB7XG4gICAgICBzdGF0ZSA9IHtoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fTtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgfVxuICAgICAgcHVibGljIHVwZGF0ZUhlaWdodChoZWlnaHQ6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGVpZ2h0OmhlaWdodH0pO1xuICAgICAgfVxuICAgICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgbWVkaWEuX3NldE1haW4odGhpcyk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFBhbmVsIHN0eWxlPXt7aGVpZ2h0OnRoaXMuc3RhdGUuaGVpZ2h0fX0+XG4gICAgICAgICAgICA8Qm9keUNvbXBvbmVudCAvPlxuICAgICAgICAgIDwvUGFuZWw+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxNYWluIC8+LFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2R5XCIpXG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BsdWdpbnMvbWVkaWEvcmVuZGVyL3VpL21haW4udHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgICAgICAgICAgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSAgICAgICBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgKiBhcyBSZWFjdEJvb3RzdHJhcCBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG5cbmltcG9ydCB7TWVkaWF9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHtNZWRpYUZpZWxkSW50ZXJmYWNlfSBmcm9tIFwiLi5cIjtcblxuaW1wb3J0IHtJU291cmNlfSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcblxudmFyIE5hdiA9IFJlYWN0Qm9vdHN0cmFwLk5hdjtcbnZhciBOYXZJdGVtID0gUmVhY3RCb290c3RyYXAuTmF2SXRlbTtcbnZhciBQYW5lbCA9IFJlYWN0Qm9vdHN0cmFwLlBhbmVsO1xudmFyIEJ1dHRvbiA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbjtcbnZhciBCdXR0b25Hcm91cCA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbkdyb3VwO1xuXG5leHBvcnQgdmFyIHBhbGV0dGUgPSAobWVkaWE6TWVkaWEpID0+IHtcbiAgLy8g44GT44Gj44Gh5YG044Gk44GP44Gj44Gm44GE44GP44GL44O744O744O7XG4gIC8vIOOBqOOCiuOBguOBiOOBmuODnOOCv+ODs+OCkuaKvOOBl+OBn+OBqOOBjeOBq+OAgWRpYWxvZyBib3jjgpLooajnpLrjgZnjgovli5XkvZzjgpLjgaTjgY/jgaPjgabjgb/jgojjgYbjgajmgJ3jgYbjgIJcbiAgLy8g44GC44Go44GvYWN0aXZl44Gr44Gq44Gj44Gf44Go44GN44CB5YaN5o+P55S744GX44Gf44Go44GN44Grc2Nyb2xs5L2N572u44GM44GG44GU44GP44Gu44GM44KI44GP44Gq44GE44CCXG4gIGNsYXNzIFBhbGV0dGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiBpbXBsZW1lbnRzIE1lZGlhRmllbGRJbnRlcmZhY2Uge1xuICAgIHN0YXRlID0ge2luZGV4Om1lZGlhLl9yZWZBY3RpdmVJbmRleCgpLCBoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLm9wZW5EaWFsb2cgPSB0aGlzLm9wZW5EaWFsb2cuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuY2xpY2tMaXN0ID0gdGhpcy5jbGlja0xpc3QuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuZGVsZXRlU291cmNlID0gdGhpcy5kZWxldGVTb3VyY2UuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcHVibGljIG9wZW5EaWFsb2coKSB7XG4gICAgICBtZWRpYS5yZW5kZXJEaWFsb2coKTtcbiAgICB9XG4gICAgcHVibGljIGNsaWNrTGlzdChpdGVtKSB7XG4gICAgICB2YXIgaSA9IHBhcnNlSW50KGl0ZW0uX2Rpc3BhdGNoSW5zdGFuY2VzLl9ob3N0Tm9kZS5uYW1lKTtcbiAgICAgIGlmKG1lZGlhLl9yZWZBY3RpdmVJbmRleCgpID09IGkpIHtcbiAgICAgICAgbWVkaWEuX3NldEFjdGl2ZVNvdXJjZSgtMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luZGV4Oi0xfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbWVkaWEuX3NldEFjdGl2ZVNvdXJjZShpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5kZXg6aX0pO1xuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZGVsZXRlU291cmNlKCkge1xuICAgICAgaWYodGhpcy5zdGF0ZS5pbmRleCA9PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBtZWRpYS5fc2V0QWN0aXZlU291cmNlKC0xKTtcbiAgICAgIG1lZGlhLl9kZWxldGVTb3VyY2UobWVkaWEuX3JlZlNvdXJjZXMoKVt0aGlzLnN0YXRlLmluZGV4XSk7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVIZWlnaHQoaGVpZ2h0Om51bWJlcik6dm9pZCB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtoZWlnaHQ6aGVpZ2h0fSk7XG4gICAgfVxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIG1lZGlhLl91cGRhdGVTaXplKCk7XG4gICAgfVxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICB2YXIgX3B0aGlzID0gdGhpcztcbiAgICAgIG1lZGlhLl9zZXRQYWxldHRlKHRoaXMpO1xuICAgICAgLy8g44GT44KM44Gv44KC44GG44GT44KM44Gn44GE44GE44KT44Gg44GR44Gp44CBcmVzaXpl44Gu44Kk44OZ44Oz44OI44GG44GR44Go44KK44Gf44GE44CCXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UGFuZWwgc3R5bGU9e3toZWlnaHQ6dGhpcy5zdGF0ZS5oZWlnaHR9fT5cbiAgICAgICAgICA8QnV0dG9uR3JvdXAgcmVmPVwiYnRuZ3JvdXBcIj5cbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vcGVuRGlhbG9nfT48c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuZGVsZXRlU291cmNlfT48c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjwvQnV0dG9uPlxuICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2JvcmRlcjpcIjBweFwiLHBhZGRpbmc6XCIwcHhcIixvdmVyZmxvdzpcInNjcm9sbFwiLGhlaWdodDooX3B0aGlzLnN0YXRlLmhlaWdodCAtIDY2KX19PlxuICAgICAgICAgICAgey8qIOOBk+OBrumDqOWIhuOBq3BhbGV0dGXjgajjgZfjgabpgbjmip7lj6/og73jgarjg6rjgr3jg7zjgrnjgpLliJfmjJnjgZnjgovkuojlrpogKi9cbiAgICAgICAgICAgICAgLy8g77yS44Gk44Ga44Gk44Or44O844OX44GZ44KL44KI44GG44Gr44GZ44KM44Gw44CB5LqL6Laz44KK44KL44KP44GR44GL44O744O744O744Gq44KL44G744GpXG4gICAgICAgICAgICAgIG1lZGlhLl9yZWZTb3VyY2VzKCkubWFwKChkYXRhLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g44GC44Go44Gv44Kz44Oz44Od44O844ON44Oz44OI44Gu5o+P55S744KS5a6f5pa944GZ44KM44Gw44KI44GE44CCXG4gICAgICAgICAgICAgICAgdmFyIGNsc25hbWUgPSBcImxpc3QtZ3JvdXAtaXRlbSBjb2wteHMtNCBjb2wtc20tNFwiO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUuaW5kZXggPT0gaSkge1xuICAgICAgICAgICAgICAgICAgY2xzbmFtZSArPSBcIiBhY3RpdmVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIF9wdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGlzQXVkaW8gPSBkYXRhLnJlZkF1ZGlvTm9kZSgpICE9IG51bGw7XG4gICAgICAgICAgICAgICAgY2xhc3MgSG9nZUNvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcbiAgICAgICAgICAgICAgICAgIC8vIOWJjeOBruWApOOCkuOBl+OBo+OBpuOBiuOBi+OBquOBhOOBqOODu+ODu+ODu+OBqOOBhOOBhuOBk+OBqOOBr+OBquOBhOOBi+ODu+ODu+ODu1xuICAgICAgICAgICAgICAgICAgLy8g5q+O5ZueMTAw44Gr5oi744GX44Gf44KJ44G+44Ga44GE44GL44Gq44CCXG4gICAgICAgICAgICAgICAgICBzdGF0ZSA9IHt2b2x1bWU6ZGF0YS5nZXRWb2x1bWUoKX1cbiAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnB1dFZvbHVtZSA9IHRoaXMuX2lucHV0Vm9sdW1lLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwdWJsaWMgX2lucHV0Vm9sdW1lKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXRWb2x1bWUocGFyc2VJbnQoaXRlbS50YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHB1YmxpYyBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkYXRhLnJlZkRpc3BsYXlFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxNZWRpYUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlZCA9IGVsZW1lbnQucGF1c2VkO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtcIndpZHRoXCJdID0gXCIxMDBweFwiO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MTWVkaWFFbGVtZW50ICYmICFwYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyDpn7Plo7Bvbmx544Gu5aC05ZCI44GrbWVkaWFFbGVtZW5044Gr44Ki44Kv44K744K544Gn44GN44Gq44GE44Gu44Gv44G+44Ga44GE44GL44O744O744O7XG4gICAgICAgICAgICAgICAgICAgICAgLy8g44Gf44Gg44GX44CB44GT44KM44Gv5o+P55S744Gr6Zai44KP44Gj44Gm44Gv44GE44GR44Gq44GE44GT44Go44Gr44Gq44KL44KP44GR44GL44O744O744O7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkYXRhLnJlZkRpc3BsYXlFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxNZWRpYUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlZCA9IGVsZW1lbnQucGF1c2VkO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAodGhpcy5yZWZzW1wibWVkaWFcIl0gYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbXCJkaXNwbGF5XCJdID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW1wid2lkdGhcIl0gPSBcIjEwMCVcIjtcbiAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgSFRNTE1lZGlhRWxlbWVudCAmJiAhcGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8g44Go44KK44GC44GI44Ga57im5qiq44KS44GC44KP44Gb44Gm44GK44GT44GG44Go5oCd44GG44CCXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbXCJoZWlnaHRcIl0gPSAoZWxlbWVudC5jbGllbnRXaWR0aCAqIDkvMTYpICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHJlZj1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nsc25hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e19wdGhpcy5jbGlja0xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e1wiXCIgKyBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9XCJtZWRpYVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KChpc0F1ZGlvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzQXVkaW8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGlucHV0IHR5cGU9XCJyYW5nZVwiIG9uSW5wdXQ9e3RoaXMuX2lucHV0Vm9sdW1lfSBkZWZhdWx0VmFsdWU9e1wiXCIgKyB0aGlzLnN0YXRlLnZvbHVtZX0+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KShpc0F1ZGlvKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPEhvZ2VDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvUGFuZWw+XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgPFBhbGV0dGUgLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYWxldHRlXCIpXG4gICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGx1Z2lucy9tZWRpYS9yZW5kZXIvdWkvcGFsZXR0ZS50c3giLCIvLyDlh7rlipvoqr/mlbTnlKjjga5wbHVnaW5cbi8vIOOBk+OBo+OBoeOBp+OBr+OAgeWHuuWKm+OBruOCs+ODs+ODiOODreODvOODq+OBqOS4i+mDqOOBq+OBguOCi+OAgW91dHB1dOOCs+ODs+ODiOODreODvOODq+WLleS9nOmDqOOCkuOCs+ODs+ODiOODreODvOODq+OBmeOCi+S6iOWumlxuLy8gZm9vdGVy44KS44GT44Gj44Gh44Gn44Kz44Oz44OI44Ot44O844Or44GX44Gm44KC44GE44GE44GL44KC44O744O744O7XG4vLyDjgZ3jgYbjgZnjgovjgYvjg7vjg7vjg7tcbi8vIOOBquOBiuOAgW91dHB1dFBsdWdpbuOBq+OBm+OCiOOAgW1lZGlhUGx1Z2lu44Gr44Gb44KI44CB5pyA5b6M44Gr6YG45oqe44GV44KM44Gf44KC44Gu44KS5o6h55So44GZ44KL44GT44Go44Gn6YCy44KB44KI44GG44Go5oCd44GG44CCXG4vLyDjgafjgoLjgIHjgZ3jgozjga/lrp/oo4Xjga7ku5XmlrnmrKHnrKzjgYvjg7vjg7vjg7tcbi8vIOOBneOBk+OBi+OCieOBr+OBmuOCjOOBn+WLleS9nOOCkuWun+aWveOBleOCjOOBn+OCieODu+ODu+ODu+OBguOAgeOBp+OCgnJlYWN044Gn5o+P55S744GV44KM44Gf44Go44GT44KN44KS5YaN5o+P55S744GZ44KL44Go44CB44GC44Go44Gn5pu444GE44Gf5pa544GM5pyJ5Yq544Gr44Gq44KL44GLXG4vLyDjgajjgYTjgYbjgZPjgajjgarjgonjgIHnibnjgavjgarjgavjgoLogIPjgYjjgZrjgavjgaTjgY/jgaPjgablpKfkuIjlpKvjgaPjgb3jgYTjgarjgIJcbi8vIOmfs+WjsOOBruWHuuWKm+OBruWLleS9nOOBr+OAgeOBneOCjOWwgueUqOOBrnBsdWdpbuOBp+OCs+ODs+ODiOODreODvOODq+OBl+OCiOOBhuOBqOaAneOBhuOAglxuLy8gaGVhZGVy44Gr6Z+z5aOw6Kq/5pW044Gu44GM44GC44KL44Go44CB44Gp44Gu6Z+z6YeP44KS5pON5L2c44GX44Gm44GE44KL44GL44KP44GL44KJ44Gq44GP44Gq44Gj44Gm44CB44KE44KE44GT44GX44GP44Gq44KK44Gd44GG44CCXG4vLyDjgb7jgYHjgYLjgaPjgabjgoLjgYTjgYTjgZHjganjgIJcbi8vIOOBhOOChOOAgeOChOOBr+OCiuWFqOS9k+OBrumfs+mHj+OCkuOCs+ODs+ODiOODreODvOODq+OBp+OBjeOCi+OBu+OBhuOBjOmDveWQiOOBjOOBhOOBhOOBi+ODu+ODu+ODu1xuXG4vKipcbiAqIOS4i+mDqOOBrnJ0bXDjga7pg6jliIbjgIFjb2RlY+OBr+OBoeOCh+OBj+OBoeOCh+OBj+WkieabtOOBmeOCi+OCguOBruOBp+OBr+OBquOBhOOBruOBp+OAgemaoOOCjOOCi+OCiOOBhuOBq+OBl+OBpuOBiuOBjeOBn+OBhOOAglxuICogcnRtcOOBquOCieWfuuacrGgyNjQgLyBhYWPjgaDjgagg5o6l57aa5YWI44KC5oOF5aCx44GM44GC44KL5b2i44Gr44GX44Gm44GK44GE44Gm44CB44Kv44Oq44OD44Kv44GZ44KL44Go5aSJ5pu044GZ44KL44Gf44KB44Gu44OA44Kk44Ki44Ot44Kw44GM44Gn44Gm44GP44KL5oSf44GY44Gn44GE44GE44Go5oCd44GG44CCXG4gKiAg44KC44GX44GP44Gv44Gd44Gu5aC044GnYWN0aXZl44Gr44Gq44Gj44Gm5YWl5Yqb44Gn44GN44KL44KI44GG44Gq5oSf44GY44GnXG4gKiB3ZWJt44Gg44Gj44Gf44KJdnA4IC8gb3B1c+OBoOOBl+OAgeS7luOBruS9meioiOOBquOBruOBr+OAgeimi+OBiOOBquOBj+OBpuOBhOOBhOOBqOaAneOBhuOAglxuICog44GC44G+44KK44KE44KE44GT44GX44GEdWnjgavjgZnjgovjgajjgYTjgo3jgYTjgo3jgajnoLTntrvjgZfjgZ3jgYbjgIJcbiAqIFxuICog44Gf44Gg44GX44CBdWnjgavlh53jgovjgYLjgb7jgorjg5fjg63jgrDjg6njg6DjgYzmraLjgb7jgovjgajmnKzmnKvou6LlgJLjgarjga7jgafjgIHjgZ3jgZPjgb7jgafjgZPjgaDjgo/jgaPjgabnsKHntKDjgavjga/jgZfjgarjgYTmhJ/jgZjjgafjgIJcbiAqIGJvb3RzdHJhcOOBruWLleS9nOOBruODh+ODleOCqeOBq+W+k+OBhuaEn+OBmOOBi+OBreOAglxuICovXG5pbXBvcnQge0lQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJRmllbGRQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTWVkaWFQbHVnaW59IGZyb20gXCJ0YWtjYXN0LmludGVyZmFjZVwiO1xuaW1wb3J0IHtJT3V0cHV0UGx1Z2lufSBmcm9tIFwidGFrY2FzdC5pbnRlcmZhY2VcIjtcblxuaW1wb3J0IHtNZWRpYX0gZnJvbSBcIi4uLy4uL21lZGlhL3JlbmRlclwiO1xuXG5pbXBvcnQge2hlYWRlcn0gZnJvbSBcIi4vdWkvaGVhZGVyXCI7XG5pbXBvcnQge2Zvb3Rlcn0gZnJvbSBcIi4vdWkvZm9vdGVyXCI7XG5cbi8vIOOBk+OBhOOBpOOBjOOAgW1lZGlhUGx1Z2lu44KS44GZ44G544Gm566h55CG44GX44Gm44GK44GL44Gq44GE44Go44GE44GR44Gq44GE44CCXG4vLyB2b2x1bWXjgYzlpInmm7TjgZfjgZ/jgonjgIHjgZ3jga7lgKTjgpJtZWRpYVBsdWdpbuOBq+mAmuefpeOBl+OBquOBhOOBqOOBhOOBkeOBquOBhOOAglxuZXhwb3J0IGNsYXNzIE91dHB1dCBpbXBsZW1lbnRzIElGaWVsZFBsdWdpbiB7XG4gIHB1YmxpYyBuYW1lOnN0cmluZyA9IFwib3V0cHV0XCI7XG4gIHB1YmxpYyB0eXBlOnN0cmluZyA9IFwiZmllbGRcIjsgLy8g44GT44KM44GvZmllbGTjgafjgYLjgopvdXRwdXROb2Rl44Gn44KC44GC44KL44Go44GE44GG44Gu44Gv5Y+v6IO944Go44GE44GI44Gw5Y+v6IO944Gn44GZ44Gt44CCXG4gIHByaXZhdGUgbWVkaWFGaWVsZFBsdWdpbjpNZWRpYTtcbiAgcHJpdmF0ZSBtZWRpYVBsdWdpbnM6QXJyYXk8SU1lZGlhUGx1Z2luPjtcbiAgcHJpdmF0ZSBvdXRwdXRQbHVnaW5zOkFycmF5PElPdXRwdXRQbHVnaW4+O1xuICAvLyDnj77lnKjmnInlirnjgavjgarjgaPjgabjgYTjgottZWRpYVBsdWdpbuOCkuefpeOCi+W/heimgeOBjOOBguOCi+OAglxuICAvLyDnj77lnKjkv53mjIHjgZfjgabjgotvdXRwdXRQbHVnaW7jgoLnn6Xjgovlv4XopoHjgYzjgYLjgovjgIJcbiAgcHVibGljIHNldFBsdWdpbnMocGx1Z2luczp7W2tleTpzdHJpbmddOkFycmF5PElQbHVnaW4+fSk6dm9pZCB7XG4gICAgdGhpcy5tZWRpYVBsdWdpbnMgPSBbXTtcbiAgICB0aGlzLm91dHB1dFBsdWdpbnMgPSBbXTtcbiAgICAvLyBwbHVnaW7jgYzlhajpg6jjgZ3jgo3jgaPjgZ/jgajjgY3jgatjYWxs44GV44KM44KL5YuV5L2cXG4gICAgLy8g44GT44GT44GL44KJ44CBbWVkaWFQbHVnaW7jgpLlj5bjgorlh7rjgZfjgabjgZ3jga5hdWRpb0NvbnRleHTjgpJyZWbjgajjgZfjgabkv53mjIHjgZfjgabjgYrjgYvjgarjgYTjgajjgYTjgZHjgarjgYTjgIJcbiAgICAvLyDjgZ3jgozjgY/jgonjgYTjgYvjgarjgIJcbiAgICAvLyDjgZPjga7jgr/jgqTjg5/jg7PjgrDjgafoh6rliIbjgYvjgolmb290ZXLjga7lhoXlrrnjgpLmm7TmlrDjgZfjgavjgYTjgY/jgYvjg7vjg7vjg7tcbiAgICAvLyDjgZ3jgZfjgaboh6rliIbjga7kuK3jga7jgqTjg5njg7Pjg4jjgadmb290ZXLjga7lho3mj4/nlLvjgYzlv4XopoHjgavjgarjgaPjgZ/jgonjgIHoh6rliIbjgadyZW5kZXLjgpLlho3luqblrp/mlr3jgZnjgovjgafjgYTjgYTjgYtcblxuICAgIC8vIOWFg+OAheOBruWLleS9nOOBp+OBr2FjdGl2ZeOBquODh+ODvOOCv+OCkuihqOekuuOBl+OBn+OBi+OBo+OBn+OBruOBp21lZGlhUGx1Z2lu44KS5Y+C54Wn44GX44Gm44GE44Gf44CCXG4gICAgLy8g5LuK5Zue44GvbWVkaWHjga7ooajnpLrpg6jjgpLpmqDjgZnjgZPjgajjga/jgarjgYTjga7jgafjgIHlv4XopoHjgarjgYTjgYvjgarjgIJcbiAgICAvLyBiYXNl44GL44KJYXVkaW9Db250ZXh044GoZGV2bnVsbE5vZGXjgaDjgZHlj4LnhafjgZfjgabjgZ/jgonljYHliIbjgarjgY3jgYzjgZnjgovjgIJcbiAgICBpZihwbHVnaW5zW1wiZmllbGRcIl0gJiYgcGx1Z2luc1tcImZpZWxkXCJdLmZvckVhY2gpIHtcbiAgICAgIHBsdWdpbnNbXCJmaWVsZFwiXS5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgICAgaWYocGx1Z2luW1wiX3VwZGF0ZVNpemVcIl0pIHtcbiAgICAgICAgICB0aGlzLm1lZGlhRmllbGRQbHVnaW4gPSBwbHVnaW4gYXMgTWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZihwbHVnaW5zW1wibWVkaWFcIl0gJiYgcGx1Z2luc1tcIm1lZGlhXCJdLmZvckVhY2gpIHtcbiAgICAgIHBsdWdpbnNbXCJtZWRpYVwiXS5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgICAgdGhpcy5tZWRpYVBsdWdpbnMucHVzaChwbHVnaW4gYXMgSU1lZGlhUGx1Z2luKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZihwbHVnaW5zW1wib3V0cHV0XCJdICYmIHBsdWdpbnNbXCJvdXRwdXRcIl0uZm9yRWFjaCkge1xuICAgICAgcGx1Z2luc1tcIm91dHB1dFwiXS5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgICAgdGhpcy5vdXRwdXRQbHVnaW5zLnB1c2gocGx1Z2luIGFzIElPdXRwdXRQbHVnaW4pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cbiAgLy8g5o+P55S744Gb44KI44Go5ZG95Luk44GV44KM44Gf44Go44GN44Gu5YuV5L2cXG4gIHB1YmxpYyByZW5kZXIoKTp2b2lkIHtcbiAgICBoZWFkZXIodGhpcyk7XG4gICAgZm9vdGVyKHRoaXMpO1xuICB9XG4gIHB1YmxpYyBfc2V0Vm9sdW1lKG51bWJlcik6dm9pZCB7XG4gICAgdGhpcy5tZWRpYVBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICBwbHVnaW4uc2V0Vm9sdW1lKG51bWJlcik7XG4gICAgfSlcbiAgfVxuICBwdWJsaWMgX3JlZk91dHB1dFBsdWdpbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0UGx1Z2lucztcbiAgfVxuICBwdWJsaWMgX29uVXBkYXRlU2l6ZSgpIHtcbiAgICAvLyDjgrXjgqTjgrrjga7mm7TmlrDjgpLlrp/mlr3jgZnjgotcbiAgICB0aGlzLm1lZGlhRmllbGRQbHVnaW4uX3VwZGF0ZVNpemUoKTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF8gPSBuZXcgT3V0cHV0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BsdWdpbnMvb3V0cHV0L3JlbmRlci9pbmRleC50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0ICogYXMgUmVhY3RCb290c3RyYXAgZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuXG52YXIgTmF2ICAgICA9IFJlYWN0Qm9vdHN0cmFwLk5hdjtcbnZhciBOYXZiYXIgID0gUmVhY3RCb290c3RyYXAuTmF2YmFyO1xudmFyIE5hdkl0ZW0gPSBSZWFjdEJvb3RzdHJhcC5OYXZJdGVtO1xudmFyIE5Db2xsYXBzZSA9IE5hdmJhci5Db2xsYXBzZSBhcyBhbnk7XG5cbnZhciBGb3JtID0gUmVhY3RCb290c3RyYXAuRm9ybTtcbnZhciBGb3JtQ29udHJvbCA9IFJlYWN0Qm9vdHN0cmFwLkZvcm1Db250cm9sO1xuXG5pbXBvcnQge091dHB1dH0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCB2YXIgZm9vdGVyID0gKG91dHB1dDpPdXRwdXQpID0+IHtcbiAgdmFyIHBsdWdpbnMgPSBvdXRwdXQuX3JlZk91dHB1dFBsdWdpbnMoKTtcbiAgdmFyIGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vdGVyXCIpO1xuICBjbGFzcyBGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XG4gICAgc3RhdGUgPSB7XG4gICAgICBpbmRleDowLFxuICAgICAgaG9nZTowXG4gICAgfTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLl91cGRhdGVQYWRkaW5nID0gdGhpcy5fdXBkYXRlUGFkZGluZy5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBwcml2YXRlIF91cGRhdGVQYWRkaW5nKCkge1xuICAgICAgb3V0cHV0Ll9vblVwZGF0ZVNpemUoKTtcbi8vICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVtcInBhZGRpbmctYm90dG9tXCJdID0gKGZvb3Rlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2YmFyXCIpWzBdLmNsaWVudEhlaWdodCArIDEwKSArIFwicHhcIjtcbiAgICB9XG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fdXBkYXRlUGFkZGluZygpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fdXBkYXRlUGFkZGluZyk7XG4gICAgfVxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TmF2YmFyIGNvbGxhcHNlT25TZWxlY3QgZml4ZWRCb3R0b20+XG4gICAgICAgICAgPE5hdmJhci5Ub2dnbGUvPlxuICAgICAgICAgIDxOQ29sbGFwc2Ugb25FbnRlcmVkPXt0aGlzLl91cGRhdGVQYWRkaW5nfSBvbkV4aXRlZD17dGhpcy5fdXBkYXRlUGFkZGluZ30+XG4gICAgICAgICAgICA8TmF2YmFyLlRleHQ+XG4gICAgICAgICAgICA8Rm9ybT5cbiAgICAgICAgICAgICAgPEZvcm1Db250cm9sIGNvbXBvbmVudENsYXNzPVwic2VsZWN0XCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcGx1Z2lucy5tYXAoZnVuY3Rpb24ocGx1Z2luLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXtpfSBrZXk9e2l9PntwbHVnaW4ubmFtZX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgIDwvTmF2YmFyLlRleHQ+XG4gICAgICAgICAgey8qIOOBk+OBrumDqOWIhuOBq+W/heimgeOBjOOBguOCjOOBsOOAgeWQhHBsdWdpbuOBrnNldHRpbmfjgpLooajnpLrjgZnjgovmhJ/jgZggKi99XG4gICAgICAgICAgeyhcbiAgICAgICAgICAgICh0YXJnZXQpID0+IHtcbiAgICAgICAgICAgICAgaWYodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgQ29tcG9uZW50ID0gdGFyZ2V0LnJlZlNldHRpbmdDb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICBpZihDb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApKHBsdWdpbnNbdGhpcy5zdGF0ZS5pbmRleF0pfVxuICAgICAgICAgIDwvTkNvbGxhcHNlPlxuICAgICAgICA8L05hdmJhcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIFJlYWN0RE9NLnJlbmRlcihcbiAgICA8Rm9vdGVyIC8+LFxuICAgIGZvb3RlclxuICApO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvdWkvZm9vdGVyLnRzeCIsIi8vIOODmOODg+ODgOODvOmDqOOCkuOCs+ODs+ODiOODreODvOODq+OBmeOCi+OAglxuLy8g44GT44GT44Gr6Z+z5aOw5Ye65Yqb5YuV5L2c44KS6L+95Yqg44GX44Go44GP44GT44Go44Gr44GZ44KL44CCXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCAqIGFzIFJlYWN0Qm9vdHN0cmFwIGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcblxudmFyIE5hdiAgICAgPSBSZWFjdEJvb3RzdHJhcC5OYXY7XG52YXIgTmF2YmFyICA9IFJlYWN0Qm9vdHN0cmFwLk5hdmJhcjtcbnZhciBOYXZJdGVtID0gUmVhY3RCb290c3RyYXAuTmF2SXRlbTtcbnZhciBOQ29sbGFwc2UgPSBOYXZiYXIuQ29sbGFwc2UgYXMgYW55O1xuXG5pbXBvcnQge091dHB1dH0gZnJvbSBcIi4uXCI7XG5cbmV4cG9ydCB2YXIgaGVhZGVyID0gKG91dHB1dDpPdXRwdXQpID0+IHtcbiAgdmFyIGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpO1xuICBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy52b2x1bWUgPSB0aGlzLnZvbHVtZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5fdXBkYXRlUGFkZGluZyA9IHRoaXMuX3VwZGF0ZVBhZGRpbmcuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcHVibGljIHZvbHVtZShpdGVtKSB7XG4gICAgICBvdXRwdXQuX3NldFZvbHVtZShpdGVtLnRhcmdldC52YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX3VwZGF0ZVBhZGRpbmcoKSB7XG4gICAgICBvdXRwdXQuX29uVXBkYXRlU2l6ZSgpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVtcInBhZGRpbmctdG9wXCJdID0gKGhlYWRlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2YmFyXCIpWzBdLmNsaWVudEhlaWdodCArIDEwKSArIFwicHhcIjtcbiAgICB9XG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fdXBkYXRlUGFkZGluZygpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5fdXBkYXRlUGFkZGluZyk7XG4gICAgfVxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TmF2YmFyIGludmVyc2UgY29sbGFwc2VPblNlbGVjdCBmaXhlZFRvcD5cbiAgICAgICAgICA8TmF2YmFyLkhlYWRlcj5cbiAgICAgICAgICAgIDxOYXZiYXIuQnJhbmQ+VGFrQ2FzdDwvTmF2YmFyLkJyYW5kPlxuICAgICAgICAgICAgPE5hdmJhci5Ub2dnbGUvPlxuICAgICAgICAgIDwvTmF2YmFyLkhlYWRlcj5cbiAgICAgICAgICA8TkNvbGxhcHNlIG9uRW50ZXJlZD17dGhpcy5fdXBkYXRlUGFkZGluZ30gb25FeGl0ZWQ9e3RoaXMuX3VwZGF0ZVBhZGRpbmd9PlxuICAgICAgICAgIDxOYXZiYXIuVGV4dCBwdWxsUmlnaHQ+XG4gICAgICAgICAgICBWb2x1bWVcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBkZWZhdWx0VmFsdWU9XCIxMDBcIiBvbkNoYW5nZT17dGhpcy52b2x1bWV9Lz5cbiAgICAgICAgICA8L05hdmJhci5UZXh0PlxuICAgICAgICAgIDwvTkNvbGxhcHNlPlxuICAgICAgICA8L05hdmJhcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIFJlYWN0RE9NLnJlbmRlcihcbiAgICA8SGVhZGVyIC8+LFxuICAgIGhlYWRlclxuICApO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wbHVnaW5zL291dHB1dC9yZW5kZXIvdWkvaGVhZGVyLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gZWxlY3Ryb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJlbGVjdHJvblwiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9