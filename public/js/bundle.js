(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class ProgressBar extends HTMLElement {
    static get observedAttributes() {
        return ['progress', 'min', 'max'];
    }

    get progress() {
        return this.getAttribute('progress');
    }

    set progress(value) {
        if (value >= this.min && value <= this.max) {
            this.setAttribute('progress', value);
            this.updateIndicator(value);
        }
    }

    get max() {
        return this.getAttribute('max') | 100;
    }

    get min() {
        return this.getAttribute('min') | 0;
    }

    set max(value) {
        if (value >= this.progress) {
            this.setAttribute('max', value);
            this.updateIndicator(value);
        }
    }

    set min(value) {
        if (value <= this.progress) {
            this.setAttribute('min', value);
            this.updateIndicator(value);
        }
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    background-color: #eee;
                }

                :host > #progress-indicator {
                    background-color: #b0f;
                }
            </style>
            <div id="progress-indicator"></div>
        `;
        this._progressElement = shadowRoot.querySelector('#progress-indicator');
    }

    connectedCallback() {
        this.updateIndicator();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (newVal === oldVal) return;

        this.updateIndicator();
    }

    updateIndicator() {
        this._progressElement.style.width = (this.progress - this.min) / (this.max - this.min) * 100 + "%";
    }
}
},{}],2:[function(require,module,exports){
const ProgressBar = require('./elements/progress-bar');

customElements.define('progress-bar', ProgressBar);
},{"./elements/progress-bar":1}]},{},[2]);
