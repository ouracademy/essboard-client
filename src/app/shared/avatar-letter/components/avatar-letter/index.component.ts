import { Component, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import * as ColorHash from 'color-hash';


@Component({
    selector: 'avatar-letter',
    templateUrl: 'index.component.html'
})
export class AvatarLetterComponent implements OnInit, OnChanges {

    @Input('options') options: any;
    @Input('text') text: any;
    @Input('isOpaque') isOpaque: Boolean = false;
    letterSrc: string;
    background: string = 'red';
    fontSize: number = 49;
    padding: number = 28;
    letter: string = "?";
    size: number = 100;
    fontColor: string = '#FFFFFF';
    border: string;
    props: Object = null;
    private _el: HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }
    test() {
        this.generateLetter();
    }

    generateLetter() {
        if (!this.options) {
            throw Error("LetterAvatarDirective configdata not provides");
        }
        if (!this.text) {
            this.text = '?';
        }
        var size = this.options && this.options.size ? this.options.size : 100;
        this.fontColor = this.options.fontColor ? this.options.fontColor : "#FFFFFF";
        var isSquare = this.options && this.options.isSquare ? true : false;
        var border = this.options && this.options.border ? this.options.border : "1px solid #d3d3d3";
        var background = this.options && this.options.background ? this.options.background : null;
        var text = this.options && this.text ? this.text : null;
        this.background = background;
        var textArray = text.split(' ');
        var letter = textArray[0].substr(0, 1) + '' + (textArray.length > 1 ? textArray[1].substr(0, 1) : '');
        letter = letter.toUpperCase();
        this.fontSize = (39 * size) / 100;
        this.padding = (28 * size) / 100;
        this.letter = letter;
        this.size = size;
        this.props = new Object();
        this.props['size'] = size + 'px';
        this.props['lineheight'] = this.size + 'px';
        this.props['letter'] = letter;
        this.props['fontSize'] = this.fontSize + 'px';
        this.props['display'] = 'inline-block';
        this.props['opacity'] = this.isOpaque ? 0.3 : 1;
        if (isSquare) {
            this.props['borderradius'] = '0%';
        } else {
            this.props['borderradius'] = '50%';
        }
        this.props['textalign'] = 'center';
        this.props['border'] = border;
        this.props['background'] = background;
        if (this.options.fixedColor && !background) {
            this.props['background'] = background || this.colorize(letter);
        } else {
            this.props['background'] = background || this.getRandomColor();
        }
        return true;
    };

    getRandomColor() {
        /*
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;*/
        var colorHash = new ColorHash();

        return colorHash.hex(this.text);
    }
    colorize(str) {
        for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
        var color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        return '#' + Array(6 - color.length + 1).join('0') + color;
    }

    ngOnInit() {
        this.generateLetter();
    }
    ngOnChanges(...args: any[]) {
        this.generateLetter();
    }
}
